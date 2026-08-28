'use client';

/**
 * Popout-window lifecycle manager for floating panels.
 *
 * Opens, tracks, and tears down browser popout windows for panels whose
 * `floating.popout` flag is set, keeping window state in sync with the
 * View layout reducer.
 */

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type RefObject,
} from 'react';
import {
  viewAllPanelOrderFromState,
  viewNormalizePopoutWindowBounds,
  viewPopoutWindowFeatureString,
  type ViewLayoutState,
  type ViewPanelId,
  type ViewPopoutPanelOptions,
  type ViewPopoutWindowBounds,
  type ViewReducerAction,
} from '../core/internal';

type ViewPopoutWindowRecord = {
  win: Window;
  root: HTMLElement;
  closing: boolean;
  cleanup: () => void;
};

/**
 * Controller returned by {@link useViewPopoutWindows} for managing panel
 * popout windows.
 */
export type ViewPopoutWindowController = {
  /**
   * Map of panel IDs to the root `<div>` inside their popout window, used as
   * React portal targets.
   */
  popoutRoots: Record<ViewPanelId, HTMLElement | null>;
  /**
   * Opens a popout window for the given panel (or focuses it if already open).
   *
   * @returns `true` if the window was opened or focused, `false` if blocked.
   */
  requestPopoutPanel: (
    panelId: ViewPanelId,
    opts?: ViewPopoutPanelOptions,
  ) => boolean;
  /** Closes the popout window and returns the panel to its floating state. */
  returnPopoutPanelToFloating: (panelId: ViewPanelId) => void;
};

/**
 * Synchronises open popout windows with the layout state, opening new windows
 * for panels that become popped-out and closing windows whose panels return to
 * floating or are removed.
 */
export function useViewPopoutWindows({
  containerRef,
  state,
  dispatchWithLifecycle,
}: {
  containerRef: RefObject<HTMLDivElement | null>;
  state: ViewLayoutState;
  dispatchWithLifecycle: (action: ViewReducerAction) => void;
}): ViewPopoutWindowController {
  const popoutWindowsRef = useRef<Map<ViewPanelId, ViewPopoutWindowRecord>>(
    new Map(),
  );
  const [popoutRoots, setPopoutRoots] = useState<
    Record<ViewPanelId, HTMLElement | null>
  >({});

  const setPopoutRoot = useCallback(
    (panelId: ViewPanelId, root: HTMLElement | null) => {
      setPopoutRoots((prev) => {
        /* v8 ignore next -- popout roots are only set when they change. */
        if (prev[panelId] === root) return prev;
        if (!root) {
          const { [panelId]: _drop, ...next } = prev;
          return next;
        }
        return { ...prev, [panelId]: root };
      });
    },
    [],
  );

  const syncPopoutWindowBounds = useCallback(
    (panelId: ViewPanelId) => {
      const record = popoutWindowsRef.current.get(panelId);
      if (!record || record.win.closed) return;
      const bounds = readPopoutWindowBounds(record.win);
      dispatchWithLifecycle({
        type: 'PANEL_POPOUT_WINDOW_BOUNDS_SET',
        panelId,
        bounds,
      });
    },
    [dispatchWithLifecycle],
  );

  const closePopoutWindow = useCallback(
    (panelId: ViewPanelId) => {
      const record = popoutWindowsRef.current.get(panelId);
      if (!record) return;
      record.closing = true;
      record.cleanup();
      popoutWindowsRef.current.delete(panelId);
      setPopoutRoot(panelId, null);
      if (!record.win.closed) {
        record.win.close();
      }
    },
    [setPopoutRoot],
  );

  const requestPopoutPanel = useCallback(
    (panelId: ViewPanelId, opts?: ViewPopoutPanelOptions): boolean => {
      const existing = popoutWindowsRef.current.get(panelId);
      if (existing && !existing.win.closed) {
        existing.win.focus();
        return true;
      }

      /* v8 ignore next 3 -- React DOM popout requests always have an owner window. */
      const ownerWindow =
        containerRef.current?.ownerDocument.defaultView ??
        (typeof window === 'undefined' ? null : window);
      /* v8 ignore next -- covered by the owner-window invariant above. */
      if (!ownerWindow) return false;
      const fallbackBounds = defaultPopoutWindowBounds(ownerWindow);
      const bounds = viewNormalizePopoutWindowBounds(
        opts?.windowBounds,
        fallbackBounds,
      );
      const features = viewPopoutWindowFeatureString(bounds);
      const win = ownerWindow.open('', `view-popout-${panelId}`, features);
      if (!win) return false;

      const root = preparePopoutDocument(win, containerRef.current, panelId);
      if (!root) {
        win.close();
        return false;
      }

      const handleBeforeUnload = () => {
        const record = popoutWindowsRef.current.get(panelId);
        /* v8 ignore next -- cleanup removes this listener with the record. */
        if (!record) return;
        syncPopoutWindowBounds(panelId);
        /* v8 ignore next -- close cleanup removes this listener first. */
        if (!record.closing) {
          dispatchWithLifecycle({
            type: 'PANEL_RETURN_TO_FLOATING',
            panelId,
          });
        }
      };
      const handleResize = () => syncPopoutWindowBounds(panelId);
      const handleFocus = () => {
        dispatchWithLifecycle({ type: 'PANEL_FOCUS', panelId });
      };
      win.addEventListener('beforeunload', handleBeforeUnload);
      win.addEventListener('resize', handleResize);
      win.addEventListener('focus', handleFocus);
      popoutWindowsRef.current.set(panelId, {
        win,
        root,
        closing: false,
        cleanup: () => {
          win.removeEventListener('beforeunload', handleBeforeUnload);
          win.removeEventListener('resize', handleResize);
          win.removeEventListener('focus', handleFocus);
        },
      });
      setPopoutRoot(panelId, root);
      win.focus();
      return true;
    },
    [
      containerRef,
      dispatchWithLifecycle,
      setPopoutRoot,
      syncPopoutWindowBounds,
    ],
  );

  const returnPopoutPanelToFloating = useCallback(
    (panelId: ViewPanelId) => {
      closePopoutWindow(panelId);
    },
    [closePopoutWindow],
  );

  useEffect(() => {
    const poppedOut = new Set<ViewPanelId>();
    for (const panelId of viewAllPanelOrderFromState(state)) {
      const panel = state.panels[panelId];
      if (panel?.kind === 'floating' && panel.floating.popout) {
        poppedOut.add(panelId);
        const record = popoutWindowsRef.current.get(panelId);
        if (!record || record.win.closed) {
          const ok = requestPopoutPanel(panelId, {
            windowBounds: panel.floating.popout.windowBounds,
          });
          if (!ok) {
            dispatchWithLifecycle({
              type: 'PANEL_RETURN_TO_FLOATING',
              panelId,
            });
          }
        }
      }
    }

    const openPanelIds = Array.from(popoutWindowsRef.current.keys());
    for (const panelId of openPanelIds) {
      if (!poppedOut.has(panelId)) closePopoutWindow(panelId);
    }
  }, [closePopoutWindow, dispatchWithLifecycle, requestPopoutPanel, state]);

  useEffect(() => {
    return () => {
      const openPanelIds = Array.from(popoutWindowsRef.current.keys());
      for (const panelId of openPanelIds) {
        closePopoutWindow(panelId);
      }
    };
  }, [closePopoutWindow]);

  return { popoutRoots, requestPopoutPanel, returnPopoutPanelToFloating };
}

function defaultPopoutWindowBounds(win: Window): ViewPopoutWindowBounds {
  const width = 720;
  const height = 520;
  const screenLeft = finiteNumber(win.screenX, 0);
  const screenTop = finiteNumber(win.screenY, 0);
  const outerWidth = finiteNumber(win.outerWidth, width + 120);
  const outerHeight = finiteNumber(win.outerHeight, height + 120);
  return {
    left: Math.round(screenLeft + Math.max(24, (outerWidth - width) / 2)),
    top: Math.round(screenTop + Math.max(24, (outerHeight - height) / 2)),
    width,
    height,
  };
}

function readPopoutWindowBounds(win: Window): ViewPopoutWindowBounds {
  return viewNormalizePopoutWindowBounds(
    {
      left: win.screenX,
      top: win.screenY,
      width: win.outerWidth,
      height: win.outerHeight,
    },
    defaultPopoutWindowBounds(win),
  );
}

function preparePopoutDocument(
  win: Window,
  sourceContainer: HTMLElement | null,
  panelId: ViewPanelId,
): HTMLElement | null {
  const sourceDocument = sourceContainer?.ownerDocument;
  const doc = win.document;
  if (!doc || !sourceDocument) return null;

  doc.head.innerHTML = '';
  doc.body.innerHTML = '';
  doc.title = `View - ${panelId}`;
  doc.body.style.margin = '0';
  doc.body.style.overflow = 'hidden';
  doc.documentElement.style.height = '100%';
  doc.body.style.height = '100%';
  copyPopoutStyles(sourceDocument, doc);

  const root = doc.createElement('div');
  root.className = 'view view__popout';
  root.setAttribute('data-view-popout-root', panelId);
  doc.body.appendChild(root);
  return root;
}

function copyPopoutStyles(sourceDocument: Document, targetDocument: Document) {
  const base = targetDocument.createElement('base');
  base.href = sourceDocument.baseURI;
  targetDocument.head.appendChild(base);

  for (const node of Array.from(sourceDocument.head.children)) {
    const tagName = node.tagName.toLowerCase();
    const isStylesheetLink =
      tagName === 'link' &&
      (node as HTMLLinkElement).rel.toLowerCase() === 'stylesheet';
    if (tagName === 'style' || isStylesheetLink) {
      targetDocument.head.appendChild(node.cloneNode(true));
    }
  }
}

function finiteNumber(value: unknown, fallback: number): number {
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback;
}

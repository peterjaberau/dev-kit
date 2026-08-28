'use client';

/**
 * Panel action menu (maximize, close, app-defined actions).
 */

import { useCallback } from 'react';
import { useViewMenu } from '../use-menu';
import type {
  ViewDirection,
  ViewController,
  ViewPanel,
  ViewTabInit,
} from '../../core/internal';

/**
 * Context object passed to the {@link PanelActionsProps.renderPanelActions}
 * callback, giving it access to the layout controller and a way to close
 * the menu after an action is triggered.
 */
export type ViewPanelActionsRenderContext = {
  /** The View layout controller for the current root. */
  view: ViewController;
  /** Closes the actions dropdown menu. */
  closeMenu: () => void;
};

/**
 * Props for the {@link PanelActions} component.
 */
export type PanelActionsProps = {
  /** The panel whose actions are being rendered. */
  panel: ViewPanel;
  /** The View layout controller for the current root. */
  view: ViewController;
  /** Whether to show the ellipsis button that opens the actions dropdown. */
  showActionsButton: boolean;
  /** Whether to show the "+" new-tab button. */
  showNewTabButton: boolean;
  /**
   * Called when the new-tab button is clicked. Should return a
   * {@link ViewTabInit} to append, or nothing to handle it externally.
   */
  onNewTab?: (
    panel: ViewPanel,
    ctx: { view: ViewController },
  ) => ViewTabInit | void;
  /**
   * Renders additional menu items in the actions dropdown. Items are
   * appended after the built-in split/float/maximize/close entries.
   */
  renderPanelActions?: (
    panel: ViewPanel,
    ctx: ViewPanelActionsRenderContext,
  ) => React.ReactNode;
  /**
   * Renders a custom icon inside the ellipsis trigger button.
   * Defaults to a three-dot icon when omitted.
   */
  renderActionsButtonIcon?: (panel: ViewPanel) => React.ReactNode;
};

const splitDirections: { direction: ViewDirection; label: string }[] = [
  { direction: 'left', label: 'Split left' },
  { direction: 'right', label: 'Split right' },
  { direction: 'top', label: 'Split top' },
  { direction: 'bottom', label: 'Split bottom' },
];

function EllipsisIcon() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="16"
      height="16"
      viewBox="0 0 16 16">
      <circle cx="4" cy="8" r="1.25" fill="currentColor" />
      <circle cx="8" cy="8" r="1.25" fill="currentColor" />
      <circle cx="12" cy="8" r="1.25" fill="currentColor" />
    </svg>
  );
}

function MinimizeIcon() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="16"
      height="16"
      viewBox="0 0 16 16">
      <path
        d="M5 2.75V5H2.75M11 2.75V5h2.25M5 13.25V11H2.75M11 13.25V11h2.25"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

/**
 * Toolbar rendered at the trailing end of a panel's tab bar. Provides a
 * new-tab button and an ellipsis menu with split, float, maximize, pop-out,
 * and close actions; collapses to a minimize-only button when the panel is
 * full-screen.
 */
export function PanelActions({
  panel,
  view,
  showActionsButton,
  showNewTabButton,
  onNewTab,
  renderPanelActions,
  renderActionsButtonIcon,
}: PanelActionsProps) {
  const menu = useViewMenu();
  const isOpen = menu.isOpen;
  const closeMenu = useCallback(() => menu.close(false), [menu.close]);
  const runAction = useCallback(
    (fn: () => void) => {
      fn();
      closeMenu();
    },
    [closeMenu],
  );
  const handleNewTab = useCallback(() => {
    if (!onNewTab) return;
    const tab = onNewTab(panel, { view });
    if (tab) panel.appendTab(tab);
  }, [onNewTab, panel, view]);

  if (!showNewTabButton && !showActionsButton) return null;

  if (panel.fullScreen) {
    if (!showActionsButton) return null;
    return (
      <div
        className="view__panel-actions"
        data-view-panel-actions=""
        onPointerDown={(e) => {
          e.stopPropagation();
        }}>
        <button
          type="button"
          className="view__panel-action-button"
          aria-label="Minimize panel"
          title="Minimize panel"
          onClick={() => panel.restore()}>
          <MinimizeIcon />
        </button>
      </div>
    );
  }

  const customActions = renderPanelActions?.(panel, { view, closeMenu });

  return (
    <div
      className="view__panel-actions"
      data-view-panel-actions=""
      onPointerDown={(e) => {
        e.stopPropagation();
      }}>
      {showNewTabButton && (
        <button
          type="button"
          className="view__panel-action-button"
          aria-label="New tab"
          disabled={!onNewTab}
          title={onNewTab ? 'New tab' : 'New tab handler not provided'}
          onClick={handleNewTab}>
          +
        </button>
      )}
      {showActionsButton && (
        <div className="view__panel-menu-shell">
          <button
            ref={menu.triggerRef}
            type="button"
            className="view__panel-action-button"
            aria-label="Panel actions"
            aria-haspopup="menu"
            aria-expanded={isOpen}
            onClick={menu.toggle}>
            {renderActionsButtonIcon?.(panel) ?? <EllipsisIcon />}
          </button>
          {isOpen && (
            <div
              ref={menu.menuRef}
              className="view__panel-menu"
              role="menu"
              onKeyDown={menu.onKeyDown}>
              {!panel.floating && (
                <div className="view__panel-menu-section">
                  {splitDirections.map(({ direction, label }) => (
                    <button
                      key={direction}
                      type="button"
                      className="view__panel-menu-item"
                      role="menuitem"
                      onClick={() => runAction(() => panel.split(direction))}>
                      {label}
                    </button>
                  ))}
                </div>
              )}
              <div className="view__panel-menu-section">
                <button
                  type="button"
                  className="view__panel-menu-item"
                  role="menuitem"
                  onClick={() =>
                    runAction(() =>
                      panel.floating ? panel.dock() : panel.float(),
                    )
                  }>
                  {panel.floating ? 'Dock panel' : 'Float panel'}
                </button>
                <button
                  type="button"
                  className="view__panel-menu-item"
                  role="menuitem"
                  onClick={() =>
                    runAction(() =>
                      panel.poppedOut
                        ? panel.returnToFloating()
                        : panel.popout(),
                    )
                  }>
                  {panel.poppedOut
                    ? 'Return to floating layer'
                    : 'Pop out window'}
                </button>
                <button
                  type="button"
                  className="view__panel-menu-item"
                  role="menuitem"
                  onClick={() => runAction(() => panel.maximize())}>
                  Maximize
                </button>
                <button
                  type="button"
                  className="view__panel-menu-item"
                  role="menuitem"
                  onClick={() => runAction(() => panel.remove())}>
                  Close panel
                </button>
              </div>
              {customActions && (
                <div className="view__panel-menu-section">
                  {customActions}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

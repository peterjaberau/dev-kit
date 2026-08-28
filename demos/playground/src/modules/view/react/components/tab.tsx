'use client';

/**
 * A single tab trigger + close control.
 */

import { memo, useCallback } from 'react';
import type { ViewTab } from '../../core/internal';
import type {
  ViewTabTriggerProps,
  ViewTabTriggerRenderer,
} from '../view';
import { viewTabDomId, viewTabPanelDomId } from '../dom-ids';

/**
 * Props for the {@link Tab} component.
 */
export type TabProps = {
  /** The tab model that provides id, closable, and draggable flags. */
  tab: ViewTab;
  /** Whether this tab is currently selected. */
  isActive: boolean;
  /**
   * Renders the visible header content (title, icon, etc.) inside the tab
   * trigger.
   */
  renderHeader: (tab: ViewTab, ctx: { isActive: boolean }) => React.ReactNode;
  /**
   * Replaces the default `<div>` trigger element with a custom component.
   * When provided, pointer event handlers are attached to the custom element
   * via `props` rather than to the outer tab wrapper.
   */
  renderTrigger?: ViewTabTriggerRenderer;
  /** Called on pointer-down over the tab trigger. */
  onPointerDown: (e: React.PointerEvent) => void;
  /** Called on pointer-move during a drag gesture. */
  onPointerMove: (e: React.PointerEvent) => void;
  /** Called on pointer-up to end a drag or confirm a click. */
  onPointerUp: (e: React.PointerEvent) => void;
  /** Called on pointer-cancel to clean up an interrupted gesture. */
  onPointerCancel: (e: React.PointerEvent) => void;
  /** Callback ref that registers the tab's root DOM element by ID. */
  registerTab: (tabId: string, el: HTMLElement | null) => void;
  /** Called when the close button is clicked. */
  onClose: () => void;
  /**
   * Optional resolver for a tab's accessible label, used for the close
   * button's `aria-label`. Falls back to a generic label when absent.
   */
  getTabLabel?: (tab: ViewTab) => string;
};

/**
 * Renders a single tab entry in the tab strip. Supports a default `<div>`
 * trigger or a fully custom trigger via `renderTrigger`, and appends a close
 * button when `tab.closable` is true.
 */
export const Tab = memo(function Tab({
  tab,
  isActive,
  renderHeader,
  renderTrigger,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onPointerCancel,
  registerTab,
  onClose,
  getTabLabel,
}: TabProps) {
  const tabId = tab.id;
  const tabDomId = viewTabDomId(tabId);
  const tabPanelDomId = viewTabPanelDomId(tabId);
  const tabLabel = getTabLabel?.(tab);
  const closeLabel = tabLabel ? `Close ${tabLabel}` : 'Close tab';
  const handleRef = useCallback(
    (el: HTMLElement | null) => registerTab(tabId, el),
    [registerTab, tabId],
  );
  const handleTriggerRef = useCallback(
    (_el: HTMLElement | null) => undefined,
    [],
  );
  const usesCustomTrigger = renderTrigger != null;
  const triggerProps: ViewTabTriggerProps = {
    ref: handleTriggerRef,
    className: 'view__tab-trigger',
    'data-active': isActive,
    'data-closable': tab.closable,
    'data-draggable': tab.draggable,
    'data-tab-id': tab.id,
    id: tabDomId,
    'aria-controls': tabPanelDomId,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerCancel,
    role: 'tab',
    'aria-selected': isActive,
    tabIndex: isActive ? 0 : -1,
  };
  const triggerChildren = (
    <span className="view__tab-header">
      {renderHeader(tab, { isActive })}
    </span>
  );
  const trigger = renderTrigger ? (
    renderTrigger({
      tab,
      isActive,
      props: triggerProps,
      children: triggerChildren,
    })
  ) : (
    <div className="view__tab-trigger">{triggerChildren}</div>
  );
  const tabInteractionProps = usesCustomTrigger
    ? {}
    : {
        onPointerDown,
        onPointerMove,
        onPointerUp,
        onPointerCancel,
        role: 'tab',
        'aria-selected': isActive,
        tabIndex: isActive ? 0 : -1,
        id: tabDomId,
        'aria-controls': tabPanelDomId,
      };

  return (
    <div
      ref={handleRef}
      className="view__tab"
      data-active={isActive}
      data-closable={tab.closable}
      data-draggable={tab.draggable}
      data-tab-id={tab.id}
      {...tabInteractionProps}>
      {trigger}
      {tab.closable && (
        <button
          type="button"
          className="view__tab-close"
          aria-label={closeLabel}
          onPointerDown={(e) => {
            e.stopPropagation();
          }}
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}>
          <span aria-hidden="true">×</span>
        </button>
      )}
    </div>
  );
});

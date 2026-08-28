/**
 * Public entry point for `@viewjs/react`: the View component, props,
 * events, and re-exported core types.
 */
export {
  View,
  type ViewNewTabHandler,
  type ViewPanelActionsRenderContext,
  type ViewPanelVisibility,
  type ViewProps,
  type ViewResizeDimension,
  type ViewResizeEvent,
  type ViewResizeInput,
  type ViewResizePanelChange,
  type ViewResizePhase,
  type ViewResizeSource,
  type ViewTabTriggerProps,
  type ViewTabTriggerRenderContext,
  type ViewTabTriggerRenderer,
} from './view';

export type {
  ViewActiveTabChange,
  ViewActiveTabChangeEvent,
  ViewLifecycleSource,
  ViewPanelLifecycleChange,
  ViewPanelSplitEvent,
  ViewPanelsCloseEvent,
  ViewPanelsOpenEvent,
  ViewTabLifecycleChange,
  ViewTabMoveChange,
  ViewTabsCloseEvent,
  ViewTabsMoveEvent,
  ViewTabsOpenEvent,
} from './lifecycle';

// Re-export every public type from the core package. Using `export type *`
// (rather than a hand-maintained list) keeps the adapter's type surface in
// lockstep with core and avoids drift — e.g. previously ViewRootSplitMoveTarget
// existed in core but was missing here.
export type * from '../core';

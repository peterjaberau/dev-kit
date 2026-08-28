/**
 * Lifecycle event payloads and the diffing logic that turns a single reducer
 * action into the structured tab/panel events the View component emits.
 */

import {
  viewAllPanelOrderFromState,
  type ViewDirection,
  type ViewLayoutState,
  type ViewPanelId,
  type ViewReducerAction,
  type ViewTabId,
} from '../core/internal';

/**
 * Identifies the kind of state transition that produced a lifecycle event, so
 * consumers can branch on how the change originated (a split, a tab move, a
 * removal, a whole-state replacement, and so on).
 */
export type ViewLifecycleSource =
  | 'PANEL_SPLIT'
  | 'PANEL_REMOVE'
  | 'TAB_APPEND'
  | 'TAB_INSERT'
  | 'TAB_ID_CHANGE'
  | 'TAB_REMOVE'
  | 'TAB_MOVE'
  | 'TAB_FLOAT'
  | 'TAB_POPOUT'
  | 'TAB_ACTIVE_SET'
  | 'STATE_REPLACE';

/** Compact snapshot of a single tab involved in a lifecycle transition. */
export type ViewTabLifecycleChange<TData = unknown> = {
  /** Identifier of the affected tab. */
  id: ViewTabId;
  /** Panel the tab belongs to at the snapshotted side of the transition. */
  panelId: ViewPanelId;
  /** Caller-supplied data carried by the tab. */
  data: TData;
  /** Whether the tab can be closed by the user. */
  closable: boolean;
  /** Whether the tab can be dragged. */
  draggable: boolean;
};

/** Compact snapshot of a panel and its tab membership at a transition side. */
export type ViewPanelLifecycleChange = {
  /** Identifier of the affected panel. */
  id: ViewPanelId;
  /** Ordered tab ids contained by the panel. */
  tabIds: ViewTabId[];
  /** Tab currently active in the panel, or null when it has none. */
  activeTabId: ViewTabId | null;
};

/** Describes one panel switching from one active tab to another. */
export type ViewActiveTabChange = {
  /** Panel whose active tab changed. */
  panelId: ViewPanelId;
  /** Tab that was active before the change, or null. */
  previousTabId: ViewTabId | null;
  /** Tab that is active after the change, or null. */
  tabId: ViewTabId | null;
};

/** Describes a tab relocating to a different panel or position. */
export type ViewTabMoveChange<TData = unknown> = {
  /** Identifier of the moved tab. */
  id: ViewTabId;
  /** Panel the tab left. */
  previousPanelId: ViewPanelId;
  /** Panel the tab moved into. */
  panelId: ViewPanelId;
  /** Index the tab occupied in its previous panel. */
  previousIndex: number;
  /** Index the tab occupies in its new panel. */
  index: number;
  /** Caller-supplied data carried by the tab. */
  data: TData;
  /** Whether the tab can be closed by the user. */
  closable: boolean;
  /** Whether the tab can be dragged. */
  draggable: boolean;
};

/** Payload for `onActiveTabChange`: one or more panels changed active tab. */
export type ViewActiveTabChangeEvent = {
  /** Transition that produced the change. */
  source: ViewLifecycleSource;
  /** Per-panel active-tab changes. */
  changes: ViewActiveTabChange[];
  /** Layout state before the transition. */
  previousState: ViewLayoutState;
  /** Layout state after the transition. */
  state: ViewLayoutState;
};

/** Payload for `onTabsMove`: tabs moved between panels or to new indexes. */
export type ViewTabsMoveEvent<TData = unknown> = {
  /** Transition that produced the move. */
  source: ViewLifecycleSource;
  /** The tabs that changed panel or position. */
  tabs: ViewTabMoveChange<TData>[];
  /** Layout state before the transition. */
  previousState: ViewLayoutState;
  /** Layout state after the transition. */
  state: ViewLayoutState;
};

/** Payload for `onPanelsOpen`: one or more panels were created. */
export type ViewPanelsOpenEvent<TData = unknown> = {
  /** Transition that created the panels. */
  source: ViewLifecycleSource;
  /** The panels that came into existence. */
  panels: ViewPanelLifecycleChange[];
  /** Tabs carried into the newly opened panels. */
  tabs: ViewTabLifecycleChange<TData>[];
  /** Layout state before the transition. */
  previousState: ViewLayoutState;
  /** Layout state after the transition. */
  state: ViewLayoutState;
};

/** Payload for `onPanelSplit`: a panel was divided into two. */
export type ViewPanelSplitEvent<TData = unknown> = {
  /** Whether the split came from an explicit split or a tab move. */
  source: 'PANEL_SPLIT' | 'TAB_MOVE';
  /** Panel that was split (and remains). */
  splitPanelId: ViewPanelId;
  /** Panel created alongside the split. */
  createdPanelId: ViewPanelId;
  /** Side of the split panel the new panel was placed on. */
  direction: ViewDirection;
  /** Size of the created panel as a percentage of the split region. */
  size: number;
  /** Snapshot of the split panel after the operation. */
  splitPanel: ViewPanelLifecycleChange;
  /** Snapshot of the newly created panel. */
  createdPanel: ViewPanelLifecycleChange;
  /** Tabs that landed in the created panel. */
  tabs: ViewTabLifecycleChange<TData>[];
  /** Layout state before the transition. */
  previousState: ViewLayoutState;
  /** Layout state after the transition. */
  state: ViewLayoutState;
};

/** Payload for `onTabsOpen`: one or more tabs were added. */
export type ViewTabsOpenEvent<TData = unknown> = {
  /** Transition that added the tabs. */
  source: ViewLifecycleSource;
  /** The tabs that were added. */
  tabs: ViewTabLifecycleChange<TData>[];
  /** Layout state before the transition. */
  previousState: ViewLayoutState;
  /** Layout state after the transition. */
  state: ViewLayoutState;
};

/** Payload for `onTabsClose`: one or more tabs were removed. */
export type ViewTabsCloseEvent<TData = unknown> = {
  /** Transition that removed the tabs. */
  source: ViewLifecycleSource;
  /** The tabs that were removed. */
  tabs: ViewTabLifecycleChange<TData>[];
  /** Panels that closed as a result of the removal, if any. */
  panels: ViewPanelLifecycleChange[];
  /** Layout state before the transition. */
  previousState: ViewLayoutState;
  /** Layout state after the transition. */
  state: ViewLayoutState;
};

/** Payload for `onPanelsClose`: one or more panels were removed. */
export type ViewPanelsCloseEvent<TData = unknown> = {
  /** Transition that removed the panels. */
  source: ViewLifecycleSource;
  /** The panels that were removed. */
  panels: ViewPanelLifecycleChange[];
  /** Tabs the removed panels contained, including any moved out. */
  tabs: ViewTabLifecycleChange<TData>[];
  /** Layout state before the transition. */
  previousState: ViewLayoutState;
  /** Layout state after the transition. */
  state: ViewLayoutState;
};

/**
 * Bundle of every lifecycle event that a single reducer action can fire; each
 * slot is non-null only when that kind of change actually occurred.
 */
export type ViewLifecycleEvents<TData = unknown> = {
  /** Active-tab change event, or null. */
  activeTabChange: ViewActiveTabChangeEvent | null;
  /** Tab move event, or null. */
  tabsMove: ViewTabsMoveEvent<TData> | null;
  /** Panels-open event, or null. */
  panelsOpen: ViewPanelsOpenEvent<TData> | null;
  /** Panel-split event, or null. */
  panelSplit: ViewPanelSplitEvent<TData> | null;
  /** Tabs-open event, or null. */
  tabsOpen: ViewTabsOpenEvent<TData> | null;
  /** Tabs-close event, or null. */
  tabsClose: ViewTabsCloseEvent<TData> | null;
  /** Panels-close event, or null. */
  panelsClose: ViewPanelsCloseEvent<TData> | null;
};

/**
 * Exhaustive classification of every reducer action: the lifecycle source it
 * reports, or null when it can never change panel/tab membership or the active
 * tab (sizes, bounds, focus, data, and in-place panel transitions that keep the
 * panel id). The explicit Record makes adding a new reducer action a compile
 * error here until it is classified, replacing the previous unchecked cast.
 */
const LIFECYCLE_SOURCE_BY_ACTION: Record<
  ViewReducerAction['type'],
  ViewLifecycleSource | null
> = {
  PANEL_SPLIT: 'PANEL_SPLIT',
  PANEL_REMOVE: 'PANEL_REMOVE',
  PANEL_MOVE: null,
  TAB_APPEND: 'TAB_APPEND',
  TAB_INSERT: 'TAB_INSERT',
  TAB_ID_CHANGE: 'TAB_ID_CHANGE',
  TAB_REMOVE: 'TAB_REMOVE',
  TAB_MOVE: 'TAB_MOVE',
  TAB_FLOAT: 'TAB_FLOAT',
  TAB_POPOUT: 'TAB_POPOUT',
  TAB_ACTIVE_SET: 'TAB_ACTIVE_SET',
  STATE_REPLACE: 'STATE_REPLACE',
  PANEL_FULLSCREEN_SET: null,
  PANEL_FLOAT: null,
  PANEL_POPOUT: null,
  PANEL_RETURN_TO_FLOATING: null,
  PANEL_DOCK: null,
  PANEL_FOCUS: null,
  PANEL_FLOATING_BOUNDS_SET: null,
  PANEL_POPOUT_WINDOW_BOUNDS_SET: null,
  PANEL_SWAP: null,
  EDGE_PANEL_SIZE_SET: null,
  TAB_DATA_SET: null,
  TAB_BEHAVIOR_SET: null,
  DIVIDER_RESIZE: null,
  DIVIDER_RESET: null,
  JUNCTION_RESIZE: null,
  CONTAINER_SIZE_NORMALIZE: null,
};

/**
 * Diffs the states surrounding a reducer action and returns the lifecycle
 * events that should fire for it. Actions classified with a null source never
 * change membership or the active tab, so they produce no events.
 */
export function makeLifecycleEvents<TData>(
  previousState: ViewLayoutState,
  state: ViewLayoutState,
  action: ViewReducerAction,
): ViewLifecycleEvents<TData> {
  const lifecycleSource = LIFECYCLE_SOURCE_BY_ACTION[action.type];
  // Actions classified as null never produce membership/active-tab diffs, so no
  // lifecycle events fire — return early rather than asserting a bogus source.
  if (lifecycleSource === null) {
    return {
      activeTabChange: null,
      tabsMove: null,
      panelsOpen: null,
      panelSplit: null,
      tabsOpen: null,
      tabsClose: null,
      panelsClose: null,
    };
  }
  const activeTabChanges = makeActiveTabChanges(previousState, state);
  const movedTabs = makeTabMoveChanges<TData>(previousState, state, action);
  const openedPanels = viewAllPanelOrderFromState(state)
    .filter((panelId) => !previousState.panels[panelId])
    .map((panelId) => makePanelLifecycleChange(state.panels[panelId]!));
  const openedPanelTabs = openedPanels.flatMap((panel) =>
    panel.tabIds.map((tabId) =>
      makeTabLifecycleChange<TData>(state.tabs[tabId]!),
    ),
  );
  const panelSplit = makePanelSplitEvent<TData>(previousState, state, action);
  const openedTabs =
    action.type === 'TAB_ID_CHANGE'
      ? []
      : Object.values(state.tabs)
          .filter((tab) => !previousState.tabs[tab.id])
          .map(makeTabLifecycleChange<TData>);
  const closedTabs =
    action.type === 'TAB_ID_CHANGE'
      ? []
      : Object.values(previousState.tabs)
          .filter((tab) => !state.tabs[tab.id])
          .map(makeTabLifecycleChange<TData>);
  const closedPanels = viewAllPanelOrderFromState(previousState)
    .filter((panelId) => !state.panels[panelId])
    .map((panelId) => makePanelLifecycleChange(previousState.panels[panelId]!));
  const panelTabs = closedPanels.flatMap((panel) =>
    panel.tabIds.map((tabId) =>
      makeTabLifecycleChange<TData>(previousState.tabs[tabId]!),
    ),
  );

  return {
    activeTabChange:
      activeTabChanges.length === 0
        ? null
        : {
            source: lifecycleSource,
            changes: activeTabChanges,
            previousState,
            state,
          },
    tabsMove:
      movedTabs.length === 0
        ? null
        : {
            source: lifecycleSource,
            tabs: movedTabs,
            previousState,
            state,
          },
    panelsOpen:
      openedPanels.length === 0
        ? null
        : {
            source: lifecycleSource,
            panels: openedPanels,
            tabs: openedPanelTabs,
            previousState,
            state,
          },
    panelSplit,
    tabsOpen:
      openedTabs.length === 0
        ? null
        : {
            source: lifecycleSource,
            tabs: openedTabs,
            previousState,
            state,
          },
    tabsClose:
      closedTabs.length === 0
        ? null
        : {
            source: lifecycleSource,
            tabs: closedTabs,
            panels: closedPanels,
            previousState,
            state,
          },
    panelsClose:
      closedPanels.length === 0
        ? null
        : {
            source: lifecycleSource,
            panels: closedPanels,
            tabs: panelTabs,
            previousState,
            state,
          },
  };
}

function makeActiveTabChanges(
  previousState: ViewLayoutState,
  state: ViewLayoutState,
): ViewActiveTabChange[] {
  const changes: ViewActiveTabChange[] = [];
  for (const panelId of viewAllPanelOrderFromState(state)) {
    const previousPanel = previousState.panels[panelId];
    const panel = state.panels[panelId];
    if (!previousPanel || !panel) continue;
    if (previousPanel.activeTabId === panel.activeTabId) continue;
    changes.push({
      panelId,
      previousTabId: previousPanel.activeTabId,
      tabId: panel.activeTabId,
    });
  }
  return changes;
}

function makeTabMoveChanges<TData>(
  previousState: ViewLayoutState,
  state: ViewLayoutState,
  action: ViewReducerAction,
): ViewTabMoveChange<TData>[] {
  const tabId =
    action.type === 'TAB_MOVE' ||
    action.type === 'TAB_FLOAT' ||
    action.type === 'TAB_POPOUT'
      ? action.tabId
      : null;
  if (!tabId) return [];
  const previousTab = previousState.tabs[tabId];
  const tab = state.tabs[tabId];
  if (!previousTab || !tab) return [];
  const previousPanel = previousState.panels[previousTab.panelId]!;
  const panel = state.panels[tab.panelId]!;
  const previousIndex = previousPanel.tabs.indexOf(tabId);
  const index = panel.tabs.indexOf(tabId);
  if (previousTab.panelId === tab.panelId && previousIndex === index) return [];
  return [
    {
      id: tab.id,
      previousPanelId: previousTab.panelId,
      panelId: tab.panelId,
      previousIndex,
      index,
      data: tab.data as TData,
      closable: tab.closable,
      draggable: tab.draggable,
    },
  ];
}

function makePanelSplitEvent<TData>(
  previousState: ViewLayoutState,
  state: ViewLayoutState,
  action: ViewReducerAction,
): ViewPanelSplitEvent<TData> | null {
  if (action.type === 'PANEL_SPLIT') {
    return makePanelSplitEventFromParts(
      previousState,
      state,
      'PANEL_SPLIT',
      action.panelId,
      action.newPanelId,
      action.direction,
      action.sizePercent,
    );
  }
  if (action.type === 'TAB_MOVE' && 'splitPanelId' in action.to) {
    return makePanelSplitEventFromParts(
      previousState,
      state,
      'TAB_MOVE',
      action.to.splitPanelId,
      action.to.newPanelId,
      action.to.direction,
      action.to.sizePercent,
    );
  }
  return null;
}

function makePanelSplitEventFromParts<TData>(
  previousState: ViewLayoutState,
  state: ViewLayoutState,
  source: ViewPanelSplitEvent['source'],
  splitPanelId: ViewPanelId,
  createdPanelId: ViewPanelId,
  direction: ViewDirection,
  size: number,
): ViewPanelSplitEvent<TData> | null {
  const splitPanel = state.panels[splitPanelId];
  const createdPanel = state.panels[createdPanelId];
  if (!previousState.panels[splitPanelId] || !splitPanel || !createdPanel) {
    return null;
  }
  return {
    source,
    splitPanelId,
    createdPanelId,
    direction,
    size,
    splitPanel: makePanelLifecycleChange(splitPanel),
    createdPanel: makePanelLifecycleChange(createdPanel),
    tabs: createdPanel.tabs.map((tabId) =>
      makeTabLifecycleChange<TData>(state.tabs[tabId]!),
    ),
    previousState,
    state,
  };
}

function makeTabLifecycleChange<TData>(
  tab: NonNullable<ViewLayoutState['tabs'][string]>,
): ViewTabLifecycleChange<TData> {
  return {
    id: tab.id,
    panelId: tab.panelId,
    data: tab.data as TData,
    closable: tab.closable,
    draggable: tab.draggable,
  };
}

function makePanelLifecycleChange(
  panel: NonNullable<ViewLayoutState['panels'][string]>,
): ViewPanelLifecycleChange {
  return {
    id: panel.id,
    tabIds: [...panel.tabs],
    activeTabId: panel.activeTabId,
  };
}

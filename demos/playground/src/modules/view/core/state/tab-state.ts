/**
 * Tab state helpers — constructing tab state objects and resolving active-tab
 * selection after a removal.
 */
import type { ViewPanelId, ViewTabId, ViewTabState } from "../types"
import type { ViewReducerTabAction } from "./actions"

/**
 * Constructs a `ViewTabState` from a reducer tab action descriptor,
 * defaulting `closable` and `draggable` to `true` when not specified.
 */
export function viewReducerTabActionToState(tab: ViewReducerTabAction, panelId: ViewPanelId): ViewTabState {
  return {
    id: tab.id,
    panelId,
    data: tab.data,
    closable: tab.closable ?? true,
    draggable: tab.draggable ?? true,
  }
}

/**
 * Determines the active tab ID after `removedTabId` is deleted from a panel.
 * Returns `activeTabId` unchanged when the removed tab was not active;
 * otherwise selects the tab at the same visual position in `nextTabs`
 * (clamped to the last tab), or `null` when the panel becomes empty.
 */
export function viewNextActiveTabAfterRemoval(
  currentTabs: ViewTabId[],
  removedTabId: ViewTabId,
  nextTabs: ViewTabId[],
  activeTabId: ViewTabId | null,
): ViewTabId | null {
  if (activeTabId !== removedTabId) return activeTabId
  return nextTabs[Math.min(nextTabs.length - 1, currentTabs.indexOf(removedTabId))] ?? null
}

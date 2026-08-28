/**
 * Panel-level state operations: split, remove, full-screen toggle, swap,
 * and the shared removal-with-fill helper used by tab operations.
 */
import type { ViewLayoutState, ViewLayoutTree, ViewPanelId, ViewPanelState, ViewTabId, ViewTabState } from "../types"
import type { ViewReducerAction } from "./actions"
import { viewEdgePanelOrderFromState } from "./edges"
import { viewCanSwapPanels, viewNormalizeLayoutBehavior, viewPanelBehaviorFromState } from "./layout-behavior"
import {
  VIEW_DEFAULT_MIN_SIZE,
  viewFindRemovalFillers,
  viewSplitFitsPanelConstraints,
  viewSplitInset,
} from "./layout-math"
import {
  viewDefaultRootSplitSize,
  viewFloatingPanelOrderFromState,
  viewPanelOrderFromLayout,
  viewPanelOrderFromState,
  viewRemovePanelFromLayout,
  viewSplitPanelInLayout,
  viewSplitRootInLayout,
  viewSwapPanelsInLayout,
  viewSyncLayoutPanels,
} from "./layout-tree"
import { VIEW_EPSILON, viewResolveSizePercent } from "./size"
import { viewReducerTabActionToState } from "./tab-state"

type SplitPanelAction = Extract<ViewReducerAction, { type: "PANEL_SPLIT" }>
type MovePanelAction = Extract<ViewReducerAction, { type: "PANEL_MOVE" }>
type MovePanelToSplitAction = MovePanelAction & {
  to: Extract<MovePanelAction["to"], { splitPanelId: ViewPanelId }>
}
type MovePanelToRootSplitAction = MovePanelAction & {
  to: Extract<MovePanelAction["to"], { splitRoot: true }>
}

/**
 * Splits an existing tiled panel in the given direction, inserting a new
 * sibling panel at `action.newPanelId` populated with `action.tabs`.
 * @returns The input state unchanged when the source panel is missing,
 *   non-tiled, full-screen, non-droppable, the split violates size
 *   constraints, or any of `action.tabs` reuses an existing tab id.
 */
export function viewSplitPanel(current: ViewLayoutState, action: SplitPanelAction): ViewLayoutState {
  const source = current.panels[action.panelId]
  if (!source) return current
  if (source.kind !== "tiled") return current
  if (source.fullScreen) return current
  if (!viewPanelBehaviorFromState(current, action.panelId).droppable) {
    return current
  }
  if (
    !viewSplitFitsPanelConstraints(
      source,
      action.direction,
      action.sizePercent,
      { minSize: action.minSize, maxSize: action.maxSize },
      undefined,
      action.sizeContext,
    )
  ) {
    return current
  }
  if (action.tabs.some((t) => current.tabs[t.id])) return current
  const { source: sourceInset, created: createdInset } = viewSplitInset(
    source.inset,
    action.direction,
    action.sizePercent,
  )
  const newTabs: Record<ViewTabId, ViewTabState> = { ...current.tabs }
  const tabIds: ViewTabId[] = []
  for (const t of action.tabs) {
    newTabs[t.id] = viewReducerTabActionToState(t, action.newPanelId)
    tabIds.push(t.id)
  }
  const newPanel: ViewPanelState = {
    id: action.newPanelId,
    kind: "tiled",
    inset: createdInset,
    tabs: tabIds,
    activeTabId: tabIds[0] ?? null,
    fullScreen: false,
    minSize: action.minSize,
    maxSize: action.maxSize,
  }
  const currentOrder = viewPanelOrderFromState(current)
  const sourceIdx = currentOrder.indexOf(action.panelId)
  const insertAt = sourceIdx >= 0 ? sourceIdx + 1 : currentOrder.length
  const nextOrder = [...currentOrder.slice(0, insertAt), action.newPanelId, ...currentOrder.slice(insertAt)]
  const nextState: ViewLayoutState = {
    panels: {
      ...current.panels,
      [action.panelId]: {
        ...source,
        inset: sourceInset,
        fullScreen: false,
      },
      [action.newPanelId]: newPanel,
    },
    panelOrder: nextOrder,
    tabs: newTabs,
    layout: current.layout,
  }
  if (current.layout) {
    const layout = viewSplitPanelInLayout(
      current.layout,
      action.panelId,
      action.newPanelId,
      action.direction,
      action.sizePercent,
      action,
    )
    if (layout) return viewSyncLayoutPanels({ ...nextState, layout }, layout)
    return { ...nextState, layout: null }
  }
  return nextState
}

/**
 * Removes the panel identified by `panelId` and redistributes its space to
 * neighbouring panels.
 * @returns The input state unchanged when the panel is missing or contains a
 *   non-closable tab.
 */
export function viewRemovePanel(current: ViewLayoutState, panelId: ViewPanelId): ViewLayoutState {
  const target = current.panels[panelId]
  if (!target) return current
  if (viewPanelHasNonClosableTab(current, target)) return current
  return viewRemovePanelAndFill(current, target)
}

/**
 * Moves an existing tiled panel to a new split or root position while preserving
 * the panel id and every tab it owns.
 */
export function viewMovePanel(current: ViewLayoutState, action: MovePanelAction): ViewLayoutState {
  const panel = current.panels[action.panelId]
  if (!panel) return current
  if (panel.kind !== "tiled") return current
  if (panel.fullScreen) return current
  if (!viewPanelBehaviorFromState(current, panel.id).draggable) {
    return current
  }
  if (!current.layout) return current

  if ("splitPanelId" in action.to) {
    return movePanelToSplit(current, action as MovePanelToSplitAction, panel)
  }

  return movePanelToRootSplit(current, action as MovePanelToRootSplitAction, panel)
}

/**
 * Sets or clears the full-screen flag for a panel, ensuring at most one
 * panel is full-screen at any time by clearing the flag on all others.
 * @returns The input state unchanged when the panel is missing or the flag
 *   is already at the requested value.
 */
export function viewSetPanelFullScreen(
  current: ViewLayoutState,
  panelId: ViewPanelId,
  fullScreen: boolean,
): ViewLayoutState {
  const panel = current.panels[panelId]
  if (!panel) return current
  if (!fullScreen) {
    if (!panel.fullScreen) return current
    return {
      ...current,
      panels: {
        ...current.panels,
        [panelId]: { ...panel, fullScreen: false },
      },
    }
  }
  const nextPanels: Record<ViewPanelId, ViewPanelState> = {}
  let changed = !panel.fullScreen
  for (const id of Object.keys(current.panels)) {
    const currentPanel = current.panels[id]!
    const next = id === panelId ? { ...currentPanel, fullScreen: true } : { ...currentPanel, fullScreen: false }
    if (next.fullScreen !== currentPanel.fullScreen) changed = true
    nextPanels[id] = next
  }
  if (!changed) return current
  return { ...current, panels: nextPanels }
}

/**
 * Exchanges the positions of two tiled panels by swapping their insets (or
 * their positions in the layout tree when a tree is present).
 * @returns The input state unchanged when either panel is missing,
 *   non-tiled, the same panel, or the swap is disallowed by behavior rules.
 */
export function viewSwapPanels(current: ViewLayoutState, panelA: ViewPanelId, panelB: ViewPanelId): ViewLayoutState {
  const a = current.panels[panelA]
  const b = current.panels[panelB]
  if (!a || !b) return current
  if (a.kind !== "tiled" || b.kind !== "tiled") return current
  if (a.id === b.id) return current
  if (!viewCanSwapPanels(current, a.id, b.id)) return current
  if (current.layout) {
    const layout = viewSwapPanelsInLayout(current.layout, panelA, panelB)
    return viewSyncLayoutPanels({ ...current, layout }, layout)
  }
  return {
    ...current,
    panels: {
      ...current.panels,
      [a.id]: { ...a, inset: b.inset },
      [b.id]: { ...b, inset: a.inset },
    },
  }
}

function movePanelToSplit(
  current: ViewLayoutState,
  action: MovePanelToSplitAction,
  panel: ViewPanelState,
): ViewLayoutState {
  const target = current.panels[action.to.splitPanelId]
  if (!target) return current
  if (target.kind !== "tiled") return current
  if (target.fullScreen) return current
  if (target.id === panel.id) return current
  if (!viewPanelBehaviorFromState(current, target.id).droppable) {
    return current
  }

  const minSize = action.to.minSize ?? panel.minSize
  const maxSize = action.to.maxSize ?? panel.maxSize
  if (
    !viewSplitFitsPanelConstraints(
      target,
      action.to.direction,
      action.to.sizePercent,
      { minSize, maxSize },
      undefined,
      action.to.sizeContext,
    )
  ) {
    return current
  }

  const withoutPanel = viewRemovePanelFromLayout(current.layout, panel.id)
  if (!withoutPanel || withoutPanel === current.layout) return current

  const layout = viewSplitPanelInLayout(
    withoutPanel,
    target.id,
    panel.id,
    action.to.direction,
    action.to.sizePercent,
    panelMoveBehavior(current, panel.id, action.to),
  )
  if (!layout) return current

  return viewSyncLayoutPanels(
    {
      ...current,
      panels: {
        ...current.panels,
        [panel.id]: {
          ...panel,
          fullScreen: false,
          minSize,
          maxSize,
        },
      },
      layout,
    },
    layout,
  )
}

function movePanelToRootSplit(
  current: ViewLayoutState,
  action: MovePanelToRootSplitAction,
  panel: ViewPanelState,
): ViewLayoutState {
  if (!viewPanelBehaviorFromState(current, panel.id).droppable) {
    return current
  }

  const withoutPanel = viewRemovePanelFromLayout(current.layout, panel.id)
  if (!withoutPanel || withoutPanel === current.layout) return current
  if (viewPanelOrderFromLayout(withoutPanel).length === 0) return current

  const minSize = action.to.minSize ?? panel.minSize
  const maxSize = action.to.maxSize ?? panel.maxSize
  if (!rootMoveFitsPanelConstraints(withoutPanel, action, minSize, maxSize)) {
    return current
  }
  const layout = viewSplitRootInLayout(
    withoutPanel,
    panel.id,
    action.to.direction,
    action.to.sizePercent,
    panelMoveBehavior(current, panel.id, action.to),
  )

  return viewSyncLayoutPanels(
    {
      ...current,
      panels: {
        ...current.panels,
        [panel.id]: {
          ...panel,
          fullScreen: false,
          minSize,
          maxSize,
        },
      },
      layout,
    },
    layout,
  )
}

function rootMoveFitsPanelConstraints(
  layout: ViewLayoutTree,
  action: MovePanelToRootSplitAction,
  minSize: ViewPanelState["minSize"],
  maxSize: ViewPanelState["maxSize"],
): boolean {
  const splitDirection = action.to.direction === "left" || action.to.direction === "right" ? "horizontal" : "vertical"
  const axisPixels = splitDirection === "horizontal" ? action.to.sizeContext?.width : action.to.sizeContext?.height
  const rawSize = action.to.sizePercent ?? viewDefaultRootSplitSize(layout, splitDirection)
  const sizePercent = Math.max(0, Math.min(100, rawSize))
  const minPercent =
    viewResolveSizePercent(minSize, axisPixels) ?? viewResolveSizePercent(VIEW_DEFAULT_MIN_SIZE, axisPixels) ?? 0
  const maxPercent = viewResolveSizePercent(maxSize, axisPixels) ?? Infinity
  return sizePercent >= minPercent - VIEW_EPSILON && sizePercent <= maxPercent + VIEW_EPSILON
}

function panelMoveBehavior(state: ViewLayoutState, panelId: ViewPanelId, target: MovePanelAction["to"]) {
  if (hasMoveBehavior(target)) return viewNormalizeLayoutBehavior(target)
  return viewPanelBehaviorFromState(state, panelId)
}

function hasMoveBehavior(target: MovePanelAction["to"]): boolean {
  return "locked" in target || "resizable" in target || "draggable" in target || "droppable" in target
}

/**
 * Removes `removed` from state and fills the vacated space. For edge and
 * floating panels the panel is simply deleted; for tiled panels the space is
 * redistributed to neighbouring panels (or the layout tree is updated when
 * present). All tabs belonging to the removed panel are also deleted.
 */
export function viewRemovePanelAndFill(state: ViewLayoutState, removed: ViewPanelState): ViewLayoutState {
  if (removed.kind === "edge") {
    const { [removed.id]: _drop, ...nextPanels } = state.panels
    const nextTabs = { ...state.tabs }
    for (const tid of removed.tabs) delete nextTabs[tid]
    return {
      ...state,
      panels: nextPanels,
      edgePanelOrder: viewEdgePanelOrderFromState(state).filter((id) => id !== removed.id),
      tabs: nextTabs,
    }
  }

  if (removed.kind === "floating") {
    const { [removed.id]: _drop, ...nextPanels } = state.panels
    const nextTabs = { ...state.tabs }
    for (const tid of removed.tabs) delete nextTabs[tid]
    return {
      ...state,
      panels: nextPanels,
      floatingPanelOrder: viewFloatingPanelOrderFromState(state).filter((id) => id !== removed.id),
      tabs: nextTabs,
    }
  }
  if (state.layout) {
    const { [removed.id]: _drop, ...nextPanels } = state.panels
    const nextTabs = { ...state.tabs }
    for (const tid of removed.tabs) delete nextTabs[tid]
    const layout = viewRemovePanelFromLayout(state.layout, removed.id) ?? null
    const currentOrder = viewPanelOrderFromState(state)
    return viewSyncLayoutPanels(
      {
        ...state,
        panels: nextPanels,
        panelOrder: currentOrder.filter((id) => id !== removed.id),
        tabs: nextTabs,
        layout,
      },
      layout,
    )
  }
  const currentOrder = viewPanelOrderFromState(state)
  const otherPanels = currentOrder
    .map((id) => state.panels[id])
    .filter((p: any): p is ViewPanelState => Boolean(p) && p.id !== removed.id)
  if (otherPanels.length === 0) {
    const { [removed.id]: _drop, ...restPanels } = state.panels
    const tabsToDrop = removed.tabs
    const nextTabs = { ...state.tabs }
    for (const tid of tabsToDrop) delete nextTabs[tid]
    return {
      ...state,
      panels: restPanels,
      panelOrder: currentOrder.filter((id) => id !== removed.id),
      tabs: nextTabs,
      layout: null,
    }
  }
  const fillers = viewFindRemovalFillers(otherPanels, removed)
  const nextPanels = { ...state.panels }
  delete nextPanels[removed.id]
  for (const f of fillers) {
    const p = nextPanels[f.id]
    /* v8 ignore next */
    if (!p) continue
    nextPanels[f.id] = { ...p, inset: f.inset }
  }
  const nextOrder = currentOrder.filter((id) => id !== removed.id)
  const nextTabs = { ...state.tabs }
  for (const tid of removed.tabs) delete nextTabs[tid]
  return {
    panels: nextPanels,
    panelOrder: nextOrder,
    tabs: nextTabs,
    layout: null,
  }
}

/**
 * Returns `true` when at least one tab in the panel has `closable: false`,
 * which prevents the panel from being removed.
 */
export function viewPanelHasNonClosableTab(state: ViewLayoutState, panel: ViewPanelState): boolean {
  return panel.tabs.some((tabId) => state.tabs[tabId]?.closable === false)
}

/** Re-export of the internal PANEL_SPLIT action shape for use in sibling modules. */
export type ViewPanelSplitAction = SplitPanelAction

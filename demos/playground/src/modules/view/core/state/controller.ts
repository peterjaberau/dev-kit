/**
 * Builds the imperative `ViewController` facade over a dispatch function
 * and a state getter, providing strongly-typed panel and tab handle objects.
 */
import type {
  ViewDockPanelTarget,
  ViewDirection,
  ViewFloatPanelOptions,
  ViewFloatTabOptions,
  ViewFloatingPanelBoundsInit,
  ViewLayoutBehaviorConfig,
  ViewLayoutState,
  ViewController,
  ViewMoveTarget,
  ViewOpenTabTarget,
  ViewPanel,
  ViewPanelId,
  ViewPanelMoveTarget,
  ViewPopoutPanelOptions,
  ViewPopoutTabOptions,
  ViewPopoutWindowBounds,
  ViewSizeResolutionContext,
  ViewTabBehaviorUpdate,
  ViewTab,
  ViewTabId,
  ViewTabInit,
} from "../types"
import { viewCreateInitialState, viewNextId, viewTabInitToReducerInit, type ViewReducerAction } from "./reducer"
import { viewAllPanelOrderFromState } from "./layout-tree"
import { viewCreateLayoutSnapshot } from "./snapshot"
import { viewNormalizeLayoutBehavior, viewPanelBehaviorFromState } from "./layout-behavior"

/** Function type for dispatching a reducer action. */
export type ViewDispatch = (action: ViewReducerAction) => void

/** Function type for reading the current layout state snapshot. */
export type ViewGetState = () => ViewLayoutState

/** Function type for reading the current container size resolution context. */
export type ViewGetSizeContext = () => ViewSizeResolutionContext | undefined

/** Optional host-level callbacks injected into the controller at construction time. */
export type ViewControllerOptions = {
  /**
   * Called before a panel is popped out; returning `false` cancels the
   * popout.
   */
  requestPopoutPanel?: (panelId: ViewPanelId, opts?: ViewPopoutPanelOptions) => boolean | void
  /** Called when a popped-out panel is returned to the floating layer. */
  onReturnPanelToFloating?: (panelId: ViewPanelId) => void
}

/**
 * Creates a `ViewController` that wires public API methods to reducer
 * dispatches, reading current state through `getState` and resolving size
 * constraints through the optional `getSizeContext`.
 */
export function makeViewController(
  getState: ViewGetState,
  dispatch: ViewDispatch,
  getSizeContext?: ViewGetSizeContext,
  options?: ViewControllerOptions,
): ViewController {
  const controller: ViewController = {
    getState,
    getPanel(id: ViewPanelId) {
      const state = getState()
      if (!state.panels[id]) return null
      return viewMakePanel(id, getState, dispatch, controller)
    },
    getTab(id: ViewTabId) {
      const state = getState()
      if (!state.tabs[id]) return null
      return viewMakeTab(id, getState, dispatch, controller)
    },
    getPanels() {
      const state = getState()
      return viewAllPanelOrderFromState(state)
        .map((id) => controller.getPanel(id))
        .filter((p): p is ViewPanel => Boolean(p))
    },
    getTabs() {
      const state = getState()
      return Object.keys(state.tabs)
        .map((id) => controller.getTab(id))
        .filter((t): t is ViewTab => Boolean(t))
    },
    movePanel(panelId, target) {
      dispatch({
        type: "PANEL_MOVE",
        panelId,
        to: normalizePanelMoveTarget(target, getSizeContext?.()),
      })
    },
    splitPanel(panelId, direction, opts) {
      const newPanelId = viewNextId("p")
      const tabs = (opts?.tabs ?? []).map(viewTabInitToReducerInit)
      const behavior = viewNormalizeLayoutBehavior(opts)
      dispatch({
        type: "PANEL_SPLIT",
        panelId,
        direction,
        sizePercent: opts?.size ?? 50,
        newPanelId,
        minSize: opts?.minSize,
        maxSize: opts?.maxSize,
        sizeContext: getSizeContext?.(),
        ...behavior,
        tabs,
        activate: opts?.activate ?? true,
      })
      return viewMakePanel(newPanelId, getState, dispatch, controller)
    },
    removePanel(panelId) {
      dispatch({ type: "PANEL_REMOVE", panelId })
    },
    maximizePanel(panelId) {
      dispatch({ type: "PANEL_FULLSCREEN_SET", panelId, fullScreen: true })
    },
    restorePanel(panelId) {
      dispatch({ type: "PANEL_FULLSCREEN_SET", panelId, fullScreen: false })
    },
    floatPanel(panelId, opts) {
      const behavior = layoutBehaviorConfigFromOptions(opts)
      const bounds = floatingBoundsFromOptions(opts)
      dispatch({
        type: "PANEL_FLOAT",
        panelId,
        ...(bounds ? { bounds } : {}),
        ...(behavior ? { behavior } : {}),
      })
    },
    popoutPanel(panelId, opts) {
      if (!getState().panels[panelId]) return
      if (options?.requestPopoutPanel?.(panelId, opts) === false) return
      dispatch({ type: "PANEL_POPOUT", panelId, opts })
    },
    returnPanelToFloating(panelId, bounds) {
      options?.onReturnPanelToFloating?.(panelId)
      dispatch({ type: "PANEL_RETURN_TO_FLOATING", panelId, bounds })
    },
    dockPanel(panelId, target) {
      dispatch({
        type: "PANEL_DOCK",
        panelId,
        target,
        sizeContext: getSizeContext?.(),
      })
    },
    focusPanel(panelId) {
      dispatch({ type: "PANEL_FOCUS", panelId })
    },
    setFloatingPanelBounds(panelId, bounds) {
      dispatch({ type: "PANEL_FLOATING_BOUNDS_SET", panelId, bounds })
    },
    setPopoutWindowBounds(panelId, bounds) {
      dispatch({ type: "PANEL_POPOUT_WINDOW_BOUNDS_SET", panelId, bounds })
    },
    appendTab(panelId, tab, opts) {
      const t = viewTabInitToReducerInit(tab)
      dispatch({
        type: "TAB_APPEND",
        panelId,
        tab: t,
        activate: opts?.activate ?? true,
      })
      return viewMakeTab(t.id, getState, dispatch, controller)
    },
    insertTab(panelId, tab, index, opts) {
      const t = viewTabInitToReducerInit(tab)
      dispatch({
        type: "TAB_INSERT",
        panelId,
        tab: t,
        index,
        activate: opts?.activate ?? true,
      })
      return viewMakeTab(t.id, getState, dispatch, controller)
    },
    openOrActivateTab(tab, target) {
      if (tab.id && getState().tabs[tab.id]) {
        dispatch({ type: "TAB_ACTIVE_SET", tabId: tab.id })
        return viewMakeTab(tab.id, getState, dispatch, controller)
      }
      const resolved = resolveOpenTabTarget(getState(), target)
      if (!resolved) return null
      const t = viewTabInitToReducerInit(tab)
      dispatch({
        type: "TAB_INSERT",
        panelId: resolved.panelId,
        tab: t,
        index: resolved.index,
        activate: true,
      })
      return viewMakeTab(t.id, getState, dispatch, controller)
    },
    changeTabId(oldTabId, newTabId) {
      const state = getState()
      const tab = state.tabs[oldTabId]
      if (oldTabId === newTabId) {
        return tab && state.panels[tab.panelId] ? viewMakeTab(oldTabId, getState, dispatch, controller) : null
      }
      if (!tab || !state.panels[tab.panelId] || state.tabs[newTabId]) {
        return null
      }
      dispatch({ type: "TAB_ID_CHANGE", oldTabId, newTabId })
      return viewMakeTab(newTabId, getState, dispatch, controller)
    },
    removeTab(tabId) {
      dispatch({ type: "TAB_REMOVE", tabId })
    },
    moveTab(tabId, target) {
      dispatch({
        type: "TAB_MOVE",
        tabId,
        to: normalizeMoveTarget(target, getSizeContext?.()),
      })
    },
    floatTab(tabId, opts) {
      const newPanelId = opts?.panelId ?? viewNextId("p")
      if (!canExtractTabToFloatingPanel(getState(), tabId, newPanelId)) {
        return null
      }
      const behavior = layoutBehaviorConfigFromOptions(opts)
      dispatch({
        type: "TAB_FLOAT",
        tabId,
        newPanelId,
        bounds: opts?.bounds,
        ...(behavior ? { behavior } : {}),
      })
      return viewMakePanel(newPanelId, getState, dispatch, controller)
    },
    popoutTab(tabId, opts) {
      const newPanelId = opts?.panelId ?? viewNextId("p")
      if (!canExtractTabToFloatingPanel(getState(), tabId, newPanelId)) {
        return null
      }
      const popoutOpts = tabPopoutOptionsToPanelOptions(opts)
      if (options?.requestPopoutPanel?.(newPanelId, popoutOpts) === false) {
        return null
      }
      dispatch({
        type: "TAB_POPOUT",
        tabId,
        newPanelId,
        opts: popoutOpts,
      })
      return viewMakePanel(newPanelId, getState, dispatch, controller)
    },
    setTabBehavior(tabId, behavior) {
      dispatch({ type: "TAB_BEHAVIOR_SET", tabId, behavior })
    },
    swapPanels(panelA, panelB) {
      dispatch({ type: "PANEL_SWAP", panelA, panelB })
    },
    setActiveTab(tabId) {
      dispatch({ type: "TAB_ACTIVE_SET", tabId })
    },
    getLayout() {
      return viewCreateLayoutSnapshot(getState())
    },
    setLayout(layout) {
      dispatch({
        type: "STATE_REPLACE",
        state: viewCreateInitialState(layout),
      })
    },
  }
  return controller
}

function resolveOpenTabTarget(
  state: ViewLayoutState,
  target: ViewOpenTabTarget,
): { panelId: ViewPanelId; index: number } | null {
  if ("beforeTab" in target || "afterTab" in target) {
    const refTabId = "beforeTab" in target ? target.beforeTab : target.afterTab
    const refTab = state.tabs[refTabId]
    if (!refTab) return null
    const panel = state.panels[refTab.panelId]
    if (!panel) return null
    const refIndex = panel.tabs.indexOf(refTabId)
    if (refIndex === -1) return null
    return {
      panelId: panel.id,
      index: "beforeTab" in target ? refIndex : refIndex + 1,
    }
  }

  const panel = state.panels[target.panel]
  if (!panel) return null
  return {
    panelId: panel.id,
    index: target.index ?? panel.tabs.length,
  }
}

function normalizeMoveTarget(target: ViewMoveTarget, sizeContext?: ViewSizeResolutionContext) {
  if ("beforeTab" in target) return { beforeTabId: target.beforeTab }
  if ("afterTab" in target) return { afterTabId: target.afterTab }
  if ("splitPanel" in target) {
    const behavior = viewNormalizeLayoutBehavior(target)
    return {
      splitPanelId: target.splitPanel,
      direction: target.direction,
      sizePercent: target.size ?? 50,
      newPanelId: viewNextId("p"),
      minSize: target.minSize,
      maxSize: target.maxSize,
      sizeContext,
      ...behavior,
    }
  }
  if ("splitRoot" in target) {
    const behavior = viewNormalizeLayoutBehavior(target)
    return {
      splitRoot: true as const,
      direction: target.direction,
      ...(target.size === undefined ? {} : { sizePercent: target.size }),
      newPanelId: viewNextId("p"),
      minSize: target.minSize,
      maxSize: target.maxSize,
      sizeContext,
      ...behavior,
    }
  }
  return {
    panelId: target.panel,
    index: target.index ?? Number.MAX_SAFE_INTEGER,
  }
}

function normalizePanelMoveTarget(target: ViewPanelMoveTarget, sizeContext?: ViewSizeResolutionContext) {
  const behavior = layoutBehaviorConfigFromOptions(target)
  if ("splitPanel" in target) {
    return {
      splitPanelId: target.splitPanel,
      direction: target.direction,
      sizePercent: target.size ?? 50,
      minSize: target.minSize,
      maxSize: target.maxSize,
      sizeContext,
      ...(behavior ? viewNormalizeLayoutBehavior(behavior) : {}),
    }
  }
  return {
    splitRoot: true as const,
    direction: target.direction,
    ...(target.size === undefined ? {} : { sizePercent: target.size }),
    minSize: target.minSize,
    maxSize: target.maxSize,
    sizeContext,
    ...(behavior ? viewNormalizeLayoutBehavior(behavior) : {}),
  }
}

/**
 * Constructs a live `ViewPanel` handle whose properties reflect the
 * current state on every read — they are not snapshots.
 */
export function viewMakePanel(
  id: ViewPanelId,
  getState: ViewGetState,
  dispatch: ViewDispatch,
  view: ViewController,
): ViewPanel {
  return {
    get id() {
      return id
    },
    get kind() {
      return getState().panels[id]?.kind ?? "tiled"
    },
    get inset() {
      return getState().panels[id]?.inset ?? { top: 0, right: 0, bottom: 0, left: 0 }
    },
    get edge() {
      const panel = getState().panels[id]
      return panel?.kind === "edge" ? panel.edge.side : undefined
    },
    get edgeSize() {
      const panel = getState().panels[id]
      return panel?.kind === "edge" ? panel.edge.size : undefined
    },
    get edgeDefaultSize() {
      const panel = getState().panels[id]
      return panel?.kind === "edge" ? panel.edge.defaultSize : undefined
    },
    get floating() {
      return getState().panels[id]?.kind === "floating"
    },
    get floatingBounds() {
      const panel = getState().panels[id]
      return panel?.kind === "floating" ? panel.floating.bounds : undefined
    },
    get floatingZIndex() {
      const panel = getState().panels[id]
      return panel?.kind === "floating" ? panel.floating.zIndex : undefined
    },
    get poppedOut() {
      const panel = getState().panels[id]
      return panel?.kind === "floating" && Boolean(panel.floating.popout)
    },
    get popoutWindowBounds() {
      const panel = getState().panels[id]
      return panel?.kind === "floating" ? panel.floating.popout?.windowBounds : undefined
    },
    get tabs() {
      const p = getState().panels[id]
      if (!p) return []
      return p.tabs.map((tid) => viewMakeTab(tid, getState, dispatch, view))
    },
    get activeTab() {
      const p = getState().panels[id]
      if (!p || !p.activeTabId) return null
      return viewMakeTab(p.activeTabId, getState, dispatch, view)
    },
    get fullScreen() {
      return getState().panels[id]?.fullScreen ?? false
    },
    get minSize() {
      return getState().panels[id]?.minSize
    },
    get maxSize() {
      return getState().panels[id]?.maxSize
    },
    appendTab(tab: ViewTabInit, opts) {
      return view.appendTab(id, tab, opts)
    },
    insertTab(tab: ViewTabInit, index: number, opts) {
      return view.insertTab(id, tab, index, opts)
    },
    moveTo(target: ViewPanelMoveTarget) {
      view.movePanel(id, target)
    },
    split(direction: ViewDirection, opts) {
      return view.splitPanel(id, direction, opts)
    },
    remove() {
      view.removePanel(id)
    },
    maximize() {
      view.maximizePanel(id)
    },
    restore() {
      view.restorePanel(id)
    },
    float(opts?: ViewFloatPanelOptions) {
      view.floatPanel(id, opts)
    },
    popout(opts?: ViewPopoutPanelOptions) {
      view.popoutPanel(id, opts)
    },
    returnToFloating(bounds?: ViewFloatingPanelBoundsInit) {
      view.returnPanelToFloating(id, bounds)
    },
    dock(target?: ViewDockPanelTarget) {
      view.dockPanel(id, target)
    },
    focus() {
      view.focusPanel(id)
    },
    setFloatingBounds(bounds: ViewFloatingPanelBoundsInit) {
      view.setFloatingPanelBounds(id, bounds)
    },
    setPopoutWindowBounds(bounds: ViewPopoutWindowBounds) {
      view.setPopoutWindowBounds(id, bounds)
    },
    setActiveTab(tabId: ViewTabId) {
      view.setActiveTab(tabId)
    },
  }
}

/**
 * Constructs a live `ViewTab` handle whose properties reflect the current
 * state on every read — they are not snapshots.
 */
export function viewMakeTab<TData = unknown>(
  id: ViewTabId,
  getState: ViewGetState,
  dispatch: ViewDispatch,
  view: ViewController,
): ViewTab<TData> {
  return {
    get id() {
      return id
    },
    get panel(): ViewPanel {
      const state = getState()
      const tab = state.tabs[id]
      if (!tab) {
        throw new Error(`Tab ${id} no longer exists`)
      }
      return viewMakePanel(tab.panelId, getState, dispatch, view)
    },
    get index() {
      const state = getState()
      const tab = state.tabs[id]
      if (!tab) return -1
      return state.panels[tab.panelId]?.tabs.indexOf(id) ?? -1
    },
    get data() {
      const tab = getState().tabs[id]
      return (tab ? tab.data : undefined) as TData
    },
    get closable() {
      return getState().tabs[id]?.closable ?? true
    },
    get draggable() {
      return getState().tabs[id]?.draggable ?? true
    },
    setData(data) {
      dispatch({ type: "TAB_DATA_SET", tabId: id, data })
    },
    setBehavior(behavior: ViewTabBehaviorUpdate) {
      view.setTabBehavior(id, behavior)
    },
    moveTo(target) {
      view.moveTab(id, target)
    },
    float(opts?: ViewFloatTabOptions) {
      return view.floatTab(id, opts)
    },
    popout(opts?: ViewPopoutTabOptions) {
      return view.popoutTab(id, opts)
    },
    activate() {
      view.setActiveTab(id)
    },
    remove() {
      view.removeTab(id)
    },
  }
}

function canExtractTabToFloatingPanel(state: ViewLayoutState, tabId: ViewTabId, newPanelId: ViewPanelId): boolean {
  const tab = state.tabs[tabId]
  if (!tab?.draggable) return false
  if (state.panels[newPanelId]) return false
  const panel = state.panels[tab.panelId]
  if (!panel) return false
  return viewPanelBehaviorFromState(state, panel.id).draggable
}

function layoutBehaviorConfigFromOptions(
  opts: ViewLayoutBehaviorConfig | undefined,
): ViewLayoutBehaviorConfig | undefined {
  if (!opts) return undefined
  if (opts.locked === true) return { locked: true }
  const behavior: {
    resizable?: boolean
    draggable?: boolean
    droppable?: boolean
  } = {}
  if (opts.resizable !== undefined) behavior.resizable = opts.resizable
  if (opts.draggable !== undefined) behavior.draggable = opts.draggable
  if (opts.droppable !== undefined) behavior.droppable = opts.droppable
  return Object.keys(behavior).length > 0 ? behavior : undefined
}

function floatingBoundsFromOptions(
  opts: ViewFloatingPanelBoundsInit | undefined,
): ViewFloatingPanelBoundsInit | undefined {
  if (!opts) return undefined
  const bounds: ViewFloatingPanelBoundsInit = {}
  if (opts.x !== undefined) bounds.x = opts.x
  if (opts.y !== undefined) bounds.y = opts.y
  if (opts.width !== undefined) bounds.width = opts.width
  if (opts.height !== undefined) bounds.height = opts.height
  return Object.keys(bounds).length > 0 ? bounds : undefined
}

function tabPopoutOptionsToPanelOptions(opts: ViewPopoutTabOptions | undefined): ViewPopoutPanelOptions | undefined {
  if (!opts) return undefined
  const behavior = layoutBehaviorConfigFromOptions(opts)
  const panelOpts: ViewPopoutPanelOptions = { ...behavior }
  if (opts.floatingBounds) panelOpts.floatingBounds = opts.floatingBounds
  if (opts.windowBounds) panelOpts.windowBounds = opts.windowBounds
  return Object.keys(panelOpts).length > 0 ? panelOpts : undefined
}

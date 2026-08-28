/**
 * Floating/popout panel geometry and state transitions.
 */
import type {
  ViewDockPanelTarget,
  ViewFloatingPanelBounds,
  ViewFloatingPanelBoundsInit,
  ViewFloatingResizeEdge,
  ViewLayoutBehavior,
  ViewLayoutBehaviorConfig,
  ViewLayoutState,
  ViewLayoutTree,
  ViewPanelId,
  ViewPanelState,
  ViewPopoutPanelConfig,
  ViewPopoutPanelOptions,
  ViewPopoutPanelPlacement,
  ViewPopoutWindowBounds,
  ViewPopoutWindowBoundsInit,
  ViewSizeResolutionContext,
  ViewTabId,
} from "../types"
import { viewEdgePanelOrderFromState } from "./edges"
import { viewFindRemovalFillers, viewSplitFitsPanelConstraints, viewSplitInset } from "./layout-math"
import {
  viewFloatingPanelOrderFromState,
  viewPanelOrderFromState,
  viewRemovePanelFromLayout,
  viewSplitPanelInLayout,
  viewSyncLayoutPanels,
} from "./layout-tree"
import {
  viewLockedLayoutBehavior,
  viewNormalizeLayoutBehavior,
  viewPanelBehaviorFromState,
} from "./layout-behavior"
import { viewRemovePanelAndFill } from "./panels"

/**
 * Converts a tiled, edge, or already-floating panel to a floating panel,
 * removing it from the tiled layout or edge order and bringing it to the
 * front. Returns `state` unchanged when the panel does not exist.
 */
export function viewFloatPanel(
  state: ViewLayoutState,
  panelId: ViewPanelId,
  boundsInit?: ViewFloatingPanelBoundsInit,
  behaviorConfig?: ViewLayoutBehaviorConfig,
): ViewLayoutState {
  const panel = state.panels[panelId]
  if (!panel) return state
  if (panel.kind === "floating") {
    const bounds = boundsInit ? viewNormalizeFloatingBounds(boundsInit, panel.floating.bounds) : panel.floating.bounds
    const behavior = viewMergeFloatingBehavior(panel.behavior, behaviorConfig)
    const changed =
      !viewFloatingBoundsEqual(bounds, panel.floating.bounds) ||
      Boolean(panel.floating.popout) ||
      !viewLayoutBehaviorEqual(panel.behavior, behavior)
    const next = changed
      ? {
          ...state,
          panels: {
            ...state.panels,
            [panelId]: {
              ...panel,
              inset: viewFloatingBoundsToInset(bounds),
              floating: {
                bounds,
                zIndex: panel.floating.zIndex,
              },
              behavior,
            },
          },
        }
      : state
    return viewFocusFloatingPanel(next, panelId)
  }

  const bounds = viewNormalizeFloatingBounds(boundsInit, viewDefaultFloatingBounds(panel))
  const floatingPanel: ViewPanelState = {
    id: panel.id,
    kind: "floating",
    inset: viewFloatingBoundsToInset(bounds),
    tabs: panel.tabs,
    activeTabId: panel.activeTabId,
    fullScreen: false,
    minSize: panel.minSize,
    maxSize: panel.maxSize,
    behavior: viewMergeFloatingBehavior(viewPanelBehaviorFromState(state, panelId), behaviorConfig),
    floating: {
      bounds,
      zIndex: viewNextFloatingZIndex(state),
    },
  }
  let nextPanels: Record<ViewPanelId, ViewPanelState> = {
    ...state.panels,
    [panelId]: floatingPanel,
  }
  const floatingPanelOrder = [...viewFloatingPanelOrderFromState(state).filter((id) => id !== panelId), panelId]

  if (panel.kind === "edge") {
    return viewFocusFloatingPanel(
      {
        ...state,
        panels: nextPanels,
        edgePanelOrder: viewEdgePanelOrderFromState(state).filter((id) => id !== panelId),
        floatingPanelOrder,
      },
      panelId,
    )
  }

  if (state.layout) {
    const layout = viewRemovePanelFromLayout(state.layout, panelId) ?? null
    return viewFocusFloatingPanel(
      viewSyncLayoutPanels(
        {
          ...state,
          panels: nextPanels,
          panelOrder: viewPanelOrderFromState(state).filter((id) => id !== panelId),
          floatingPanelOrder,
          layout,
        },
        layout,
      ),
      panelId,
    )
  }

  const currentOrder = viewPanelOrderFromState(state)
  const otherPanels = currentOrder
    .map((id) => state.panels[id])
    .filter((item: any): item is ViewPanelState => Boolean(item) && item.kind === "tiled" && item.id !== panelId)
  /* v8 ignore next 8 -- filler ids are derived from existing tiled panels. */
  for (const filler of viewFindRemovalFillers(otherPanels, panel)) {
    const current = nextPanels[filler.id]
    if (!current) continue
    nextPanels = {
      ...nextPanels,
      [filler.id]: { ...current, inset: filler.inset },
    }
  }

  return viewFocusFloatingPanel(
    {
      ...state,
      panels: nextPanels,
      panelOrder: currentOrder.filter((id) => id !== panelId),
      floatingPanelOrder,
      layout: null,
    },
    panelId,
  )
}

/**
 * Floats a panel and marks it for rendering in a detached popout window,
 * applying optional window and floating-panel bounds from `opts`.
 * Returns the floated state unchanged if the panel is not found or not
 * floating after the float step.
 */
export function viewPopoutPanel(
  state: ViewLayoutState,
  panelId: ViewPanelId,
  opts?: ViewPopoutPanelOptions,
): ViewLayoutState {
  const floated = viewFloatPanel(state, panelId, opts?.floatingBounds, opts)
  const panel = floated.panels[panelId]
  if (!panel || panel.kind !== "floating") return floated
  const popout = viewNormalizePopoutPanelPlacement(opts?.windowBounds ? { windowBounds: opts.windowBounds } : true)
  return viewFocusFloatingPanel(
    {
      ...floated,
      panels: {
        ...floated.panels,
        [panelId]: {
          ...panel,
          floating: {
            ...panel.floating,
            popout,
          },
        },
      },
    },
    panelId,
  )
}

/**
 * Clears the popout flag on a floating panel, optionally repositioning it
 * with new bounds. Returns `state` unchanged when the panel is not floating,
 * has no popout, and no new bounds are supplied.
 */
export function viewReturnPanelToFloating(
  state: ViewLayoutState,
  panelId: ViewPanelId,
  boundsInit?: ViewFloatingPanelBoundsInit,
): ViewLayoutState {
  const panel = state.panels[panelId]
  if (!panel || panel.kind !== "floating") return state
  if (!panel.floating.popout && !boundsInit) return state
  const bounds = boundsInit ? viewNormalizeFloatingBounds(boundsInit, panel.floating.bounds) : panel.floating.bounds
  return viewFocusFloatingPanel(
    {
      ...state,
      panels: {
        ...state.panels,
        [panelId]: {
          ...panel,
          inset: viewFloatingBoundsToInset(bounds),
          floating: {
            bounds,
            zIndex: panel.floating.zIndex,
          },
        },
      },
    },
    panelId,
  )
}

/**
 * Moves a single tab out of its source panel into a new floating panel,
 * removing the source panel if it becomes empty. Returns `state` unchanged
 * when the tab is not draggable, `newPanelId` already exists, or the source
 * panel is not draggable.
 */
export function viewFloatTab(
  state: ViewLayoutState,
  tabId: ViewTabId,
  newPanelId: ViewPanelId,
  boundsInit?: ViewFloatingPanelBoundsInit,
  behaviorConfig?: ViewLayoutBehaviorConfig,
): ViewLayoutState {
  const tab = state.tabs[tabId]
  if (!tab) return state
  if (!tab.draggable) return state
  if (state.panels[newPanelId]) return state
  const sourcePanel = state.panels[tab.panelId]
  if (!sourcePanel) return state
  if (!viewPanelBehaviorFromState(state, sourcePanel.id).draggable) {
    return state
  }

  const bounds = viewNormalizeFloatingBounds(
    boundsInit,
    sourcePanel.kind === "floating" ? sourcePanel.floating.bounds : viewDefaultFloatingBounds(sourcePanel),
  )
  const newPanel: ViewPanelState = {
    id: newPanelId,
    kind: "floating",
    inset: viewFloatingBoundsToInset(bounds),
    tabs: [tabId],
    activeTabId: tabId,
    fullScreen: false,
    behavior: viewNormalizeLayoutBehavior(behaviorConfig),
    floating: {
      bounds,
      zIndex: viewNextFloatingZIndex(state),
    },
  }
  const sourceTabs = sourcePanel.tabs.filter((id) => id !== tabId)
  const wasActiveInSource = sourcePanel.activeTabId === tabId
  let next: ViewLayoutState = {
    ...state,
    panels: {
      ...state.panels,
      [newPanelId]: newPanel,
    },
    tabs: {
      ...state.tabs,
      [tabId]: {
        ...tab,
        panelId: newPanelId,
      },
    },
    floatingPanelOrder: [...viewFloatingPanelOrderFromState(state).filter((id) => id !== newPanelId), newPanelId],
  }

  if (sourceTabs.length === 0) {
    next = viewRemovePanelAndFill(next, {
      ...sourcePanel,
      tabs: [],
      activeTabId: null,
    })
  } else {
    next = {
      ...next,
      panels: {
        ...next.panels,
        [sourcePanel.id]: {
          ...sourcePanel,
          tabs: sourceTabs,
          activeTabId: wasActiveInSource
            ? (sourceTabs[Math.min(sourceTabs.length - 1, sourcePanel.tabs.indexOf(tabId))] ?? null)
            : sourcePanel.activeTabId,
        },
      },
    }
  }

  return viewFocusFloatingPanel(next, newPanelId)
}

/**
 * Floats a tab into a new panel and immediately marks that panel for popout,
 * combining `viewFloatTab` with popout placement in one step. Returns
 * `state` unchanged if the float step produces no change.
 */
export function viewPopoutTab(
  state: ViewLayoutState,
  tabId: ViewTabId,
  newPanelId: ViewPanelId,
  opts?: ViewPopoutPanelOptions,
): ViewLayoutState {
  const floated = viewFloatTab(state, tabId, newPanelId, opts?.floatingBounds, opts)
  if (floated === state) return state
  const panel = floated.panels[newPanelId]
  /* v8 ignore next -- floatTab just created this floating panel. */
  if (!panel || panel.kind !== "floating") return floated
  const popout = viewNormalizePopoutPanelPlacement({
    windowBounds: opts?.windowBounds,
  })
  return viewFocusFloatingPanel(
    {
      ...floated,
      panels: {
        ...floated.panels,
        [newPanelId]: {
          ...panel,
          floating: {
            ...panel.floating,
            popout,
          },
        },
      },
    },
    newPanelId,
  )
}

/**
 * Inserts a floating panel into the tiled layout by splitting a target panel,
 * or places it as the sole tiled panel when no tiled panels exist yet. Returns
 * `state` unchanged when the panel is not floating, not draggable, the target
 * is full-screen, or the split violates size constraints.
 */
export function viewDockPanel(
  state: ViewLayoutState,
  panelId: ViewPanelId,
  target: ViewDockPanelTarget | undefined,
  sizeContext?: ViewSizeResolutionContext,
): ViewLayoutState {
  const panel = state.panels[panelId]
  if (!panel || panel.kind !== "floating") return state
  if (!panel.behavior.draggable) return state

  const floatingPanelOrder = viewFloatingPanelOrderFromState(state).filter((id) => id !== panelId)
  const behavior = targetHasLayoutBehavior(target) ? viewNormalizeLayoutBehavior(target) : panel.behavior
  const minSize = target?.minSize ?? panel.minSize
  const maxSize = target?.maxSize ?? panel.maxSize

  const dockedPanel: ViewPanelState = {
    id: panel.id,
    kind: "tiled",
    inset: panel.inset,
    tabs: panel.tabs,
    activeTabId: panel.activeTabId,
    fullScreen: false,
    minSize,
    maxSize,
  }

  const tiledOrder = viewPanelOrderFromState(state)
  if (tiledOrder.length === 0) {
    const layout: ViewLayoutTree = {
      kind: "panel",
      panelId,
      ...behavior,
    }
    return viewSyncLayoutPanels(
      {
        ...state,
        panels: { ...state.panels, [panelId]: dockedPanel },
        panelOrder: [panelId],
        floatingPanelOrder,
        layout,
      },
      layout,
    )
  }

  const splitPanelId = target?.splitPanel ?? tiledOrder[0]!
  const targetSource = state.panels[splitPanelId]
  if (!targetSource || targetSource.kind !== "tiled") return state
  if (targetSource.fullScreen) return state
  if (!viewPanelBehaviorFromState(state, splitPanelId).droppable) {
    return state
  }
  const direction = target?.direction ?? "right"
  const sizePercent = target?.size ?? viewDefaultDockSize(panel.floating.bounds)
  if (
    !viewSplitFitsPanelConstraints(targetSource, direction, sizePercent, { minSize, maxSize }, undefined, sizeContext)
  ) {
    return state
  }

  const { source: sourceInset, created: createdInset } = viewSplitInset(targetSource.inset, direction, sizePercent)
  const nextPanels: Record<ViewPanelId, ViewPanelState> = {
    ...state.panels,
    [targetSource.id]: {
      ...targetSource,
      inset: sourceInset,
      fullScreen: false,
    },
    [panelId]: {
      ...dockedPanel,
      inset: createdInset,
    },
  }
  const targetIdx = tiledOrder.indexOf(splitPanelId)
  const nextOrder = [...tiledOrder.slice(0, targetIdx + 1), panelId, ...tiledOrder.slice(targetIdx + 1)]
  const layout = state.layout
    ? viewSplitPanelInLayout(state.layout, splitPanelId, panelId, direction, sizePercent, behavior)
    : null
  if (layout) {
    return viewSyncLayoutPanels(
      {
        ...state,
        panels: nextPanels,
        panelOrder: nextOrder,
        floatingPanelOrder,
        layout,
      },
      layout,
    )
  }
  return {
    ...state,
    panels: nextPanels,
    panelOrder: nextOrder,
    floatingPanelOrder,
    layout: null,
  }
}

/**
 * Brings a floating panel to the front by moving it to the end of
 * `floatingPanelOrder` and reassigning z-indexes. Returns `state` unchanged
 * when the panel does not exist or is not floating.
 */
export function viewFocusFloatingPanel(state: ViewLayoutState, panelId: ViewPanelId): ViewLayoutState {
  const panel = state.panels[panelId]
  if (!panel || panel.kind !== "floating") return state
  const order = [...viewFloatingPanelOrderFromState(state).filter((id) => id !== panelId), panelId]
  return syncFloatingZIndexes(state, order)
}

/**
 * Updates the position and size of a floating panel. Returns `state`
 * unchanged when the panel is not floating or the normalized bounds are
 * identical to the current bounds.
 */
export function viewSetFloatingPanelBounds(
  state: ViewLayoutState,
  panelId: ViewPanelId,
  boundsInit: ViewFloatingPanelBoundsInit,
): ViewLayoutState {
  const panel = state.panels[panelId]
  if (!panel || panel.kind !== "floating") return state
  const bounds = viewNormalizeFloatingBounds(boundsInit, panel.floating.bounds)
  if (viewFloatingBoundsEqual(panel.floating.bounds, bounds)) return state
  return {
    ...state,
    panels: {
      ...state.panels,
      [panelId]: {
        ...panel,
        inset: viewFloatingBoundsToInset(bounds),
        floating: { ...panel.floating, bounds },
      },
    },
  }
}

/**
 * Updates the OS-level window dimensions for a panel's popout window. Returns
 * `state` unchanged when the panel has no active popout or the bounds are
 * identical after normalization.
 */
export function viewSetPopoutWindowBounds(
  state: ViewLayoutState,
  panelId: ViewPanelId,
  boundsInit: ViewPopoutWindowBounds,
): ViewLayoutState {
  const panel = state.panels[panelId]
  if (!panel || panel.kind !== "floating" || !panel.floating.popout) {
    return state
  }
  const windowBounds = viewNormalizePopoutWindowBounds(boundsInit, panel.floating.popout.windowBounds)
  if (viewPopoutWindowBoundsEqual(panel.floating.popout.windowBounds, windowBounds)) {
    return state
  }
  return {
    ...state,
    panels: {
      ...state.panels,
      [panelId]: {
        ...panel,
        floating: {
          ...panel.floating,
          popout: { windowBounds },
        },
      },
    },
  }
}

/**
 * Derives sensible default floating bounds from a panel's current inset,
 * falling back to a centered ~46×48% rectangle when the panel occupies
 * nearly the full viewport.
 */
export function viewDefaultFloatingBounds(panel: ViewPanelState): ViewFloatingPanelBounds {
  const width = 100 - panel.inset.left - panel.inset.right
  const height = 100 - panel.inset.top - panel.inset.bottom
  const fallback =
    width > 85 && height > 85
      ? { x: 18, y: 12, width: 46, height: 48 }
      : {
          x: panel.inset.left,
          y: panel.inset.top,
          width,
          height,
        }
  return viewNormalizeFloatingBounds(undefined, fallback)
}

/**
 * Clamps and rounds floating-panel bounds so that `x`/`y` keep the panel on
 * screen, `width`/`height` stay between 12 % and 100 %, and coordinates are
 * rounded to four decimal places. Missing fields are filled from `fallback`.
 */
export function viewNormalizeFloatingBounds(
  value: ViewFloatingPanelBoundsInit | undefined,
  fallback: ViewFloatingPanelBounds,
): ViewFloatingPanelBounds {
  const width = clampFinite(value?.width ?? fallback.width, 12, 100)
  const height = clampFinite(value?.height ?? fallback.height, 12, 100)
  const x = clampFinite(value?.x ?? fallback.x, 0, 100 - width)
  const y = clampFinite(value?.y ?? fallback.y, 0, 100 - height)
  return {
    x: roundFloatingCoord(x),
    y: roundFloatingCoord(y),
    width: roundFloatingCoord(width),
    height: roundFloatingCoord(height),
  }
}

/**
 * Fallback OS window geometry used when no explicit bounds are provided to
 * a popout operation (720 × 520 px, offset 80 px from the top-left corner).
 */
export const VIEW_DEFAULT_POPOUT_WINDOW_BOUNDS: ViewPopoutWindowBounds = {
  left: 80,
  top: 80,
  width: 720,
  height: 520,
}

/**
 * Converts a `ViewPopoutPanelConfig` (boolean shorthand or object with
 * optional `windowBounds`) into a normalized `ViewPopoutPanelPlacement`,
 * or `undefined` when `value` is falsy.
 */
export function viewNormalizePopoutPanelPlacement(
  value: ViewPopoutPanelConfig | undefined,
): ViewPopoutPanelPlacement | undefined {
  if (!value) return undefined
  const init = value === true ? undefined : value.windowBounds
  return {
    windowBounds: viewNormalizePopoutWindowBounds(init, VIEW_DEFAULT_POPOUT_WINDOW_BOUNDS),
  }
}

/**
 * Clamps and rounds OS window bounds: `width`/`height` must be at least
 * 240 × 160 px; `left`/`top` are clamped to ±10 000 px and rounded to
 * integers. Missing fields are filled from `fallback`.
 */
export function viewNormalizePopoutWindowBounds(
  value: ViewPopoutWindowBoundsInit | undefined,
  fallback: ViewPopoutWindowBounds,
): ViewPopoutWindowBounds {
  const width = clampFinite(value?.width ?? fallback.width, 240, 10000)
  const height = clampFinite(value?.height ?? fallback.height, 160, 10000)
  return {
    left: Math.round(clampFinite(value?.left ?? fallback.left, -10000, 10000)),
    top: Math.round(clampFinite(value?.top ?? fallback.top, -10000, 10000)),
    width: Math.round(width),
    height: Math.round(height),
  }
}

/**
 * Builds the `window.open` features string for a popout window from the
 * given bounds (e.g. `"popup=yes,left=80,top=80,width=720,height=520"`).
 */
export function viewPopoutWindowFeatureString(bounds: ViewPopoutWindowBounds): string {
  return [
    "popup=yes",
    `left=${bounds.left}`,
    `top=${bounds.top}`,
    `width=${bounds.width}`,
    `height=${bounds.height}`,
  ].join(",")
}

/**
 * Converts percentage-based floating bounds (`x`, `y`, `width`, `height`) to
 * the four-sided inset representation used by panel state.
 */
export function viewFloatingBoundsToInset(bounds: ViewFloatingPanelBounds) {
  return {
    top: bounds.y,
    right: 100 - bounds.x - bounds.width,
    bottom: 100 - bounds.y - bounds.height,
    left: bounds.x,
  }
}

/**
 * Returns `true` when two floating-panel bounds have identical `x`, `y`,
 * `width`, and `height` values.
 */
export function viewFloatingBoundsEqual(a: ViewFloatingPanelBounds, b: ViewFloatingPanelBounds): boolean {
  return a.x === b.x && a.y === b.y && a.width === b.width && a.height === b.height
}

/**
 * Returns `true` when two popout window bounds have identical `left`, `top`,
 * `width`, and `height` values.
 */
export function viewPopoutWindowBoundsEqual(a: ViewPopoutWindowBounds, b: ViewPopoutWindowBounds): boolean {
  return a.left === b.left && a.top === b.top && a.width === b.width && a.height === b.height
}

/**
 * Produces a floating panel's behavior by overlaying explicit `config`
 * overrides onto `base`. When `config.locked` is `true`, all interaction
 * flags are set to `false` regardless of `base`.
 */
export function viewMergeFloatingBehavior(
  base: ViewLayoutBehavior,
  config: ViewLayoutBehaviorConfig | undefined,
): ViewLayoutBehavior {
  if (config?.locked === true) {
    return viewLockedLayoutBehavior()
  }
  return {
    resizable: config?.resizable ?? base.resizable,
    draggable: config?.draggable ?? base.draggable,
    droppable: config?.droppable ?? base.droppable,
  }
}

/**
 * Applies a pointer delta (`dx`, `dy`) to the specified resize edge(s) of
 * floating-panel bounds, adjusting the origin and dimensions accordingly.
 * Does not clamp — call `viewNormalizeFloatingBounds` afterwards if needed.
 */
export function viewResizeFloatingBounds(
  bounds: ViewFloatingPanelBounds,
  edge: ViewFloatingResizeEdge,
  dx: number,
  dy: number,
): ViewFloatingPanelBounds {
  const next = { ...bounds }
  if (edge.includes("left")) {
    next.x = bounds.x + dx
    next.width = bounds.width - dx
  }
  if (edge.includes("right")) {
    next.width = bounds.width + dx
  }
  if (edge.includes("top")) {
    next.y = bounds.y + dy
    next.height = bounds.height - dy
  }
  if (edge.includes("bottom")) {
    next.height = bounds.height + dy
  }
  return next
}

/**
 * Returns `true` when two layout behavior objects have identical `resizable`,
 * `draggable`, and `droppable` flags.
 */
export function viewLayoutBehaviorEqual(a: ViewLayoutBehavior, b: ViewLayoutBehavior): boolean {
  return a.resizable === b.resizable && a.draggable === b.draggable && a.droppable === b.droppable
}

/**
 * Computes a default split size (20–50 %) to use when docking a floating
 * panel, derived from the panel's current floating width.
 */
export function viewDefaultDockSize(bounds: ViewFloatingPanelBounds): number {
  return Math.max(20, Math.min(50, bounds.width))
}

/**
 * Returns the z-index that a newly created or focused floating panel should
 * receive, one above the current topmost floating panel.
 */
export function viewNextFloatingZIndex(state: ViewLayoutState): number {
  return viewFloatingZIndex(viewFloatingPanelOrderFromState(state).length)
}

/**
 * Maps a zero-based floating-panel stack index to a CSS z-index value,
 * starting at 20 so floating panels sit above tiled content.
 */
export function viewFloatingZIndex(index: number): number {
  return 20 + index
}

function syncFloatingZIndexes(state: ViewLayoutState, order: ViewPanelId[]): ViewLayoutState {
  let panels = state.panels
  /* v8 ignore next -- normalized floating states carry an explicit order. */
  let changed = !arrayEqual(state.floatingPanelOrder ?? [], order)
  order.forEach((panelId, index) => {
    const panel = panels[panelId]
    /* v8 ignore next -- order is produced from existing floating panels. */
    if (!panel || panel.kind !== "floating") return
    const zIndex = viewFloatingZIndex(index)
    if (panel.floating.zIndex === zIndex) return
    if (panels === state.panels) panels = { ...state.panels }
    panels[panelId] = {
      ...panel,
      floating: { ...panel.floating, zIndex },
    }
    changed = true
  })
  return changed ? { ...state, panels, floatingPanelOrder: order } : state
}

function targetHasLayoutBehavior(target: ViewDockPanelTarget | undefined): boolean {
  return Boolean(
    target && ("locked" in target || "resizable" in target || "draggable" in target || "droppable" in target),
  )
}

function clampFinite(value: number, min: number, max: number): number {
  const finite = Number.isFinite(value) ? value : min
  return Math.max(min, Math.min(max, finite))
}

function roundFloatingCoord(value: number): number {
  return Number(value.toFixed(4))
}

function arrayEqual<T>(a: T[], b: T[]): boolean {
  return a.length === b.length && a.every((value, index) => value === b[index])
}

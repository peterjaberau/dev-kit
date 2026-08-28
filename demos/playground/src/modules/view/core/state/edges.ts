/**
 * Pinned edge-panel ordering, sizing, and clamping.
 */
import type {
  ViewEdge,
  ViewEdgePanelState,
  ViewLayoutState,
  ViewPanelId,
  ViewPanelState,
  ViewSize,
  ViewSizeResolutionContext,
} from "../types"
import {
  viewApproxEqual,
  viewAxisPixels,
  viewResolveMaxSizePercent,
  viewResolveMinSizePercent,
  viewResolveSizePercent,
} from "./size"

const EDGE_ORDER: ViewEdge[] = ["left", "right", "top", "bottom"]
const DEFAULT_MIN_SIZE = 10

/**
 * Returns a stable ordered list of edge-panel IDs from `state`, filtering
 * stale entries from `edgePanelOrder` and appending any edge panels not yet
 * tracked, sorted by canonical side order (left → right → top → bottom).
 */
export function viewEdgePanelOrderFromState(state: ViewLayoutState): ViewPanelId[] {
  const ordered = (state.edgePanelOrder ?? []).filter((id) => state.panels[id]?.kind === "edge")
  const seen = new Set(ordered)
  const missing = Object.values(state.panels)
    .filter((panel): panel is ViewEdgePanelState => {
      return (
        panel.kind === "edge" &&
        !seen.has(panel.id) &&
        !ordered.some((id) => {
          const orderedPanel = state.panels[id]
          return orderedPanel?.kind === "edge" && orderedPanel.edge.side === panel.edge.side
        })
      )
    })
    .sort((a, b) => EDGE_ORDER.indexOf(a.edge.side) - EDGE_ORDER.indexOf(b.edge.side))
    .map((panel) => panel.id)
  return [...ordered, ...missing]
}

/**
 * Returns a map from each occupied edge side to the first panel ID assigned
 * to that side according to the canonical edge order.
 */
export function viewEdgePanelIdBySide(state: ViewLayoutState): Partial<Record<ViewEdge, ViewPanelId>> {
  const bySide: Partial<Record<ViewEdge, ViewPanelId>> = {}
  for (const panelId of viewEdgePanelOrderFromState(state)) {
    const panel = state.panels[panelId]
    /* v8 ignore next -- the order helper yields only edge panels. */
    if (panel?.kind !== "edge") continue
    /* v8 ignore next -- public layouts hold at most one edge panel per side. */
    if (bySide[panel.edge.side]) continue
    bySide[panel.edge.side] = panel.id
  }
  return bySide
}

/**
 * Computes the current clamped percentage size for each edge side, returning
 * `0` for any side that has no active edge panel.
 */
export function viewEdgePanelSizes(state: ViewLayoutState): Record<ViewEdge, number> {
  const sizes: Record<ViewEdge, number> = {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  }
  for (const panelId of viewEdgePanelOrderFromState(state)) {
    const panel = state.panels[panelId]
    /* v8 ignore next -- the order helper yields only edge panels. */
    if (panel?.kind !== "edge") continue
    sizes[panel.edge.side] = clampPercent(panel.edge.size)
  }
  return sizes
}

/**
 * Resizes an edge panel to `size` after clamping it against the panel's
 * min/max constraints and the space needed by the opposite edge panel.
 * Returns `state` unchanged when the panel is not edge-kind, is not
 * resizable, or the clamped size equals the current size.
 */
export function viewSetEdgePanelSize(
  state: ViewLayoutState,
  panelId: ViewPanelId,
  size: number,
  minSize: ViewSize = DEFAULT_MIN_SIZE,
  sizeContext?: ViewSizeResolutionContext,
): ViewLayoutState {
  const panel = state.panels[panelId]
  if (!panel || panel.kind !== "edge") return state
  if (!panel.behavior.resizable) return state
  const nextSize = viewClampEdgePanelSize(state, panelId, size, minSize, sizeContext)
  if (viewApproxEqual(nextSize, panel.edge.size)) return state
  return {
    ...state,
    panels: {
      ...state.panels,
      [panelId]: {
        ...panel,
        inset: edgeInset(panel.edge.side, nextSize),
        edge: { ...panel.edge, size: nextSize },
      },
    },
  }
}

/**
 * Clamps `targetSize` to the valid range for an edge panel: at least
 * `minSize`, at most the panel's `maxSize` and the available space after
 * reserving room for the opposite edge and the center minimum. Returns the
 * panel's current size unchanged when `min > max`.
 */
export function viewClampEdgePanelSize(
  state: ViewLayoutState,
  panelId: ViewPanelId,
  targetSize: number,
  minSize: ViewSize = DEFAULT_MIN_SIZE,
  sizeContext?: ViewSizeResolutionContext,
): number {
  const panel = state.panels[panelId]
  if (!panel || panel.kind !== "edge") return clampPercent(targetSize)
  const side = panel.edge.side
  const horizontal = side === "left" || side === "right"
  const axisPixels = viewAxisPixels(sizeContext, horizontal ? "horizontal" : "vertical")
  const min = panelMinSize(panel, minSize, axisPixels)
  const max = panelMaxSize(panel, axisPixels)
  const opposite = state.panels[oppositeEdgePanelId(state, side) ?? ""]
  const oppositeSize = opposite?.kind === "edge" ? opposite.edge.size : 0
  const centerMin = viewResolveSizePercent(minSize, axisPixels) ?? DEFAULT_MIN_SIZE
  const availableMax = Math.max(0, 100 - oppositeSize - centerMin)
  const upper = Math.min(max, availableMax)
  if (min > upper) return panel.edge.size
  return Math.max(min, Math.min(upper, clampPercent(targetSize)))
}

/**
 * Ensures `state.edgePanelOrder` matches the canonical order derived from
 * `viewEdgePanelOrderFromState`. Returns `state` unchanged when the order
 * is already consistent.
 */
export function viewNormalizeEdgePanelOrders(state: ViewLayoutState): ViewLayoutState {
  const edgePanelOrder = viewEdgePanelOrderFromState(state)
  if (arraysEqual(state.edgePanelOrder ?? [], edgePanelOrder)) return state
  return { ...state, edgePanelOrder }
}

/**
 * Returns the default percentage size for a newly created edge panel:
 * 28 % for top/bottom and 24 % for left/right.
 */
export function viewDefaultEdgePanelSize(side: ViewEdge): number {
  return side === "top" || side === "bottom" ? 28 : 24
}

/**
 * Computes the four-sided inset for an edge panel given its side and
 * percentage size, placing the occupying edge at zero and pushing the
 * opposite side inward by `100 - size`.
 */
export function viewEdgeInset(
  side: ViewEdge,
  size: number,
): {
  top: number
  right: number
  bottom: number
  left: number
} {
  return edgeInset(side, size)
}

function oppositeEdgePanelId(state: ViewLayoutState, side: ViewEdge): ViewPanelId | undefined {
  const bySide = viewEdgePanelIdBySide(state)
  if (side === "left") return bySide.right
  if (side === "right") return bySide.left
  if (side === "top") return bySide.bottom
  return bySide.top
}

function panelMinSize(panel: ViewPanelState, fallback: ViewSize, axisPixels: number | undefined): number {
  return viewResolveMinSizePercent(panel.minSize, fallback, axisPixels, DEFAULT_MIN_SIZE)
}

function panelMaxSize(panel: ViewPanelState, axisPixels: number | undefined): number {
  return viewResolveMaxSizePercent(panel.maxSize, axisPixels, 100)
}

function edgeInset(side: ViewEdge, size: number) {
  const clamped = clampPercent(size)
  if (side === "left") {
    return { top: 0, right: 100 - clamped, bottom: 0, left: 0 }
  }
  if (side === "right") {
    return { top: 0, right: 0, bottom: 0, left: 100 - clamped }
  }
  if (side === "top") {
    return { top: 0, right: 0, bottom: 100 - clamped, left: 0 }
  }
  return { top: 100 - clamped, right: 0, bottom: 0, left: 0 }
}

function clampPercent(value: number): number {
  return Number.isFinite(value) ? Math.max(0, Math.min(100, value)) : 0
}

function arraysEqual<T>(left: T[], right: T[]): boolean {
  if (left.length !== right.length) return false
  return left.every((item, index) => item === right[index])
}

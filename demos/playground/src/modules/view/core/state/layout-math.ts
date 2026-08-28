/**
 * Geometry: derive dividers/junctions, constraint ranges, and clamping.
 * Converts flat inset-based panel maps into interactive resize primitives and
 * applies divider/junction moves back to state.
 */
import type {
  ViewDirection,
  ViewDivider,
  ViewDividerOrientation,
  ViewInset,
  ViewJunction,
  ViewLayoutState,
  ViewPanelId,
  ViewPanelState,
  ViewSize,
  ViewSizeResolutionContext,
} from "../types"
import {
  viewAllPanelOrderFromState,
  viewClampToConstraintRange,
  viewGetLayoutDividerConstraintRange,
  viewDeriveLayoutDividers,
  viewResizeLayoutDivider,
  viewResetLayoutDivider,
  viewSyncLayoutPanels,
} from "./layout-tree"
import {
  viewApproxEqual as eq,
  viewAxisPixels,
  viewResolveMaxSizePercent,
  viewResolveMinSizePercent,
  viewResolveSizePercent,
  VIEW_EPSILON as EPSILON,
} from "./size"

/** Fallback minimum panel size (percentage) used when no explicit `minSize` is configured. */
export const VIEW_DEFAULT_MIN_SIZE = 10

/**
 * Allowable pixel range for a derived divider together with its current
 * position, used to clamp pointer moves before committing a resize.
 */
export type ViewDividerConstraintRange = {
  current: number
  min: number
  max: number
}

/** Absolute left edge of a panel in 0–100 percentage space. */
export function viewPanelLeft(p: ViewPanelState): number {
  return p.inset.left
}
/** Absolute right edge of a panel in 0–100 percentage space. */
export function viewPanelRight(p: ViewPanelState): number {
  return 100 - p.inset.right
}
/** Absolute top edge of a panel in 0–100 percentage space. */
export function viewPanelTop(p: ViewPanelState): number {
  return p.inset.top
}
/** Absolute bottom edge of a panel in 0–100 percentage space. */
export function viewPanelBottom(p: ViewPanelState): number {
  return 100 - p.inset.bottom
}
/** Panel width as a percentage of the container. */
export function viewPanelWidth(p: ViewPanelState): number {
  return 100 - p.inset.left - p.inset.right
}
/** Panel height as a percentage of the container. */
export function viewPanelHeight(p: ViewPanelState): number {
  return 100 - p.inset.top - p.inset.bottom
}

/** DOMRect-compatible shape used by geometry helpers that accept any rect-like value. */
export type ViewRectLike = {
  left: number
  top: number
  right: number
  bottom: number
  width: number
  height: number
}

/**
 * Convert a client pointer coordinate to a 0–100 percentage offset from the
 * specified edge of `rect`. Shared by divider, junction, and edge-resize
 * handlers so the pixel-to-percent conversion lives in one place.
 */
export function viewRectEdgePercent(
  rect: ViewRectLike,
  clientX: number,
  clientY: number,
  side: "left" | "right" | "top" | "bottom",
): number {
  const length = side === "left" || side === "right" ? rect.width : rect.height
  // Guard against a momentarily-collapsed (0px) container to avoid NaN/Infinity.
  if (length <= 0) return 0
  switch (side) {
    case "left":
      return ((clientX - rect.left) / rect.width) * 100
    case "right":
      return ((rect.right - clientX) / rect.width) * 100
    case "top":
      return ((clientY - rect.top) / rect.height) * 100
    case "bottom":
      return ((rect.bottom - clientY) / rect.height) * 100
  }
}

/**
 * Return the ID of the panel that is currently full-screen, or `null` when no
 * panel is full-screen.
 */
export function viewGetFullScreenPanelId(state: ViewLayoutState): ViewPanelId | null {
  return viewAllPanelOrderFromState(state).find((id) => Boolean(state.panels[id]?.fullScreen)) ?? null
}

/**
 * Divide a panel's inset into two adjacent insets along `direction`, where
 * `sizePercent` (0–100) determines the share given to the newly created panel.
 */
export function viewSplitInset(
  inset: ViewInset,
  direction: ViewDirection,
  sizePercent: number,
): { source: ViewInset; created: ViewInset } {
  const width = 100 - inset.left - inset.right
  const height = 100 - inset.top - inset.bottom
  const sizeClamped = Math.max(0, Math.min(100, sizePercent))

  if (direction === "left" || direction === "right") {
    const newWidth = (width * sizeClamped) / 100
    if (direction === "right") {
      return {
        source: { ...inset, right: inset.right + newWidth },
        created: { ...inset, left: inset.left + (width - newWidth) },
      }
    }
    return {
      source: { ...inset, left: inset.left + newWidth },
      created: { ...inset, right: inset.right + (width - newWidth) },
    }
  }
  const newHeight = (height * sizeClamped) / 100
  if (direction === "bottom") {
    return {
      source: { ...inset, bottom: inset.bottom + newHeight },
      created: { ...inset, top: inset.top + (height - newHeight) },
    }
  }
  return {
    source: { ...inset, top: inset.top + newHeight },
    created: { ...inset, bottom: inset.bottom + (height - newHeight) },
  }
}

/**
 * Derive all resizable dividers from the current layout state. For tree-based
 * layouts the dividers come directly from the tree; for flat inset layouts they
 * are inferred from shared panel edges. Returns an empty array when a panel is
 * full-screen.
 */
export function viewDeriveDividers(state: ViewLayoutState): ViewDivider[] {
  if (viewGetFullScreenPanelId(state)) return []
  if (state.layout) return viewDeriveLayoutDividers(state.layout)

  const panels = state.panelOrder
    .map((id) => state.panels[id])
    .filter((p: any): p is ViewPanelState => Boolean(p) && p.kind === "tiled")
  const dividers: ViewDivider[] = []

  const xMap = new Map<string, number>()
  for (const p of panels) {
    const l = viewPanelLeft(p)
    const r = viewPanelRight(p)
    xMap.set(roundCoord(l), l)
    xMap.set(roundCoord(r), r)
  }
  for (const xKey of xMap.keys()) {
    const x = xMap.get(xKey)!
    if (x <= EPSILON || x >= 100 - EPSILON) continue
    const lefts = panels.filter((p) => eq(viewPanelRight(p), x))
    const rights = panels.filter((p) => eq(viewPanelLeft(p), x))
    if (lefts.length === 0 || rights.length === 0) continue
    const segments = computeAdjacentSegments(lefts, rights, "vertical")
    for (const seg of segments) {
      const beforeKey = [...seg.before].sort().join(",")
      const afterKey = [...seg.after].sort().join(",")
      dividers.push({
        id: `v|${beforeKey}|${afterKey}`,
        orientation: "vertical",
        position: x,
        start: seg.start,
        end: seg.end,
        beforePanels: seg.before,
        afterPanels: seg.after,
      })
    }
  }

  const yMap = new Map<string, number>()
  for (const p of panels) {
    const t = viewPanelTop(p)
    const b = viewPanelBottom(p)
    yMap.set(roundCoord(t), t)
    yMap.set(roundCoord(b), b)
  }
  for (const yKey of yMap.keys()) {
    const y = yMap.get(yKey)!
    if (y <= EPSILON || y >= 100 - EPSILON) continue
    const tops = panels.filter((p) => eq(viewPanelBottom(p), y))
    const bottoms = panels.filter((p) => eq(viewPanelTop(p), y))
    if (tops.length === 0 || bottoms.length === 0) continue
    const segments = computeAdjacentSegments(tops, bottoms, "horizontal")
    for (const seg of segments) {
      const beforeKey = [...seg.before].sort().join(",")
      const afterKey = [...seg.after].sort().join(",")
      dividers.push({
        id: `h|${beforeKey}|${afterKey}`,
        orientation: "horizontal",
        position: y,
        start: seg.start,
        end: seg.end,
        beforePanels: seg.before,
        afterPanels: seg.after,
      })
    }
  }
  return dividers
}

/**
 * Derive T-junction handles from the current divider set. Each junction is a
 * point where one divider's endpoint touches the interior of a perpendicular
 * divider. Returns an empty array when a panel is full-screen.
 */
export function viewDeriveJunctions(state: ViewLayoutState): ViewJunction[] {
  if (viewGetFullScreenPanelId(state)) return []
  return deriveTJunctions(viewDeriveDividers(state))
}

/**
 * Apply a junction drag by clamping and committing moves to the vertical and
 * horizontal dividers that meet at the junction simultaneously.
 */
export function viewApplyJunctionResize(
  state: ViewLayoutState,
  junction: ViewJunction,
  position: { x: number; y: number },
  minSize: ViewSize = VIEW_DEFAULT_MIN_SIZE,
  sizeContext?: ViewSizeResolutionContext,
): ViewLayoutState {
  if (junction.disabled) return state
  const dividers = viewDeriveDividers(state)
  const vertical = dividers.find((d) => d.id === junction.verticalDividerId)
  const horizontal = dividers.find((d) => d.id === junction.horizontalDividerId)
  if (!vertical || !horizontal) return state
  if (vertical.disabled || horizontal.disabled) return state

  const x = viewClampDividerPosition(state, vertical, position.x, minSize, sizeContext)
  const y = viewClampDividerPosition(state, horizontal, position.y, minSize, sizeContext)
  return viewApplyDividerResize(viewApplyDividerResize(state, vertical, x), horizontal, y)
}

type JunctionCandidate = {
  x: number
  y: number
  vertical: ViewDivider
  horizontal: ViewDivider
}

function deriveTJunctions(dividers: ViewDivider[]): ViewJunction[] {
  const candidatesByPoint = new Map<string, JunctionCandidate[]>()
  const verticals = dividers.filter((d) => d.orientation === "vertical")
  const horizontals = dividers.filter((d) => d.orientation === "horizontal")

  for (const vertical of verticals) {
    for (const horizontal of horizontals) {
      const verticalInterior =
        horizontal.position > vertical.start + EPSILON && horizontal.position < vertical.end - EPSILON
      const horizontalInterior =
        vertical.position > horizontal.start + EPSILON && vertical.position < horizontal.end - EPSILON
      const verticalEndpoint = eq(horizontal.position, vertical.start) || eq(horizontal.position, vertical.end)
      const horizontalEndpoint = eq(vertical.position, horizontal.start) || eq(vertical.position, horizontal.end)
      const isT = (verticalInterior && horizontalEndpoint) || (horizontalInterior && verticalEndpoint)
      if (!isT) continue
      const key = `${roundCoord(vertical.position)}|${roundCoord(horizontal.position)}`
      const candidates = candidatesByPoint.get(key) ?? []
      candidates.push({
        x: vertical.position,
        y: horizontal.position,
        vertical,
        horizontal,
      })
      candidatesByPoint.set(key, candidates)
    }
  }

  // Multiple candidates at one point are cross junctions, which need a
  // different resolver from the T-junction behavior supported here.
  return [...candidatesByPoint.values()]
    .filter((candidates) => candidates.length === 1)
    .map((candidates) => {
      const candidate = candidates[0]!
      return {
        id: `j|${candidate.vertical.id}|${candidate.horizontal.id}`,
        kind: "t" as const,
        x: candidate.x,
        y: candidate.y,
        verticalDividerId: candidate.vertical.id,
        horizontalDividerId: candidate.horizontal.id,
        disabled: candidate.vertical.disabled || candidate.horizontal.disabled || undefined,
      }
    })
}

function roundCoord(n: number): string {
  return n.toFixed(3)
}

type Segment = {
  start: number
  end: number
  before: ViewPanelId[]
  after: ViewPanelId[]
}

type Range = { start: number; end: number }

function unionRanges(ranges: Range[]): Range[] {
  const sorted = ranges.filter((r) => r.end - r.start > EPSILON).sort((a, b) => a.start - b.start)
  const out: Range[] = []
  for (const r of sorted) {
    const last = out[out.length - 1]
    if (last && r.start <= last.end + EPSILON) {
      last.end = Math.max(last.end, r.end)
    } else {
      out.push({ start: r.start, end: r.end })
    }
  }
  return out
}

function intersectRanges(a: Range[], b: Range[]): Range[] {
  const out: Range[] = []
  for (const ra of a) {
    for (const rb of b) {
      const s = Math.max(ra.start, rb.start)
      const e = Math.min(ra.end, rb.end)
      if (e - s > EPSILON) out.push({ start: s, end: e })
    }
  }
  return out
}

function computeAdjacentSegments(
  beforeSide: ViewPanelState[],
  afterSide: ViewPanelState[],
  orientation: ViewDividerOrientation,
): Segment[] {
  const orth = (p: ViewPanelState): Range =>
    orientation === "vertical"
      ? { start: viewPanelTop(p), end: viewPanelBottom(p) }
      : { start: viewPanelLeft(p), end: viewPanelRight(p) }

  const beforeUnion = unionRanges(beforeSide.map(orth))
  const afterUnion = unionRanges(afterSide.map(orth))
  const intersection = intersectRanges(beforeUnion, afterUnion)

  return intersection.map(({ start, end }) => {
    const overlaps = (p: ViewPanelState) => {
      const o = orth(p)
      return o.start < end - EPSILON && o.end > start + EPSILON
    }
    return {
      start,
      end,
      before: beforeSide.filter(overlaps).map((p) => p.id),
      after: afterSide.filter(overlaps).map((p) => p.id),
    }
  })
}

type SizeConstraints = {
  minSize?: ViewSize
  maxSize?: ViewSize
}

function panelMinSize(panel: ViewPanelState, fallback: ViewSize, axisPixels: number | undefined): number {
  return viewResolveMinSizePercent(panel.minSize, fallback, axisPixels)
}

function panelMaxSize(panel: ViewPanelState, axisPixels: number | undefined): number {
  return viewResolveMaxSizePercent(panel.maxSize, axisPixels)
}

function sizeFits(
  size: number,
  constraints: SizeConstraints,
  fallbackMinSize: ViewSize,
  axisPixels: number | undefined,
): boolean {
  const min =
    viewResolveSizePercent(constraints.minSize, axisPixels) ??
    viewResolveSizePercent(fallbackMinSize, axisPixels) ??
    0
  const max = viewResolveSizePercent(constraints.maxSize, axisPixels) ?? Infinity
  return size >= min - EPSILON && size <= max + EPSILON
}

/**
 * Clamp a desired divider position to the range allowed by min/max sizes of
 * all panels on both sides. Returns the current position when the divider is
 * disabled or no range can be computed.
 */
export function viewClampDividerPosition(
  state: ViewLayoutState,
  divider: ViewDivider,
  targetPosition: number,
  minSize: ViewSize = VIEW_DEFAULT_MIN_SIZE,
  sizeContext?: ViewSizeResolutionContext,
): number {
  if (divider.disabled) return divider.position
  const range = viewGetDividerConstraintRange(state, divider, minSize, sizeContext)
  if (!range) return divider.position
  return viewClampToConstraintRange(range, targetPosition)
}

/**
 * Compute the full constraint range for a divider given the panels on both
 * sides and the global min size. For tree-based layouts the range is delegated
 * to the layout-tree helper; for flat layouts it is derived from panel insets.
 *
 * @returns The range, or `null` for a disabled divider with a zero-width range.
 */
export function viewGetDividerConstraintRange(
  state: ViewLayoutState,
  divider: ViewDivider,
  minSize: ViewSize = VIEW_DEFAULT_MIN_SIZE,
  sizeContext?: ViewSizeResolutionContext,
): ViewDividerConstraintRange | null {
  if (divider.disabled) {
    return {
      current: divider.position,
      min: divider.position,
      max: divider.position,
    }
  }
  if (divider.splitId && state.layout) {
    return viewGetLayoutDividerConstraintRange(state.layout, divider.splitId, minSize, state.panels, sizeContext)
  }
  let min = 0
  let max = 100
  const axisPixels = viewAxisPixels(sizeContext, divider.orientation === "vertical" ? "horizontal" : "vertical")
  if (divider.orientation === "vertical") {
    for (const id of divider.beforePanels) {
      const p = state.panels[id]
      if (!p) continue
      min = Math.max(min, p.inset.left + panelMinSize(p, minSize, axisPixels))
      max = Math.min(max, p.inset.left + panelMaxSize(p, axisPixels))
    }
    for (const id of divider.afterPanels) {
      const p = state.panels[id]
      if (!p) continue
      min = Math.max(min, 100 - p.inset.right - panelMaxSize(p, axisPixels))
      max = Math.min(max, 100 - p.inset.right - panelMinSize(p, minSize, axisPixels))
    }
  } else {
    for (const id of divider.beforePanels) {
      const p = state.panels[id]
      if (!p) continue
      min = Math.max(min, p.inset.top + panelMinSize(p, minSize, axisPixels))
      max = Math.min(max, p.inset.top + panelMaxSize(p, axisPixels))
    }
    for (const id of divider.afterPanels) {
      const p = state.panels[id]
      if (!p) continue
      min = Math.max(min, 100 - p.inset.bottom - panelMaxSize(p, axisPixels))
      max = Math.min(max, 100 - p.inset.bottom - panelMinSize(p, minSize, axisPixels))
    }
  }
  return { current: divider.position, min, max }
}

/**
 * Check whether splitting `inset` in `direction` at `sizePercent` would leave
 * both resulting panels at or above the global minimum size.
 */
export function viewSplitFitsMin(
  inset: ViewInset,
  direction: ViewDirection,
  sizePercent: number,
  minSize: ViewSize = VIEW_DEFAULT_MIN_SIZE,
  sizeContext?: ViewSizeResolutionContext,
): boolean {
  const { source, created } = viewSplitInset(inset, direction, sizePercent)
  const minWidth = viewResolveSizePercent(minSize, sizeContext?.width) ?? 0
  const minHeight = viewResolveSizePercent(minSize, sizeContext?.height) ?? 0
  const fits = (i: ViewInset) =>
    100 - i.left - i.right >= minWidth - EPSILON && 100 - i.top - i.bottom >= minHeight - EPSILON
  return fits(source) && fits(created)
}

/**
 * Check whether splitting `sourcePanel` in `direction` at `sizePercent` would
 * satisfy both the source panel's own min/max constraints and the created
 * panel's constraints.
 */
export function viewSplitFitsPanelConstraints(
  sourcePanel: ViewPanelState,
  direction: ViewDirection,
  sizePercent: number,
  createdConstraints: SizeConstraints = {},
  minSize: ViewSize = VIEW_DEFAULT_MIN_SIZE,
  sizeContext?: ViewSizeResolutionContext,
): boolean {
  const { source, created } = viewSplitInset(sourcePanel.inset, direction, sizePercent)
  const axisSize = direction === "left" || direction === "right" ? viewPanelWidth : viewPanelHeight
  const axisPixels = direction === "left" || direction === "right" ? sizeContext?.width : sizeContext?.height
  return (
    sizeFits(axisSize({ ...sourcePanel, inset: source }), sourcePanel, minSize, axisPixels) &&
    sizeFits(axisSize({ ...sourcePanel, inset: created }), createdConstraints, minSize, axisPixels)
  )
}

/**
 * Commit a divider move to `newPosition` by updating the relevant panel insets
 * (or the layout tree for tree-based layouts) and returning the next state.
 */
export function viewApplyDividerResize(
  state: ViewLayoutState,
  divider: ViewDivider,
  newPosition: number,
): ViewLayoutState {
  if (divider.disabled) return state
  if (divider.splitId && state.layout) {
    const layout = viewResizeLayoutDivider(state.layout, divider.splitId, newPosition)
    return viewSyncLayoutPanels({ ...state, layout }, layout)
  }
  const nextPanels = { ...state.panels }
  if (divider.orientation === "vertical") {
    for (const id of divider.beforePanels) {
      const p = nextPanels[id]
      if (!p) continue
      nextPanels[id] = {
        ...p,
        inset: { ...p.inset, right: 100 - newPosition },
      }
    }
    for (const id of divider.afterPanels) {
      const p = nextPanels[id]
      if (!p) continue
      nextPanels[id] = { ...p, inset: { ...p.inset, left: newPosition } }
    }
  } else {
    for (const id of divider.beforePanels) {
      const p = nextPanels[id]
      if (!p) continue
      nextPanels[id] = {
        ...p,
        inset: { ...p.inset, bottom: 100 - newPosition },
      }
    }
    for (const id of divider.afterPanels) {
      const p = nextPanels[id]
      if (!p) continue
      nextPanels[id] = { ...p, inset: { ...p.inset, top: newPosition } }
    }
  }
  return { ...state, panels: nextPanels }
}

/**
 * Reset a layout-tree divider to its default position, clamped to the current
 * constraint range. No-ops for disabled dividers or flat-inset layouts.
 */
export function viewApplyDividerReset(
  state: ViewLayoutState,
  divider: ViewDivider,
  minSize: ViewSize = VIEW_DEFAULT_MIN_SIZE,
  sizeContext?: ViewSizeResolutionContext,
): ViewLayoutState {
  if (divider.disabled) return state
  if (!divider.splitId || !state.layout) return state
  const layout = viewResetLayoutDivider(state.layout, divider.splitId, minSize, state.panels, sizeContext)
  if (layout === state.layout) return state
  return viewSyncLayoutPanels({ ...state, layout }, layout)
}

/**
 * Find the set of panels that can fully cover the area vacated by `removed` by
 * expanding along exactly one axis. Returns an empty array when no single side
 * provides complete coverage, meaning no automatic fill is possible.
 */
export function viewFindRemovalFillers(
  panels: ViewPanelState[],
  removed: ViewPanelState,
): { id: ViewPanelId; inset: ViewInset }[] {
  const removedL = viewPanelLeft(removed)
  const removedR = viewPanelRight(removed)
  const removedT = viewPanelTop(removed)
  const removedB = viewPanelBottom(removed)

  type Side = {
    candidates: ViewPanelState[]
    range: (p: ViewPanelState) => Range
    target: { start: number; end: number }
    patch: (p: ViewPanelState) => ViewInset
  }

  const sides: Side[] = [
    {
      candidates: panels.filter(
        (p) =>
          p.id !== removed.id &&
          eq(viewPanelLeft(p), removedR) &&
          viewPanelTop(p) >= removedT - EPSILON &&
          viewPanelBottom(p) <= removedB + EPSILON,
      ),
      range: (p) => ({ start: viewPanelTop(p), end: viewPanelBottom(p) }),
      target: { start: removedT, end: removedB },
      patch: (p) => ({ ...p.inset, left: removed.inset.left }),
    },
    {
      candidates: panels.filter(
        (p) =>
          p.id !== removed.id &&
          eq(viewPanelRight(p), removedL) &&
          viewPanelTop(p) >= removedT - EPSILON &&
          viewPanelBottom(p) <= removedB + EPSILON,
      ),
      range: (p) => ({ start: viewPanelTop(p), end: viewPanelBottom(p) }),
      target: { start: removedT, end: removedB },
      patch: (p) => ({ ...p.inset, right: removed.inset.right }),
    },
    {
      candidates: panels.filter(
        (p) =>
          p.id !== removed.id &&
          eq(viewPanelTop(p), removedB) &&
          viewPanelLeft(p) >= removedL - EPSILON &&
          viewPanelRight(p) <= removedR + EPSILON,
      ),
      range: (p) => ({ start: viewPanelLeft(p), end: viewPanelRight(p) }),
      target: { start: removedL, end: removedR },
      patch: (p) => ({ ...p.inset, top: removed.inset.top }),
    },
    {
      candidates: panels.filter(
        (p) =>
          p.id !== removed.id &&
          eq(viewPanelBottom(p), removedT) &&
          viewPanelLeft(p) >= removedL - EPSILON &&
          viewPanelRight(p) <= removedR + EPSILON,
      ),
      range: (p) => ({ start: viewPanelLeft(p), end: viewPanelRight(p) }),
      target: { start: removedL, end: removedR },
      patch: (p) => ({ ...p.inset, bottom: removed.inset.bottom }),
    },
  ]

  for (const side of sides) {
    if (side.candidates.length === 0) continue
    const cover = unionRanges(side.candidates.map(side.range))
    if (cover.length === 1 && eq(cover[0]!.start, side.target.start) && eq(cover[0]!.end, side.target.end)) {
      return side.candidates.map((p) => ({ id: p.id, inset: side.patch(p) }))
    }
  }
  return []
}

/**
 * Test whether two panels' inset rectangles overlap, excluding shared edges
 * (panels that are merely adjacent do not overlap).
 */
export function viewRectsOverlap(a: ViewInset, b: ViewInset): boolean {
  const aL = a.left
  const aR = 100 - a.right
  const aT = a.top
  const aB = 100 - a.bottom
  const bL = b.left
  const bR = 100 - b.right
  const bT = b.top
  const bB = 100 - b.bottom
  return aL < bR - EPSILON && bL < aR - EPSILON && aT < bB - EPSILON && bT < aB - EPSILON
}

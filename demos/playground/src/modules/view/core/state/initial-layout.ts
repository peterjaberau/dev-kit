/**
 * Builds the initial `ViewLayoutState` from an authored
 * `ViewInitialLayout` descriptor, including tiled, floating, and edge
 * panels.
 */
import type {
  ViewDockedLayoutInit,
  ViewEdge,
  ViewEdgePanelInit,
  ViewFloatingPanelInit,
  ViewInitialLayout,
  ViewLayoutState,
  ViewLayoutTree,
  ViewPanelId,
  ViewPanelInit,
  ViewPanelState,
  ViewTabId,
  ViewTabInit,
  ViewTabState,
} from "../types"
import type { ViewReducerTabInit } from "./actions"
import { viewWarnForConstraintDiagnostics } from "./diagnostics"
import { viewDefaultEdgePanelSize, viewEdgeInset, viewNormalizeEdgePanelOrders } from "./edges"
import {
  viewFloatingBoundsToInset,
  viewFloatingZIndex,
  viewNormalizeFloatingBounds,
  viewNormalizePopoutPanelPlacement,
} from "./floating"
import { viewBehaviorFromNode, viewMergeLayoutBehavior, viewNormalizeLayoutBehavior } from "./layout-behavior"
import { viewSyncLayoutPanels } from "./layout-tree"
import { viewNormalizeTabBehavior } from "./tab-behavior"

let idCounter = 0

/**
 * Generates a unique, prefixed identifier for panels and tabs that were not
 * given an explicit id by the caller.
 */
export function viewNextId(prefix: string): string {
  idCounter += 1
  return `${prefix}_${idCounter}_${Math.random().toString(36).slice(2, 8)}`
}

/** Mutable accumulator threaded through the initial-state build helpers. */
type InitialStateBuildContext = {
  panels: Record<ViewPanelId, ViewPanelState>
  tabs: Record<ViewTabId, ViewTabState>
  edgePanelOrder: ViewPanelId[]
  floatingPanelOrder: ViewPanelId[]
  hasFullScreenPanel: boolean
}

/**
 * Converts a `ViewInitialLayout` descriptor into a fully normalized
 * `ViewLayoutState` ready for use as the reducer's starting state,
 * including all tiled, edge, and floating panels.
 */
export function viewCreateInitialState(initial: ViewInitialLayout): ViewLayoutState {
  const ctx: InitialStateBuildContext = {
    panels: {},
    tabs: {},
    edgePanelOrder: [],
    floatingPanelOrder: [],
    hasFullScreenPanel: false,
  }
  const main = initial.type === "root" ? initial.main : initial
  const layout = buildInitialLayoutTree(main, ctx)
  if (initial.type === "root") {
    for (const side of edgeSides) {
      const panel = initial.edges?.[side]
      if (panel) buildInitialEdgePanel(side, panel, ctx)
    }
    initial.floating?.forEach((panel, index) => buildInitialFloatingPanel(panel, ctx, index))
  }
  const state: ViewLayoutState = {
    panels: ctx.panels,
    panelOrder: [],
    edgePanelOrder: ctx.edgePanelOrder,
    floatingPanelOrder: ctx.floatingPanelOrder,
    tabs: ctx.tabs,
    layout,
  }
  const synced = viewNormalizeEdgePanelOrders(viewSyncLayoutPanels(state, layout))
  // Once sizes are normalized, pin each node's `defaultSize` to its resolved
  // `size` when it was omitted. `size` may have been derived (e.g. a group
  // that shares the remaining space), so deferring this until after
  // normalization keeps double-click reset restoring the initial proportions
  // for derived sizes too — and makes getLayout()/setLayout() a fixed point
  // instead of back-filling `defaultSize` from a serialized `size` on reload.
  const next = synced.layout ? { ...synced, layout: resolveLayoutDefaultSizes(synced.layout) } : synced
  viewWarnForConstraintDiagnostics(next)
  return next
}

function resolveLayoutDefaultSizes(node: ViewLayoutTree): ViewLayoutTree {
  if (node.kind === "panel") {
    return node.defaultSize === undefined && node.size !== undefined ? { ...node, defaultSize: node.size } : node
  }
  const children = node.children.map(resolveLayoutDefaultSizes)
  return node.defaultSize === undefined && node.size !== undefined
    ? { ...node, defaultSize: node.size, children }
    : { ...node, children }
}

function buildInitialLayoutTree(init: ViewDockedLayoutInit, ctx: InitialStateBuildContext): ViewLayoutTree | null {
  if (init.type === "empty") return null

  if (init.type === "panel") {
    const panelId = init.id ?? viewNextId("p")
    const tabs: ViewTabId[] = []
    for (const tabInit of init.tabs) {
      const tabId = tabInit.id ?? viewNextId("t")
      const behavior = viewNormalizeTabBehavior(tabInit)
      ctx.tabs[tabId] = {
        id: tabId,
        panelId,
        data: tabInit.data,
        ...behavior,
      }
      tabs.push(tabId)
    }
    const activeTabId = init.activeTabId && tabs.includes(init.activeTabId) ? init.activeTabId : (tabs[0] ?? null)
    const fullScreen = Boolean(init.fullScreen && !ctx.hasFullScreenPanel)
    if (fullScreen) ctx.hasFullScreenPanel = true
    const behavior = viewNormalizeLayoutBehavior(init)
    ctx.panels[panelId] = {
      id: panelId,
      kind: "tiled",
      inset: { top: 0, right: 0, bottom: 0, left: 0 },
      tabs,
      activeTabId,
      fullScreen,
      minSize: init.minSize,
      maxSize: init.maxSize,
    }
    return {
      kind: "panel",
      panelId,
      size: init.size,
      defaultSize: init.defaultSize ?? init.size,
      ...behavior,
    }
  }

  if (init.type === "group") {
    const behavior = viewNormalizeLayoutBehavior(init)
    const children = init.children
      .map((child) => buildInitialLayoutTree(child, ctx))
      .filter((child): child is ViewLayoutTree => Boolean(child))
    if (children.length === 0) return null
    if (children.length === 1) {
      return {
        ...children[0]!,
        size: init.size,
        defaultSize: init.defaultSize ?? init.size ?? children[0]!.defaultSize,
        ...viewMergeLayoutBehavior(behavior, viewBehaviorFromNode(children[0]!)),
      }
    }
    return {
      kind: "split",
      id: init.id ?? initialSplitId(init.direction, children),
      direction: init.direction,
      size: init.size,
      defaultSize: init.defaultSize ?? init.size,
      ...behavior,
      children,
    }
  }

  const unsupported = init as { type?: unknown }
  throw new Error(`Unsupported View layout type: ${String(unsupported.type)}`)
}

function buildInitialFloatingPanel(init: ViewFloatingPanelInit, ctx: InitialStateBuildContext, index: number) {
  const panelId = init.id ?? viewNextId("p")
  const tabs: ViewTabId[] = []
  for (const tabInit of init.tabs) {
    const tabId = tabInit.id ?? viewNextId("t")
    const behavior = viewNormalizeTabBehavior(tabInit)
    ctx.tabs[tabId] = {
      id: tabId,
      panelId,
      data: tabInit.data,
      ...behavior,
    }
    tabs.push(tabId)
  }
  const activeTabId = init.activeTabId && tabs.includes(init.activeTabId) ? init.activeTabId : (tabs[0] ?? null)
  const fullScreen = Boolean(init.fullScreen && !ctx.hasFullScreenPanel)
  if (fullScreen) ctx.hasFullScreenPanel = true
  const bounds = viewNormalizeFloatingBounds(init.bounds, {
    x: 18 + index * 4,
    y: 12 + index * 4,
    width: 46,
    height: 48,
  })
  const popout = viewNormalizePopoutPanelPlacement(init.popout)
  ctx.panels[panelId] = {
    id: panelId,
    kind: "floating",
    inset: viewFloatingBoundsToInset(bounds),
    tabs,
    activeTabId,
    fullScreen,
    minSize: init.minSize,
    maxSize: init.maxSize,
    behavior: viewNormalizeLayoutBehavior(init),
    floating: {
      bounds,
      zIndex: init.zIndex ?? viewFloatingZIndex(index),
      ...(popout ? { popout } : {}),
    },
  }
  ctx.floatingPanelOrder.push(panelId)
}

const edgeSides: ViewEdge[] = ["left", "right", "top", "bottom"]

function buildInitialEdgePanel(side: ViewEdge, init: ViewEdgePanelInit, ctx: InitialStateBuildContext) {
  const panelId = init.id ?? viewNextId("p")
  const tabs: ViewTabId[] = []
  for (const tabInit of init.tabs) {
    const tabId = tabInit.id ?? viewNextId("t")
    const behavior = viewNormalizeTabBehavior(tabInit)
    ctx.tabs[tabId] = {
      id: tabId,
      panelId,
      data: tabInit.data,
      ...behavior,
    }
    tabs.push(tabId)
  }
  const activeTabId = init.activeTabId && tabs.includes(init.activeTabId) ? init.activeTabId : (tabs[0] ?? null)
  const fullScreen = Boolean(init.fullScreen && !ctx.hasFullScreenPanel)
  if (fullScreen) ctx.hasFullScreenPanel = true
  const size = init.size ?? viewDefaultEdgePanelSize(side)
  ctx.panels[panelId] = {
    id: panelId,
    kind: "edge",
    inset: viewEdgeInset(side, size),
    tabs,
    activeTabId,
    fullScreen,
    minSize: init.minSize,
    maxSize: init.maxSize,
    behavior: viewNormalizeLayoutBehavior(init),
    edge: {
      side,
      size,
      defaultSize: init.defaultSize ?? init.size,
    },
  }
  ctx.edgePanelOrder.push(panelId)
}

function initialSplitId(
  direction: Extract<ViewLayoutTree, { kind: "split" }>["direction"],
  children: ViewLayoutTree[],
): string {
  return `initial:${direction}:${children.map(layoutLeafSignature).join("|")}`
}

function layoutLeafSignature(layout: ViewLayoutTree): string {
  if (layout.kind === "panel") return layout.panelId
  return `${layout.direction}(${layout.children.map(layoutLeafSignature).join(",")})`
}

/**
 * Converts a public `ViewPanelInit` (user-facing) into the internal shape
 * expected by the reducer, assigning a generated id when none is provided.
 */
export function viewPanelInitToReducerInit(init: ViewPanelInit): {
  id: ViewPanelId
  tabs: ViewReducerTabInit[]
} {
  return {
    id: init.id ?? viewNextId("p"),
    tabs: init.tabs.map(viewTabInitToReducerInit),
  }
}

/**
 * Converts a public `ViewTabInit` into the fully resolved
 * `ViewReducerTabInit` shape, assigning a generated id and normalizing
 * behavior flags.
 */
export function viewTabInitToReducerInit(init: ViewTabInit): ViewReducerTabInit {
  const behavior = viewNormalizeTabBehavior(init)
  return {
    id: init.id ?? viewNextId("t"),
    data: init.data,
    ...behavior,
  }
}

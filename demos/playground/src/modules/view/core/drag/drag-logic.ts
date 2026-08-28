/**
 * Classify and commit drag interactions.
 * Determines whether a drag resolves to a tab-bar reorder, a root-edge split,
 * a panel-zone split, or a panel swap, then dispatches the appropriate
 * controller commands.
 */
import type { ViewDirection, ViewController, ViewLayoutState, ViewPanelId, ViewTabId } from "../types"
import { viewCanMoveTabBetweenPanels, viewPanelBehaviorFromState } from "../state/layout-behavior"
import { viewDefaultRootSplitSize, viewRemovePanelFromLayout } from "../state/layout-tree"
import { viewTabBarDropAt, type ViewPanelZone } from "./drop-zones"
import { VIEW_EPSILON as EPS } from "../state/size"

/**
 * Live state for an in-progress drag gesture, tracking the originating tab,
 * current pointer position, and the resolved drop zone.
 */
export type ViewDragState = {
  tabId: ViewTabId
  pointerId: number
  startX: number
  startY: number
  x: number
  y: number
  dragKind?: "tab" | "panel"
  hoverPanelId: ViewPanelId | null
  hoverZone: ViewPanelZone | null
  hoverRootZone?: ViewDirection | null
  hoverRootSize?: number | null
  hoverTabBar: {
    panelId: ViewPanelId
    hit: ReturnType<typeof viewTabBarDropAt>
  } | null
}

/**
 * Evaluate the completed drag state and dispatch the appropriate controller
 * command: tab-bar reorder, root split, panel-zone split, or panel swap.
 * Silently no-ops when behavior flags prevent the move.
 */
export function viewCommitDrag(
  view: ViewController | null,
  drag: ViewDragState,
  tabId: ViewTabId,
  panelDrag: boolean = false,
) {
  if (!view) return

  const draggedTab = view.getTab(tabId)
  if (!draggedTab) return
  if (draggedTab.draggable === false) return
  const sourcePanel = draggedTab.panel
  const state = view.getState()
  if (!viewPanelBehaviorFromState(state, sourcePanel.id).draggable) return
  const allTabIds = panelDrag ? sourcePanel.tabs.map((t) => t.id) : []
  if (panelDrag && sourcePanel.tabs.some((tab) => tab.draggable === false)) {
    return
  }
  const shouldMoveSourcePanel = panelDrag || isSingleTabTiledPanel(sourcePanel)
  const leadIndex = allTabIds.indexOf(tabId)
  const tabsBefore = allTabIds.slice(0, leadIndex)
  const tabsAfter = allTabIds.slice(leadIndex + 1)

  if (drag.hoverTabBar) {
    const { hit, panelId } = drag.hoverTabBar
    if (hit.kind === "append") {
      const target = view.getPanel(panelId)
      if (target && viewCanMoveTabBetweenPanels(state, sourcePanel.id, panelId)) {
        view.moveTab(tabId, { panel: panelId, index: target.tabs.length })
        moveSiblingsPreservingOrder(view, tabsBefore, tabsAfter, tabId)
        if (panelDrag) view.setActiveTab(tabId)
      }
      return
    }
    if (hit.tabId === tabId) return
    const refTab = view.getTab(hit.tabId)
    if (!refTab || !viewCanMoveTabBetweenPanels(state, sourcePanel.id, refTab.panel.id)) {
      return
    }
    if (hit.kind === "before") {
      view.moveTab(tabId, { beforeTab: hit.tabId })
      moveSiblingsPreservingOrder(view, tabsBefore, tabsAfter, tabId)
      if (panelDrag) view.setActiveTab(tabId)
    } else {
      view.moveTab(tabId, { afterTab: hit.tabId })
      moveSiblingsPreservingOrder(view, tabsBefore, tabsAfter, tabId)
      if (panelDrag) view.setActiveTab(tabId)
    }
    return
  }
  if (drag.hoverRootZone) {
    const size = drag.hoverRootSize ?? viewRootSplitSizeForDrag(state, tabId, drag.hoverRootZone, panelDrag)
    if (shouldMoveSourcePanel) {
      view.movePanel(sourcePanel.id, {
        splitRoot: true,
        direction: drag.hoverRootZone,
        size,
      })
      view.setActiveTab(tabId)
      return
    }
    view.moveTab(tabId, {
      splitRoot: true,
      direction: drag.hoverRootZone,
      size,
    })
    moveSiblingsPreservingOrder(view, tabsBefore, tabsAfter, tabId)
    if (panelDrag) view.setActiveTab(tabId)
    return
  }
  if (drag.hoverPanelId && drag.hoverZone) {
    if (drag.hoverZone === "center") {
      const target = view.getPanel(drag.hoverPanelId)
      if (target && viewCanMoveTabBetweenPanels(state, sourcePanel.id, drag.hoverPanelId)) {
        view.moveTab(tabId, {
          panel: drag.hoverPanelId,
          index: target.tabs.length,
        })
        moveSiblingsPreservingOrder(view, tabsBefore, tabsAfter, tabId)
        if (panelDrag) view.setActiveTab(tabId)
      }
      return
    }
    const dir: ViewDirection = drag.hoverZone
    const target = view.getPanel(drag.hoverPanelId)
    if (!viewCanMoveTabBetweenPanels(state, sourcePanel.id, drag.hoverPanelId)) {
      return
    }
    if (target && !panelDrag && !sourcePanel.floating && !target.floating) {
      const splitInteraction = viewResolveSplitInteraction(sourcePanel, target, dir)
      if (splitInteraction === "suppress") return
      if (splitInteraction === "swap") {
        view.swapPanels(sourcePanel.id, target.id)
        return
      }
    }
    if (shouldMoveSourcePanel) {
      view.movePanel(sourcePanel.id, {
        splitPanel: drag.hoverPanelId,
        direction: dir,
        size: 50,
      })
      view.setActiveTab(tabId)
      return
    }
    view.moveTab(tabId, {
      splitPanel: drag.hoverPanelId,
      direction: dir,
      size: 50,
    })
    moveSiblingsPreservingOrder(view, tabsBefore, tabsAfter, tabId)
    if (panelDrag) view.setActiveTab(tabId)
  }
}

function isSingleTabTiledPanel(panel: { kind?: string; floating?: boolean; tabs: readonly unknown[] }): boolean {
  return panel.kind === "tiled" && !panel.floating && panel.tabs.length === 1
}

/**
 * Compute the default size percentage for a new root-edge panel that would
 * result from dragging `tabId` to a root edge. Temporarily removes the source
 * panel from the layout when it would be relocated entirely.
 */
export function viewRootSplitSizeForDrag(
  state: ViewLayoutState,
  tabId: ViewTabId,
  direction: ViewDirection,
  panelDrag: boolean = false,
): number {
  const tab = state.tabs[tabId]
  if (!tab) return 50
  const sourcePanel = state.panels[tab.panelId]
  if (!sourcePanel) return 50
  const splitDirection = direction === "left" || direction === "right" ? "horizontal" : "vertical"
  const layout =
    sourcePanel.kind === "tiled" && (panelDrag || sourcePanel.tabs.length === 1)
      ? viewRemovePanelFromLayout(state.layout, sourcePanel.id)
      : state.layout
  return viewDefaultRootSplitSize(layout, splitDirection)
}

function moveSiblingsPreservingOrder(
  view: ViewController,
  tabsBefore: ViewTabId[],
  tabsAfter: ViewTabId[],
  leadTabId: ViewTabId,
) {
  // Reconstruct [...tabsBefore, leadTabId, ...tabsAfter] around the already-moved
  // lead tab: re-chain the tabs that followed the lead so each lands after the
  // previous one, then re-insert the tabs that preceded it before the lead.

  // Tabs after the lead: chain each after the previous, starting at the lead.
  let prev = leadTabId
  for (const id of tabsAfter) {
    view.moveTab(id, { afterTab: prev })
    prev = id
  }
  // Move tabs that were before the lead: insert before lead in original order
  // Each one goes before the lead, pushing previous ones further left
  for (const id of tabsBefore) {
    view.moveTab(id, { beforeTab: leadTabId })
  }
}

/** Relative spatial relationship between two adjacent panels. */
type AdjacencySide = "left" | "right" | "above" | "below" | null

/**
 * Classify a drag-zone / adjacency-side combination as `'swap'` (panels
 * should exchange positions), `'suppress'` (the source is already on that
 * side, so no move is needed), or `'split'` (insert a new split).
 */
export function viewClassifyByZoneAndSide(
  zone: ViewDirection,
  side: NonNullable<AdjacencySide>,
): "suppress" | "swap" | "split" {
  if (zone === "left") {
    if (side === "left") return "suppress"
    if (side === "right") return "swap"
    return "split"
  }
  if (zone === "right") {
    if (side === "right") return "suppress"
    if (side === "left") return "swap"
    return "split"
  }
  if (zone === "top") {
    if (side === "above") return "suppress"
    if (side === "below") return "swap"
    return "split"
  }
  if (side === "below") return "suppress"
  if (side === "above") return "swap"
  return "split"
}

/**
 * Determine which side of `target` the `source` panel is directly adjacent to,
 * or `null` when the two panels do not share a touching edge with overlap.
 */
export function viewAdjacencySide(
  source: {
    inset: { top: number; right: number; bottom: number; left: number }
  },
  target: {
    inset: { top: number; right: number; bottom: number; left: number }
  },
): AdjacencySide {
  const sL = source.inset.left
  const sR = 100 - source.inset.right
  const sT = source.inset.top
  const sB = 100 - source.inset.bottom
  const tL = target.inset.left
  const tR = 100 - target.inset.right
  const tT = target.inset.top
  const tB = 100 - target.inset.bottom
  const yOverlap = Math.min(sB, tB) > Math.max(sT, tT) + EPS
  const xOverlap = Math.min(sR, tR) > Math.max(sL, tL) + EPS
  if (yOverlap) {
    if (Math.abs(sR - tL) < EPS) return "left"
    if (Math.abs(sL - tR) < EPS) return "right"
  }
  if (xOverlap) {
    if (Math.abs(sB - tT) < EPS) return "above"
    if (Math.abs(sT - tB) < EPS) return "below"
  }
  return null
}

/**
 * Resolve how dragging a single-tab panel over `zone` of `target` should be
 * handled: `'swap'` when the two adjacent solo panels should exchange places,
 * `'suppress'` when the source already occupies that side (a no-op), or
 * `'split'` for every other case (the default insert-a-split behavior).
 *
 * Shared by the commit logic (this module) and the hover/preview classifier in
 * the React adapter so the committed drop and its on-screen preview can never
 * diverge.
 */
export function viewResolveSplitInteraction(
  source: {
    id: string
    tabs: readonly { id: string }[]
    inset: { top: number; right: number; bottom: number; left: number }
  },
  target: {
    id: string
    tabs: readonly { id: string }[]
    inset: { top: number; right: number; bottom: number; left: number }
  },
  zone: ViewPanelZone,
): "suppress" | "swap" | "split" {
  if (zone === "center") return "split"
  if (source.id === target.id) return "split"
  if (source.tabs.length !== 1) return "split"
  if (target.tabs.length !== 1) return "split"
  const side = viewAdjacencySide(source, target)
  if (!side) return "split"
  if (!shareFullEdge(source.inset, target.inset, side)) return "split"
  return viewClassifyByZoneAndSide(zone, side)
}

function shareFullEdge(
  a: { top: number; right: number; bottom: number; left: number },
  b: { top: number; right: number; bottom: number; left: number },
  side: NonNullable<AdjacencySide>,
): boolean {
  if (side === "left" || side === "right") {
    return Math.abs(a.top - b.top) < EPS && Math.abs(a.bottom - b.bottom) < EPS
  }
  return Math.abs(a.left - b.left) < EPS && Math.abs(a.right - b.right) < EPS
}

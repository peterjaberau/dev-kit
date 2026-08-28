/**
 * Serialize/deserialize layout state to/from persistable snapshots.
 */
import type {
  ViewDockedLayoutSnapshot,
  ViewEdge,
  ViewEdgePanelSnapshot,
  ViewFloatingPanelSnapshot,
  ViewLayoutBehavior,
  ViewLayoutSnapshot,
  ViewLayoutState,
  ViewLayoutTree,
} from "../types"
import { viewBehaviorFromNode, viewMergeLayoutBehavior } from "./layout-behavior"
import { viewEdgePanelIdBySide } from "./edges"
import { viewFloatingPanelOrderFromState } from "./layout-tree"

type NonEmptyLayout<TData> = Exclude<ViewDockedLayoutSnapshot<TData>, { type: "empty" }>

/**
 * Serializes the full layout state — tiled layout tree, edge panels, and
 * floating panels — into a `ViewLayoutSnapshot` that can be persisted and
 * later restored. Returns a plain `{ type: 'empty' }` snapshot when there are
 * no tiled panels, edge panels, or floating panels.
 */
export function viewCreateLayoutSnapshot<TData = unknown>(state: ViewLayoutState): ViewLayoutSnapshot<TData> {
  const main = state.layout ? layoutToSnapshot<TData>(state.layout, state) : null
  const floating = viewFloatingPanelOrderFromState(state)
    .map((panelId) => floatingPanelToSnapshot<TData>(state, panelId))
    .filter((panel): panel is ViewFloatingPanelSnapshot<TData> => Boolean(panel))
  const edges = edgePanelsToSnapshot<TData>(state)
  const mainSnapshot: ViewDockedLayoutSnapshot<TData> = main ?? {
    type: "empty",
  }
  if (floating.length === 0 && Object.keys(edges).length === 0) {
    return mainSnapshot
  }
  return {
    type: "root",
    main: mainSnapshot,
    ...(Object.keys(edges).length > 0 ? { edges } : {}),
    floating,
  }
}

function layoutToSnapshot<TData>(layout: ViewLayoutTree, state: ViewLayoutState): NonEmptyLayout<TData> | null {
  if (layout.kind === "split") {
    const children = layout.children
      .map((child) => layoutToSnapshot<TData>(child, state))
      .filter((child): child is NonEmptyLayout<TData> => Boolean(child))
    /* v8 ignore next 2 -- normalized layouts do not keep empty splits. */
    if (children.length === 0) return null
    if (children.length === 1) {
      return {
        ...children[0]!,
        size: layout.size,
        defaultSize: layout.defaultSize,
        ...viewMergeLayoutBehavior(viewBehaviorFromNode(layout), childBehavior(children[0]!)),
      }
    }
    return {
      type: "group",
      id: layout.id,
      direction: layout.direction,
      size: layout.size,
      defaultSize: layout.defaultSize,
      ...viewBehaviorFromNode(layout),
      children,
    }
  }

  const panel = state.panels[layout.panelId]
  /* v8 ignore next -- normalized layouts only reference existing panels. */
  if (!panel) return null
  return {
    type: "panel",
    id: panel.id,
    size: layout.size,
    defaultSize: layout.defaultSize,
    ...viewBehaviorFromNode(layout),
    activeTabId: panel.activeTabId ?? undefined,
    fullScreen: panel.fullScreen,
    minSize: panel.minSize,
    maxSize: panel.maxSize,
    tabs: panel.tabs.map((tabId) => {
      const tab = state.tabs[tabId]!
      return {
        id: tab.id,
        data: tab.data as TData,
        closable: tab.closable,
        draggable: tab.draggable,
      }
    }),
  }
}

function floatingPanelToSnapshot<TData>(
  state: ViewLayoutState,
  panelId: string,
): ViewFloatingPanelSnapshot<TData> | null {
  const panel = state.panels[panelId]
  /* v8 ignore next -- floating panel ids are filtered before snapshotting. */
  if (!panel || panel.kind !== "floating") return null
  return {
    type: "floatingPanel",
    id: panel.id,
    bounds: { ...panel.floating.bounds },
    zIndex: panel.floating.zIndex,
    ...(panel.floating.popout
      ? {
          popout: {
            windowBounds: { ...panel.floating.popout.windowBounds },
          },
        }
      : {}),
    ...panel.behavior,
    activeTabId: panel.activeTabId ?? undefined,
    fullScreen: panel.fullScreen,
    minSize: panel.minSize,
    maxSize: panel.maxSize,
    tabs: panel.tabs.map((tabId) => {
      const tab = state.tabs[tabId]!
      return {
        id: tab.id,
        data: tab.data as TData,
        closable: tab.closable,
        draggable: tab.draggable,
      }
    }),
  }
}

function edgePanelsToSnapshot<TData>(state: ViewLayoutState): Partial<Record<ViewEdge, ViewEdgePanelSnapshot<TData>>> {
  const bySide = viewEdgePanelIdBySide(state)
  const out: Partial<Record<ViewEdge, ViewEdgePanelSnapshot<TData>>> = {}
  for (const side of edgeSides) {
    const panelId = bySide[side]
    if (!panelId) continue
    const panel = state.panels[panelId]
    /* v8 ignore next -- bySide only yields existing edge panel ids. */
    if (!panel || panel.kind !== "edge") continue
    out[side] = {
      type: "edgePanel",
      id: panel.id,
      size: panel.edge.size,
      defaultSize: panel.edge.defaultSize,
      ...panel.behavior,
      activeTabId: panel.activeTabId ?? undefined,
      fullScreen: panel.fullScreen,
      minSize: panel.minSize,
      maxSize: panel.maxSize,
      tabs: panel.tabs.map((tabId) => {
        const tab = state.tabs[tabId]!
        return {
          id: tab.id,
          data: tab.data as TData,
          closable: tab.closable,
          draggable: tab.draggable,
        }
      }),
    }
  }
  return out
}

const edgeSides: ViewEdge[] = ["left", "right", "top", "bottom"]

function childBehavior(layout: NonEmptyLayout<unknown>): ViewLayoutBehavior {
  return {
    resizable: layout.resizable,
    draggable: layout.draggable,
    droppable: layout.droppable,
  }
}

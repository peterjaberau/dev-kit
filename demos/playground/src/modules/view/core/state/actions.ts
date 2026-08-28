/**
 * The internal reducer action union. Every dispatchable mutation the
 * reducer handles is represented as a discriminated-union member here.
 */
import type {
  ViewDockPanelTarget,
  ViewDirection,
  ViewFloatingPanelBoundsInit,
  ViewLayoutBehaviorConfig,
  ViewLayoutState,
  ViewPanelId,
  ViewPopoutPanelOptions,
  ViewPopoutWindowBounds,
  ViewSize,
  ViewSizeResolutionContext,
  ViewTabBehaviorUpdate,
  ViewTabId,
} from "../types"

/**
 * Normalized tab descriptor used when a tab is being created by the
 * reducer (e.g. during append, insert, or split). All behavior flags are
 * fully resolved — no optional omissions.
 */
export type ViewReducerTabInit = {
  id: ViewTabId
  data: unknown
  closable: boolean
  draggable: boolean
}

/**
 * Tab descriptor carried inside actions that create or reference a tab.
 * Behavior flags are optional and fall back to the panel/global defaults
 * when omitted.
 */
export type ViewReducerTabAction = {
  id: ViewTabId
  data: unknown
  closable?: boolean
  draggable?: boolean
}

/**
 * The complete set of actions the View reducer handles. Each member
 * encodes one discrete layout mutation — panel lifecycle (split, remove,
 * float, dock, …), tab lifecycle (append, insert, move, remove, …), resize
 * operations (dividers, junctions, edge panels), and full-state replacement.
 */
export type ViewReducerAction =
  | {
      type: "PANEL_SPLIT"
      panelId: ViewPanelId
      direction: ViewDirection
      sizePercent: number
      newPanelId: ViewPanelId
      minSize?: ViewSize
      maxSize?: ViewSize
      sizeContext?: ViewSizeResolutionContext
      resizable?: boolean
      draggable?: boolean
      droppable?: boolean
      tabs: ViewReducerTabAction[]
      activate: boolean
    }
  | { type: "PANEL_REMOVE"; panelId: ViewPanelId }
  | {
      type: "PANEL_MOVE"
      panelId: ViewPanelId
      to:
        | {
            splitPanelId: ViewPanelId
            direction: ViewDirection
            sizePercent: number
            minSize?: ViewSize
            maxSize?: ViewSize
            sizeContext?: ViewSizeResolutionContext
            resizable?: boolean
            draggable?: boolean
            droppable?: boolean
          }
        | {
            splitRoot: true
            direction: ViewDirection
            sizePercent?: number
            minSize?: ViewSize
            maxSize?: ViewSize
            sizeContext?: ViewSizeResolutionContext
            resizable?: boolean
            draggable?: boolean
            droppable?: boolean
          }
    }
  | {
      type: "PANEL_FULLSCREEN_SET"
      panelId: ViewPanelId
      fullScreen: boolean
    }
  | {
      type: "PANEL_FLOAT"
      panelId: ViewPanelId
      bounds?: ViewFloatingPanelBoundsInit
      behavior?: ViewLayoutBehaviorConfig
    }
  | {
      type: "PANEL_POPOUT"
      panelId: ViewPanelId
      opts?: ViewPopoutPanelOptions
    }
  | {
      type: "PANEL_RETURN_TO_FLOATING"
      panelId: ViewPanelId
      bounds?: ViewFloatingPanelBoundsInit
    }
  | {
      type: "PANEL_DOCK"
      panelId: ViewPanelId
      target?: ViewDockPanelTarget
      sizeContext?: ViewSizeResolutionContext
    }
  | { type: "PANEL_FOCUS"; panelId: ViewPanelId }
  | {
      type: "PANEL_FLOATING_BOUNDS_SET"
      panelId: ViewPanelId
      bounds: ViewFloatingPanelBoundsInit
    }
  | {
      type: "PANEL_POPOUT_WINDOW_BOUNDS_SET"
      panelId: ViewPanelId
      bounds: ViewPopoutWindowBounds
    }
  | { type: "PANEL_SWAP"; panelA: ViewPanelId; panelB: ViewPanelId }
  | {
      type: "EDGE_PANEL_SIZE_SET"
      panelId: ViewPanelId
      size: number
      minSize?: ViewSize
      sizeContext?: ViewSizeResolutionContext
    }
  | {
      type: "TAB_APPEND"
      panelId: ViewPanelId
      tab: ViewReducerTabAction
      activate: boolean
    }
  | {
      type: "TAB_INSERT"
      panelId: ViewPanelId
      tab: ViewReducerTabAction
      index: number
      activate: boolean
    }
  | {
      type: "TAB_ID_CHANGE"
      oldTabId: ViewTabId
      newTabId: ViewTabId
    }
  | { type: "TAB_REMOVE"; tabId: ViewTabId }
  | {
      type: "TAB_MOVE"
      tabId: ViewTabId
      to:
        | { panelId: ViewPanelId; index: number }
        | { beforeTabId: ViewTabId }
        | { afterTabId: ViewTabId }
        | {
            splitPanelId: ViewPanelId
            direction: ViewDirection
            sizePercent: number
            newPanelId: ViewPanelId
            minSize?: ViewSize
            maxSize?: ViewSize
            sizeContext?: ViewSizeResolutionContext
            resizable?: boolean
            draggable?: boolean
            droppable?: boolean
          }
        | {
            splitRoot: true
            direction: ViewDirection
            sizePercent?: number
            newPanelId: ViewPanelId
            minSize?: ViewSize
            maxSize?: ViewSize
            sizeContext?: ViewSizeResolutionContext
            resizable?: boolean
            draggable?: boolean
            droppable?: boolean
          }
    }
  | { type: "TAB_ACTIVE_SET"; tabId: ViewTabId }
  | { type: "TAB_DATA_SET"; tabId: ViewTabId; data: unknown }
  | {
      type: "TAB_BEHAVIOR_SET"
      tabId: ViewTabId
      behavior: ViewTabBehaviorUpdate
    }
  | {
      type: "TAB_FLOAT"
      tabId: ViewTabId
      newPanelId: ViewPanelId
      bounds?: ViewFloatingPanelBoundsInit
      behavior?: ViewLayoutBehaviorConfig
    }
  | {
      type: "TAB_POPOUT"
      tabId: ViewTabId
      newPanelId: ViewPanelId
      opts?: ViewPopoutPanelOptions
    }
  | {
      type: "DIVIDER_RESIZE"
      dividerId: string
      newPosition: number
      minSize?: ViewSize
      sizeContext?: ViewSizeResolutionContext
    }
  | {
      type: "DIVIDER_RESET"
      dividerId: string
      minSize?: ViewSize
      sizeContext?: ViewSizeResolutionContext
    }
  | {
      type: "JUNCTION_RESIZE"
      junctionId: string
      x: number
      y: number
      minSize?: ViewSize
      sizeContext?: ViewSizeResolutionContext
    }
  | {
      type: "CONTAINER_SIZE_NORMALIZE"
      minSize?: ViewSize
      sizeContext?: ViewSizeResolutionContext
    }
  | { type: "STATE_REPLACE"; state: ViewLayoutState }

/**
 * Pure reducer mapping every `ViewReducerAction` to the next layout state.
 * Also re-exports the action types, id generator, and init helpers so
 * consumers only need a single import point.
 */
import type { ViewLayoutState } from "../types"
import type { ViewReducerAction } from "./actions"
import { viewWarnForConstraintDiagnostics } from "./diagnostics"
import { viewSetEdgePanelSize } from "./edges"
import {
  viewDockPanel,
  viewFloatPanel,
  viewFloatTab,
  viewFocusFloatingPanel,
  viewPopoutPanel,
  viewPopoutTab,
  viewReturnPanelToFloating,
  viewSetFloatingPanelBounds,
  viewSetPopoutWindowBounds,
} from "./floating"
import {
  VIEW_DEFAULT_MIN_SIZE,
  viewApplyDividerReset,
  viewApplyDividerResize,
  viewApplyJunctionResize,
  viewClampDividerPosition,
  viewDeriveDividers,
  viewDeriveJunctions,
} from "./layout-math"
import {
  viewNormalizeLayoutForContainerResize,
  viewNormalizeLayoutState,
  viewSyncLayoutPanels,
} from "./layout-tree"
import {
  viewMovePanel,
  viewRemovePanel,
  viewSetPanelFullScreen,
  viewSplitPanel,
  viewSwapPanels,
} from "./panels"
import {
  viewAppendTab,
  viewChangeTabId,
  viewInsertTab,
  viewMoveTab,
  viewRemoveTab,
  viewSetActiveTab,
  viewSetPanelData,
  viewSetTabBehavior,
} from "./tabs"

export type { ViewReducerAction, ViewReducerTabAction, ViewReducerTabInit } from "./actions"
export {
  viewCreateInitialState,
  viewNextId,
  viewPanelInitToReducerInit,
  viewTabInitToReducerInit,
} from "./initial-layout"

/**
 * Applies a single `ViewReducerAction` to the current layout state and
 * returns the next state. The state is first normalized before dispatch so
 * every case handler receives a consistent shape.
 * @returns The updated layout state, or the (normalized) input state
 *   unchanged when the action is a no-op or targets a missing panel/tab.
 */
export function viewReducer(state: ViewLayoutState, action: ViewReducerAction): ViewLayoutState {
  const current = viewNormalizeLayoutState(state)
  switch (action.type) {
    case "PANEL_SPLIT": {
      return viewSplitPanel(current, action)
    }
    case "PANEL_REMOVE": {
      return viewRemovePanel(current, action.panelId)
    }
    case "PANEL_MOVE": {
      return viewMovePanel(current, action)
    }
    case "PANEL_FULLSCREEN_SET": {
      return viewSetPanelFullScreen(current, action.panelId, action.fullScreen)
    }
    case "PANEL_FLOAT": {
      return viewFloatPanel(current, action.panelId, action.bounds, action.behavior)
    }
    case "PANEL_POPOUT": {
      return viewPopoutPanel(current, action.panelId, action.opts)
    }
    case "PANEL_RETURN_TO_FLOATING": {
      return viewReturnPanelToFloating(current, action.panelId, action.bounds)
    }
    case "PANEL_DOCK": {
      return viewDockPanel(current, action.panelId, action.target, action.sizeContext)
    }
    case "PANEL_FOCUS": {
      return viewFocusFloatingPanel(current, action.panelId)
    }
    case "PANEL_FLOATING_BOUNDS_SET": {
      return viewSetFloatingPanelBounds(current, action.panelId, action.bounds)
    }
    case "PANEL_POPOUT_WINDOW_BOUNDS_SET": {
      return viewSetPopoutWindowBounds(current, action.panelId, action.bounds)
    }
    case "PANEL_SWAP": {
      return viewSwapPanels(current, action.panelA, action.panelB)
    }
    case "EDGE_PANEL_SIZE_SET": {
      return viewSetEdgePanelSize(
        current,
        action.panelId,
        action.size,
        action.minSize ?? VIEW_DEFAULT_MIN_SIZE,
        action.sizeContext,
      )
    }
    case "TAB_APPEND": {
      return viewAppendTab(current, action)
    }
    case "TAB_INSERT": {
      return viewInsertTab(current, action)
    }
    case "TAB_ID_CHANGE": {
      return viewChangeTabId(current, action)
    }
    case "TAB_REMOVE": {
      return viewRemoveTab(current, action.tabId)
    }
    case "TAB_MOVE": {
      return viewMoveTab(current, action)
    }
    case "TAB_ACTIVE_SET": {
      return viewSetActiveTab(current, action.tabId)
    }
    case "TAB_DATA_SET": {
      return viewSetPanelData(current, action.tabId, action.data)
    }
    case "TAB_BEHAVIOR_SET": {
      return viewSetTabBehavior(current, action.tabId, action.behavior)
    }
    case "TAB_FLOAT": {
      return viewFloatTab(current, action.tabId, action.newPanelId, action.bounds, action.behavior)
    }
    case "TAB_POPOUT": {
      return viewPopoutTab(current, action.tabId, action.newPanelId, action.opts)
    }
    case "DIVIDER_RESIZE": {
      const dividers = viewDeriveDividers(current)
      const target = dividers.find((d) => d.id === action.dividerId)
      if (!target) return current
      const min = action.minSize ?? VIEW_DEFAULT_MIN_SIZE
      const clamped = viewClampDividerPosition(current, target, action.newPosition, min, action.sizeContext)
      return viewApplyDividerResize(current, target, clamped)
    }
    case "DIVIDER_RESET": {
      const dividers = viewDeriveDividers(current)
      const target = dividers.find((d) => d.id === action.dividerId)
      if (!target) return current
      return viewApplyDividerReset(current, target, action.minSize ?? VIEW_DEFAULT_MIN_SIZE, action.sizeContext)
    }
    case "JUNCTION_RESIZE": {
      const junction = viewDeriveJunctions(current).find((j) => j.id === action.junctionId)
      if (!junction) return current
      return viewApplyJunctionResize(
        current,
        junction,
        { x: action.x, y: action.y },
        action.minSize ?? VIEW_DEFAULT_MIN_SIZE,
        action.sizeContext,
      )
    }
    case "CONTAINER_SIZE_NORMALIZE": {
      if (!current.layout) return current
      viewWarnForConstraintDiagnostics(current, {
        minSize: action.minSize,
        sizeContext: action.sizeContext,
      })
      const layout = viewNormalizeLayoutForContainerResize(
        current.layout,
        current.panels,
        action.minSize ?? VIEW_DEFAULT_MIN_SIZE,
        action.sizeContext,
      )
      if (layout === current.layout) return current
      return viewSyncLayoutPanels({ ...current, layout }, layout)
    }
    case "STATE_REPLACE": {
      const next = viewNormalizeLayoutState(action.state)
      viewWarnForConstraintDiagnostics(next)
      return next
    }
    default:
      return current
  }
}

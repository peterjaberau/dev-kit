/**
 * Adapter-facing entry point for `@view/core`: re-exports the full public
 * type surface plus implementation functions and impl-only types (dividers,
 * junctions, …) that end users do not need.
 *
 * `index.ts` is the curated public type surface. Using `export type *` keeps
 * the adapter's view of the public types drift-free instead of
 * hand-maintaining a subset here.
 */
export type * from "./types"

export { viewCreateInitialState, viewReducer, viewNextId, type ViewReducerAction } from "./state/reducer"

export {
  makeViewController,
  type ViewDispatch,
  type ViewGetSizeContext,
  type ViewGetState,
  type ViewControllerOptions,
} from "./state/controller"

export {
  viewCanMoveTabBetweenPanels,
  viewCanSwapPanels,
  viewPanelBehaviorFromState,
} from "./state/layout-behavior"

export {
  viewClampEdgePanelSize,
  viewEdgePanelIdBySide,
  viewEdgePanelOrderFromState,
  viewEdgePanelSizes,
} from "./state/edges"

export {
  viewAllPanelOrderFromState,
  viewBuildLayoutTreeFromPanels,
  viewFloatingPanelOrderFromState,
  viewPanelOrderFromState,
  viewSplitRootInLayout,
  viewSyncLayoutPanels,
} from "./state/layout-tree"

export {
  viewClampDividerPosition,
  viewDeriveDividers,
  viewDeriveJunctions,
  viewGetFullScreenPanelId,
  viewRectEdgePercent,
} from "./state/layout-math"

export {
  viewWarnForConstraintDiagnostics,
  type ViewConstraintDiagnosticsOptions,
  type ViewConstraintWarning,
} from "./state/diagnostics"

export {
  viewNormalizePopoutWindowBounds,
  viewPopoutWindowFeatureString,
  viewResizeFloatingBounds,
} from "./state/floating"

export {
  viewCommitDrag,
  viewAdjacencySide,
  viewClassifyByZoneAndSide,
  viewResolveSplitInteraction,
  viewRootSplitSizeForDrag,
  type ViewDragState,
} from "./drag/drag-logic"

export { viewEdgeZoneAt, viewZoneAt, viewTabBarDropAt, type ViewPanelZone } from "./drag/drop-zones"

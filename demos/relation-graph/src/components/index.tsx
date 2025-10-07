import RelationGraph from "./relation-graph"
import _GraphToolBar from "./relation-graph/src/core4react/widgets/GraphMiniToolBar"
import RGSlotOnGraphComponent from "./relation-graph/src/core4react/slots/RGSlotOnGraph"
import RGSlotOnCanvasAboveComponent from "./relation-graph/src/core4react/slots/RGSlotOnCanvasAbove"
import RGSlotOnNodeComponent from "./relation-graph/src/core4react/slots/RGSlotOnNode"
import GraphXsToolBarComponent from "./relation-graph/src/core4react/widgets/GraphXsToolBar"
import RGEditingControllerComponent from "./relation-graph/src/core4react/editing/RGEditingController"
import RGEditingResizeComponent from "./relation-graph/src/core4react/editing/RGEditingResize"
import RGMiniViewComponent from "./relation-graph/src/core4react/editing/RGMiniView"
import GraphWatermarkComponent from "./relation-graph/src/core4react/widgets/GraphWatermark"
import GraphBackgroundComponent from "./relation-graph/src/core4react/widgets/GraphBackground"
import RGEditingNearNodeWidgetComponent from "./relation-graph/src/core4react/editing/RGEditingNearNodeWidget"
import RGEditingLineControllerComponent from "./relation-graph/src/core4react/editing/RGEditingLineController"
import RGEditingConnectControllerComponent from "./relation-graph/src/core4react/editing/RGEditingConnectController"
import RGEditingCreateLineHandleComponent from "./relation-graph/src/core4react/editing/RGEditingCreateLineHandle"
import RGEditingConnectPointsComponent from "./relation-graph/src/core4react/editing/RGEditingConnectPoints"
import RGEditingReferenceLineComponent from "./relation-graph/src/core4react/editing/RGEditingReferenceLine"

import { RelationGraphFinal } from "#models-core/models/RelationGraphFinal"
import BidirectionalTreeLayouter from "#models-core/layouters/SeeksBidirectionalTreeLayouter"
import CenterLayouter from "#models-core/layouters/SeeksCenterLayouter"
import CircleLayouter from "#models-core/layouters/SeeksCircleLayouter"
import FixedLayouter from "#models-core/layouters/SeeksFixedLayouter"
import ForceLayouter from "#models-core/layouters/SeeksForceLayouter"
import BaseLayouter from "#models-core/layouters/SeeksBaseLayouter"

import * as SeeksRGLink from "#models-core/models/RGLink"
import * as SeeksRGNode from "#models-core/models/RGNode"
import * as SeeksRGOptions from "#models-core/models/RGOptions"
import * as SeeksRGLayouter from "#models-core/models/RGLayouter"
import { RGGraphMath as _RGGraphMath } from "#models-core/utils/RGGraphMath"
import * as _RGNodesAnalytic from "#models-core/utils/RGNodesAnalytic"
import * as _RGEffectUtils from "#models-core/utils/RGEffectUtils"
import { RelationGraphComponent } from "./types"
export {
  RelationGraphStoreContext,
  RelationGraphStoreContext as RGInstanceContext,
  RGUpdateContext,
  RGUpdateSingalContext,
} from "./relation-graph/src/core4react/store"
export const RelationGraphCore = RelationGraphFinal
export const Layout = {
  BaseLayouter,
  BidirectionalTreeLayouter,
  CenterLayouter,
  CircleLayouter,
  FixedLayouter,
  ForceLayouter,
}
export const RGLayouterUtils = SeeksRGLayouter
export const RGOptionsUtils = SeeksRGOptions
export const RGLinkUtils = SeeksRGLink
export const RGNodeUtils = SeeksRGNode
export const RGGraphMath = _RGGraphMath
export const RGNodesAnalyticUtils = _RGNodesAnalytic
export const RGEffectUtils = _RGEffectUtils
// export type RelationGraphComponent = React.ForwardRefExoticComponent<RelationGraphJsxProps & React.RefAttributes<RelationGraphExpose>>;
export const RGSlotOnGraph = RGSlotOnGraphComponent
export const RGSlotOnCanvasAbove = RGSlotOnCanvasAboveComponent
export const RGSlotOnNode = RGSlotOnNodeComponent
export const GraphToolBar = _GraphToolBar
export const RGMiniToolBar = GraphXsToolBarComponent
export const RGMiniView = RGMiniViewComponent
export const RGWatermark = GraphWatermarkComponent
export const RGBackground = GraphBackgroundComponent
export const RGEditingController = RGEditingControllerComponent
export const RGEditingResize = RGEditingResizeComponent
export const RGEditingNearNodeWidget = RGEditingNearNodeWidgetComponent
export const RGEditingLineController = RGEditingLineControllerComponent
export const RGEditingConnectController = RGEditingConnectControllerComponent
export const RGEditingCreateLineHandle = RGEditingCreateLineHandleComponent
export const RGEditingConnectPoints = RGEditingConnectPointsComponent
export const RGEditingReferenceLine = RGEditingReferenceLineComponent

const relationGraphComponent: RelationGraphComponent = RelationGraph

export default relationGraphComponent

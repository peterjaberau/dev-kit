import { SeeksBaseLayouter } from "#models-core/layouters/AICode"

const allNames = {
  "relation-graph-models": [
    "constants",
    "types"
  ],
  "layouters": [
    "AICode",
    "SeeksBaseLayouter",
    "SeeksBidirectionalTreeLayouter",
    "SeeksCenterLayouter",
    "SeeksCircleLayouter",
    "SeeksFixedLayouter",
    "SeeksFolderLayouter",
    "SeeksForceLayouter",
    "SeeksSmartTreeLayouter"
  ],
  "models": [
    "RGLayouter",
    "RGLink",
    "RGNode",
    "RGOptions",
    "RelationGraphBase",
    "RelationGraphFinal",
    "RelationGraphReact",
    "RelationGraphWith1Dom",
    "RelationGraphWith2Data",
    "RelationGraphWith3Image",
    "RelationGraphWith4Line",
    "RelationGraphWith5Zoom",
    "RelationGraphWith6Effect",
    "RelationGraphWith7Event",
    "RelationGraphWith8Update",
    "RelationGraphWith91Editing",
    "RelationGraphWith92MiniView",
    "RelationGraphWith9EasyView"
  ],
  "utils": [
    "RGCommon",
    "RGEffectUtils",
    "RGGraphIconfont",
    "RGGraphIconfont4Vue",
    "RGGraphMath",
    "RGIntergration",
    "RGLinePath44Generater",
    "RGLinePathUtils",
    "RGNodesAnalytic"
  ]
}


const descriptions = {
  "layouters": {
    AICode: {
      SeeksBaseLayouter: {
        type: "class",
        allNodes: "array",
        rootNode: "object",
        placeNodes: "function"
      }
    },
    SeeksBaseLayouter: {
      type: "class",
      graphOptions: "object",
      layoutOptions: "object",
      graphInstance: "class",
      allNodes: "array",
      isMainLayouer: "bool",
      requireLinks: "bool",
      allLinks: "array",
      rootNode: "object",
      setLinks: "function",
      refresh: "function",
      placeNodes: "function",
      snapshotBeforeAnimation: "function",
      animationLayout: "function",
      playAnimation: "function",
      currentAnimationStep: "number",
      allAnimationStep: "number"
    },
    SeeksBidirectionalTreeLayouter: {
      type: "class",
      extends: ["SeeksBaseLayouter"],
      enableGatherNodes: 'bool',
      levelDistanceArr: 'array',
      layoutOptions: "object",
      refresh: "function",
      analysisNodes4Didirectional: "function",
      placeNodes: "function",
      placeNodesPosition: "function",
      placeRelativePosition: "function",
      gatherNodes: "function",
      getBloomingNearByParent: "function",
      getLevelDistance: "function"
    },
    SeeksCenterLayouter: {
      type: "class",
      extends: ["SeeksForceLayouter"],
      layoutOptions: "object",
      refresh: "function",
      placeNodes: "function",
      placeRelativePosition: "function",
      getLevelR: "function",
      getLevelDistanceArr: "function"
    },
    SeeksCircleLayouter: {
      type: "class",
      extends: ["SeeksForceLayouter"],
      refresh: "function",
      placeNodes: "function"
    },
    SeeksFixedLayouter: {
      type: "class",
      extends: ["SeeksBaseLayouter"],
      graphOptions: "object",
      layoutOptions: "object",
      allNodes: "array",
      __origin_nodes: "array",
      refresh: "function",
      placeNodes: "function"
    },
    SeeksFolderLayouter: {
      type: "class",
      extends: ["SeeksBaseLayouter"],
      enableGatherNodes: "bool",
      layoutOptions: "object",
      refresh: "function",
      placeNodes: "function",
      analysisNodes4Didirectional: "function",
      placeNodesPosition: "function",
      placeRelativePosition: "function",
      gatherNodes: "function",
      getBloomingNearByParent: "function"

    },
    "SeeksForceLayouter": {},
    "SeeksSmartTreeLayouter": {}
  },
  "models": {
    "RGLayouter": {},
    "RGLink": {},
    "RGNode": {},
    "RGOptions": {},
    "RelationGraphBase": {},
    "RelationGraphFinal": {},
    "RelationGraphReact": {},
    "RelationGraphWith1Dom": {},
    "RelationGraphWith2Data": {},
    "RelationGraphWith3Image": {},
    "RelationGraphWith4Line": {},
    "RelationGraphWith5Zoom": {},
    "RelationGraphWith6Effect": {},
    "RelationGraphWith7Event": {},
    "RelationGraphWith8Update": {},
    "RelationGraphWith91Editing": {},
    "RelationGraphWith92MiniView": {},
    "RelationGraphWith9EasyView": {}
  },
  "utils": {
    "RGCommon": {},
    "RGEffectUtils": {},
    "RGGraphIconfont": {},
    "RGGraphIconfont4Vue": {},
    "RGGraphMath": {},
    "RGIntergration": {},
    "RGLinePath44Generater": {},
    "RGLinePathUtils": {},
    "RGNodesAnalytic": {}
  }
}

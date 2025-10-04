export const graphDatasource = {
  listOfComponents: [],
  listOfOrphanTokens: []
}
const completeGraphModel = {}

const displayGraphModel = {}

const baseDisplayGraphModel = {}

const appModel = {
  panX: 380,
  panY: 130,
  zoom: 0.7,
  spectrumColorTheme: "dark",
  isDragging: false,
  fullscreenMode: false,
  hoverNodeId: "",
  setFilters: ["spectrum", "light", "desktop"],
  listOfComponents: [],
  selectedTokens: [],
  selectionAncestorNodes: [],
  selectionDescendentNodes: [],
  selectionDescendentIntersectNodes: [],
  componentDescendentNodes: [],
  selectedComponents: [],
  hoverUpstreamNodes: [],
}
const graphModel = {
  width: 0,
  height: 0,
  topologyKey: "",
  nodes: {},
  adjacencyList: {},
}

const graphController = {
  graphDatasource,
  completeGraphModel,
  displayGraphModel,
  baseDisplayGraphModel,
  appState: {},



  newGraphStateCallbacks: [],
  newDictionaryCallbacks: [],
  selectedComponent: "slider",
  listOfComponents: [],
  listOfOrphanNodes: []

}


const appController = {
  graphController,
  appModel,
  newAppStateCallbacks: [],
  selectedComponents: [],
  selectedTokens: [],
  setFilters: [],



}




// app-controller
export const initializeAppController = () => {
  return {}
}
export const emitNewAppStateAppController = () => {
  return {}
}
export const onNewAppStateAppController = () => {
  return {}
}
export const handleNewGraphStateAppController = () => {
  return {}
}
export const handleHoverOverAppController = () => {
  return {}
}
export const handleHoverOutAppController = () => {
  return {}
}
export const toggleGraphNodeSelectionAppController = () => {
  return {}
}
export const setZoomCenteredOnCanvasAppController = () => {
  return {}
}
export const doSomeMutationAppController = () => {
  return {}
}
export const getNodeTypeAppController = () => {
  return {}
}

// graph-controller
export const getNodeTypeGraphController = () => {
  return {}
}
export const getDownstreamGraphFromGraphController = () => {
  return {}
}
export const getUpstreamGraphFromGraphController = () => {
  return {}
}
export const getAncestorNodesGraphController = () => {
  return {}
}
export const getDescendentNodesGraphController = () => {
  return {}
}
export const getDescendentIntersectNodes = () => {
  return {}
}
export const assignGraphsGraphController= () => {
  return {}
}
export const hydrateFromJsonGraphController = () => {
  return {}
}
export const emitNewGraphStateGraphController = () => {
  return {}
}
export const emitNewDictionaryGraphController = () => {
  return {}
}
export const onNewGraphStateGraphController = () => {
  return {}
}
export const onDictionaryAvailableGraphController = () => {
  return {}
}
export const doSomeMutationGraphController = () => {
  return {}
}
export const updateDisplayGraphGraphController = () => {
  return {}
}
export const setAppStateGraphController = () => {
  return {}
}
export const recieveNewGraphLayoutGraphController = () => {
  return {}
}
export const requestGraphLayoutGraphController = () => {
  return {}
}
export const handleEventGraphController = () => {
  return {}
}


// graph-datasource
export const getCompleteSpectrumTokenJson = () => {
  return {}
}
export const getAllComponentNames = () => {
  return []
}
export const getFilteredGraphModel = () => {
  return {}
}



//app-model
export const dirtyStateAppModel = () => {
  return {}
}
export const stringifiedStateAppModel = () => {
  return {}
}
export const setFullscreenModeAppModel = () => {
  return {}
}
export const setIsDraggingAppModel = () => {
  return {}
}
export const setPanAppModel = () => {
  return {}
}
export const setZoomAppModel = () => {
  return {}
}
export const setHoverIdAppModel = () => {
  return {}
}
export const getSetFiltersAppModel = () => {
  return {}
}
export const setSetFiltersAppModel = () => {
  return {}
}
export const getSelectedComponentsAppModel = () => {
  return {}
}
export const setSelectedComponentsAppModel = () => {
  return {}
}
export const setSpectrumColorThemeAppModel = () => {
  return {}
}
export const getSelectedTokensAppModel = () => {
  return {}
}
export const setSelectedTokensAppModel = () => {
  return {}
}
export const setSelectionAncestorNodesAppModel = () => {
  return {}
}
export const setSelectionDescendentNodesAppModel = () => {
  return {}
}
export const setSelectionDescendentIntersectNodesAppModel = () => {
  return {}
}
export const setListOfComponentsAppModel = () => {
  return {}
}
export const setComponentDescendentNodesAppModel = () => {
  return {}
}
export const setHoverUpstreamNodesAppModel = () => {
  return {}
}
export const resetAppModel = () => {
  return {}
}
export const getStateAppModel = () => {
  return {}
}
export const setStateAppModel = () => {
  return {}
}



//graph-model
export const filterGraphModel = () => {
  return {}
}
export const dirtyStateGraphModel = () => {
  return {}
}
export const stringifiedStateGraphModel = () => {
  return {}
}
export const orphanNodesGraphModel = () => {
  return {}
}
export const hasNodeGraphModel = () => {
  return {}
}
export const createNodeGraphModel = () => {
  return {}
}
export const updateNodeGraphModel = () => {
  return {}
}
export const deleteNodeGraphModel = () => {
  return {}
}
export const createAdjacencyGraphModel = () => {
  return {}
}
export const deleteAdjacencyGraphModel = () => {
  return {}
}
export const setSizeGraphModel = () => {
  return {}
}
export const resetGraphModel = () => {
  return {}
}
export const getStateGraphModel = () => {
  return {}
}
export const setStateGraphModel = () => {
  return {}
}


//graph-layout-worker


//string-match-worker

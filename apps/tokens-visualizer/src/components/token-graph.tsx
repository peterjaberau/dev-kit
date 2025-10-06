import React, { useState, useEffect, useMemo, useCallback, useRef } from "react"
import { Box } from "@chakra-ui/react"

// --- Constants (Preserved) ---
// NOTE: Replace these with your actual imports from the layout-consts and models
const GRAPH_NODE_WIDTH = 200
const GRAPH_NODE_HEIGHT = 50 // Mock value
const MINIMUM_CANVAS_RENDER_SCALE = 0.1
const MAXIMUM_CANVAS_RENDER_SCALE = 2

// --- Types (Preserved/Mocked) ---
type GraphNodeId = string
type GraphNode = {
  id: GraphNodeId
  type: string
  value?: string
  x: number
  y: number
  adjacencyLabels?: { [toId: string]: string }
}
type AdjacencyList = { [fromId: string]: GraphNodeId[] }
type GraphState = {
  nodes: { [id: string]: GraphNode }
  adjacencyList: AdjacencyList
}
type AppState = {
  zoom: number
  panX: number
  panY: number
  isDragging: boolean
  selectedTokens: GraphNodeId[]
  selectedComponents: GraphNodeId[]
  selectionDescendentIntersectNodes: GraphNodeId[]
  selectionAncestorNodes: GraphNodeId[]
  selectionDescendentNodes: GraphNodeId[]
  hoverUpstreamNodes: GraphNodeId[]
  spectrumColorTheme: string
}
type AdjacencyTuplesList = [GraphNodeId, GraphNodeId][]

// --- Utility Functions ---

// Simple Debounce Implementation
const debounce = (func: (...args: any[]) => void, delay: number) => {
  let timeout: number
  return function (...args: any[]) {
    clearTimeout(timeout)
    timeout = window.setTimeout(() => func.apply(null, args), delay)
  }
}

// --- Placeholder/Refactored Components ---
// NOTE: These should be imported from their refactored files.
const GraphGrid = React.memo((props: any) => <Box className="graph-grid-placeholder" {...props} />)
const TokenGraphNode = React.memo((props: any) => (
  <Box className="node-placeholder" style={{ transform: props.style.transform }}>
    {props.id}
  </Box>
))
const TokenGraphAdjacency = React.memo((props: any) => <Box className="adjacency-placeholder" />)

// --- Component Props ---
interface TokenGraphProps {
  appState: AppState
  graphState: GraphState
  // Event handlers (replacing dispatchCustomEvent)
  onSetZoom: (detail: { value: number }) => void
  onSetPanningPosition: (detail: { x: number; y: number }) => void
  onPanningInputDelta: (detail: { x: number; y: number }) => void
  onGenericGestureStart: (detail: any) => void
  onGenericGestureEnd: (detail: any) => void
  onNodeDragMove: (detail: any) => void
  onNodeDragStart: (detail: any) => void
  onNodeDragEnd: (detail: any) => void
  // ... other node events (click, pointerover/out, etc.)
  [key: string]: any
}

/**
 * Main canvas component rendering the graph, handling panning, zooming, and input.
 */
export const TokenGraph: React.FC<TokenGraphProps> = ({
  appState,
  graphState,
  onSetZoom,
  onSetPanningPosition,
  onPanningInputDelta,
  onGenericGestureStart,
  onGenericGestureEnd,
  onNodeDragMove,
  onNodeDragStart,
  onNodeDragEnd,
  ...otherProps // Collect all other node event handlers
}) => {
  // --- Internal State (Replacing class fields) ---
  const _gestureStartZoom = useRef(appState.zoom)
  const _isGestureActive = useRef(false)

  // --- Graph State Processing (Replacing willUpdate('graphState')) ---
  const { nodeIds, adjacencyTuples } = useMemo(() => {
    const tuples: AdjacencyTuplesList = []
    for (const fromId in graphState.adjacencyList) {
      const listOfToIds = graphState.adjacencyList[fromId]
      for (let index = 0; index < listOfToIds.length; index++) {
        const toId = listOfToIds[index]
        tuples.push([fromId, toId])
      }
    }
    const ids = Object.keys(graphState.nodes)
    return { nodeIds: ids, adjacencyTuples: tuples }
  }, [graphState])

  // --- Input Handling & Debouncing ---

  const _debouncedAfterWheel = useCallback(() => {
    onGenericGestureEnd({ id: "TokenGraph" })
  }, [onGenericGestureEnd])

  // Debounced function instance
  const debouncedAfterWheel = useMemo(() => debounce(_debouncedAfterWheel, 150), [_debouncedAfterWheel])

  // --- Zoom/Gesture Handlers (Replacing Lit methods) ---

  const handleZoomGestureEnd = useCallback(
    (e: any) => {
      _gestureStartZoom.current = 1
      _isGestureActive.current = false
      e.preventDefault()
      onGenericGestureEnd({ id: "TokenGraph", data: e.detail })
    },
    [onGenericGestureEnd],
  )

  const handleZoomGestureStart = useCallback(
    (e: any) => {
      _gestureStartZoom.current = appState.zoom
      _isGestureActive.current = true
      e.preventDefault()
      onGenericGestureStart({ id: "TokenGraph", data: e.detail })
    },
    [appState.zoom, onGenericGestureStart],
  )

  const handleZoomGesture = useCallback(
    (e: any) => {
      let newZoom = 0
      const { zoom, panX, panY } = appState

      // This conditional logic handles both Chrome's wheel (deltaY) and Safari's gesturechange (scale)
      if ("deltaY" in e && !_isGestureActive.current) {
        // HANDLE WHEEL DATA (chrome)
        const oldZoom = zoom
        // Adjust the zoom formula slightly for sensitivity
        const zoomDelta = -e.deltaY * 0.0075 * oldZoom
        newZoom = oldZoom + zoomDelta
      } else if ("scale" in e) {
        // HANDLE ACTUAL GESTURE DATA (safari-style)
        newZoom = _gestureStartZoom.current * e.scale
      }

      if (newZoom) {
        newZoom = Math.min(MAXIMUM_CANVAS_RENDER_SCALE, Math.max(MINIMUM_CANVAS_RENDER_SCALE, newZoom))

        const zoomDiff = newZoom / zoom
        // Use clientX/Y from the event for the pivot point
        const offsetX = panX - e.clientX
        const offsetY = panY - e.clientY
        const newPanX = e.clientX + offsetX * zoomDiff
        const newPanY = e.clientY + offsetY * zoomDiff

        onSetPanningPosition({ x: newPanX, y: newPanY })
        onSetZoom({ value: newZoom })
      }

      e.preventDefault()
    },
    [appState, onSetPanningPosition, onSetZoom],
  )

  const handleWheelEvents = useCallback(
    (e: React.WheelEvent<HTMLDivElement>) => {
      onGenericGestureStart({ id: "TokenGraph" })
      debouncedAfterWheel()

      // Check for modifier keys for zooming
      if (e.ctrlKey || e.altKey || e.metaKey || e.shiftKey) {
        return handleZoomGesture(e)
      }

      // Default panning
      onPanningInputDelta({
        x: -e.deltaX * 2,
        y: -e.deltaY * 2,
      })
      e.preventDefault()
    },
    [handleZoomGesture, onPanningInputDelta, onGenericGestureStart, debouncedAfterWheel],
  )

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      // Logic for initiating drag/pan
      // In React, we rely on `onPointerMove`/`onPointerUp` listeners usually set on the window
      // after this `onPointerDown` fires, but here we dispatch a start event to the controller.
      if (e.button === 0) {
        // Only primary mouse button (left)
        e.currentTarget.setPointerCapture(e.pointerId) // Capture pointer for consistent tracking
        onGenericGestureStart({ id: "TokenGraph", data: { x: e.clientX, y: e.clientY } })
        // The AppController handles the rest of the drag state
      }
      e.preventDefault()
    },
    [onGenericGestureStart],
  )

  // --- Node Event Mapping (Simplified) ---
  // In the original Lit app, the `token-graph-node` dispatches events that bubble up here.
  // In React, we pass the handlers down via props.
  const nodeEventHandler = useCallback(
    (eventName: string) => (detail: any) => {
      // The parent component passed all these handlers, we dynamically call them
      const handler = otherProps[`onNode${eventName}`]
      if (handler) {
        handler(detail)
      } else {
        console.warn(`TokenGraph: Missing handler for node event: ${eventName}`)
      }
    },
    [otherProps],
  )

  // --- Rendering Calculations ---

  const {
    isDragging,
    zoom,
    panX,
    panY,
    selectedTokens,
    selectedComponents,
    selectionDescendentIntersectNodes,
    selectionAncestorNodes,
    selectionDescendentNodes,
    hoverUpstreamNodes,
    spectrumColorTheme,
  } = appState

  // Identify nodes in focus mode
  let focusItems = selectionAncestorNodes.filter((value) => selectionDescendentNodes.includes(value))
  const allSelections = [...selectedComponents, ...selectedTokens]
  focusItems = [...focusItems, ...selectionDescendentIntersectNodes]
  focusItems = focusItems.filter((value) => !allSelections.includes(value))

  const isFocusMode = focusItems.length > 0
  const focusedOrSelected = [...focusItems, ...allSelections]
  const transform = [zoom.toFixed(3), 0, 0, zoom.toFixed(3), panX.toFixed(0), panY.toFixed(0)]
  const renderedHoverUpstream = isDragging ? [] : hoverUpstreamNodes
  const transformMatrix = `matrix(${transform.join(",")})`

  const renderAdjacencies = useMemo(() => {
    return adjacencyTuples.map((tuple) => {
      const [fromId, toId] = tuple
      const fromNode = graphState.nodes[fromId]
      const toNode = graphState.nodes[toId]

      if (!fromNode || !toNode) {
        return null
      }

      const label = fromNode.adjacencyLabels ? fromNode.adjacencyLabels[toNode.id] : ""
      const fromX = fromNode.x + GRAPH_NODE_WIDTH
      const fromY = fromNode.y + GRAPH_NODE_HEIGHT / 2
      const toX = toNode.x
      const toY = toNode.y + GRAPH_NODE_HEIGHT / 2

      const isOnAncestorPath =
        selectionAncestorNodes.includes(fromNode.id) && selectionAncestorNodes.includes(toNode.id)
      const isOnDescendentPath =
        selectionDescendentNodes.includes(fromNode.id) && selectionDescendentNodes.includes(toNode.id)
      const isInHoverUpstream = renderedHoverUpstream.includes(fromNode.id) && renderedHoverUpstream.includes(toNode.id)

      const isFocused = focusedOrSelected.includes(fromId) && focusedOrSelected.includes(toId)
      const isFaded = isFocusMode && !isFocused

      const role =
        isOnAncestorPath && isOnDescendentPath
          ? "selectionConnection"
          : isOnAncestorPath
            ? "ancestorPath"
            : isOnDescendentPath
              ? "descendentPath"
              : "descendentPath"

      const isHighlighted = isInHoverUpstream || (isOnAncestorPath && isOnDescendentPath)

      return (
        <TokenGraphAdjacency
          key={tuple.join(":")}
          isHighlighted={isHighlighted}
          role={role}
          isFaded={isFaded}
          label={label}
          fromX={fromX}
          fromY={fromY}
          toX={toX}
          toY={toY}
          // Chakra Box styles for position
          position="absolute"
          top="0"
          left="0"
          pointerEvents="none"
          zIndex={isHighlighted ? 2 : 0}
        />
      )
    })
  }, [
    adjacencyTuples,
    graphState.nodes,
    selectionAncestorNodes,
    selectionDescendentNodes,
    renderedHoverUpstream,
    focusedOrSelected,
    isFocusMode,
  ])

  const renderNodes = useMemo(() => {
    return nodeIds.map((id) => {
      const { type, value = "", x, y } = graphState.nodes[id]
      const hasDownstream = graphState.adjacencyList[id] ? true : false
      const isSelected = allSelections.includes(id)
      const isFocused = focusItems.includes(id)
      const isFaded = isFocusMode && !isFocused

      const transformStyle = `matrix(1,0,0,1,${x},${y})`

      return (
        <TokenGraphNode
          key={id}
          id={id}
          value={value}
          type={type}
          isFocused={isFocused}
          isFaded={isFaded}
          isSelected={isSelected}
          isIntersect={selectionDescendentIntersectNodes.includes(id)}
          selected={isSelected}
          selectionAncestor={selectionAncestorNodes.includes(id)}
          selectionDescendent={selectionDescendentNodes.includes(id)}
          hasDownstream={hasDownstream}
          hoverUpstream={renderedHoverUpstream.includes(id)}
          style={{ transform: transformStyle }}
          onNodeClick={nodeEventHandler("Click")}
          onNodeDoubleClick={nodeEventHandler("DoubleClick")}
          onNodeSingleClick={nodeEventHandler("SingleClick")}
          onNodePointerOver={nodeEventHandler("PointerOver")}
          onNodePointerOut={nodeEventHandler("PointerOut")}
          onNodeDragMove={onNodeDragMove}
          onNodeDragStart={onNodeDragStart}
          onNodeDragEnd={onNodeDragEnd}
          onCopiedToClipboard={otherProps.onCopiedToClipboard}
        />
      )
    })
  }, [
    nodeIds,
    graphState.nodes,
    graphState.adjacencyList,
    allSelections,
    focusItems,
    isFocusMode,
    selectionDescendentIntersectNodes,
    selectionAncestorNodes,
    selectionDescendentNodes,
    renderedHoverUpstream,
    nodeEventHandler,
    onNodeDragMove,
    onNodeDragStart,
    onNodeDragEnd,
    otherProps.onCopiedToClipboard,
  ])

  // --- Main Render ---

  return (
    <Box
      id="panning-drag-surface"
      // Equivalent to CSS block
      position="absolute"
      w="100%"
      h="100%"
      overflow="hidden"
      bg={spectrumColorTheme === "dark" ? "gray.900" : "gray.50"}
      // Dynamic class for dragging
      className={isDragging ? "is-dragging" : "not-dragging"}
      // Input handlers mapped to native events
      onWheel={handleWheelEvents}
      // Note: Gesture events (`gesturechange`, `gesturestart`, `gestureend`) are not standard React DOM events.
      // We map the relevant logic to the Wheel event and PointerDown/Move/Up.
      onPointerDown={handlePointerDown}
      // The drag logic is primarily handled by the controller via the dispatched events.

      // We do not render drag handlers here, as the custom gesture system is assumed to be
      // reporting results back to the controller, which then updates `appState`.
    >
      {/* Graph Grid (Refactored Component) */}
      <GraphGrid
        scale={zoom}
        posx={panX}
        posy={panY}
        theme={spectrumColorTheme}
        // Chakra Box styles for position
        position="absolute"
        top="0"
        left="0"
      />

      {/* Graph Contents (Nodes and Adjacencies) */}
      <Box
        className={`contents ${isFocusMode ? "focus-mode" : ""}`}
        // Custom transition for movement when not dragging
        css={{
          transformOrigin: "0 0",
          transition: isDragging ? "none" : "transform 0.2s",
        }}
        style={{ transform: transformMatrix }}
      >
        {/* Adjacency Lines */}
        {renderAdjacencies}

        {/* Nodes */}
        {renderNodes}
      </Box>
    </Box>
  )
}

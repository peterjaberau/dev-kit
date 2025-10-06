import { ChakraProvider, Box, useToast } from "@chakra-ui/react"
import { useGesture } from "@use-gesture/react"
import React, { useMemo, useRef, useState } from "react"
import { FaCopy } from "react-icons/fa"
import { Heading, List, ListItem, Text, Icon, HStack } from "@chakra-ui/react"

// --- START: Type Definitions & Constants ---
// (No changes needed here, keeping for completeness)
type GraphNodeId = string

interface GraphNode {
  id: GraphNodeId
  type: string
  value?: string
  x: number
  y: number
  adjacencyLabels?: Record<GraphNodeId, string>
}

interface GraphState {
  nodes: Record<GraphNodeId, GraphNode>
  adjacencyList: Record<GraphNodeId, GraphNodeId[]>
}

interface AppState {
  isDragging: boolean
  zoom: number
  panX: number
  panY: number
  selectedTokens: GraphNodeId[]
  selectedComponents: GraphNodeId[]
  selectionDescendentIntersectNodes: GraphNodeId[]
  selectionAncestorNodes: GraphNodeId[]
  selectionDescendentNodes: GraphNodeId[]
  hoverUpstreamNodes: GraphNodeId[]
  spectrumColorTheme?: string
}

const GRAPH_NODE_HEIGHT = 50
const GRAPH_NODE_WIDTH = 150
const MINIMUM_CANVAS_RENDER_SCALE = 0.2
const MAXIMUM_CANVAS_RENDER_SCALE = 3.0
const GRAPH_NODE_VALUE_HEIGHT = 20
const GRAPH_NODE_VALUE_MARGIN = 4
const GRAPH_NODE_VALUES_PADDING = 8
const ValuePathSplitter = "@"
const ValuesListSplitter = ","
type ValueTuple = [value: string, path: string]

// --- END: Type Definitions & Constants ---

// --- START: Placeholder GraphGrid & Adjacency Components ---
// (No changes needed here)
const TokenGraphAdjacency = (props: any) => {
  const d = `M ${props.fromX},${props.fromY} C ${props.fromX + 75},${props.fromY} ${props.toX - 75},${props.toY} ${props.toX},${props.toY}`
  return (
    <svg
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        overflow: "visible",
        pointerEvents: "none",
        opacity: props.isFaded ? 0.2 : 1,
        zIndex: props.isHighlighted ? 2 : 0,
      }}
    >
      <path d={d} stroke="var(--chakra-colors-gray-400)" strokeWidth="2" fill="none" />
    </svg>
  )
}
const GraphGrid = (props: any) => (
  <Box
    position="absolute"
    width="100vw"
    height="100vh"
    backgroundImage={`radial-gradient(circle at 1px 1px, var(--chakra-colors-gray-300) 1px, transparent 0)`}
    backgroundSize="20px 20px"
    backgroundPosition={`${props.posx}px ${props.posy}px`}
    opacity={0.5}
  />
)
// --- END: Placeholder GraphGrid & Adjacency Components ---

// --- START: TokenGraphNode Component ---
// (No changes needed in the TokenGraphNode component itself)
interface TokenGraphNodeProps {
  id: string
  value?: string
  type?: "token" | "component" | "orphan-category"
  isFaded?: boolean
  isIntersect?: boolean
  selected?: boolean
  selectionAncestor?: boolean
  selectionDescendent?: boolean
  hasDownstream?: boolean
  hoverUpstream?: boolean
  style: React.CSSProperties
  onNodeClick: (e: { id: string; shiftKey?: boolean; metaKey?: boolean }) => void
  onNodeDoubleClick: (e: { id: string }) => void
  onNodePointerDown: (e: { id: string }) => void
  onNodePointerOver: (e: { id: string }) => void
  onNodePointerOut: (e: { id: string }) => void
  onNodeDrag: (e: { id: string; delta: [number, number] }) => void
  onNodeDragStart: (e: { id: string }) => void
  onNodeDragEnd: (e: { id: string }) => void
  onCopyToClipboard: (e: { id: string }) => void
}
const TokenGraphNode: React.FC<TokenGraphNodeProps> = ({
  id,
  value = "",
  type = "token",
  isFaded = false,
  isIntersect = false,
  selected = false,
  selectionAncestor = false,
  selectionDescendent = false,
  hasDownstream = false,
  hoverUpstream = false,
  style,
  onNodeClick,
  onNodeDoubleClick,
  onNodePointerDown,
  onNodePointerOver,
  onNodePointerOut,
  onNodeDrag,
  onNodeDragStart,
  onNodeDragEnd,
  onCopyToClipboard,
}) => {
  const [isInteractingWithButton, setIsInteractingWithButton] = useState(false)
  const targetRef = React.useRef<HTMLDivElement>(null)
  const { decomposedValues, rowCount } = useMemo(() => {
    const values = value.split(ValuesListSplitter)
    if (values.length === 1 && values[0] === "") return { decomposedValues: [], rowCount: 1 }
    const decomposed = values.map((v): ValueTuple => {
      const parts = v.split(ValuePathSplitter)
      return [parts[0], parts[1] || ""]
    })
    return { decomposedValues: decomposed, rowCount: Math.max(decomposed.length, 1) }
  }, [value])
  const colors = useMemo(() => {
    const valuePillStyles = {
      base: { bg: "gray.100", color: "gray.800" },
      text: { bg: "gray.900", color: "gray.100" },
    }
    if (selected)
      return {
        bg: "yellow.400",
        color: "black",
        iconColor: "black",
        valuePill: { base: { bg: "yellow.100", color: "yellow.800" }, text: { bg: "yellow.800", color: "yellow.100" } },
      }
    let hue = "gray"
    let fillValue = 200
    if (type === "token") {
      hue = selectionDescendent ? "purple" : "purple"
      if (isIntersect || (selectionDescendent && selectionAncestor)) {
        hue = "orange"
        fillValue = 400
      }
    } else if (type === "component") {
      hue = "gray"
      if (hasDownstream) fillValue = 300
    } else if (type === "orphan-category") {
      hue = "cyan"
      if (hasDownstream) fillValue = 300
    }
    if (isFaded) fillValue = Math.max(100, fillValue - 100)
    const textColorShade = fillValue > 400 ? "white" : "black"
    const iconColor = hoverUpstream ? "white" : textColorShade
    return { bg: `${hue}.${fillValue}`, color: textColorShade, iconColor, valuePill: valuePillStyles }
  }, [selected, type, isFaded, isIntersect, selectionAncestor, selectionDescendent, hasDownstream, hoverUpstream])
  const nodeHeight =
    rowCount * GRAPH_NODE_VALUE_HEIGHT + (rowCount - 1) * GRAPH_NODE_VALUE_MARGIN + GRAPH_NODE_VALUES_PADDING * 2
  useGesture(
    {
      onDrag: ({ event, delta, first, last, ctrlKey, metaKey, shiftKey, altKey }) => {
        if (!isInteractingWithButton && (ctrlKey || metaKey || shiftKey || altKey)) {
          if (first) onNodeDragStart({ id })
          onNodeDrag({ id, delta })
          if (last) onNodeDragEnd({ id })
        }
      },
      onClick: ({ event, shiftKey, metaKey }) => {
        if (!isInteractingWithButton) {
          event.stopPropagation()
          onNodeClick({ id, shiftKey, metaKey })
        }
      },
      onDoubleClick: ({ event }) => {
        if (!isInteractingWithButton) {
          event.stopPropagation()
          onNodeDoubleClick({ id })
        }
      },
      onHover: ({ hovering }) => {
        if (hovering) onNodePointerOver({ id })
        else onNodePointerOut({ id })
      },
      onPointerDown: () => {
        onNodePointerDown({ id })
      },
    },
    { target: targetRef, eventOptions: { passive: false } },
  )
  const handleCopyToClipboard = (e: React.MouseEvent) => {
    e.stopPropagation()
    navigator.clipboard.writeText(id).then(() => onCopyToClipboard({ id }))
  }
  return (
    <Box style={style} position="absolute">
      <HStack
        ref={targetRef}
        w={`${GRAPH_NODE_WIDTH}px`}
        h={`${nodeHeight}px`}
        bg={colors.bg}
        color={colors.color}
        borderRadius="md"
        px={2}
        alignItems="center"
        justifyContent="space-between"
        userSelect="none"
        boxShadow={selected ? "0 0 0 2px var(--chakra-colors-blue-400)" : "md"}
        sx={{ ".copy-icon": { display: "none" }, ":hover .copy-icon": { display: "flex" } }}
      >
        <HStack flex={1} overflow="hidden">
          <Box
            className="copy-icon"
            as="button"
            aria-label="Copy ID"
            onPointerDown={() => setIsInteractingWithButton(true)}
            onPointerUp={() => setIsInteractingWithButton(false)}
            onClick={handleCopyToClipboard}
            bg="transparent"
            border="none"
            p={1}
            cursor="pointer"
          >
            <Icon as={FaCopy} color={colors.iconColor} opacity={0.7} _hover={{ opacity: 1 }} />
          </Box>
          <Heading size="xs" isTruncated pointerEvents="none" pl={1}>
            {id}
          </Heading>
        </HStack>
        {decomposedValues.length > 0 && (
          <List.Root
            as="ol"
            gap={`${GRAPH_NODE_VALUE_MARGIN}px`}
            pointerEvents="none"
            css={{ listStyleType: "none", padding: 0, margin: 0 }}
          >
            {decomposedValues.map(([value, path], index) => (
              <List.Item key={index} h={`${GRAPH_NODE_VALUE_HEIGHT}px`}>
                <HStack spacing={0}>
                  <Text
                    fontSize="xs"
                    px={2}
                    lineHeight={`${GRAPH_NODE_VALUE_HEIGHT}px`}
                    bg={colors.valuePill.base.bg}
                    color={colors.valuePill.base.color}
                    borderLeftRadius="sm"
                  >
                    {path || "*"}
                  </Text>
                  <Text
                    fontSize="xs"
                    fontWeight="bold"
                    px={2}
                    lineHeight={`${GRAPH_NODE_VALUE_HEIGHT}px`}
                    bg={colors.valuePill.text.bg}
                    color={colors.valuePill.text.color}
                    borderRightRadius="sm"
                  >
                    {value}
                  </Text>
                </HStack>
              </List.Item>
            ))}
          </List.Root>
        )}
      </HStack>
    </Box>
  )
}
// --- END: TokenGraphNode Component ---

// --- START: TokenGraph Component ---
// We need to add props for all the node event handlers
interface TokenGraphProps extends TokenGraphNodeProps {
  appState: AppState
  graphState: GraphState
  onSetPanningPosition: (pos: { x: number; y: number }) => void
  onSetZoom: (zoom: { value: number }) => void
  onPanningInputDelta: (delta: { x: number; y: number }) => void
  onGenericGestureStart: () => void
  onGenericGestureEnd: () => void
}
const TokenGraph: React.FC<Partial<TokenGraphProps>> = ({
  appState,
  graphState,
  onSetPanningPosition,
  onSetZoom,
  onPanningInputDelta,
  onGenericGestureStart,
  onGenericGestureEnd,
  // Make sure to accept and pass down all the node-related handlers
  ...nodeHandlers
}) => {
  const targetRef = useRef<HTMLDivElement>(null)
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
  } = appState!
  const { nodeIds, adjacencyTuples } = useMemo(() => {
    const { nodes, adjacencyList } = graphState!
    if (!nodes || !adjacencyList) return { nodeIds: [], adjacencyTuples: [] }
    const tuples: [GraphNodeId, GraphNodeId][] = []
    for (const fromId in adjacencyList) {
      adjacencyList[fromId].forEach((toId) => tuples.push([fromId, toId]))
    }
    return { nodeIds: Object.keys(nodes), adjacencyTuples: tuples }
  }, [graphState])
  useGesture(
    {
      onDrag: ({ delta: [dx, dy], first, last }) => {
        if (first) onGenericGestureStart!()
        onPanningInputDelta!({ x: dx, y: dy })
        if (last) onGenericGestureEnd!()
      },
      onWheel: ({ event, delta: [dx, dy], ctrlKey, first, last }) => {
        event.preventDefault()
        if (first) onGenericGestureStart!()
        if (ctrlKey) {
          const oldZoom = appState!.zoom
          let newZoom = oldZoom + -dy * 0.005 * oldZoom
          newZoom = Math.min(MAXIMUM_CANVAS_RENDER_SCALE, Math.max(MINIMUM_CANVAS_RENDER_SCALE, newZoom))
          const zoomDiff = newZoom / appState!.zoom
          const newPanX = event.pageX + (appState!.panX - event.pageX) * zoomDiff
          const newPanY = event.pageY + (appState!.panY - event.pageY) * zoomDiff
          onSetPanningPosition!({ x: newPanX, y: newPanY })
          onSetZoom!({ value: newZoom })
        } else {
          onPanningInputDelta!({ x: -dx, y: -dy })
        }
        if (last) onGenericGestureEnd!()
      },
    },
    { target: targetRef, eventOptions: { passive: false } },
  )
  const focusItems = useMemo(() => {
    const allSelections = [...selectedComponents, ...selectedTokens]
    let items = selectionAncestorNodes.filter((value) => selectionDescendentNodes.includes(value))
    items = [...items, ...selectionDescendentIntersectNodes]
    return items.filter((value) => !allSelections.includes(value))
  }, [
    selectedComponents,
    selectedTokens,
    selectionAncestorNodes,
    selectionDescendentNodes,
    selectionDescendentIntersectNodes,
  ])
  const isFocusMode = focusItems.length > 0
  const transformMatrix = [zoom!.toFixed(3), 0, 0, zoom!.toFixed(3), panX!.toFixed(0), panY!.toFixed(0)].join(",")
  return (
    <Box
      ref={targetRef}
      id="panning-drag-surface"
      position="absolute"
      width="100%"
      height="100%"
      overflow="hidden"
      bg="gray.50"
      color="gray.900"
      cursor={isDragging ? "grabbing" : "grab"}
      touchAction="none"
    >
      <GraphGrid scale={zoom} posx={panX} posy={panY} theme={spectrumColorTheme} />
      <Box
        transform={`matrix(${transformMatrix})`}
        transformOrigin="0 0"
        transition={!isDragging ? "transform 0.2s" : "none"}
        position="absolute"
      >
        {adjacencyTuples.map((tuple) => {
          const [fromId, toId] = tuple
          const fromNode = graphState!.nodes[fromId]
          const toNode = graphState!.nodes[toId]
          if (!fromNode || !toNode) return null
          return (
            <TokenGraphAdjacency
              key={`${fromId}:${toId}`}
              fromX={fromNode.x + GRAPH_NODE_WIDTH}
              fromY={fromNode.y + GRAPH_NODE_HEIGHT / 2}
              toX={toNode.x}
              toY={toNode.y + GRAPH_NODE_HEIGHT / 2}
            />
          )
        })}
        {/*
         *
         * ▼▼▼▼▼ THE FIX IS HERE ▼▼▼▼▼
         * We are now spreading the `...nodeHandlers` object onto each TokenGraphNode.
         * This object contains onNodePointerOver, onNodeClick, etc.
         *
         */}
        {nodeIds.map((id) => {
          const { type, value = "", x, y } = graphState!.nodes[id]
          const isSelected = selectedTokens.includes(id) || selectedComponents.includes(id)
          return (
            <TokenGraphNode
              key={id}
              style={{ transform: `translate(${x}px, ${y}px)` }}
              isSelected={isSelected}
              type={type as any}
              id={id}
              value={value}
              {...nodeHandlers}
            />
          )
        })}
      </Box>
    </Box>
  )
}
// --- END: TokenGraph Component ---

// --- START: Main App Component ---
const initialGraphState: GraphState = {
  nodes: {
    "node-1": { id: "node-1", type: "token", x: 50, y: 50, value: "16px@font.size" },
    "node-2": { id: "node-2", type: "component", x: 400, y: 150 },
    "node-3": { id: "node-3", type: "token", x: 50, y: 250, value: "#FFF@color.white" },
    "node-4": { id: "node-4", type: "token", x: 400, y: 350, value: "Solid@border.style" },
  },
  adjacencyList: { "node-1": ["node-2", "node-3"], "node-3": ["node-4"] },
}
const initialAppState: AppState = {
  isDragging: false,
  zoom: 1.0,
  panX: 50,
  panY: 50,
  selectedTokens: ["node-3"],
  selectedComponents: [],
  selectionDescendentIntersectNodes: [],
  selectionAncestorNodes: [],
  selectionDescendentNodes: [],
  hoverUpstreamNodes: [],
}

function App() {
  const [appState, setAppState] = useState<AppState>(initialAppState)
  const [graphState, setGraphState] = useState<GraphState>(initialGraphState)
  const toast = useToast()

  // --- Handlers for TokenGraph ---
  const handleSetPanningPosition = ({ x, y }: { x: number; y: number }) =>
    setAppState((p) => ({ ...p, panX: x, panY: y }))
  const handleSetZoom = ({ value }: { value: number }) => setAppState((p) => ({ ...p, zoom: value }))
  const handlePanningInputDelta = ({ x, y }: { x: number; y: number }) =>
    setAppState((p) => ({ ...p, panX: p.panX + x, panY: p.panY + y }))
  const handleGenericGestureStart = () => setAppState((p) => ({ ...p, isDragging: true }))
  const handleGenericGestureEnd = () => setAppState((p) => ({ ...p, isDragging: false }))

  // ---
  // --- ▼▼▼▼▼ NEW HANDLERS FOR TokenGraphNode ▼▼▼▼▼
  // --- These functions will now be passed down to satisfy the props.
  // ---
  const handleNodePointerOver = ({ id }: { id: string }) => console.log(`Hovering over node: ${id}`)
  const handleNodePointerOut = ({ id }: { id: string }) => console.log(`Stopped hovering over node: ${id}`)
  const handleNodeClick = ({ id, shiftKey }: { id: string; shiftKey?: boolean }) => {
    console.log(`Clicked node: ${id}`, { shiftKey })
    // Example interaction: toggle selection
    setAppState((p) => ({
      ...p,
      selectedTokens: p.selectedTokens.includes(id)
        ? p.selectedTokens.filter((tokenId) => tokenId !== id)
        : [...p.selectedTokens, id],
    }))
  }
  const handleNodeDoubleClick = ({ id }: { id: string }) =>
    toast({ title: `Double-clicked ${id}`, status: "info", duration: 2000 })
  const handleCopyToClipboard = ({ id }: { id: string }) =>
    toast({ title: `Copied "${id}" to clipboard!`, status: "success", duration: 2000 })

  // Placeholder handlers for other events
  const handleNodePointerDown = ({ id }: { id: string }) => console.log(`Pointer down on ${id}`)
  const handleNodeDragStart = ({ id }: { id: string }) => console.log(`Started dragging ${id}`)
  const handleNodeDragEnd = ({ id }: { id: string }) => console.log(`Finished dragging ${id}`)
  const handleNodeDrag = ({ id, delta }: { id: string; delta: [number, number] }) => {
    // Example: Move the node while dragging
    setGraphState((g) => {
      const newNodes = { ...g.nodes }
      const node = newNodes[id]
      // Note: The delta needs to be scaled by the current zoom level!
      node.x += delta[0] / appState.zoom
      node.y += delta[1] / appState.zoom
      return { ...g, nodes: newNodes }
    })
  }

  return (
    <ChakraProvider>
      <Box position="relative" w="100vw" h="100vh" bg="gray.100">
        <TokenGraph
          appState={appState}
          graphState={graphState}
          onSetPanningPosition={handleSetPanningPosition}
          onSetZoom={handleSetZoom}
          onPanningInputDelta={handlePanningInputDelta}
          onGenericGestureStart={handleGenericGestureStart}
          onGenericGestureEnd={handleGenericGestureEnd}
          // Pass all the new node handlers to TokenGraph
          onNodeClick={handleNodeClick}
          onNodeDoubleClick={handleNodeDoubleClick}
          onNodePointerOver={handleNodePointerOver}
          onNodePointerOut={handleNodePointerOut}
          onCopyToClipboard={handleCopyToClipboard}
          onNodePointerDown={handleNodePointerDown}
          onNodeDrag={handleNodeDrag}
          onNodeDragStart={handleNodeDragStart}
          onNodeDragEnd={handleNodeDragEnd}
        />
      </Box>
    </ChakraProvider>
  )
}

export default App

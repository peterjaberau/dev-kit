"use client"
import React, { useMemo, useRef } from "react"

import { Box } from "@chakra-ui/react"

import { TokenGraphNode } from "./TokenGraphNode"
import { TokenGraphAdjacency } from "./TokenGraphAdjacency"
import { GraphGrid } from "./GraphGrid"
import { useGesture } from "@use-gesture/react"

import { GraphNodeId, GraphNode, GraphState, AppState, AdjacencyTuple, TokenGraphNodeProps } from "./shared/types"

import {
  GRAPH_NODE_HEIGHT,
  GRAPH_NODE_WIDTH,
  MINIMUM_CANVAS_RENDER_SCALE,
  MAXIMUM_CANVAS_RENDER_SCALE,
} from "./shared/constants"

interface TokenGraphProps extends TokenGraphNodeProps {
  appState: AppState
  graphState: GraphState
  onSetPanningPosition: (pos: { x: number; y: number }) => void
  onSetZoom: (zoom: { value: number }) => void
  onPanningInputDelta: (delta: { x: number; y: number }) => void
  onGenericGestureStart: () => void
  onGenericGestureEnd: () => void
  [key: string]: any
}

export const TokenGraph: React.FC<Partial<TokenGraphProps>> = ({
  appState,
  graphState,
  onSetPanningPosition,
  onSetZoom,
  onPanningInputDelta,
  onGenericGestureStart,
  onGenericGestureEnd,
  // Make sure to accept and pass down all the node-related handlers
  ...nodeHandlers
}: any) => {
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
    const { nodes, adjacencyList }: any = graphState!
    if (!nodes || !adjacencyList) return { nodeIds: [], adjacencyTuples: [] }
    const tuples: [GraphNodeId, GraphNodeId][] = []
    for (const fromId in adjacencyList) {
      adjacencyList[fromId].forEach((toId: any) => tuples.push([fromId, toId]))
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
    let items = selectionAncestorNodes.filter((value: any) => selectionDescendentNodes.includes(value))
    items = [...items, ...selectionDescendentIntersectNodes]
    return items.filter((value: any) => !allSelections.includes(value))
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
          const { type, value = "", x, y }: any = graphState!.nodes[id]
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

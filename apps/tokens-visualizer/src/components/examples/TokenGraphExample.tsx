'use client'
import React, { useState } from 'react'
import { Box } from '@chakra-ui/react'
import { TokenGraph } from '../TokenGraph'
import { nodes, adjacencyList } from '../.mock/common'

import { GraphState, GraphNodeId, AppState } from '../shared/types'
const initialGraphState: GraphState = {
  nodes: {
    "node-1": { id: "node-1", type: "token", x: 50, y: 50, value: "16px@font.size" },
    "node-2": { id: "node-2", type: "component", x: 400, y: 150 },
    "node-3": { id: "node-3", type: "token", x: 50, y: 250, value: "#FFF@color.white" },
    "node-4": { id: "node-4", type: "token", x: 400, y: 350, value: "Solid@border.style" },
  },
  adjacencyList: { "node-1": ["node-2", "node-3"], "node-3": ["node-4"] },
};


// const initialGraphState: GraphState = {
//   nodes: nodes,
//   adjacencyList: adjacencyList,
// };


//spectrumColorTheme, fullscreenMode, hoverNodeId, setFilters
const initialAppState: AppState = {
  isDragging: false, zoom: 1.0, panX: 50, panY: 50, selectedTokens: ["node-3"],
  selectedComponents: [], selectionDescendentIntersectNodes: [], selectionAncestorNodes: [],
  selectionDescendentNodes: [], hoverUpstreamNodes: [], listOfComponents: [], componentDescendentNodes: []
};


export const TokenGraphExample = () => {
  const [appState, setAppState] = useState<AppState>(initialAppState);
  const [graphState, setGraphState] = useState<GraphState>(initialGraphState);


  // --- Handlers for TokenGraph ---
  const handleSetPanningPosition = ({ x, y }: { x: number; y: number }) => setAppState(p => ({ ...p, panX: x, panY: y }));
  const handleSetZoom = ({ value }: { value: number }) => setAppState(p => ({ ...p, zoom: value }));
  const handlePanningInputDelta = ({ x, y }: { x: number; y: number }) => setAppState(p => ({ ...p, panX: p.panX + x, panY: p.panY + y }));
  const handleGenericGestureStart = () => setAppState(p => ({ ...p, isDragging: true }));
  const handleGenericGestureEnd = () => setAppState(p => ({ ...p, isDragging: false }));


  const handleNodePointerOver = ({ id }: { id: string }) => console.log(`Hovering over node: ${id}`);
  const handleNodePointerOut = ({ id }: { id: string }) => console.log(`Stopped hovering over node: ${id}`);
  const handleNodeClick = ({ id, shiftKey }: { id: string; shiftKey?: boolean }) => {
    console.log(`Clicked node: ${id}`, { shiftKey });
    // Example interaction: toggle selection
    setAppState(p => ({
      ...p,
      selectedTokens: p.selectedTokens.includes(id)
        ? p.selectedTokens.filter(tokenId => tokenId !== id)
        : [...p.selectedTokens, id]
    }))
  };
  const handleNodeDoubleClick = ({ id }: { id: string }) => console.log({ title: `Double-clicked ${id}`, status: 'info', duration: 2000 });
  const handleCopyToClipboard = ({ id }: { id: string }) => console.log({ title: `Copied "${id}" to clipboard!`, status: 'success', duration: 2000 });

  // Placeholder handlers for other events
  const handleNodePointerDown = ({ id }: { id: string }) => console.log(`Pointer down on ${id}`);
  const handleNodeDragStart = ({ id }: { id: string }) => console.log(`Started dragging ${id}`);
  const handleNodeDragEnd = ({ id }: { id: string }) => console.log(`Finished dragging ${id}`);
  const handleNodeDrag = ({ id, delta }: { id: string; delta: [number, number] }) => {
    // Example: Move the node while dragging
    setGraphState(g => {
      const newNodes = { ...g.nodes };
      const node: any = newNodes[id];
      // Note: The delta needs to be scaled by the current zoom level!
      node.x += delta[0] / appState.zoom;
      node.y += delta[1] / appState.zoom;
      return { ...g, nodes: newNodes };
    });
  };




  return (
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
  )

}

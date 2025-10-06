import React, { useEffect, useMemo } from 'react';
// Replaced bare specifiers with CDN URLs to resolve import errors
import { useMachine } from 'https://esm.sh/@xstate/react@4.0.3';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
  OnNodesChange,
  OnEdgesChange,
} from 'https://esm.sh/reactflow@11.10.1';

// The direct CSS import is replaced by a dynamic link injection below
// import 'reactflow/dist/style.css';

import { graphMachine } from '../machines/graph-machine';
import { GraphState, GraphNode as GraphNodeType } from '../models/graph-model';

// --- Custom Node Component for Styling ---

const getNodeColor = (nodeType: GraphNodeType['type']) => {
  switch (nodeType) {
    case 'component':
      return '#e0f2fe'; // sky-100
    case 'token':
      return '#dcfce7'; // green-100
    case 'orphan-category':
      return '#ffedd5'; // orange-100
    default:
      return '#f3f4f6'; // gray-100
  }
};

const getNodeBorderColor = (nodeType: GraphNodeType['type']) => {
  switch (nodeType) {
    case 'component':
      return '#0ea5e9'; // sky-500
    case 'token':
      return '#22c55e'; // green-500
    case 'orphan-category':
      return '#f97316'; // orange-500
    default:
      return '#6b7280'; // gray-500
  }
};

const CustomNode = ({ data }: { data: { label: string, type: GraphNodeType['type'], value?: string } }) => {
  const backgroundColor = useMemo(() => getNodeColor(data.type), [data.type]);
  const borderColor = useMemo(() => getNodeBorderColor(data.type), [data.type]);

  return (
    <div
      style={{
        backgroundColor,
        border: `1px solid ${borderColor}`,
        borderRadius: '8px',
        padding: '10px 15px',
        fontFamily: 'sans-serif',
        fontSize: '12px',
        minWidth: 150,
      }}
    >
      <div style={{ fontWeight: 'bold', color: borderColor }}>{data.label}</div>
      {data.value && <div style={{ marginTop: '5px', color: '#4b5563' }}>{data.value}</div>}
    </div>
  );
};

const nodeTypes = {
  custom: CustomNode,
};

// --- Main Graph Viewer Component ---

const GraphViewer = () => {
  // Initialize the state machine
  const [state, send] = useMachine(graphMachine, {
    // Provide initial filters, e.g., from URL params or a settings object
    input: { filters: ['spectrum', 'light', 'desktop'] },
  });

  const { displayGraphState } = state.context;

  // Effect to dynamically load the ReactFlow CSS file
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/reactflow@11.10.1/dist/style.css';
    document.head.appendChild(link);

    // Cleanup the link when the component unmounts
    return () => {
      document.head.removeChild(link);
    };
  }, []);


  // Effect to kick off the graph loading process once the component mounts
  useEffect(() => {
    if(state.matches('idle')) {
      send({ type: 'LOAD_GRAPH' });
    }
  }, [send, state]);

  // Memoized transformation of the machine's graph state into nodes and edges for ReactFlow
  const { nodes, edges } = useMemo(() => {
    if (!displayGraphState?.nodes) return { nodes: [], edges: [] };

    const graphNodes: Node[] = Object.values(displayGraphState.nodes).map(
      (node: GraphNodeType) => ({
        id: node.id,
        position: { x: node.x, y: node.y },
        data: { label: node.id, type: node.type, value: node.value },
        type: 'custom', // Use our custom styled node
      })
    );

    const graphEdges: Edge[] = Object.entries(
      displayGraphState.adjacencyList
    ).flatMap(([fromId, toIds]) =>
      toIds.map((toId) => ({
        id: `${fromId}->${toId}`,
        source: fromId,
        target: toId,
        animated: true,
        style: { stroke: '#9ca3af' }, // gray-400
      }))
    );

    return { nodes: graphNodes, edges: graphEdges };
  }, [displayGraphState]);


  const onNodesChange: OnNodesChange = (changes) => {
    // Future enhancement: sync drag events with the state machine
    // changes.forEach(change => {
    //   if (change.type === 'position' && change.dragging === false) {
    //     send({ type: 'NODE_DRAG_STOP', id: change.id, position: change.position });
    //   }
    // })
  };

  const onEdgesChange: OnEdgesChange = (changes) => {
    // Managed by ReactFlow for now
  };


  if (state.matches('loading') || state.matches('calculatingLayout')) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#f9fafb' }}>
        <div style={{ fontSize: '1.25rem', color: '#4b5563' }}>Loading Graph...</div>
      </div>
    );
  }

  if (state.matches('error')) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#fef2f2' }}>
        <div style={{ fontSize: '1.25rem', color: '#b91c1c', marginBottom: '1rem' }}>
          Failed to load graph.
        </div>
        <pre style={{ color: '#dc2626', background: '#fee2e2', padding: '1rem', borderRadius: '8px', maxWidth: '800px', whiteSpace: 'pre-wrap' }}>
                {state.context.error?.message || 'An unknown error occurred.'}
            </pre>
        <button
          onClick={() => send({ type: 'RETRY' })}
          style={{ marginTop: '1.5rem', padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid #dc2626', background: 'white', color: '#dc2626', cursor: 'pointer' }}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.1 }}
        className="bg-gray-50"
      >
        <Controls />
        <MiniMap nodeStrokeWidth={3} zoomable pannable />
        <Background gap={16} />
      </ReactFlow>
    </div>
  );
};

export default GraphViewer;


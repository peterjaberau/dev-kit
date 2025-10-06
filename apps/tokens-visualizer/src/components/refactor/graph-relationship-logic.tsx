import React from 'react';
import { createMachine, assign } from 'xstate';
import { useMachine } from '@xstate/react';

// --- MOCK DATA (from your mock-data.json) ---
const mockData = {
  nodes: {
    "accordion": { "type": "component", "id": "accordion" },
    "checkbox": { "type": "component", "id": "checkbox" },
    "tab-item": { "type": "component", "id": "tab-item" },
    "default-font-family": { "type": "token", "id": "default-font-family" },
    "letter-spacing": { "type": "token", "id": "letter-spacing" },
    "sans-serif-font-family": { "type": "token", "id": "sans-serif-font-family" },
    "heading": { "type": "token", "id": "heading" },
    "heading-sans-serif-font-family": { "type": "token", "id": "heading-sans-serif-font-family" },
    "action-button": { "type": "component", "id": "action-button" },
    "action-button-edge-to-hold-icon-extra-small": { "type": "token", "id": "action-button-edge-to-hold-icon-extra-small"},
  },
  adjacencyList: {
    "default-font-family": ["sans-serif-font-family"],
    "heading": ["heading-sans-serif-font-family"],
    "accordion": ["default-font-family", "letter-spacing"],
    "checkbox": ["default-font-family"],
    "action-button": ["action-button-edge-to-hold-icon-extra-small"],
    "tab-item": ["heading"]
  }
};

// --- GRAPH TRAVERSAL HELPERS (recreated from graph-controller.ts) ---

/**
 * Finds all ancestor nodes for a given set of starting nodes.
 * @param {object} adjacencyList - The graph structure.
 * @param {string[]} startNodes - The nodes to trace backwards from.
 * @returns {string[]} A unique list of ancestor nodes.
 */
const findAncestors = (adjacencyList: any, startNodes: any) => {
  const reverseAdjacencyList: any = {};
  for (const fromNode in adjacencyList) {
    for (const toNode of adjacencyList[fromNode]) {
      if (!reverseAdjacencyList[toNode]) {
        reverseAdjacencyList[toNode] = [];
      }
      reverseAdjacencyList[toNode].push(fromNode);
    }
  }

  const ancestors = new Set();
  const queue = [...startNodes];
  const visited = new Set(startNodes);

  while (queue.length > 0) {
    const currentNode = queue.shift();
    const parents = reverseAdjacencyList[currentNode] || [];
    for (const parent of parents) {
      if (!visited.has(parent)) {
        visited.add(parent);
        ancestors.add(parent);
        queue.push(parent);
      }
    }
  }
  return Array.from(ancestors);
};

/**
 * Finds all descendant nodes for a given set of starting nodes.
 * @param {object} adjacencyList - The graph structure.
 * @param {string[]} startNodes - The nodes to trace forwards from.
 * @returns {string[]} A unique list of descendant nodes.
 */
const findDescendants = (adjacencyList: any, startNodes: any) => {
  const descendants = new Set();
  const queue = [...startNodes];
  const visited = new Set(startNodes);

  while (queue.length > 0) {
    const currentNode = queue.shift();
    const children = adjacencyList[currentNode] || [];
    for (const child of children) {
      if (!visited.has(child)) {
        visited.add(child);
        descendants.add(child);
        queue.push(child);
      }
    }
  }
  return Array.from(descendants);
};

/**
 * Finds the intersection of multiple arrays of nodes.
 * @param {string[][]} arrays - An array of node arrays.
 * @returns {string[]} An array of nodes present in all input arrays.
 */
const findIntersection = (arrays: any) => {
  if (!arrays || arrays.length === 0) {
    return [];
  }
  if (arrays.length === 1) {
    return [...arrays[0]];
  }
  return arrays.reduce((a: any, b: any) => a.filter((c: any) => b.includes(c)));
};


// --- XSTATE MACHINE DEFINITION ---

const graphMachine = createMachine(
  {
    id: "graphNodeRelations",
    initial: "idle",
    context: {
      nodes: {},
      adjacencyList: {},
      listOfComponents: [],
      listOfOrphanTokens: [],
      selectedNodes: [],
      selectionAncestorNodes: [],
      selectionDescendentNodes: [],
      selectionDescendentIntersectNodes: [],
    },
    states: {
      idle: {
        on: {
          LOAD_DATA: {
            target: "ready",
            actions: "loadData",
          },
        },
      },
      ready: {
        on: {
          SELECT_NODE: {
            actions: ["toggleNodeSelection", "calculateRelations"],
          },
          CLEAR_SELECTION: {
            actions: ["clearSelection", "calculateRelations"],
          },
        },
      },
    },
  },
  {
    actions: {
      loadData: assign(({ context, event }: any) => {
        const { nodes, adjacencyList } = mockData
        const allChildren = new Set(Object.values(adjacencyList).flat())
        const allNodes = Object.keys(nodes)

        const listOfOrphanTokens = allNodes.filter(
          (nodeId) => nodes[nodeId].type === "token" && !allChildren.has(nodeId),
        )

        const listOfComponents = allNodes.filter((nodeId) => nodes[nodeId].type === "component")

        return {
          nodes,
          adjacencyList,
          listOfComponents,
          listOfOrphanTokens,
        }
      }),
      toggleNodeSelection: assign({
        selectedNodes: ({ context, event }: any) => {
          const { nodeId, isMultiSelect } = event
          const currentSelection = new Set(context.selectedNodes)

          if (!isMultiSelect) {
            // Replace selection
            return currentSelection.has(nodeId) ? [] : [nodeId]
          }

          // Add or remove from selection
          if (currentSelection.has(nodeId)) {
            currentSelection.delete(nodeId)
          } else {
            currentSelection.add(nodeId)
          }
          return Array.from(currentSelection)
        },
      }),
      clearSelection: assign({
        selectedNodes: [],
      }),
      calculateRelations: assign(({ context, event }: any) => {
        const { adjacencyList, selectedNodes } = context

        if (selectedNodes.length === 0) {
          return {
            selectionAncestorNodes: [],
            selectionDescendentNodes: [],
            selectionDescendentIntersectNodes: [],
          }
        }

        const selectionAncestorNodes = findAncestors(adjacencyList, selectedNodes)
        const selectionDescendentNodes = findDescendants(adjacencyList, selectedNodes)

        const intersectionArrays = selectedNodes.map((nodeId) => findDescendants(adjacencyList, [nodeId]))
        const selectionDescendentIntersectNodes = findIntersection(intersectionArrays)

        return {
          selectionAncestorNodes,
          selectionDescendentNodes,
          selectionDescendentIntersectNodes,
        }
      }),
    },
  },
)

// --- UI COMPONENTS ---

const NodeList = ({ title, nodes, className }) => (
  <div className={`p-4 rounded-lg shadow-md ${className}`}>
    <h3 className="font-bold text-lg mb-2 text-white border-b border-gray-600 pb-2">{title}</h3>
    <ul className="space-y-1 text-sm">
      {nodes.length > 0 ? (
        nodes.map(node => <li key={node} className="bg-gray-700 p-2 rounded">{node}</li>)
      ) : (
        <li className="text-gray-400 italic">None</li>
      )}
    </ul>
  </div>
);

const NodeButton = ({ nodeId, type, isSelected, onClick }) => {
  const typeColor = type === 'component' ? 'bg-blue-600 hover:bg-blue-500' : 'bg-green-600 hover:bg-green-500';
  const selectionStyle = isSelected ? 'ring-4 ring-yellow-400' : 'ring-2 ring-gray-600';

  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-2 rounded-md transition-all duration-150 text-white ${typeColor} ${selectionStyle}`}
    >
      <span className="font-bold">{nodeId}</span>
      <span className="text-xs text-gray-300 block">({type})</span>
    </button>
  );
};


// --- MAIN PAGE COMPONENT ---

export default function GraphExplorerPage() {
  const [state, send] = useMachine(graphMachine);
  const { context } = state;

  const handleNodeClick = (nodeId, event) => {
    send('SELECT_NODE', { nodeId, isMultiSelect: event.shiftKey || event.ctrlKey });
  };

  if (state.matches('idle')) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-200 flex items-center justify-center">
        <button
          onClick={() => send('LOAD_DATA')}
          className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg shadow-xl text-2xl"
        >
          Load Graph Data
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 p-4 sm:p-6 md:p-8 font-sans">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-white text-center">Graph Relationship State Machine</h1>
        <p className="text-center text-gray-400 mt-2">
          Click a node to select it. Use Shift/Ctrl + Click to multi-select.
        </p>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Column 1: All Nodes */}
        <div className="md:col-span-1 p-4 bg-gray-800 rounded-lg">
          <h2 className="text-xl font-semibold mb-3 text-white">All Nodes</h2>
          <div className="space-y-2 max-h-[70vh] overflow-y-auto pr-2">
            {Object.keys(context.nodes).map(nodeId => (
              <NodeButton
                key={nodeId}
                nodeId={nodeId}
                type={context.nodes[nodeId].type}
                isSelected={context.selectedNodes.includes(nodeId)}
                onClick={(e) => handleNodeClick(nodeId, e)}
              />
            ))}
          </div>
        </div>

        {/* Column 2, 3, 4: Relationship Lists */}
        <div className="md:col-span-3 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          <NodeList title="Selected Nodes" nodes={context.selectedNodes} className="bg-gray-800" />
          <NodeList title="Selection Ancestor Nodes" nodes={context.selectionAncestorNodes} className="bg-gray-800" />
          <NodeList title="Selection Descendent Nodes" nodes={context.selectionDescendentNodes} className="bg-gray-800" />
          <NodeList title="Descendent Intersection" nodes={context.selectionDescendentIntersectNodes} className="bg-gray-800" />
          <NodeList title="All Components" nodes={context.listOfComponents} className="bg-gray-800" />
          <NodeList title="Orphan Tokens" nodes={context.listOfOrphanTokens} className="bg-gray-800" />
        </div>
      </main>

      <footer className="text-center mt-8">
        <button onClick={() => send('CLEAR_SELECTION')} className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-md text-white font-semibold">
          Clear Selection
        </button>
      </footer>
    </div>
  );
}


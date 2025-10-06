import { createMachine, assign, fromCallback } from 'xstate';
import {
  GraphState,
  GraphNodeId,
  GraphNode,
  AppState,
} from '../models/graph-model';
import { StringMatchDictionaryItem } from '../workers/string-match';
import { GraphDataSource } from '../data/graph-data-source'; // Assuming path
import GraphLayoutWorker from '../workers/graph-layout?worker'; // Assuming path

// --- HELPER FUNCTIONS (Adapted from GraphController) ---

/**
 * Merges multiple source graphs into a target graph state.
 */
function assignGraphs(
  targetState: GraphState,
  ...sources: GraphState[]
): GraphState {
  const newTargetState = JSON.parse(JSON.stringify(targetState));

  sources.forEach((sourceGraph) => {
    Object.assign(newTargetState.nodes, sourceGraph.nodes);
    Object.entries(sourceGraph.adjacencyList).forEach(
      ([fromId, sourceAdjacencies]) => {
        const targetAdjacencies = newTargetState.adjacencyList[fromId];
        if (!targetAdjacencies) {
          newTargetState.adjacencyList[fromId] = sourceAdjacencies;
        } else {
          newTargetState.adjacencyList[fromId] = [
            ...new Set([...targetAdjacencies, ...sourceAdjacencies]),
          ];
        }
      }
    );
  });
  return newTargetState;
}

/**
 * Extracts a subgraph containing all nodes downstream from a given set of starting nodes.
 */
function getDownstreamGraph(
  sourceState: GraphState,
  ...startNodes: GraphNodeId[]
): GraphState {
  const resultState: GraphState = {
    ...JSON.parse(JSON.stringify(GraphModel.DEFAULT_STATE)),
    topologyKey: sourceState.topologyKey,
  };
  const nodesToAdd: string[] = [...startNodes];

  while (nodesToAdd.length > 0) {
    const id = nodesToAdd.shift() as string;
    const node = sourceState.nodes[id];
    if (!node || resultState.nodes[id]) {
      continue;
    }
    const adjacencies = sourceState.adjacencyList[id] || [];
    nodesToAdd.push(...adjacencies);
    resultState.nodes[id] = node;
    if (adjacencies.length > 0) {
      resultState.adjacencyList[id] = adjacencies;
    }
  }
  return resultState;
}

/**
 * Extracts a subgraph containing all nodes upstream from a given set of starting nodes.
 */
function getUpstreamGraph(
  sourceState: GraphState,
  ...startNodes: GraphNodeId[]
): GraphState {
  const resultState: GraphState = {
    ...JSON.parse(JSON.stringify(GraphModel.DEFAULT_STATE)),
    topologyKey: sourceState.topologyKey,
  };
  const nodesToAdd: string[] = [...startNodes];

  while (nodesToAdd.length > 0) {
    const id = nodesToAdd.shift() as string;
    const node = sourceState.nodes[id];
    if (!node || resultState.nodes[id]) {
      continue;
    }
    resultState.nodes[id] = node;
    for (const fromId in sourceState.adjacencyList) {
      const toIds = sourceState.adjacencyList[fromId];
      if (toIds.includes(id)) {
        if (!resultState.nodes[fromId]) {
          nodesToAdd.push(fromId);
        }
        const list = resultState.adjacencyList[fromId] || [];
        if (!list.includes(id)) {
          list.push(id);
          resultState.adjacencyList[fromId] = list;
        }
      }
    }
  }
  return resultState;
}


// --- XState Machine Definition ---

export interface GraphMachineContext {
  graphDataSource: GraphDataSource;
  completeGraphState: GraphState | null;
  displayGraphState: GraphState | null;
  baseDisplayGraphState: GraphState | null;
  appState: AppState;
  listOfComponents: string[];
  dictionary: StringMatchDictionaryItem[];
  error: Error | null;
}

export type GraphMachineEvent =
  | { type: 'LOAD_GRAPH' }
  | { type: 'UPDATE_FILTERS'; filters: string[] }
  | {
  type: 'UPDATE_SELECTION';
  selectedComponents?: string[];
  selectedTokens?: string[];
}
  | {
  type: 'NODE_DRAG_MOVE';
  id: GraphNodeId;
  deltaX: number;
  deltaY: number;
}
  | { type: 'RETRY' }
  | { type: 'done.invoke.fetchGraphData'; output: { completeGraphState: GraphState, listOfComponents: string[] } }
  | { type: 'done.invoke.calculateLayoutActor'; output: GraphState };

// Replicating the default state structure from the original GraphModel
const GraphModel = {
  DEFAULT_STATE: {
    width: 0,
    height: 0,
    topologyKey: "",
    nodes: {},
    adjacencyList: {},
  }
}

// Replicating the default state from AppModel
const AppModel = {
  DEFAULT_STATE: {
    panX: 0,
    panY: 0,
    zoom: 1,
    setFilters: [],
    selectedComponents: [],
    selectedTokens: [],
  }
}


export const graphMachine = createMachine(
  {
    id: 'graph',
    context: ({ input }: { input: { filters: string[] } }) => ({
      graphDataSource: new GraphDataSource(),
      completeGraphState: null,
      displayGraphState: null,
      baseDisplayGraphState: null,
      appState: { ...AppModel.DEFAULT_STATE, setFilters: input.filters },
      listOfComponents: [],
      dictionary: [],
      error: null,
    }),
    initial: 'idle',
    states: {
      idle: {
        on: {
          LOAD_GRAPH: 'loading',
        },
      },
      loading: {
        invoke: {
          id: 'fetchGraphData',
          src: 'fetchGraphData',
          input: ({ context }) => ({
            graphDataSource: context.graphDataSource,
            filters: context.appState.setFilters,
          }),
          onDone: {
            target: 'calculatingLayout',
            actions: assign({
              completeGraphState: ({ event }) => event.output.completeGraphState,
              listOfComponents: ({ event }) => event.output.listOfComponents,
              baseDisplayGraphState: ({ event }) => {
                // Logic to create base display graph
                const { nodes } = event.output.completeGraphState;
                const baseState = JSON.parse(JSON.stringify(GraphModel.DEFAULT_STATE));
                Object.values(nodes).forEach((node: any) => {
                  if(node.type === 'component' || node.type === 'orphan-category') {
                    baseState.nodes[node.id] = node;
                  }
                });
                return baseState;
              },
              dictionary: ({ event }) => {
                return Object.values(event.output.completeGraphState.nodes).map((node: any) => ({
                  value: node.id,
                  type: node.type,
                  metadata: node.value || ''
                }));
              }
            }),
          },
          onError: {
            target: 'error',
            actions: assign({ error: ({ event }) => event.error }),
          },
        },
      },
      calculatingLayout: {
        entry: 'calculateAndAssignDisplayGraph',
        invoke: {
          id: 'calculateLayoutActor',
          src: 'calculateLayoutActor',
          input: ({ context }) => ({
            displayGraphState: context.displayGraphState
          }),
          onDone: {
            target: 'ready',
            actions: assign({
              displayGraphState: ({ event }) => event.output,
            }),
          },
          onError: {
            target: 'error',
            actions: assign({ error: ({ event }) => event.error }),
          },
        },
      },
      ready: {
        on: {
          UPDATE_FILTERS: {
            target: 'loading',
            actions: assign({
              appState: ({ context, event }) => ({
                ...context.appState,
                setFilters: event.filters,
              }),
            }),
          },
          UPDATE_SELECTION: {
            target: 'calculatingLayout',
            actions: assign({
              appState: ({ context, event }) => ({
                ...context.appState,
                selectedComponents: event.selectedComponents ?? context.appState.selectedComponents,
                selectedTokens: event.selectedTokens ?? context.appState.selectedTokens,
              }),
            },
          },
          NODE_DRAG_MOVE: {
            actions: 'updateNodePosition',
          },
        },
      },
      error: {
        on: {
          RETRY: 'loading',
        },
      },
    },
    types: {
      context: {} as GraphMachineContext,
      events: {} as GraphMachineEvent,
      input: {} as { filters: string[] }
    }
  },
  {
    actions: {
      calculateAndAssignDisplayGraph: assign({
        displayGraphState: ({ context }) => {
          const { completeGraphState, baseDisplayGraphState, appState, listOfComponents } = context;

          if (!completeGraphState || !baseDisplayGraphState) return null;

          const componentIds = appState.selectedComponents.includes("ALL")
            ? [...listOfComponents]
            : appState.selectedComponents;

          const selectedTokens = appState.selectedTokens;

          const componentsDescendents = getDownstreamGraph(completeGraphState, ...componentIds);
          const tokenAncestors = getUpstreamGraph(completeGraphState, ...selectedTokens);
          const tokenDescendents = getDownstreamGraph(completeGraphState, ...selectedTokens);

          const finalGraph = assignGraphs(
            JSON.parse(JSON.stringify(baseDisplayGraphState)),
            componentsDescendents,
            tokenAncestors,
            tokenDescendents
          );

          return finalGraph;
        }
      }),
      updateNodePosition: assign({
        displayGraphState: ({ context, event }) => {
          if (event.type !== 'NODE_DRAG_MOVE' || !context.displayGraphState) {
            return context.displayGraphState;
          }
          const { id, deltaX, deltaY } = event;
          const newDisplayState = JSON.parse(JSON.stringify(context.displayGraphState));
          const node = newDisplayState.nodes[id];
          if (node) {
            node.x += deltaX / context.appState.zoom;
            node.y += deltaY / context.appState.zoom;
          }
          return newDisplayState;
        }
      })
    },
    actors: {
      fetchGraphData: fromPromise(async ({ input }) => {
        const { completeGraphState } = await input.graphDataSource.getFilteredGraphModel(input.filters);
        const listOfComponents = await input.graphDataSource.getAllComponentNames();
        return { completeGraphState, listOfComponents };
      }),
      calculateLayoutActor: fromCallback(({ sendBack, receive, input }) => {
        const worker = new GraphLayoutWorker();

        worker.onmessage = (event) => {
          sendBack({ type: 'done.invoke.calculateLayoutActor', output: event.data });
        };
        worker.onerror = (error) => {
          sendBack({ type: 'error', error });
        };

        if(input.displayGraphState){
          worker.postMessage(input.displayGraphState);
        }

        return () => {
          worker.terminate();
        };
      }),
    },
  }
);

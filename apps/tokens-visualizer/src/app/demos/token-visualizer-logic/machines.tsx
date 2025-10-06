import { assign, enqueueActions, fromPromise, setup } from "xstate"
import { nodes, adjacencies } from "#data"
import { datasourceAllTokens } from "#data"
import { FoundValuesItem, FoundSetsTraversalItem } from "#shared/types"
import { createNodePayload, getNodeAdjacencyChanges } from './utils'

export const tokenVisualiserLogicMachine = setup({
  actions: {
    setDataMock: assign(({ context, event }) => {
      return {
        ...context,
        mock: {
          ...context.mock,
          nodes: event.output.nodes,
          adjacencies: event.output.adjacencies,
        },
      }
    }),
    setAllTokens: assign(({ context, event }) => {
      context.allTokens = event.output
    }),
    setAllTokenIds: assign(({ context }) => {
      context.allTokenIds = Object.keys(context.allTokens)
    }),
    setListOfComponents: assign(({ context }) => {

      // returns all component names

      context.listOfComponents = context.allTokenIds.reduce((accumulator: any, currentItem: any) => {
        const component = context.allTokenIds[currentItem].component
        if (component && accumulator.indexOf(component) === -1) {
          accumulator.push(component)
        }
        return accumulator
      }, [] as string[])
    }),

    generatingGraphNodes: assign(({ context }) => {

      const { allTokenIds, allTokens, listOfComponents, graph } = context
      const { nodes, adjacencyList } = graph

      const nodeIds: any[] = allTokenIds

      for (let index = 0; index < nodeIds.length; index++) {
        const nodeId = nodeIds[index];
        const nodeData = allTokens[nodeId];
        let foundValues: FoundValuesItem[] = [];
        let foundSets: FoundSetsTraversalItem[] = []
        let nodeComponents: any = {}
        let nodeAdjacencyChanges: any = {}

        if (nodeData.value) {
          foundValues.push({ path: [], value: nodeData.value, })
        }

        if (nodeData.sets) {
          foundSets.push({ path: [], sets: nodeData.sets })
        }

        // if this node belongs to a spectrum component
        // register the component itself as a node
        // and add an adjacency from that component
        if (nodeData.component) {

          if (!nodes[nodeData.component]) {
            nodeComponents[nodeData.component] = createNodePayload(nodeData.component, "component")
          }

          nodeAdjacencyChanges = getNodeAdjacencyChanges({
            from: nodeData.component,
            to: nodeId,
            label: nodeData.value,
            adjacencyList: adjacencyList,
            nodes: nodes,
          })


        }



      }

      context.listOfComponents = context.allTokenIds.reduce((accumulator: any, currentItem: any) => {
        const component = context.allTokenIds[currentItem].component
        if (component && accumulator.indexOf(component) === -1) {
          accumulator.push(component)
        }
        return accumulator
      }, [] as string[])
    }),



    // setAllTokensSourceData
    createAdjacency: assign(({ context, event }) => {
      /**
       * @from: string (nodeId)
       * @to: string (nodeId)
       * label: string
       */

      const { from, to, label }: any = event

      return {
        ...context,
        searchQuery: event.payload.searchQuery,
        searchResults: event.payload.searchResults,
      }
    }),

    updateSearch: assign(({ context, event }) => {
      return {
        ...context,
        searchQuery: event.payload.searchQuery,
        searchResults: event.payload.searchResults,
      }
    }),
    updateSelected: assign(({ context, event }) => {
      return {
        ...context,
        selected: event.payload.selected,
      }
    }),
  },

  actors: {
    getDataMock: fromPromise(async ({ input }) => {
      return {
        nodes,
        adjacencies,
      }
    }),

    getAllTokens: fromPromise(async ({ input }) => {
      return datasourceAllTokens
    }),

    generateNodesData: fromPromise(async ({ input }: any) => {
      /**
       * It will be invoked on every filter change
       * 1. get relevant context details from input
       * 2- iterate context.allTokens, and create from each token item
       *    a- value node in case the token does not has set, just value OR
       *    b- set node in case the token has sets
       *    d-
       */

      const { allTokenIds, allTokens, listOfComponents, graph } = input

      //graph.nodes current state from context
      const { nodes } = graph


      const nodeIds: any[] = allTokenIds

      for (let index = 0; index < nodeIds.length; index++) {
        const nodeId = nodeIds[index];
        const nodeData = allTokens[nodeId];
        const foundValues: FoundValuesItem[] = [];
        const foundSets: FoundSetsTraversalItem[] = []
        const components: any[] = []

        if (nodeData.value) {
          foundValues.push({
            path: [],
            value: nodeData.value,
          });
        }

        if (nodeData.sets) {
          foundSets.push({
            path: [],
            sets: nodeData.sets,
          });
        }

        if (nodeData.component) {
          components.push(nodeData.component)
        }



      }


    }),


  },
}).createMachine({
  initial: "loadingMock",
  context: ({ input }) => {
    return {
      mock: {
        nodes: [],
        adjacencies: [],
      },
      filters: ["spectrum", "light", "desktop"],
      dirty: {
        foundValues: [],
        foundSets: [],
        nodeComponents: [],
        nodeAdjacencyChanges: {}


      },
      allTokens: [],
      allTokenIds: [],
      listOfComponents: [],
      graph: {
        topologyKey: "",
        nodes: {},
        adjacencyList: {},
      }
    }
  },
  states: {
    loadingMock: {
      invoke: {
        id: "getDataMock",
        src: "getDataMock",
        input: ({ context }) => context,
        onDone: {
          target: "loadingTokens",
          actions: ["setDataMock"],
        },
        onError: {
          target: "loadingTokens",
        },
      },
    },

    loadingTokens: {
      invoke: {
        id: "getAllTokens",
        src: "getAllTokens",
        input: ({ context }) => context,
        onDone: {
          target: "ready",
          actions: enqueueActions(({ enqueue, check }) => {
            enqueue("setAllTokens")
            enqueue("setAllTokenIds")
            enqueue("setListOfComponents")
            enqueue("generatingGraphNodes")
          }),
        },
        onError: {
          target: "ready",
        },
      },
    },


    generatingNodes: {
      invoke: {
        id: "generateNodesData",
        src: "generateNodesData",
        input: ({ context }) => context,
        onDone: {
          target: "ready",
          actions: enqueueActions(({ enqueue, check }) => {
            enqueue("setAllTokens")
            enqueue("setAllTokenIds")
            enqueue("setListOfComponents")
          }),
        },
        onError: {
          target: "ready",
        },
      },
    },

    ready: {
      on: {
        "input.changed": {
          actions: ["updateSearch"],
        },
        "value.changed": {
          actions: ["updateSelected"],
        },
      },
    },
  },
})

import { createMachine, assign, setup, fromCallback, fromPromise, enqueueActions } from "xstate"
import { dictionary } from "./data/common"
import { createListCollection } from "@chakra-ui/react"
import { config } from "./defaults"
import { getCompleteSpectrumTokenJson } from "./data"

import { nearestPowerOf2, hasNode } from "./helpers"
import { randomId } from "#utils"
import { Ok, Result } from "ts-results"

import { useFilter, useListCollection } from "@chakra-ui/react"

export const appModelMachine = setup({
  types: {} as any,
  actions: {
    setFullscreenMode: assign(({ context, event }) => ({
      ...context,
      fullscreenMode: event.value,
    })),
    setIsDragging: assign(({ context, event }) => ({
      ...context,
      isDragging: event.value,
    })),
    setPan: assign(({ context, event }) => ({
      ...context,
      panX: event.x,
      panY: event.y,
    })),
    setZoom: assign(({ context, event }) => ({
      ...context,
      zoom: event.value,
    })),
    setHoverId: assign(({ context, event }) => ({
      ...context,
      hoverNodeId: event.id,
    })),
    setSetFilters: assign(({ context, event }) => ({
      ...context,
      setFilters: [...event.value],
    })),
    setSelectedComponents: assign(({ context, event }) => ({
      ...context,
      selectedComponents: [...event.value],
    })),
    setSpectrumColorTheme: assign(({ context, event }) => ({
      ...context,
      spectrumColorTheme: event.value,
    })),
    setSelectedTokens: assign(({ context, event }) => ({
      ...context,
      selectedTokens: [...event.value],
    })),
    setSelectionAncestorNodes: assign(({ context, event }) => ({
      ...context,
      selectionAncestorNodes: [...event.value],
    })),
    setSelectionDescendentNodes: assign(({ context, event }) => ({
      ...context,
      selectionDescendentNodes: [...event.value],
    })),
    setSelectionDescendentIntersectNodes: assign(({ context, event }) => ({
      ...context,
      selectionDescendentIntersectNodes: [...event.value],
    })),
    setListOfComponents: assign(({ context, event }) => ({
      ...context,
      listOfComponents: [...event.value],
    })),
    setComponentDescendentNodes: assign(({ context, event }) => ({
      ...context,
      componentDescendentNodes: [...event.value],
    })),
    setHoverUpstreamNodes: assign(({ context, event }) => ({
      ...context,
      hoverUpstreamNodes: [...event.value],
    })),
    reset: assign(() => ({
      ...config.appModel,
    })),
  },
}).createMachine({
  initial: "idle",
  context: ({ input }: any) => {
    return {
      ...config.appModel,
      ...input,
    }
  },
  states: {
    idle: {
      on: {
        SET_IS_DRAGGING: {
          target: "dragging",
          actions: "setIsDragging",
        },
        SET_FULLSCREEN_MODE: {
          target: "fullscreen",
          actions: "setFullscreenMode",
        },
        SET_PAN: { actions: "setPan" },
        SET_ZOOM: { actions: "setZoom" },
        SET_HOVER_ID: { actions: "setHoverId" },
        SET_SET_FILTERS: { actions: "setSetFilters" },
        SET_SELECTED_COMPONENTS: { actions: "setSelectedComponents" },
        SET_SPECTRUM_COLOR_THEME: { actions: "setSpectrumColorTheme" },
        SET_SELECTED_TOKENS: { actions: "setSelectedTokens" },
        SET_SELECTION_ANCESTOR_NODES: { actions: "setSelectionAncestorNodes" },
        SET_SELECTION_DESCENDENT_NODES: { actions: "setSelectionDescendentNodes" },
        SET_SELECTION_DESCENDENT_INTERSECT_NODES: { actions: "setSelectionDescendentIntersectNodes" },
        SET_LIST_OF_COMPONENTS: { actions: "setListOfComponents" },
        SET_COMPONENT_DESCENDENT_NODES: { actions: "setComponentDescendentNodes" },
        SET_HOVER_UPSTREAM_NODES: { actions: "setHoverUpstreamNodes" },
        RESET: { actions: "reset" },
      },
    },
    dragging: {
      on: {
        SET_IS_DRAGGING: {
          target: "idle",
          actions: "setIsDragging",
        },
        RESET: { target: "idle", actions: "reset" },
      },
    },
    fullscreen: {
      on: {
        SET_FULLSCREEN_MODE: {
          target: "idle",
          actions: "setFullscreenMode",
        },
        RESET: { target: "idle", actions: "reset" },
      },
    },
  },
})

export const graphModelMachine = setup({
  types: {
    context: {} as any,
    events: {} as any,
  } as any,

  actions: {
    setGraphSize: assign({
      width: ({ event }) => event.width,
      height: ({ event }) => event.height,
    }),
    resetGraph: assign(() => ({
      ...config.graphModel,
    })),
    replaceGraphState: assign(({ event }) => event.state),
    updateTopologyKey: assign({
      topologyKey: () => randomId(),
    }),

    createNode: assign({
      nodes: ({ context, event }) => ({
        ...context.nodes,
        [event.node.id]: event.node,
      }),
    }),
    updateNode: assign({
      nodes: ({ context, event }) => ({
        ...context.nodes,
        [event.id]: {
          ...context.nodes[event.id],
          ...event.properties,
        },
      }),
    }),
    deleteNode: assign(({ context, event }) => {
      const { [event.id]: _, ...remainingNodes } = context.nodes
      const { [event.id]: __, ...remainingAdjacency } = context.adjacencyList

      for (const fromNodeId in remainingAdjacency) {
        remainingAdjacency[fromNodeId] = remainingAdjacency[fromNodeId].filter((id: any) => id !== event.id)
      }
      return {
        nodes: remainingNodes,
        adjacencyList: remainingAdjacency,
      }
    }),
    createAdjacency: assign(({ context, event }) => {
      const { from, to, label } = event
      const newNodes = { ...context.nodes }
      const newAdjacencyList = { ...context.adjacencyList }

      const currentTargets = newAdjacencyList[from] || []
      if (!currentTargets.includes(to)) {
        newAdjacencyList[from] = [...currentTargets, to]
      }

      if (label) {
        const hostNode = newNodes[from]
        newNodes[from] = {
          ...hostNode,
          adjacencyLabels: {
            ...(hostNode.adjacencyLabels || {}),
            [to]: label,
          },
        }
      }

      return {
        nodes: newNodes,
        adjacencyList: newAdjacencyList,
      }
    }),
    deleteAdjacency: assign(({ context, event }) => {
      const { from, to } = event
      const currentTargets = context.adjacencyList[from]
      if (!currentTargets?.includes(to)) {
        return { adjacencyList: context.adjacencyList }
      }

      const newTargets = currentTargets.filter((targetId: any) => targetId !== to)
      const newAdjacencyList = { ...context.adjacencyList }

      if (newTargets.length > 0) {
        newAdjacencyList[from] = newTargets
      } else {
        delete newAdjacencyList[from]
      }

      return { adjacencyList: newAdjacencyList }
    }),
  },

  guards: {
    nodeExists: ({ context, event }) => !!context.nodes[event.id],
    bothNodesExist: ({ context, event }) => !!context.nodes[event.from] && !!context.nodes[event.to],
  },
}).createMachine({
  initial: "active",
  context: ({ input }: any) => ({
    ...config.graphModel,
    ...input,
  }),
  states: {
    active: {
      on: {
        "GRAPH.SET_SIZE": { actions: "setGraphSize" },
        "GRAPH.RESET": { actions: "resetGraph" },
        "GRAPH.REPLACE_STATE": { actions: "replaceGraphState" },
        "NODE.CREATE": { actions: "createNode" },
        "NODE.UPDATE": {
          guard: "nodeExists",
          actions: "updateNode",
        },
        "NODE.DELETE": {
          actions: enqueueActions(({ context, enqueue }) => {
            enqueue("deleteNode")
            enqueue("updateTopologyKey")
          }),
        },
        "ADJACENCY.CREATE": {
          guard: "bothNodesExist",
          actions: enqueueActions(({ context, enqueue }) => {
            enqueue("createAdjacency")
            enqueue("updateTopologyKey")
          }),
        },
        "ADJACENCY.DELETE": {
          actions: enqueueActions(({ context, enqueue }) => {
            enqueue("deleteAdjacency")
            enqueue("updateTopologyKey")
          }),
        },
      },
    },
  },
})

export const searchMachine = setup({
  actions: {
    setDictionary: assign(({ context, event }) => {
      context.dictionary = event.output
    }),

    updateSearch: assign(({ context, event }) => {
      return {
        ...context,
        searchQuery: event.payload.searchQuery,
        searchResults: event.payload.searchResults,
      }
    }),
  },

  actors: {
    getDictionary: fromPromise(async ({ input }) => {
      return await dictionary
    }),
  },
}).createMachine({
  initial: "loading",
  context: ({ input }) => {
    return {
      collection: [],
      dictionary: [],
      searchResults: [],
      searchQuery: "",
      targetIndex: 0,
      ...input,
    }
  },
  states: {
    loading: {
      invoke: {
        id: "getDictionary",
        src: "getDictionary",
        input: ({ context }) => context,
        onDone: {
          target: "ready",
          actions: ["setDictionary"],
        },
        onError: {
          target: "ready",
        },
      },
    },

    ready: {
      on: {
        "search.changed": {
          actions: ["updateSearch"],
        },
      },
    },
  },
})

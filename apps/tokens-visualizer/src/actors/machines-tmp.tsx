import { createMachine, assign, setup, fromCallback, fromPromise, enqueueActions } from "xstate"
import { config } from "./defaults"
import { getCompleteSpectrumTokenJson } from "./data"
import { nearestPowerOf2, hasNode } from "./helpers"
import { randomId } from "#utils"
import { Ok, Result } from "ts-results"

export const graphGridMachine = setup({
  types: {} as any,
  actions: {
    updateProps: assign(({ context, event }: any) => {
      return {
        ...context,
        props: {
          ...context.props,
          ...event,
        },
      }
    }),
    computeTheme: assign(({ context }) => {
      const { scale, posx, posy, colorTheme, size }: any = context.props

      let result = context.colorThemeObj

      switch (colorTheme) {
        case "dark":
          result = {
            lineColorR: 40,
            lineColorG: 40,
            lineColorB: 40,
            backgroundColor: "#000000",
          }
        case "light":
        case "wireframe":
          result = {
            lineColorR: 230,
            lineColorG: 230,
            lineColorB: 230,
            backgroundColor: "#FFFFFF",
          }
        case "paper":
        default:
          result = {
            lineColorR: 167,
            lineColorG: 220,
            lineColorB: 240,
            backgroundColor: "#F5FFFA",
          }
      }

      context.colorThemeObj = result
    }),
    computeStyles: assign(({ context }: any) => {
      const { scale, posx, posy, colorTheme, size }: any = context.props
      const { maximumRepeatingTileSize, lineWidth, cellFadeOutThresh }: any = context.constants
      const { lineColorR, lineColorG, lineColorB, backgroundColor }: any = context.colorThemeObj

      const baseScale = maximumRepeatingTileSize / (size * 4)

      const scaleDiff = scale / baseScale

      const cellSizePx = scaleDiff * maximumRepeatingTileSize

      let actualMaxTileSize = maximumRepeatingTileSize

      if (cellSizePx > maximumRepeatingTileSize) {
        actualMaxTileSize = cellSizePx
      }

      const cellCount = Math.min(16, nearestPowerOf2(actualMaxTileSize / cellSizePx))

      const tileSize = cellSizePx * cellCount

      const remainderRatio = Math.max(
        0,
        2 * ((actualMaxTileSize - actualMaxTileSize + tileSize) / actualMaxTileSize) - 0.5,
      )

      const lastHalfRemainder = Math.max(0, remainderRatio * 2 - 1)

      const dynamicCenterLineAlpha = 0.5 + 0.5 * lastHalfRemainder

      const gradientStops = Array.from({ length: cellCount }, (_, i) => {
        const lineIn = i * cellSizePx
        const lineOut = lineIn + lineWidth
        const transparentIn = lineOut
        const transparentOut = (i + 1) * cellSizePx

        let lineAlpha: number | any
        if (i === 0) {
        } else if (i % 8 === 0) {
          lineAlpha = 1
        } else if (i === cellCount / 2) {
          lineAlpha = dynamicCenterLineAlpha
        } else {
          lineAlpha = 0.5
        }

        const lineColor = `rgba(${lineColorR},${lineColorG},${lineColorB},${lineAlpha.toFixed(2)})`

        return `${lineColor} ${lineIn.toFixed(1)}px,
              ${lineColor} ${lineOut.toFixed(1)}px,
              transparent ${transparentIn.toFixed(1)}px,
              transparent ${transparentOut.toFixed(1)}px`
      }).join(", ")

      // when the cells get small, start making the entire grid more transparent
      const fadeOutRatio = Math.sqrt(Math.min(1, cellSizePx / cellFadeOutThresh))
      const opacity = 0.1 + 0.9 * fadeOutRatio // floor opacity of 0.1

      context.gridStylesObj = {
        backgroundImage: `linear-gradient(to right, ${gradientStops}), linear-gradient(to bottom, ${gradientStops})`,
        backgroundSize: `${tileSize.toFixed(2)}px ${tileSize.toFixed(2)}px`,
        backgroundPosition: `${posx.toFixed(2)}px ${posy.toFixed(2)}px`,
        opacity: opacity,
      }
    }),
  },
  actors: {},
  guards: {},
}).createMachine({
  initial: "initiating",
  context: ({ input }: any) =>
    ({
      constants: config.graphGrid.constants,
      props: config.graphGrid.props,
      colorThemeObj: {
        lineColorR: null,
        lineColorG: null,
        lineColorB: null,
        backgroundColor: null,
      },
      gridStylesObj: {
        backgroundImage: null,
        backgroundSize: null,
        backgroundPosition: null,
        opacity: null,
      },
      ...input,
    }) as any,
  entry: enqueueActions(({ enqueue, check }: any) => {
    enqueue("computeTheme")
    enqueue("computeStyles")
  }),
  states: {
    ready: {
      on: {
        update: {
          actions: enqueueActions(({ enqueue, check }: any) => {
            enqueue("updateProps")
            enqueue("computeTheme")
            enqueue("computeStyles")
          }),
        },
      },
    },
  },
})

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

export const graphDataSourceMachine = setup({
  types: {} as any,
  actions: {
    updateProps: assign(({ context, event }: any) => {
      return {
        ...context,
        props: {
          ...context.props,
          ...event,
        },
      }
    }),
  },
  actors: {
    getCompleteSpectrumTokenJson: fromPromise(async ({ input }) => {
      return await getCompleteSpectrumTokenJson()
    }),
  },
  guards: {},
}).createMachine({
  initial: "idle",
  context: ({ input }: any) => {
    return {
      listOfComponents: [],
      listOfOrphanTokens: [],
      ...input,
    }
  },
  states: {
    idle: {
      on: {
        update: {
          actions: enqueueActions(({ enqueue, check }: any) => {
            enqueue("updateProps")
          }),
        },
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

export const graphMachine = setup({
  types: {
    context: {} as any,
    events: {} as any,
  } as any,

  actions: {
    updateAllTokens: assign(({ context, event }) => {
      return {
        ...context,
        allTokens: event.output,
        allTokenIds: Object.keys(event.output),
      }
    }),
    generateListOfComponents: assign(({ context }) => {
      const results = context.allTokenIds.reduce((accumulator, currentItem) => {
        const component = context.allTokens[currentItem].component
        if (component && accumulator.indexOf(component) === -1) {
          accumulator.push(component)
        }
        return accumulator
      }, [] as string[])

      context.listOfComponents = results
    }),


    getFilteredTokens: assign(({ context, event }) => {

      let results: any = {};

      const filters: any[] = event.filters

      const nodeIds = context.allTokenIds
      const allTokens = context.allTokens

      for (let index = 0; index < nodeIds.length; index++) {
        const nodeId = nodeIds[index];
        const nodeData = allTokens[nodeId];
        const foundValues: { path: string[], value: string }[] = [];
        const foundSets: any[] = [];

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

        // if this node belongs to a spectrum component
        // register the component itself as a node
        // and add an adjacency from that component
        // to this node
        if (nodeData.component) {
          // add the component node only if it does not yet exist
          if (results.hasNode(nodeData.component) === false) {
            results.createNode({
              type: "component",
              id: nodeData.component,
              x: 0,
              y: 0,
            });
            this.listOfComponents.push(nodeData.component);
          }

          // add the adjacency between the component and this node
          results.createAdjacency(nodeData.component, nodeId);
        }

        // use a data structure here to keep track
        // of the SET access path used to access the mapped
        // values that are ultimately found for this
        // token...

        while (foundSets.length > 0) {
          const foundSetsTraversalItem =
            foundSets.pop() as FoundSetsTraversalItem;
          const foundSet = foundSetsTraversalItem.sets;
          const foundPath = foundSetsTraversalItem.path;

          filters.forEach((filterValue) => {
            const filteredItem = foundSet[filterValue] as RawJsonItem | undefined;
            const thisPath = [...foundPath, filterValue];
            if (filteredItem) {
              if (filteredItem.value) {
                foundValues.push({
                  path: thisPath,
                  value: filteredItem.value,
                });
                // foundValues.push(`${filteredItem.value} (${thisPath.join(',')})`);
              }
              if (filteredItem.sets) {
                foundSets.push({
                  path: thisPath,
                  sets: filteredItem.sets,
                });
              }
            }
          });
        }

        if (foundValues.length === 0) {
          // console.warn('FAILED TO FIND VALUE FOR', nodeId, nodeData);
        }

        // First, we add this BARE NODE to the graph
        // with no value or downstream adjaciencies...
        //
        // This means the graph will ALWAYS have ALL NODES
        //
        results.createNode({
          type: "token",
          id: nodeId,
          x: 0,
          y: 0,
        });

        // depending on the filter selections,
        // a given node may have more than one
        // value or downstream adjacency
        // so here we add all appropriate nodes
        // and adjacencies to the graph...
        const rawValues: string[] = [];
        foundValues.forEach((foundValueItem) => {
          const valuePath = foundValueItem.path;
          let foundValue = foundValueItem.value.toString();
          // is this found value a downstream adjacency?
          // if so, add it to the graph...
          if (
            foundValue.charAt(0) + foundValue.charAt(foundValue.length - 1) ===
            "{}"
          ) {
            const referencedNodeId = foundValue.substring(
              1,
              foundValue.length - 1,
            );
            // add the adjacency
            // DOES this adjacency ALREADY exist?  If so, merge the valuePath arrays so that
            // we can display the full list of unique values...
            const currentSourceNode = results._state.nodes[nodeId];
            const adjacencyLabels = currentSourceNode.adjacencyLabels
              ? currentSourceNode.adjacencyLabels
              : {};
            const currentLabel = adjacencyLabels[referencedNodeId] || "";
            const currentLabelValues =
              currentLabel.length > 0 ? currentLabel.split(",") : [];
            const newUniqeValues = [
              ...new Set([...currentLabelValues, ...valuePath]),
            ];
            results.createAdjacency(
              nodeId,
              referencedNodeId,
              newUniqeValues.join(","),
            );
            // ELSE, it is an actual value...
          } else {
            if (valuePath.length > 0) {
              foundValue += `${ValuePathSplitter}${valuePath.join(",")}`;
            }
            rawValues.push(foundValue);
          }
        });

        if (rawValues.length > 0) {
          results.updateNode(nodeId, {
            value: rawValues.join(ValuesListSplitter),
          });
        }
      }


    }),
  },

  actors: {
    getCompleteSpectrumTokenJson: fromPromise(async ({ input }) => {
      // return await getCompleteSpectrumTokenJson()
      // await new Promise((resolve: any) => setTimeout(resolve, 1_00));
      return new Ok(getCompleteSpectrumTokenJson())
    }),
  },

  guards: {
    hasComponents: ({ context }) => context.listOfComponents.length > 0,
  },
}).createMachine({
  initial: "loading",
  context: ({ input }: any) => ({
    width: 0,
    height: 0,
    topologyKey: "",
    allTokens: {},
    allTokenIds: {},
    adjacencyList: {},
    adjacencyKeys: [],
    nodes: {},
    listOfComponents: [],
    listOfOrphanTokens: [],
    ...input,
  }),
  states: {
    ready: {
      on: {
        filter: {
          actions: ["getFilteredTokens"]
        }
      }
    },

    loading: {
      invoke: {
        id: "getCompleteSpectrumTokenJson",
        src: "getCompleteSpectrumTokenJson",
        input: ({ context }) => context,
        onDone: {
          target: "synching",
          actions: ["updateAllTokens"],
        },
        onError: {},
      },
    },
    synching: {
      entry: enqueueActions(({ context, enqueue, check }) => {
        if (!check({ type: "hasComponents" })) {
          enqueue("generateListOfComponents")
        }
      }),
    },



  },
})


export const dataSourceMachine = setup({
  types: {
    context: {} as any,
    events: {} as any,
  } as any,

  actions: {
    updateTokens: assign(({ context, event }) => {
      return {
        ...context,
        allTokens: event.output,
        allTokenIds: Object.keys(event.output),
      }
    }),
    updateComponents: assign(({ context }) => {
      const results = context.allTokenIds.reduce((accumulator, currentItem) => {
        const component = context.allTokens[currentItem].component
        if (component && accumulator.indexOf(component) === -1) {
          accumulator.push(component)
        }
        return accumulator
      }, [] as string[])

      context.listOfComponents = results
    }),
  },

  actors: {
    getCompleteSpectrumTokenJson: fromPromise(async ({ input }) => {
      // return await getCompleteSpectrumTokenJson()
      // await new Promise((resolve: any) => setTimeout(resolve, 1_00));
      return new Ok(getCompleteSpectrumTokenJson())
    }),
  },

  guards: {
    hasComponents: ({ context }) => context.listOfComponents.length > 0,
  },
}).createMachine({
  initial: "loading",
  context: ({ input }: any) => ({
    allTokens: {},
    allTokenIds: {},
    listOfComponents: [],
    ...input,
  }),
  states: {
    ready: {
      on: {
        filter: {
          actions: assign(({ context, event }) => {
            console.log('---filter---', event)
          })
        }
      }
    },

    loading: {
      invoke: {
        id: "getCompleteSpectrumTokenJson",
        src: "getCompleteSpectrumTokenJson",
        input: ({ context }) => context,
        onDone: {
          target: "ready",
          actions: enqueueActions(({ context, enqueue, check }) => {
            enqueue("updateTokens")
            enqueue("updateComponents")
          }),
        },
        onError: {
          target: "ready",
        },
      },
    },



  },
})







const appMachine = setup({
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
  context: (({ input }) => {
    return {
      ...config.appModel,
      ...input,
    }
  }),
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
  }
})



import { assign, enqueueActions, raise, setup, createMachine, sendTo } from "xstate"
import { currentAppExampleConfig, nodeManagerConfig } from "#actors/model/shared/config"
import { applyDefaultLayout, dockviewApiEvents } from "#actors/model/actions"
// import { currentAppExampleMachine } from "./current-app.machine"

const defaultConfig = {
  demo: currentAppExampleConfig.configDemo,
  domainDrivenDock: currentAppExampleConfig.domainDrivenDock,
  domain: currentAppExampleConfig.domainStore,
  dockViewConfig: currentAppExampleConfig.dockViewConfig,
}

export const nodeMachine = setup({
  types: {} as any,
  actions: {
    addPanelPayload: assign(({ context }) => {
      const node = context.input.node
      context.view = {
        id: node.id,
        component: node.view.component,
        title: node.view.title,
        renderer: node.view.renderer,
        position: node.view.position,
        params: {
          id: node.id,
          parentRef: context.parentRef,
          input: context.input,
        },
      }
    }),
    addPanel: ({ context }) => {
      const api = context.input.api
      api?.addPanel(context.view)
    },
  },
  actors: {},
  guards: {},
}).createMachine({
  initial: "initiating",
  context: ({ input, self }: any) => {
    return {
      parentRef: self,
      view: null,
      model: {},
      input: {
        api: input.api,
        node: input.node,
      },
    }
  },
  states: {
    initiating: {
      entry: enqueueActions(({ enqueue }) => {
        enqueue("addPanelPayload")
        enqueue("addPanel")
      }),
      always: {
        target: "idle",
      },
    },
    idle: {
      on: {},
    },
  },
})

export const nodeApiDockMachine = setup({
  actions: {
    handleResetLayout: ({ context }) => {
      const { api, defaultConfig } = context
      if (api) {
        try {
          api.clear()
          applyDefaultLayout({ api, defaultConfig })
        } catch (err) {
          console.error("failed to reset layout", err)
        } finally {
          localStorage.removeItem("dv-demo-state")
        }
      }
    },
    handleClearLayout: ({ context }) => {
      context.api?.clear()
    },
    handleSaveLayout: ({ context }) => {
      if (context.api) {
        const state = context.api.toJSON()
        localStorage.setItem("dv-demo-state", JSON.stringify(state))
      }
    },
    handleLoadLayout: ({ context }) => {
      const state = localStorage.getItem("dv-demo-state")
      if (state && context.api) {
        try {
          context.api.fromJSON(JSON.parse(state))
        } catch (err) {
          console.error("failed to load state", err)
          localStorage.removeItem("dv-demo-state")
        }
      }
    },
  },
  actors: {
    dockviewApiEvents,
  },
}).createMachine({
  initial: "idle",
  context: ({ input }: any) => {
    return {
      defaultConfig: { panels: [] },
      api: input.api,
    }
  },
  states: {
    initiating: {
      invoke: {
        id: "dockviewApiEvents",
        src: "dockviewApiEvents",
        input: ({ context }) => ({ api: context.api, defaultConfig: context.defaultConfig }),
        onDone: {
          target: "idle",
        },
      },
    },
    idle: {
      on: {
        onResetLayout: {
          actions: ["handleResetLayout"],
        },
        onClearLayout: {
          actions: ["handleClearLayout"],
        },
        onSaveLayout: {
          actions: ["handleSaveLayout"],
        },
        onLoadLayout: {
          actions: ["handleLoadLayout"],
        },
      },
    },
  },
})

export const nodeDockPanelMachine = setup({
  types: {} as any,
  actions: {
    prepareAddPanelPayload: assign(({ context }) => {
      const node = context.input.node
      context.view = {
        id: node.id,
        component: node.view.component,
        title: node.view.title,
        renderer: node.view.renderer,
        position: node.view.position,
        params: {
          id: node.id,
          parentRef: context.parentRef,
          input: context.input,
        },
      }
    }),
    handleAddPanel: ({ context }) => {
      const api = context.input.api
      api?.addPanel(context.view)
    },
  },
  actors: {},
  guards: {},
}).createMachine({
  initial: "idle",
  context: ({ input, self }: any) => {
    return {
      parentRef: self,
      view: null,
      model: {},
      input: {
        api: input.api,
        node: input.node,
      },
    }
  },
  states: {
    idle: {
      entry: enqueueActions(({ enqueue }) => {
        enqueue("prepareAddPanelPayload")
        enqueue("handleAddPanel")
      }),
      on: {
        addPanelCompletion: {},
        removePanelCompletion: {},
        activePanelChangeCompletion: {},
        movePanelCompletion: {},
      },
    },
  },
})

export const dockAdapterMachine = setup({
  actions: {
    handleSpawnDockApi: assign(({ context, event, spawn }) => {
      spawn("nodeApiDockMachine", {
        id: "dock-api",
        input: { api: event.api },
      })
    }),

    handleSpawnDockPanels: assign(({ context, spawn }) => {
      nodeManagerConfig.nodes.map((item: any) => {
        const spawnedNode = spawn("nodeDockPanelMachine", {
          id: item.id,
          // systemId: item.id,
          input: {
            node: item,
            api: context.api,
          },
        })
        // context.nodesRef.push(spawnedNode)
      })
    }),

  },
  actors: {
    nodeApiDockMachine,
    nodeDockPanelMachine,
  },
}).createMachine({
  initial: "initiating",
  context: ({ input }: any) => {
    return {
      api: input.api,
    }
  },
  states: {
    initiating: {
      on: {
        onReady: {
          target: "idle",

          actions: enqueueActions(({ enqueue, context, event }) => {
            enqueue("handleSpawnDockApi")
            enqueue("handleSpawnDockPanels")
          }),
        },
      },
    },
    idle: {
      entry: [

      ],
      on: {
        onAddPanel: {
          // spawn panel machine
        },
        onAddGroup: {
          // spawn group machine
        },
        onDidAddPanel: {},
        onDidRemovePanel: {},
        onDidActivePanelChange: {},
        onDidMovePanel: {},
        onDidAddGroup: {},
        onDidRemoveGroup: {},
        onDidActiveGroupChange: {},
        onDidMaximizedGroupChange: {},
        onResetLayout: {
          actions: sendTo("nodeApiDockMachine", "onResetLayout"),
        },
        onClearLayout: {},
        onSaveLayout: {},
        onLoadLayout: {},
      },
    },
  },
})

export const nodeDockGroupMachine = setup({
  types: {} as any,
  actions: {
    addGroup: ({ context }) => {
      const api = context.input.api
      api?.addGroup()
    },
  },
  actors: {},
  guards: {},
}).createMachine({
  initial: "initiating",
  context: ({ input, self }: any) => {
    return {
      parentRef: self,
      view: null,
      model: {},
      input: {
        api: input.api,
      },
    }
  },
  states: {
    initiating: {
      entry: enqueueActions(({ enqueue }) => {
        enqueue("addGroup")
      }),
      always: {
        target: "idle",
      },
    },
    idle: {
      on: {
        addGroupCompletion: {},
        removeGroupCompletion: {},
        activeGroupChangeCompletion: {},
        maximizedGroupChangeCompletion: {},
      },
    },
  },
})



export const nodeManagerMachine: any = setup({
  types: {} as any,
  actions: {
    setApi: assign(({ context, event }: any) => {
      // console.log("---event-----", event)
      context.api = event.api
      context.status.isReady = true
    }),

    addPanel: ({ context, event }: any) => {
      const idCounter = context.idCounter + 1
      context.idCounter = idCounter

      const id = event.playload?.id || `id_${Date.now().toString()}`
      const component = event.payload?.nested ? "nested" : "default"
      const title = event.payload?.title || `Tab ${idCounter}`
      const renderer = event.payload?.renderer || "always"
      const position = event.payload?.position || undefined

      // context.api?.addPanel({
      //   id: `id_${Date.now().toString()}`,
      //   component: event.payload?.nested ? "nested" : "default",
      //   title: `Tab ${idCounter}`,
      //   renderer: "always",
      //
      // })

      context.api?.addPanel({
        id: id,
        component: component,
        title: title,
        renderer: renderer,
        ...(position && { position: position }),
      })
    },
    addGroup: ({ context }) => {
      context.api?.addGroup()
    },

    addPanelCompletion: assign(({ context, event }: any) => {
      context = {
        ...context,
        panels: [...context.panels, event.payload.id],
        logLines: [...context.logLines, { text: `Panel Added ${event.payload.id}`, timestamp: new Date() }],
      }
    }),
    removePanelCompletion: assign(({ context, event }: any) => {
      context = {
        ...context,
        panels: context.panels.filter((p: string) => p !== event.payload.id),
        logLines: [...context.logLines, { text: `Panel Removed ${event.payload.id}`, timestamp: new Date() }],
      }
    }),
    activePanelChangeCompletion: assign(({ context, event }: any) => {
      context = {
        ...context,
        activePanel: event.payload?.id,
        logLines: [...context.logLines, { text: `Panel Activated ${event.payload?.id}`, timestamp: new Date() }],
      }
    }),
    movePanelCompletion: assign(({ context, event }: any) => ({
      logLines: [...context.logLines, { text: `Panel Moved ${event.payload.panel.id}`, timestamp: new Date() }],
    })),
    addGroupCompletion: assign(({ context, event }: any) => ({
      groups: [...context.groups, event.payload.id],
      logLines: [...context.logLines, { text: `Group Added ${event.payload.id}`, timestamp: new Date() }],
    })),
    removeGroupCompletion: assign(({ context, event }: any) => ({
      groups: context.groups.filter((g: string) => g !== event.payload.id),
      logLines: [...context.logLines, { text: `Group Removed ${event.payload.id}`, timestamp: new Date() }],
    })),
    activeGroupChangeCompletion: assign(({ context, event }: any) => ({
      activeGroup: event.payload?.id,
      logLines: [...context.logLines, { text: `Group Activated ${event.payload?.id}`, timestamp: new Date() }],
    })),
    maximizedGroupChangeCompletion: assign(({ context, event }: any) => ({
      logLines: [
        ...context.logLines,
        {
          text: `Group Maximized Changed ${event.payload.group.api.id} [${event.payload.isMaximized}]`,
          timestamp: new Date(),
        },
      ],
    })),

    resetLayout: ({ context }) => {
      const { api, defaultConfig } = context
      if (api) {
        try {
          api.clear()
          applyDefaultLayout({ api, defaultConfig })
        } catch (err) {
          console.error("failed to reset layout", err)
        } finally {
          localStorage.removeItem("dv-demo-state")
        }
      }
    },
    clearLayout: ({ context }) => {
      context.api?.clear()
    },
    saveLayout: ({ context }) => {
      if (context.api) {
        const state = context.api.toJSON()
        localStorage.setItem("dv-demo-state", JSON.stringify(state))
      }
    },
    loadLayout: ({ context }) => {
      const state = localStorage.getItem("dv-demo-state")
      if (state && context.api) {
        try {
          context.api.fromJSON(JSON.parse(state))
        } catch (err) {
          console.error("failed to load state", err)
          localStorage.removeItem("dv-demo-state")
        }
      }
    },

    createNodes: assign(({ context, spawn, self }) => {
      const nodes = nodeManagerConfig.nodes.map((item: any) => {
        const spawnedNode = spawn("nodeMachine", {
          id: item.id,
          // systemId: item.id,
          input: {
            node: item,
            api: context.api,
          },
        })
        // context.nodesRef.push(spawnedNode)
      })
    }),
  },
  actors: {
    nodeMachine,
    dockviewApiEvents,
  },
  guards: {},
}).createMachine({
  initial: "waitingForApi",
  context: ({ input }: any) => {
    return {
      nodesRef: [],

      api: null,
      status: {
        isReady: true,
      },

      panels: [],
      groups: [],

      activePanel: "",
      activeGroup: "",
      defaultConfig: currentAppExampleConfig.dockViewConfig,
      idCounter: 0,
      debug: false,
      logLines: [],
      showLogs: false,
      pending: {
        text: null,
        timestamp: null,
      },

      ...input,
    }
  },
  states: {
    waitingForApi: {
      on: {
        onReady: {
          target: "ready",
          actions: enqueueActions(({ enqueue, context, event }) => {
            // console.log("-----node.machine ready-----")
            enqueue("setApi")

            enqueue("createNodes")
          }),
        },
      },
    },
    ready: {
      invoke: {
        id: "dockviewApiEvents",
        src: "dockviewApiEvents",
        input: ({ context }) => ({ api: context.api, defaultConfig: context.defaultConfig }),
      },
      on: {
        onAddPanel: { actions: { type: "addPanel" } },
        onAddGroup: { actions: { type: "addGroup" } },

        // completion events
        onDidAddPanel: { actions: { type: "addPanelCompletion" } },
        onDidRemovePanel: { actions: { type: "removePanelCompletion" } },
        onDidActivePanelChange: { actions: { type: "activePanelChangeCompletion" } },
        onDidMovePanel: { actions: { type: "movePanelCompletion" } },
        onDidAddGroup: { actions: { type: "addGroupCompletion" } },
        onDidRemoveGroup: { actions: { type: "removeGroupCompletion" } },
        onDidActiveGroupChange: { actions: { type: "activeGroupChangeCompletion" } },
        onDidMaximizedGroupChange: { actions: { type: "maximizedGroupChangeCompletion" } },

        onResetLayout: { actions: { type: "resetLayout" } },
        onClearLayout: { actions: { type: "clearLayout" } },
        onSaveLayout: { actions: { type: "saveLayout" } },
        onLoadLayout: { actions: { type: "loadLayout" } },
      },
    },
  },
})

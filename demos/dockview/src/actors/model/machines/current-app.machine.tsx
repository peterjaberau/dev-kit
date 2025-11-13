import { assign, enqueueActions, fromPromise, setup, spawnChild } from "xstate"
import { currentAppExampleConfig } from "../shared/config"
import { applyDefaultLayout, dockviewApiEvents } from "../actions"
import { builderInfoMachine } from "#actors/slices"
import { CONSTANT_SYSTEM_ACTOR_IDS } from "#actors/constants"
import { nodeManagerMachine } from "./node.machine"

const defaultConfig = {
  demo: currentAppExampleConfig.configDemo,
  domainDrivenDock: currentAppExampleConfig.domainDrivenDock,
  domain: currentAppExampleConfig.domainStore,
  dockViewConfig: currentAppExampleConfig.dockViewConfig,
}

export const currentAppExampleMachine = setup({
  types: {
    context: {} as any,
    events: {} as any,
  } as any,
  actions: {
    setApi: assign(({ context, event }: any) => {
      context.api = event.api
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
    spawnNodeManager: assign(({context, event, self, spawn}) => {
      const { api } = event;

      const nodeManagerRef = spawn("nodeManagerMachine", {
        input: {
          api
        },
      });

      context.nodeManagerRef = nodeManagerRef

      console.log('---spawnNodeManager---', {
        api,
        nodeManagerRef
      })

    }),



    // completion
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
  },
  actors: {
    dockviewApiEvents,
    nodeManagerMachine
  },
  guards: {
    // gapCheck: ({ context, event }) => {},
  },
}).createMachine({
  initial: "waitingForApi",
  context: ({ input }: any) => {
    return {
      nodeManagerRef: null,

      nodes: [],

      panels: [],
      groups: [],

      api: null,
      activePanel: "",
      activeGroup: "",
      // defaultConfig: defaultConfig.domainDrivenDock,
      defaultConfig: defaultConfig.dockViewConfig,

      //extras
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
            enqueue("setApi")
            enqueue("spawnNodeManager")
          }),
          // actions: assign({
          //   api: ({ event }) => {
          //     return event.api
          //   },
          // }),
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

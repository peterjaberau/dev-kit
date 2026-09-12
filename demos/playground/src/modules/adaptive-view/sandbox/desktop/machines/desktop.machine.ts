import { enqueueActions, setup, assign } from "xstate"
import { DockviewApi, DockviewReadyEvent } from "#adaptive-view/core"

interface IDesktopContext {
  dockviewApi: DockviewApi
  fixtures: any
  current: any[]
}

export const desktopMachine = setup({
  actions: {
    setDockviewApi: assign(({ context, event }, params) => {
      const { api } = event.params || params
      context.dockviewApi = api
    }),
    addPendingLogLine: assign(({ context, event }, params) => {
      const { message = "" } = event.params || params
      context.current.pending = [
        {
          text: message,
          timestamp: new Date(),
        },
        ...context.current.pending,
      ]
    }),
    flushPendingLogLines: assign(({ context }) => {
      const { pending, logLines, logColorIndex } = context.current
      const { colors } = context.fixtures
      const backgroundColor = colors[logColorIndex % colors.length]

      const nextLines = pending.map((line: any) => ({
        ...line,
        backgroundColor,
      }))
      context.current = {
        ...context.current,
        logLines: [...nextLines, ...logLines],
        pending: [],
        logColorIndex: logColorIndex + 1,
      }
    }),
    clearLogLines: assign(({ context }) => {
      context.current = {
        ...context.current,
        logLines: [],
        pending: [],
      }
    }),
    resetTrackedState: assign(({ context }) => {
      // Reset tracked state for the new api instance to prevent stale IDs
      // accumulating across remounts (e.g. when toggling shell mode).
      context.current = {
        ...context.current,
        panels: [],
        groups: [],
        activePanel: null,
        activeGroup: null,
      }
    }),
  },
  actors: {},
}).createMachine({
  id: "desktop",
  initial: "initiating",
  context: ({ input }: any) => ({
    dockviewApi: null,
    fixtures: {
      colors: [
        "rgba(255,0,0,0.2)",
        "rgba(0,255,0,0.2)",
        "rgba(0,0,255,0.2)",
        "rgba(255,255,0,0.2)",
        "rgba(0,255,255,0.2)",
        "rgba(255,0,255,0.2)",
      ],
    },
    current: {
      logLines: [],
      pending: [],

      panels: [],
      groups: [],

      layoutReady: false,

      activePanel: null,
      activeGroup: null,

      logColorIndex: 0,
    },
  }),
  states: {
    initiating: {
      on: {
        onReady: {
          actions: ["setDockviewApi"],
          target: "ready",
        },
      },
    },
    ready: {
      on: {
        onAddLogLine: {
          actions: "addPendingLogLine",
        },

        onFlushLogLines: {
          actions: "flushPendingLogLines",
        },

        onClearLogLines: {
          actions: "clearLogLines",
        },
        onResetTrackedState: {
          actions: "resetTrackedState",
        },
      },
    },
  },
})

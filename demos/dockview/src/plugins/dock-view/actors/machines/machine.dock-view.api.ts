import { setup } from "xstate"
import { applyDefaultLayout, handleDisposables } from '#plugin-dock-view'

export const dockViewApiMachine = setup({
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
    handleDisposables,
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
        id: "handleDisposables",
        src: "handleDisposables",
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

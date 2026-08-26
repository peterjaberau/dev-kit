import { setup } from "xstate"
import { applyDefaultLayout, handleDisposables } from '../lib'

export const dockViewApiMachine = setup({
  actions: {
    handleResetLayout: ({ context }) => {
      const { defaultConfig } = context
      const { api } = context?.model
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
      context.model?.api?.clear()
    },
    handleSaveLayout: ({ context }) => {
      if (context?.model?.api) {
        const state = context?.model?.api.toJSON()
        localStorage.setItem("dv-demo-state", JSON.stringify(state))
      }
    },
    handleLoadLayout: ({ context }) => {
      const state = localStorage.getItem("dv-demo-state")
      if (state && context?.model?.api) {
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
  context: ({ input, self }: any) => {
    return {
      refs: {
        internal: {
          self: self,
          parent: input?.refs?.internal?.parent || null,
        },
        external: {
          api: self,
        }
      },
      props: {},
      view: {},
      model: {
        api: input?.model?.api,
      },
      defaultConfig: { panels: [] },
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

import { assign, enqueueActions, setup } from "xstate"

export const dockViewPanelMachine = setup({
  types: {} as any,
  actions: {
    handleAddPanel: ({ context }) => {
      const api = context?.model?.api
      const view = {
        id: context.view.id,
        ...context.view.view,
      }
      // const api = context.input.apiRef.getSnapshot().context?.api
      if (api) {
        api?.addPanel(view)
      }
    },

    handleRemovePanel: ({ context, event }) => {
      const { api } = event.payload
      api.close()
    },
  },
  actors: {},
  guards: {},
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
          api: input?.refs?.external?.api || null,
        },
      },
      props: {
        ...input?.props,
      },
      view: {
        id: input?.view?.id,
        view: {
          type: input?.view?.view?.type,
          component: input?.view?.view?.component || "default",
          title: input?.view?.view?.title || "Panel",
          renderer: input?.view?.view?.renderer || "always",
          position: input?.view?.view?.position || undefined,
          params: input?.view?.view?.params || {},
        },
      },
      model: {
        api: input?.model?.api,
      },
    }
  },
  states: {
    idle: {
      entry: enqueueActions(({ enqueue }) => {
        enqueue("handleAddPanel")
      }),
      on: {
        onTerminate: {
          actions: ["handleRemovePanel"],
          target: ["terminate"],
        },
        onDidActivePanelChange: {},
        addPanelCompletion: {},
        onDidRemovePanel: {},
        removePanelCompletion: {},
        activePanelChangeCompletion: {},
        movePanelCompletion: {},
      },
    },
    terminate: {
      type: "final",
    },
  },
})

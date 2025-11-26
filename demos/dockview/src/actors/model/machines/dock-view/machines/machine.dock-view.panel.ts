import { assign, enqueueActions, setup } from "xstate"

export const dockViewPanelMachine = setup({
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
      const api = context.input.apiRef.getSnapshot().context?.api
      if (api) {
        api?.addPanel(context.view)
      }
    },

    handleRemovePanel: ({ context, event }) => {
      const { api } = event.payload
      api.close()

      // const api = context.input.apiRef.getSnapshot().context?.api
      // api?.panel.close();
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
        apiRef: input?.apiRef,
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

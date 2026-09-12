import { enqueueActions, setup, assign } from "xstate"
import { DockviewReadyEvent } from "#adaptive-view/core"

export const desktopMachine = setup({
  actions: {
    setDockviewApi: assign(({ context, event }, params) => {
      const { api } = event.params || params
      context.dockviewApi = api
    }),
  },
  actors: {},
}).createMachine({
  id: "desktop",
  initial: "initiating",
  context: ({ input }: any) => ({
    dockviewApi: null,
    fixtures: {},
    current: {},
  }),
  states: {
    initiating: {
      on: {
        onReady: {
          actions: enqueueActions(({ enqueue }) => {
            enqueue("setDockviewApi")
          }),
          target: "ready",
        },
      },
    },
    ready: {},
  },
})

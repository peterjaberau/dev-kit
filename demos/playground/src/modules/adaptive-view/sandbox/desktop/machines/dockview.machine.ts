import { assign, enqueueActions, setup } from "xstate"

export const dockviewMachine = setup({
  actions: {},
  actors: {},
}).createMachine({
  id: "dockview",
  initial: "initializing",
  context: ({ input }: any) => ({
    dockviewApi: null,
    fixtures: {},
    current: {},
  }),
  states: {
    initializing: {
    },
    ready: {},
  },
})

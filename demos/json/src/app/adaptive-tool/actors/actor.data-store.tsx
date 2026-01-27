import { assign, enqueueActions, setup } from "xstate"

export const dataStoreMachine = setup({
  actions: {
  },
  actors: {
  },
  guards: {},
}).createMachine({
  initial: "idle",
  context: ({ input }: any) => {
    return {
      refs: {
        parent: input?.refs?.parent || null,
      },
      config: {},
      runtime: {}
    }
  },
  states: {
    idle: {}
  }
})


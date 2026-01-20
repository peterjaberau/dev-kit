import { assign, enqueueActions, setup } from "xstate"

export const jsonAgentMachine = setup({
  types: {
    context: {} as any,
    events: {} as any,
  } as any,
  actions: {
  },
  actors: {
  },
  guards: {},
}).createMachine({
  context: ({ input }: any) => {
    return {
      refs: {},
      config: {
        ...input?.config,
      },
      current: {},

      data: input?.data,
      engine: {},
    }
  },

})

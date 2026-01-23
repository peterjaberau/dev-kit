import { fromPromise, setup, assign } from "xstate"

export const jsonManagerMachine = setup({
  actions: {},
  actors: {},
  guards: {},
}).createMachine({
  initial: "idle",
  context: ({ input }: any) => {
    return {
      data: {
        ...input?.data,
      },
    }
  },
  states: {
    idle: {
      on: {},
    },
  },
})

import { setup, assign } from "xstate"

export const jsonViewsMachine = setup({
  types: {
    context: {} as any,
    events: {} as any,
  } as any,
  actions: {},
  actors: {},
  guards: {},
}).createMachine({
  initial: "idle",
  context: ({ input }: any) => {
    return {
      preferences: {
        indent: 2,
        ...input?.preferences,
      },
    }
  },
  states: {
    idle: {
      on: {},
    },
  },
})

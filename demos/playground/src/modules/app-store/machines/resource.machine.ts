import { assign, setup } from "xstate"

const defaults: any = []

export const resourceMachine = setup({
  types: {} as any,
  actions: {
  },
  actors: {},
  guards: {},
}).createMachine({
  id: "resource",
  initial: "idle",
  context: ({ input }: any) => ({
    ...defaults,
    ...input,
  }),
  states: {
    idle: {
      on: {
      },
    },
  },
})

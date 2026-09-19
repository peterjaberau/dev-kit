import { setup } from "xstate"
const defaults: any = []

export const executionMachine = setup({
  types: {} as any,
  actions: {},
  actors: {},
  guards: {},
}).createMachine({
  context: ({ input }: any) => ({
    ...defaults,
    ...input,
  }),
  initial: "idle",
  states: {
    idle: {
      on: {},
    },
  },
})

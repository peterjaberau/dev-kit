import { assign, setup } from "xstate"
const defaults: any = []

export const componentsMachine = setup({
  types: {} as any,
  actions: {},
  actors: {},
  guards: {},
}).createMachine({
  initial: "idle",
  context: ({ input }: any) => ({
    ...defaults,
    ...input,
  }),
  states: {
    idle: {
      on: {},
    },
  },
})


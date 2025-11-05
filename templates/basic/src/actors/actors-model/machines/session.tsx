import { assign, setup } from "xstate"
import { sessionConfigDefaults } from "../shared/config"

export const sessionMachine = setup({
  types: {} as any,
  actions: {
    resetAction: assign(({ context, event }) => {}),
  },
  actors: {},
  guards: {},
}).createMachine({
  initial: "idle",
  context: ({ input }: any) => ({
    ...sessionConfigDefaults,
    ...input,
  }),
  states: {
    idle: {
      on: {
        RESET: { actions: ["resetAction"] },
      },
    },
  },
})

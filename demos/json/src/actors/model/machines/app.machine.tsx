import { assign, setup } from "xstate"
import { appConfigDefaults } from "../shared/config"

export const appMachine = setup({
  types: {} as any,
  actions: {
    resetAction: assign(({ context, event }) => {}),
  },
  actors: {},
  guards: {},
}).createMachine({
  initial: "idle",
  context: ({ input }: any) => ({
    ...appConfigDefaults,
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

import { assign, setup } from "xstate"
import { currentAppConfigDefaults } from "../shared/config"
import { mockData } from "../shared/data"

export const currentAppMachine = setup({
  types: {} as any,
  actions: {
    resetAction: assign(({ context, event }: any) => {}),
  },
  actors: {},
  guards: {},
}).createMachine({
  initial: "idle",
  context: ({ input }: any) => ({
    ...currentAppConfigDefaults,
    ...mockData,
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

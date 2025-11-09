import { assign, setup } from "xstate"
import { pluginsConfigDefaults } from "#actors/model/shared/config"

export const nodeMachine = setup({
  types: {} as any,
  actions: {
    resetAction: assign(({ context, event }) => {}),
  },
  actors: {},
  guards: {},
}).createMachine({
  initial: "idle",
  context: ({ input }: any) => ({
    viewRef: null,
    modelRef: null,
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

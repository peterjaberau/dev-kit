import { assign, setup } from "xstate"
import { builderInfoInitialState } from "./builderInfo.defaults"

export const builderInfoMachine = setup({
  types: {} as any,
  actions: {
    updateLanguageReducer: assign(({ context, event }) => {}),
  },
  actors: {},
  guards: {},
}).createMachine({
  id: "builderInfo",
  initial: "idle",
  context: ({ input }: any) => ({
    ...builderInfoInitialState,
    ...input,
  }),
  states: {
    idle: {
      on: {
        updateLanguage: { actions: ["updateLanguageReducer"] },
      },
    },
  },
})

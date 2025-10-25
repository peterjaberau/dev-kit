import { assign, setup } from "xstate"
import { currentAppConfigDefaults } from "../shared/config"
import { mockData } from "../shared/data"

export const currentAppMachine = setup({
  types: {} as any,
  actions: {
    setCurrentExample: assign(({ context, event }) => {



      context.currentExample = {
        ...context.currentExample,
        ...event.payload
      }
    }),
  },
  actors: {},
  guards: {},
}).createMachine({
  initial: "idle",
  context: ({ input }: any) => ({
    currentExample: {
      schema: {},
      uischema: {},
      data: {},
      config: {
        restrict: false,
        trim: false,
        showUnfocusedDescription: false,
        hideRequiredAsterisk: false

      },
    },
    ...input,
  }),
  states: {
    idle: {
      on: {
        SET_CURRENT_EXAMPLE: { actions: ["setCurrentExample"] },
      },
    },
  },
})

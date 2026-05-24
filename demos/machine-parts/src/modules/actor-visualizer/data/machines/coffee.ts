import { setup, assign } from "xstate"

export const coffeeMachine = setup({}).createMachine({
  id: "coffee",
  initial: "idle",
  context: {},
  states: {
    idle: {
      on: {
        SELECT_ESPRESSO: "grinding",
        SELECT_LATTE: "grinding",
        SELECT_CAPPUCCINO: "grinding"
      },
    },
    grinding: {
      after: {
        2000: "brewing"
      },
    },
    brewing: {
      after: {
        5000: "ready"
      },
    },
    ready: {
      on: {
        TAKE_CUP: "idle",
        TIMEOUT: "cleaning"
      },
    },
    cleaning: {
      after: {
        3000: "idle",
      },
    },
  },
})



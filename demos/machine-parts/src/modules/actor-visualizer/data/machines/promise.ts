import { setup, assign } from "xstate"

export const promiseMachine = setup({}).createMachine({
  id: "promise",
  initial: "pending",
  context: {},
  states: {
    pending: {
      on: {
        RESOLVE: "resolved",
        REJECT: "rejected",
      },
    },
    resolved: {
      type: "final",
    },
    rejected: {
      on: {
        RETRY: "pending",
      },
    },
  },
})



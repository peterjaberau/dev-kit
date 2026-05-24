import { setup, assign } from "xstate"

export const orderProcessMachine = setup({}).createMachine({
  id: "orderProcess",
  initial: "pending",
  context: {},
  states: {
    pending: {
      on: {
        CONFIRM: "processing",
        CANCEL: "cancelled",
      },
    },
    processing: {
      on: {
        SHIP: "shipped",
        CANCEL: "cancelled",
      },
    },
    shipped: {
      on: {
        DELIVER: "delivered",
      },
    },
    delivered: {
      type: "final",
    },
    cancelled: {
      type: "final",
    },
  },
})



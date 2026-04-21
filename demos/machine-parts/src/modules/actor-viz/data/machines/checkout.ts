import { setup } from "xstate"

export const checkoutMachine = setup({
  types: {
    events: {} as
      | { type: "SUBMIT_ORDER" }
      | { type: "INVENTORY_RESERVED" }
      | { type: "OUT_OF_STOCK" }
      | { type: "PAYMENT_APPROVED" }
      | { type: "PAYMENT_DECLINED" }
      | { type: "RETRY_PAYMENT" }
      | { type: "ORDER_CONFIRMED" }
      | { type: "CANCEL" },
  },
}).createMachine({
  id: "checkout",
  initial: "reviewingCart",
  states: {
    reviewingCart: {
      on: {
        SUBMIT_ORDER: {
          target: "reservingInventory",
        },
      },
    },
    reservingInventory: {
      after: {
        15000: {
          target: "inventoryTimeout",
        },
      },
      on: {
        INVENTORY_RESERVED: {
          target: "processingPayment",
        },
        OUT_OF_STOCK: {
          target: "inventoryUnavailable",
        },
        CANCEL: {
          target: "cancelled",
        },
      },
    },
    processingPayment: {
      after: {
        20000: {
          target: "paymentTimeout",
        },
      },
      on: {
        PAYMENT_APPROVED: {
          target: "awaitingConfirmation",
        },
        PAYMENT_DECLINED: {
          target: "paymentFailed",
        },
        CANCEL: {
          target: "cancelled",
        },
      },
    },
    awaitingConfirmation: {
      after: {
        10000: {
          target: "confirmationDelayed",
        },
      },
      on: {
        ORDER_CONFIRMED: {
          target: "completed",
        },
      },
    },
    paymentFailed: {
      on: {
        RETRY_PAYMENT: {
          target: "processingPayment",
        },
        CANCEL: {
          target: "cancelled",
        },
      },
    },
    inventoryUnavailable: {
      on: {
        SUBMIT_ORDER: {
          target: "reservingInventory",
        },
      },
    },
    inventoryTimeout: {
      on: {
        SUBMIT_ORDER: {
          target: "reservingInventory",
        },
        CANCEL: {
          target: "cancelled",
        },
      },
    },
    paymentTimeout: {
      on: {
        RETRY_PAYMENT: {
          target: "processingPayment",
        },
        CANCEL: {
          target: "cancelled",
        },
      },
    },
    confirmationDelayed: {
      on: {
        ORDER_CONFIRMED: {
          target: "completed",
        },
        CANCEL: {
          target: "cancelled",
        },
      },
    },
    completed: {
      type: "final",
    },
    cancelled: {
      type: "final",
    },
  },
})

import { setup } from "xstate"

export const vendingMachineMachine = setup({
  types: {
    events: {} as any,
  },
}).createMachine({
  id: "vending-machine",
  initial: "idle",
  states: {
    idle: {
      on: { INSERT_COIN: "hasCredit" },
    },
    hasCredit: {
      on: {
        INSERT_COIN: "hasCredit",
        SELECT_SNACK: "dispensing",
        PRESS_RETURN: "returningChange",
      },
    },
    dispensing: {
      on: { SNACK_DROPPED: "collect" },
    },
    collect: {
      on: { TAKE_SNACK: "idle" },
    },
    returningChange: {
      on: { COINS_RETURNED: "idle" },
    },
  },
})

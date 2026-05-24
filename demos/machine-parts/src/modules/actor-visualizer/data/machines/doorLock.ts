import { setup, assign, createMachine } from "xstate"

export const doorLockMachine = setup({}).createMachine({
  id: "doorLock",
  initial: "locked",
  context: {},
  states: {
    locked: {
      on: {
        UNLOCK: "unlocked",
      },
    },
    unlocked: {
      on: {
        LOCK: "locked",
        OPEN: "open",
      },
    },
    open: {
      on: {
        CLOSE: "unlocked",
      },
    },
  },
})



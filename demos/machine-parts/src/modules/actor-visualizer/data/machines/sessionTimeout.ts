import { setup } from "xstate"

export const sessionTimeoutMachine = setup({
  types: {
    events: {} as
      | { type: "USER_ACTIVITY" }
      | { type: "EXTEND_SESSION" }
      | { type: "DISMISS_WARNING" }
      | { type: "SIGN_OUT" },
  },
}).createMachine({
  id: "sessionTimeout",
  initial: "active",
  states: {
    active: {
      after: {
        120000: {
          target: "warning",
        },
      },
      on: {
        USER_ACTIVITY: {
          target: "active",
        },
        SIGN_OUT: {
          target: "signedOut",
        },
      },
    },
    warning: {
      after: {
        30000: {
          target: "signedOut",
        },
      },
      on: {
        EXTEND_SESSION: {
          target: "active",
        },
        DISMISS_WARNING: {
          target: "active",
        },
        USER_ACTIVITY: {
          target: "active",
        },
        SIGN_OUT: {
          target: "signedOut",
        },
      },
    },
    signedOut: {
      type: "final",
    },
  },
})

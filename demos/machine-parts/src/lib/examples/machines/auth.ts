import { setup, assign } from "xstate"

export const authMachine = setup({
  types: {
    context: {} as any,
    events: {} as any,
  },
}).createMachine({
  id: "auth",
  initial: "loggedOut",
  states: {
    loggedOut: {
      initial: "idle",
      states: {
        idle: {
          on: { SUBMIT: "authenticating" },
        },
        authenticating: {
          on: {
            SUCCESS: "#auth.loggedIn",
            FAILURE: "error",
          },
        },
        error: {
          on: {
            SUBMIT: "authenticating",
            FORGOT: "#auth.forgotPassword",
          },
        },
      },
    },
    loggedIn: {
      on: { LOGOUT: "loggedOut" },
    },
    forgotPassword: {
      initial: "form",
      states: {
        form: {
          on: { SUBMIT: "sending" },
        },
        sending: {
          on: {
            SUCCESS: "sent",
            FAILURE: "form",
          },
        },
        sent: {
          on: { BACK: "#auth.loggedOut" },
        },
      },
    },
  },
})

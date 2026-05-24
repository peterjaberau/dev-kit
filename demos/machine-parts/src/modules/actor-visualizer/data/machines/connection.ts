import { setup, assign } from "xstate"

export const connectionMachine = setup({}).createMachine({
  id: "connection",
  initial: "Disconnected",
  context: {},
  states: {
    Disconnected: {
      on: {
        CONNECT: "Connecting",
      },
    },
    Connecting: {
      on: {
        SUCCESS: "Connected",
        FAILURE: "Disconnecting",
      },
    },
    Connected: {
      on: {
        DISCONNECT: "Disconnecting",
        LOST: "Reconnecting",
      },
    },
    Disconnecting: {
      on: {
        DONE: "Disconnected",
      },
    },
    Reconnecting: {
      on: {
        SUCCESS: "Connected",
        FAILURE: "Disconnected",
      },
    },
  },
})



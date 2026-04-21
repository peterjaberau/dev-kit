import { setup } from "xstate"

export const stopwatchMachine = setup({
  types: {
    events: {} as { type: "START" } | { type: "STOP" } | { type: "LAP" } | { type: "RESET" },
  },
}).createMachine({
  id: "stopwatch",
  initial: "stopped",
  states: {
    stopped: {
      on: {
        START: {
          target: "running",
        },
        RESET: {
          target: "stopped",
        },
      },
    },
    running: {
      on: {
        STOP: {
          target: "paused",
        },
        LAP: {
          target: "running",
        },
        RESET: {
          target: "stopped",
        },
      },
    },
    paused: {
      on: {
        START: {
          target: "running",
        },
        RESET: {
          target: "stopped",
        },
      },
    },
  },
})

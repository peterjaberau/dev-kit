import { setup } from "xstate"

export const mediaPlayerMachine = setup({
  types: {
    events: {} as
      | { type: "PLAY" }
      | { type: "PAUSE" }
      | { type: "STOP" }
      | { type: "LOAD" }
      | { type: "LOADED" }
      | { type: "END" }
      | { type: "ERROR" }
      | { type: "RETRY" }
      | { type: "DISMISS" }
      | { type: "BUFFERED" }
      | { type: "NEED_BUFFER" },
  },
}).createMachine({
  id: "mediaPlayer",
  initial: "stopped",
  states: {
    stopped: {
      on: {
        PLAY: {
          target: "playing",
        },
        LOAD: {
          target: "loading",
        },
      },
    },
    loading: {
      on: {
        LOADED: {
          target: "stopped",
        },
        ERROR: {
          target: "error",
        },
      },
    },
    playing: {
      initial: "buffering",
      on: {
        PAUSE: {
          target: "paused",
        },
        END: {
          target: "stopped",
        },
        ERROR: {
          target: "error",
        },
      },
      states: {
        buffering: {
          on: { BUFFERED: { target: "ready" } },
        },
        ready: {
          on: { NEED_BUFFER: { target: "buffering" } },
        },
      },
    },
    paused: {
      on: {
        PLAY: {
          target: "playing",
        },
        STOP: {
          target: "stopped",
        },
      },
    },
    error: {
      on: {
        RETRY: {
          target: "loading",
        },
        DISMISS: {
          target: "stopped",
        },
      },
    },
  },
})

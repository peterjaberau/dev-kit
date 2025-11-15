import { assign, enqueueActions, raise, setup } from "xstate"

export const patternMachine = setup({
  types: {
    context: {} as any,
    events: {} as any,
  } as any,
  actions: {
    // ready state handlers
    handleEventCreate: assign(({ context }) => {
      return {
        ...context,
        isReady: true,
      }
    }),
    handleEventTerminate: assign(({ context }) => {
      return {
        ...context,
        isReady: true,
      }
    }),

    // creating state handlers
    handleStartCreating: assign(({ context }) => ({
      ...context,
      isCreating: true,
      isCreated: false,
      isReady: false,
      isTerminating: false,
    })),
    handleProcessCreating: assign(({ context }) => ({
      ...context,
      isCreating: true,
    })),

    // terminating state handlers
    handleStartTerminating: assign(({ context }) => {
      return {
        ...context,
        isTerminating: true,
        isReady: false,
      }
    }),
    handleProcessTerminating: assign(({ context }) => {
      return {
        ...context,
        isTerminating: true,
      }
    }),
  },
}).createMachine({
  initial: "ready",
  context: ({ input }) => {
    return {
      isCreating: false,
      isCreated: false,
      isTerminating: false,
      isReady: false,
      ...input,
    }
  },
  states: {

    ready: {
      tags: ["canCreate", "canTerminate"],
      on: {
        CREATE: {
          target: "creating",
          actions: ["handleEventCreate"],
        },
        TERMINATE: {
          target: "terminating",
          actions: ["handleEventTerminate"],
        },
      },
    },

    creating: {
      initial: "start",
      states: {
        start: {
          tags: ["canStart", "canComplete"],
          on: {
            START: {
              target: "process",
              actions: ["handleStartCreating"],
            },
            COMPLETE: {
              target: "complete",
            },
          },
        },
        process: {
          tags: ["canProcess", "canComplete"],
          on: {
            PROCESS: {
              target: "complete",
              actions: ["handleProcessCreating"],
            },
            COMPLETE: {
              target: "complete",
            },
          },
        },
        complete: {
          type: "final",
        },
      },
      onDone: {
        target: "ready",
      },
    },

    terminating: {
      initial: "start",
      states: {
        start: {
          tags: ["canStart", "canComplete"],
          on: {
            START: {
              target: "process",
              actions: ["handleStartTerminating"],
            },
            COMPLETE: {
              target: "complete",
            },
          },
        },
        process: {
          tags: ["canProcess", "canComplete"],
          on: {
            PROCESS: {
              target: "complete",
              actions: ["handleProcessTerminating"],
            },
            COMPLETE: {
              target: "complete",
            },
          },
        },
        complete: {
          type: "final",
        },
      },
      onDone: {
        target: "terminated",
      },
    },

    terminated: {
      type: 'final'
    }

  },
})

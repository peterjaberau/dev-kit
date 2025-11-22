import { assign, enqueueActions, raise, setup } from "xstate"

export const patternMachine = setup({

  types: {
    context: {} as any,
    events: {} as any,
  } as any,

  actions: {
    handleInitiateInstance: assign(({ context }) => {
      context.instance.isInitiated = true
    }),
    // ready state handlers
    handleEventCreate: assign(({ context }) => {

    }),
    handleEventTerminate: assign(({ context }) => {
    }),

    // creating state handlers
    handleStartCreating: assign(({ context }) => {
    }),
    handleProcessCreating: assign(({ context }) => {
    }),

    handleCompleteCreating: assign(({ context }) => {
      context.instance.isCreated = true
    }),

    // terminating state handlers
    handleStartTerminating: assign(({ context }) => {
    }),
    handleProcessTerminating: assign(({ context }) => {
    }),
  },

  guards: {
    // autoCreate on initiation
    isAutoCreate: (({ context }) => {
      return context.config.autoCreate && context.instance.isCreated === false
    }),
    // automatically move between the creating states
    isAutomateCreation: (({ context }) => {
      return context.config.automateCreation || context.config.autoCreate
    }),
    // automatically move between the termination states
    isAutomateTermination: (({ context }) => {
      return context.config.automateTermination
    }),
    isInstance: (({ context }) => {
      return context.instance.isInitiated
    }),
  },

}).createMachine({
  initial: "initiating",
  context: ({ input }) => {
    return {
      config: {
        autoCreate: true,
        automateCreation: true,
        automateTermination: true
      },
      instance: {
        isInitiated: false,
        isCreated: false,
      },
      ...input,
    }
  },
  states: {

    initiating: {
      entry: ['handleInitiateInstance'],
      always: {
        target: "ready",
      }
    },

    ready: {
      entry: enqueueActions(({ context, enqueue, check, event}) => {
        if (check({ type: 'isAutoCreate' })) enqueue.raise({ type: 'CREATE'})
      }),
      tags: ["canTerminate"],
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
          entry: enqueueActions(({ context, enqueue, check, event}) => {
            if (check({ type: 'isAutomateCreation' })) enqueue.raise({ type: 'START'})
          }),
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
          entry: enqueueActions(({ context, enqueue, check, event}) => {
            if (check({ type: 'isAutomateCreation' })) enqueue.raise({ type: 'PROCESS'})
          }),
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
          entry: ["handleCompleteCreating"],
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
          entry: enqueueActions(({ context, enqueue, check, event}) => {
            if (check({ type: 'isAutomateTermination' })) enqueue.raise({ type: 'START'})
          }),
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
          entry: enqueueActions(({ context, enqueue, check, event}) => {
            if (check({ type: 'isAutomateTermination' })) enqueue.raise({ type: 'PROCESS'})
          }),
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

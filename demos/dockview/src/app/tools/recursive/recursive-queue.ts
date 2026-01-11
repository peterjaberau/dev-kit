import { setup, assign, fromCallback } from "xstate"

export const recursiveMachine = setup({
  types: {} as any,

  actions: {
    /* ─────────────── BOOTSTRAP ─────────────── */

    receiveSource: assign(({ event }: any) => {
      return {
        source: event.input.source,
        transform: {
          queue: [event.input.source], // seed queue
          stack: [],
          current: null,
          completed: null,
        },
        output: [],
      }
    }),

    /* ─────────────── TREE ORCHESTRATION ─────────────── */

    /**
     * Pull next node from queue into stack
     */
    initIteration: assign(({ context }: any) => {
      const queue = [...context.transform.queue]

      if (queue.length === 0) {
        return {}
      }

      const nextNode = queue.shift()

      return {
        transform: {
          ...context.transform,
          queue,
          stack: [...context.transform.stack, nextNode],
          current: nextNode,
        },
      }
    }),

    /**
     * On node completion:
     * - enqueue children
     * - pop stack
     * - mark completed
     */
    advanceIteration: assign(({ context }: any) => {
      const stack = [...context.transform.stack]
      const completedNode = stack.pop()

      if (!completedNode) {
        return {}
      }

      const children = completedNode.children || []

      return {
        transform: {
          ...context.transform,
          stack,
          queue: [...context.transform.queue, ...children],
          completed: completedNode,
          current: null,
        },
      }
    }),

    updateOutput: assign(({ context }: any) => {
      if (!context.transform.completed) {
        return {}
      }

      const { id, value } = context.transform.completed

      return {
        output: [...context.output, { id, value }],
        transform: {
          ...context.transform,
          completed: null,
        },
      }
    }),

    /* ─────────────── NODE LIFECYCLE ─────────────── */

    nodeEnterAction: assign(({ context }: any) => {
      return {
        transform: {
          ...context.transform,
          current:
            context.transform.stack[
            context.transform.stack.length - 1
              ] ?? null,
        },
      }
    }),

    nodeLogicAction: assign(() => {
      return {}
    }),

    nodeExitAction: assign(() => {
      return {}
    }),

    resetAction: assign(() => {
      return {
        source: null,
        transform: null,
        output: [],
      }
    }),
  },

  actors: {
    bootstrapActor: fromCallback(({ input, sendBack }: any) => {
      sendBack({ type: "BOOTSTRAP", input })
    }),
  },

  guards: {
    hasWork: ({ context }: any) => {
      return (
        context.transform.queue.length > 0 ||
        context.transform.stack.length > 0
      )
    },
  },
}).createMachine({
  id: "recursiveTreeMachine",
  initial: "idle",

  context: ({ input }: any) => {
    return {
      source: null,
      transform: null,
      output: [],
      ...input,
    }
  },

  states: {
    idle: {
      on: {
        START: { target: "boot" },
        RESET: { actions: ["resetAction"] },
      },
    },

    boot: {
      invoke: {
        src: "bootstrapActor",
        input: ({ input }: any) => {
          return input
        },
      },
      on: {
        BOOTSTRAP: {
          actions: ["receiveSource"],
          target: "tree",
        },
      },
    },

    tree: {
      initial: "prepare",

      states: {
        prepare: {
          entry: ["initIteration"],
          always: [
            { guard: "hasWork", target: "node" },
            { target: "done" },
          ],
        },

        node: {
          initial: "enter",

          states: {
            enter: {
              entry: ["nodeEnterAction"],
              always: "process",
            },
            process: {
              entry: ["nodeLogicAction"],
              always: "exit",
            },
            exit: {
              exit: ["nodeExitAction"],
              always: "#recursiveTreeMachine.tree.collect",
            },
          },
        },

        collect: {
          entry: ["updateOutput"],
          exit: ["advanceIteration"],
          always: "prepare",
        },

        done: { type: "final" },
      },

      onDone: { target: "finished" },
    },

    finished: { type: "final" },
  },
})
import { setup, assign, fromCallback } from "xstate"

/**
 * ─────────────────────────────────────────────────────────────
 * EXAMPLE INPUT (input.source)
 *
 * {
 *   id: "node-0",
 *   value: "A",
 *   children: [
 *     {
 *       id: "node-0-0",
 *       value: "B",
 *       children: [
 *         {
 *           id: "node-0-0-0",
 *           value: "D"
 *         }
 *       ]
 *     },
 *     {
 *       id: "node-0-1",
 *       value: "C"
 *     }
 *   ]
 * }
 *
 * EXPECTED OUTPUT (post-order, incremental):
 * [
 *   { id: "node-0-0-0", value: "D" },
 *   { id: "node-0-0",   value: "B" },
 *   { id: "node-0-1",   value: "C" },
 *   { id: "node-0",     value: "A" }
 * ]
 * ─────────────────────────────────────────────────────────────
 */

export const recursiveMachine = setup({
  types: {} as any,

  actions: {
    /* ───────────────── BOOTSTRAP ───────────────── */

    receiveSource: assign(({ event }: any) => {
      return {
        source: event.input.source,
        transform: {
          stack: [{ node: event.input.source, index: 0 }],
          current: null,
          completed: null,
        },
        output: [],
      }
    }),

    /* ─────────────── TREE (ORCHESTRATOR) ─────────────── */

    initIteration: assign(({ context }: any) => {
      return {
        transform: {
          ...context.transform,
          current: context.transform.stack.at(-1)?.node ?? null,
        },
      }
    }),

    advanceIteration: assign(({ context }: any) => {
      const stack = [...context.transform.stack]

      while (stack.length > 0) {
        const frame = stack[stack.length - 1]
        const children = frame.node.children || []

        if (frame.index < children.length) {
          const nextNode = children[frame.index]
          frame.index++

          stack.push({
            node: nextNode,
            index: 0,
          })

          break
        } else {
          context.transform.completed = frame.node
          stack.pop()

          return {
            transform: {
              ...context.transform,
              stack,
            },
          }
        }
      }

      return {
        transform: {
          ...context.transform,
          stack,
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

    /* ─────────────── NODE (UNIT) ─────────────── */

    nodeEnterAction: assign(({ context }: any) => {
      return {
        transform: {
          ...context.transform,
          current: context.transform.stack.at(-1)?.node ?? null,
        },
      }
    }),

    nodeLogicAction: assign(() => {
      return {}
    }),

    nodeExitAction: assign(() => {
      return {}
    }),

    /* ─────────────── RESET ─────────────── */

    resetAction: assign(() => {
      return {
        source: null,
        transform: null,
        output: [],
      }
    }),
  },

  actors: {
    /**
     * bootstrapActor
     *
     * Forwards input.source into the machine.
     */
    bootstrapActor: fromCallback(({ input, sendBack }: any) => {
      sendBack({ type: "BOOTSTRAP", input })
    }),
  },

  guards: {
    hasMoreNodes: ({ context }: any) => {
      return context.transform.stack.length > 0
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
        START: {
          target: "boot",
        },
        RESET: {
          actions: ["resetAction"],
        },
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
            {
              guard: "hasMoreNodes",
              target: "node",
            },
            {
              target: "done",
            },
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

        done: {
          type: "final",
        },
      },

      onDone: {
        target: "finished",
      },
    },

    finished: {
      type: "final",
    },
  },
})
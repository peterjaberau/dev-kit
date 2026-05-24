import { setup, assign } from "xstate"

export const counterMachine = setup({
  types: {
    context: {} as {
      count: number
      step: number
    },
    events: {} as { type: "INC" } | { type: "DEC" } | { type: "STEP_5" } | { type: "RESET" },
  },
}).createMachine({
  id: "counter",
  initial: "active",
  context: {
    count: 0,
    step: 1,
  },
  states: {
    active: {
      on: {
        INC: {
          actions: assign({
            count: ({ context }) => context.count + context.step,
          }),
        },
        DEC: {
          actions: assign({
            count: ({ context }) => context.count - context.step,
          }),
        },
        STEP_5: {
          actions: assign({
            step: 5,
          }),
        },
        RESET: {
          actions: assign({
            count: 0,
            step: 1,
          }),
        },
      },
    },
  },
})
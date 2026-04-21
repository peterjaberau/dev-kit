import { setup, assign } from 'xstate'

export const dragMachine = setup({
  types: {
    context: {} as {
      x: number
      y: number
      dx: number
      dy: number
    },
    events: {} as
      | { type: "pointerdown"; x: number; y: number }
      | { type: "pointermove"; x: number; y: number }
      | { type: "pointerup" }
      | { type: "keydown.escape" },
  },
}).createMachine({
  id: "drag",
  initial: "idle",
  context: { x: 0, y: 0, dx: 0, dy: 0 },
  states: {
    idle: {
      on: {
        pointerdown: {
          target: "dragging",
          actions: assign({
            dx: ({ event }) => event.x,
            dy: ({ event }) => event.y,
          }),
        },
      },
    },
    dragging: {
      on: {
        pointermove: {
          actions: assign({
            x: ({ context, event }) => context.x + event.x - context.dx,
            y: ({ context, event }) => context.y + event.y - context.dy,
            dx: ({ event }) => event.x,
            dy: ({ event }) => event.y,
          }),
        },
        pointerup: {
          target: "idle",
        },
        "keydown.escape": {
          target: "idle",
        },
      },
    },
  },
})
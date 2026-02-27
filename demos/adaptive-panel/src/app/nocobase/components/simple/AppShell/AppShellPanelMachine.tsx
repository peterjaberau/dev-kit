"use client"
import { assign, setup, EventObject, sendParent, fromPromise } from "xstate"

function assertEventType<TE extends EventObject, TType extends TE["type"]>(
  event: TE,
  eventType: TType,
): asserts event is TE & { type: TType } {
  if (event.type !== eventType) {
    return
  }
}

export const appShellPanelMachine = setup({
  types: {
    input: {} as any,
    events: {} as any,
    context: {} as any,
  } as any,
  actors: {
    deleteDraggablePanel: fromPromise(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1_000))
    }),
  },
}).createMachine({
  id: "appShellPanelMachine",
  context: ({ input }) => input,
  initial: "Idle",
  states: {
    Idle: {
      on: {
        "triggering.toggle": {
          target: "Toggling",
        },
        "expanding.toggle": {
          target: "Toggling",
        },
        "pinning.toggle": {
          target: "Toggling",
        },
        "editing.start": {
          target: "Editing",
        },
        delete: {
          target: "Deleting",
        },
      },
    },
    Toggling: {
      always: {
        target: "Idle",
        actions: assign(({ event, context }) => {
          return {
            ...context,
            content: {
              ...context.content,
              ...event.content,
            },
          }
        }),
      },
    },
    Pinning: {
      on: {
        "pinning.end": {
          target: "Idle",
          actions: assign({
            content: {
              pin: (_: any, event: any) => event.pin,
            },
          }),
        },
      },
    },
    Editing: {
      on: {
        "editing.cancel": {
          target: "Idle",
        },
        "editing.submit": {
          target: "Idle",
          actions: assign({
            content: ({ event }) => event.content,
          }),
        },
      },
    },
    Deleting: {
      invoke: {
        src: "deleteDraggablePanel",
        input: ({ context }) => ({ id: context.id }),
        onDone: {
          target: "Done",
          actions: sendParent(({ context }) => ({
            type: "draggablePanel.delete.confirmed",
            id: context.id,
          })),
        },
      },
    },
    Done: {
      type: "final",
    },
  },
})

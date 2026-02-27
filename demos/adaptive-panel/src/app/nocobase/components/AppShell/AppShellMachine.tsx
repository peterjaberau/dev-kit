"use client"
import { assign, setup, ActorRefFrom, fromPromise, stopChild } from "xstate"
import { Ok } from "ts-results"
import invariant from "tiny-invariant"

export const initialDraggablePanels = [
  {
    id: "sidebarLeft",
    content: {
      defaultExpand: true,
      destroyOnClose: false,
      expandable: true,
      defaultSize: { width: "350px" },
      expand: true,
      mode: {
        options: ["fixed", "float"],
        value: "fixed",
      },
      pin: true,
      placement: {
        options: ["left", "right", "top", "bottom"],
        value: "left",
      },
      showHandlerWhenUnexpand: true,
    },
  },
  {
    id: "sidebarRight",
    content: {
      defaultExpand: true,
      destroyOnClose: false,
      expandable: true,
      expand: true,
      defaultSize: { with: "350px" },
      mode: {
        options: ["fixed", "float"],
        value: "fixed",
      },
      pin: true,
      placement: {
        options: ["left", "right", "top", "bottom"],
        value: "right",
      },
      showHandlerWhenUnexpand: true,
    },
  },
  {
    id: "bottomPanel",
    content: {
      defaultExpand: true,
      destroyOnClose: false,
      expandable: true,
      expand: true,
      defaultSize: { height: "350px" },
      mode: {
        options: ["fixed", "float"],
        value: "fixed",
      },
      pin: true,
      placement: {
        options: ["left", "right", "top", "bottom"],
        value: "bottom",
      },
      showHandlerWhenUnexpand: true,
    },
  },
  {
    id: "navbarLeft",
    content: {},
  },
  {
    id: "bodyPanel",
    content: {},
  },
  {
    id: "headerPanel",
    content: {},
  },
  {
    id: "footerPanel",
    content: {},
  },
]

function getDraggablePanelActorId(id: string) {
  return `panel-${id}`
}

import { appShellPanelMachine } from "./AppShellPanelMachine"

export const appShellMachine = setup({
  types: {
    context: {} as {
      draggablePanels: Array<ActorRefFrom<typeof appShellPanelMachine>>
    },
    input: {} as any,
    events: {} as any,
  } as any,
  actors: {
    appShellPanelMachine,
    getInitialState: fromPromise(async () => {
      await new Promise((resolve: any) => setTimeout(resolve, 1_000))
      return new Ok({
        draggablePanels: initialDraggablePanels,
      })
    }),
    saveNewDraggablePanel: fromPromise(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1_000))
    }),
  },
}).createMachine({
  id: "appShellMachine",
  context: {
    draggablePanels: [],
  },
  initial: "Loading initial state",
  states: {
    "Loading initial state": {
      invoke: {
        src: "getInitialState",
        onDone: {
          guard: ({ event }) => event.output.ok === true,
          target: "Ready",
          actions: assign(({ event, spawn }) => {
            invariant(event.output.ok === true)

            return {
              draggablePanels: event.output.val.draggablePanels.map((panel: any) =>
                spawn("appShellPanelMachine", {
                  id: getDraggablePanelActorId(panel.id),
                  input: panel,
                  systemId: getDraggablePanelActorId(panel.id),
                }),
              ),
            }
          }),
        },
      },
    },
    Ready: {
      type: "parallel",
      states: {
        DraggablePanels: {
          initial: "Idle",
          states: {
            Idle: {
              on: {
                "draggablePanel.new.open": {
                  target: "Creating",
                },
              },
            },
            Creating: {
              initial: "Editing",
              states: {
                Editing: {
                  on: {
                    "draggablePanel.new.cancel": {
                      target: "Done",
                    },
                    "draggablePanel.new.submit": {
                      target: "Submitting",
                      actions: assign({
                        draggablePanels: ({ context, event, spawn }) => {
                          const newDraggablePanelId = String(Math.random())

                          return context.draggablePanels.concat(
                            spawn("appShellPanelMachine", {
                              id: getDraggablePanelActorId(newDraggablePanelId),
                              input: {
                                id: newDraggablePanelId,
                                content: event.content,
                              },
                              systemId: getDraggablePanelActorId(newDraggablePanelId),
                            }),
                          )
                        },
                      }),
                    },
                  },
                },
                Submitting: {
                  invoke: {
                    src: "saveNewDraggablePanel",
                    input: ({ context }) => {
                      const lastCreatedPanel = context.draggablePanels.at(-1)?.getSnapshot().context
                      invariant(lastCreatedPanel !== undefined)

                      return lastCreatedPanel
                    },
                    onDone: {
                      target: "Done",
                    },
                  },
                },
                Done: {
                  type: "final",
                },
              },
              onDone: {
                target: "Idle",
              },
            },
          },
        },
      },
      on: {
        "draggablePanel.delete.confirmed": {
          actions: [
            stopChild(({ event }) => getDraggablePanelActorId(event.id)),
            assign({
              draggablePanels: ({ context, event }) =>
                context.draggablePanels.filter((panel: any) => panel.id !== getDraggablePanelActorId(event.id)),
            }),
          ],
        },
      },
    },
  },
})

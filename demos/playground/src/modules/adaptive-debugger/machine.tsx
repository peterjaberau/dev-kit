"use client"

import { assign, setup } from "xstate"
import type { DockviewApi } from "#adaptive-view/react"

type AdaptiveDebuggerContext = {
  api: DockviewApi | undefined
  open: boolean
}

type AdaptiveDebuggerEvent =
  | { type: "ON_READY"; api: DockviewApi }
  | { type: "ON_OPEN_CHANGE"; open: boolean }
  | { type: "ON_TOGGLE" }

export const adaptiveDebuggerMachine = setup({
  types: {
    context: {} as AdaptiveDebuggerContext,
    events: {} as AdaptiveDebuggerEvent,
  },
  actions: {
    setApi: assign({
      api: ({ event, context }) => (event.type === "ON_READY" ? event.api : context.api),
    }),
    setOpen: assign({
      open: ({ event, context }) => (event.type === "ON_OPEN_CHANGE" ? event.open : context.open),
    }),
    toggle: assign({
      open: ({ context }) => !context.open,
    }),
  },
}).createMachine({
  id: "adaptive-debugger",
  initial: "idle",
  context: {
    api: undefined,
    open: false,
  },
  states: {
    idle: {
      on: {
        ON_READY: { actions: "setApi" },
        ON_OPEN_CHANGE: { actions: "setOpen" },
        ON_TOGGLE: { actions: "toggle" },
      },
    },
  },
})

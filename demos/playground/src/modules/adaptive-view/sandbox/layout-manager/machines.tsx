"use client"

import { assign, enqueueActions, setup } from "xstate"
import type { DockviewApi } from "#adaptive-view/react"

type LayoutManagerContext = {
  api: DockviewApi | undefined
}

type LayoutManagerEvent = {
  type: "ON_READY"
  api: DockviewApi
}

export const SANDBOX_LAYOUT_ID = "sandbox-layout"

type SandboxLayoutContext = {
  selectedPanelId: string | null
  selectedGroupId: string | null
}

type SandboxLayoutEvent =
  | {
      type: "ON_SELECT_PANEL"
      panelId: string
    }
  | {
      type: "ON_SELECT_GROUP"
      groupId: string
    }

export const sandboxLayoutMachine = setup({
  types: {
    context: {} as SandboxLayoutContext,
    events: {} as SandboxLayoutEvent,
  },
  actions: {
    selectPanel: assign({
      selectedPanelId: ({ context, event }) =>
        event.type === "ON_SELECT_PANEL" && context.selectedPanelId === event.panelId
          ? null
          : event.type === "ON_SELECT_PANEL"
            ? event.panelId
            : context.selectedPanelId,
    }),
    selectGroup: assign({
      selectedGroupId: ({ context, event }) =>
        event.type === "ON_SELECT_GROUP" && context.selectedGroupId === event.groupId
          ? null
          : event.type === "ON_SELECT_GROUP"
            ? event.groupId
            : context.selectedGroupId,
    }),
  },
}).createMachine({
  id: SANDBOX_LAYOUT_ID,
  initial: "idle",
  context: {
    selectedPanelId: null,
    selectedGroupId: null,
  },
  states: {
    idle: {
      on: {
        ON_SELECT_PANEL: {
          actions: "selectPanel",
        },
        ON_SELECT_GROUP: {
          actions: "selectGroup",
        },
      },
    },
  },
})

export const layoutManagerMachine = setup({
  types: {
    context: {} as LayoutManagerContext,
    events: {} as LayoutManagerEvent,
  },
  actors: {
    sandboxLayoutMachine,
  },
  actions: {
    setApi: assign({
      api: ({ event }) => event.api,
    }),
    spawnSandboxLayout: enqueueActions(({ enqueue }) => {
      enqueue.spawnChild("sandboxLayoutMachine", {
        id: SANDBOX_LAYOUT_ID,
        systemId: SANDBOX_LAYOUT_ID,
      })
    }),
  },
}).createMachine({
  id: "layout-manager",
  initial: "waiting",
  context: {
    api: undefined,
  },
  states: {
    waiting: {
      on: {
        ON_READY: {
          actions: "setApi",
          target: "ready",
        },
      },
    },
    ready: {
      entry: "spawnSandboxLayout",
      on: {
        ON_READY: {
          actions: "setApi",
        },
      },
    },
  },
})

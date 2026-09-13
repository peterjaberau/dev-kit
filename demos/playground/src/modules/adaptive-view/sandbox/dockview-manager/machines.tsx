"use client"

import { assign, enqueueActions, setup } from "xstate"
import type { DockviewApi } from "#adaptive-view/react"

type DockviewManagerContext = {
  api: DockviewApi | undefined
}

type DockviewManagerEvent = {
  type: "onReady"
  params: { api: DockviewApi }
}

export const DOCKVIEW_SELECTION_ID = "dockview-selection"

type DockviewSelectionContext = {
  selectedPanelId: string | null
  selectedGroupId: string | null
}

type DockviewSelectionEvent =
  | {
      type: "onSelectPanel"
      params: { panelId: string }
    }
  | {
      type: "onSelectGroup"
      params: { groupId: string }
    }

export const dockviewSelectionMachine = setup({
  types: {
    context: {} as DockviewSelectionContext,
    events: {} as DockviewSelectionEvent,
  },
  actions: {
    selectPanel: assign({
      selectedPanelId: ({ context, event }) =>
        event.type === "onSelectPanel" && context.selectedPanelId === event.params.panelId
          ? null
          : event.type === "onSelectPanel"
            ? event.params.panelId
            : context.selectedPanelId,
    }),
    selectGroup: assign({
      selectedGroupId: ({ context, event }) =>
        event.type === "onSelectGroup" && context.selectedGroupId === event.params.groupId
          ? null
          : event.type === "onSelectGroup"
            ? event.params.groupId
            : context.selectedGroupId,
    }),
  },
}).createMachine({
  id: DOCKVIEW_SELECTION_ID,
  initial: "idle",
  context: {
    selectedPanelId: null,
    selectedGroupId: null,
  },
  states: {
    idle: {
      on: {
        onSelectPanel: {
          actions: "selectPanel",
        },
        onSelectGroup: {
          actions: "selectGroup",
        },
      },
    },
  },
})

export const dockviewManagerMachine = setup({
  types: {
    context: {} as DockviewManagerContext,
    events: {} as DockviewManagerEvent,
  },
  actors: {
    dockviewSelectionMachine,
  },
  actions: {
    setApi: assign({
      api: ({ event }) => event.params.api,
    }),
    spawnDockviewSelection: enqueueActions(({ enqueue }) => {
      enqueue.spawnChild("dockviewSelectionMachine", {
        id: DOCKVIEW_SELECTION_ID,
        systemId: DOCKVIEW_SELECTION_ID,
      })
    }),
  },
}).createMachine({
  id: "dockview-manager",
  initial: "waiting",
  context: {
    api: undefined,
  },
  states: {
    waiting: {
      on: {
        onReady: {
          actions: "setApi",
          target: "ready",
        },
      },
    },
    ready: {
      entry: "spawnDockviewSelection",
      on: {
        onReady: {
          actions: "setApi",
        },
      },
    },
  },
})

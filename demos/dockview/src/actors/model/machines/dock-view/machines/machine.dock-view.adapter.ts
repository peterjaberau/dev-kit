import { assign, enqueueActions, setup } from "xstate"
import { dockViewAdapterConfig } from "#actors/model/shared/config"
import { dockViewApiMachine } from "./machine.dock-view.api"
import { dockViewPanelMachine } from "./machine.dock-view.panel"
import { DOCK_VIEW_ENUM } from ".."

export const dockViewAdapterMachine = setup({
  actions: {
    handleSpawnDockApi: assign(({ context, event, spawn }) => {
      const spawnedApiRef = spawn("dockViewApiMachine", {
        id: DOCK_VIEW_ENUM.ADAPTER_ID,
        input: { api: event.api },
      })
      context.apiRef = spawnedApiRef
    }),
    handleSpawnDockPanels: enqueueActions(({ context, enqueue, event }) => {
      dockViewAdapterConfig.nodes.forEach((item: any) => {
        enqueue.spawnChild("dockViewPanelMachine", {
          id: item.id,
          systemId: item.id,
          input: {
            node: item,
            api: context.api,
            apiRef: context.apiRef,
          },
        })
      })
    }),
    handleAddPanel: enqueueActions(({ context, enqueue, event }: any) => {
      const api = context.api
      const id = Math.random().toString()
      enqueue.spawnChild("dockViewPanelMachine", {
        id: id,
        // systemId: item.id,
        input: {
          node: {
            id: id,
            view: {
              type: "DOCK_PANEL",
              component: "default",
              title: "Node " + id,
              renderer: "always",
              position: event?.payload?.position || undefined,
            },
          },
          api: context.api,
          apiRef: context.apiRef,
        },
      })
    }),
    handleRemovePanel: enqueueActions(({ context, event, enqueue }: any) => {
      const panelId = event.payload.params.id
      const panelRef = event.payload.params.parentRef
      const api = event.payload.api

      enqueue.sendTo(panelRef, {
        type: "onTerminate",
        payload: {
          api,
        },
      })

      enqueue.stopChild(panelRef.id)
    }),
  },
  actors: {
    dockViewApiMachine,
    dockViewPanelMachine,
  },
}).createMachine({
  initial: "initiating",
  context: ({ input, self }: any) => {
    return {
      parentRef: self,
      apiRef: null,
      api: null,
      ...input,
    }
  },
  states: {
    initiating: {
      on: {
        onReady: {
          target: "idle",
          actions: enqueueActions(({ enqueue, context, event }) => {
            enqueue("handleSpawnDockApi")
            enqueue("handleSpawnDockPanels")
          }),
        },
      },
    },
    idle: {
      on: {
        onAddPanel: { actions: ["handleAddPanel"] },
        onRemovePanel: {
          actions: ["handleRemovePanel"],
        },
        onAddGroup: {},
        onRemoveGroup: {},

        onDidActiveGroupChange: {},
        onDidActivePanelChange: {},
        onDidAddGroup: {},
        onDidAddPanel: {},
        onDidDrop: {},
        onDidLayoutChange: {},
        onDidLayoutFromJSON: {},
        onDidMaximizedGroupChange: {},
        onDidMovePanel: {},
        onDidRemoveGroup: {},
        onDidRemovePanel: {},

        onUnhandledDragOverEvent: {},

        onWillDragGroup: {},
        onWillDragPanel: {},
        onWillDrop: {},
        onWillShowOverlay: {},

        onCloseAllGroups: {},
        onDispose: {},

        // panel
        addPanelCompletion: {},
        activePanelChangeCompletion: {},
        movePanelCompletion: {},
        removePanelCompletion: {},

        onClearLayout: {},
        onSaveLayout: {},
        onLoadLayout: {},
      },
    },
  },
})

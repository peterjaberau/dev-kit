import { assign, enqueueActions, setup } from "xstate"

import { dockViewAdapterConfig } from "../config"
import { dockViewApiMachine } from "./machine.dock-view.api"
import { dockViewPanelMachine } from "./machine.dock-view.panel"
import { DOCK_VIEW_ENUM } from "../lib"

export const dockViewAdapterMachine = setup({
  actions: {
    handleSpawnDockApi: assign(({ context, event, spawn, self }) => {
      const spawnedApiRef = spawn("dockViewApiMachine", {
        id: DOCK_VIEW_ENUM.API_ID,
        input: {
          refs: {
            internal: {
              parent: self,
            },
          },
          props: {},
          view: {},
          model: {
            api: event?.api || null,
          },
        },
      })

      context.refs.external.api = spawnedApiRef
      context.model.api = event?.api || null
    }),
    handleSpawnDockPanels: enqueueActions(({ context, enqueue, event, self }) => {
      dockViewAdapterConfig.nodes.forEach((item: any) => {
        enqueue.spawnChild("dockViewPanelMachine", {
          id: item.id,
          systemId: item.id,
          input: {
            refs: {
              internal: {
                parent: self,
              },
              external: {
                api: context?.refs?.external?.api || null,
              },
            },
            props: {},
            view: {
              id: item.id,
              view: {
                ...item.view,
              },
            },
            model: {
              api: context?.model?.api || null,
            },
          },
        })
      })
    }),
    handleAddPanel: enqueueActions(({ context, enqueue, event, self }: any) => {
      const api = context?.model?.api

      const totalPanels = (api?.totalPanels || 0) + 1
      const id = "panel_" + totalPanels
      enqueue.spawnChild("dockViewPanelMachine", {
        id: id,
        // systemId: item.id,
        input: {
          refs: {
            internal: {
              parent: self,
            },
            external: {
              api: context?.refs?.external?.api || null,
            },
          },
          props: {},
          view: {
            id: id,
            view: {
              type: "DOCK_PANEL",
              component: "default",
              title: "Panel " + totalPanels,
              renderer: "always",
              params: {},
              position: event?.payload?.position || undefined,
            },
          },
          model: {
            api: context?.model?.api || null,
          },
        },
      })
    }),
    handleRemovePanel: enqueueActions(({ context, event, enqueue }: any) => {
      const { panelId } = event.payload
      const panelRef = context.refs.internal.self.getSnapshot().children[panelId]
      enqueue.sendTo(panelRef, {
        type: "onTerminate",
      })
      enqueue.stopChild(panelId)
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
      refs: {
        internal: {
          self: self,
          parent: input?.refs?.internal?.parent || null,
        },
        external: {
          api: null,
        },
      },
      props: {},
      view: {},
      model: {
        api: null,
      },
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

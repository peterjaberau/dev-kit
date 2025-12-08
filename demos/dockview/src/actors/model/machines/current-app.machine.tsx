import { assign, enqueueActions, setup } from "xstate"
import { nodeManagerMachine, dockAdapterMachine } from "./node.machine"
import { ROOT_SYSTEM_IDS } from "#actors/model/shared/constants"
import { DOCK_VIEW_ENUM, dockViewAdapterMachine } from "./dock-view"
import { dynamicPanelLabMachine } from "./dynamic-panels/machines"

export const currentAppExampleMachine = setup({
  types: {
    context: {} as any,
    events: {} as any,
  } as any,
  actions: {
    spawnNodeManager: assign(({ context, spawn }) => {
      context.nodeManagerRef = spawn("nodeManagerMachine", {
        systemId: ROOT_SYSTEM_IDS.NODE_MANAGER,
      })
    }),
    spawnDockAdapter: assign(({ context, spawn }) => {
      context.dockAdapterRef = spawn("dockAdapterMachine", {
        systemId: ROOT_SYSTEM_IDS.DOCK_ADAPTER,
      })
    }),
    spawnDockViewAdapter: assign(({ context, spawn }) => {
      context.dockAdapterRef = spawn("dockViewAdapterMachine", {
        systemId: DOCK_VIEW_ENUM.ADAPTER_ID,
      })
    }),
    spawnDynamicPanelLab: assign(({ context, spawn }) => {
      context.dynamicPanelLabRef = spawn("dynamicPanelLabMachine", {
        systemId: DOCK_VIEW_ENUM.DYNAMIC_PANEL_LAB_ACTOR_ID,
      })
    }),
  },
  actors: {
    nodeManagerMachine,
    dockAdapterMachine,
    dockViewAdapterMachine,
    dynamicPanelLabMachine
  },
  guards: {},
}).createMachine({
  context: ({ input }: any) => {
    return {
      nodeManagerRef: null,
      dockAdapterRef: null,
      dockViewAdapterRef: null,
      dynamicPanelLabRef: null,
      ...input,
    }
  },
  entry: enqueueActions(({ enqueue, context, event }) => {
    enqueue("spawnNodeManager")
    enqueue("spawnDockAdapter")
    enqueue("spawnDockViewAdapter")
    enqueue("spawnDynamicPanelLab")
  }),
})

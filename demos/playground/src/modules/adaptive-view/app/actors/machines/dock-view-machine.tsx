import { assign, enqueueActions, setup } from "xstate"
import { dockViewAdapterMachine } from "./dockview-adapter-machine"
import { dynamicPanelLabMachine } from "./dynamic-panel-lab-machine"
import { DOCK_VIEW_ENUM } from "../constants"

export const dockviewMachine = setup({
  types: {
    context: {} as any,
    events: {} as any,
  } as any,
  actions: {
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
    dockViewAdapterMachine,
    dynamicPanelLabMachine,
  },
  guards: {},
}).createMachine({
  context: ({ input }: any) => {
    return {
      dockViewAdapterRef: null,
      dynamicPanelLabRef: null,
      ...input,
    }
  },
  entry: enqueueActions(({ enqueue, context }) => {
    enqueue("spawnDockViewAdapter")
    enqueue("spawnDynamicPanelLab")

  }),
})

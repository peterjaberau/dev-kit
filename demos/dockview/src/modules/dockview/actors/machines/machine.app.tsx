import { assign, enqueueActions, setup } from "xstate"
import { dockViewAdapterMachine } from "./machine.dock-view.adapter"
import { dynamicPanelLabMachine } from "./machine.dynamic-panel.lab"
import { oasMachine } from './oas/machine.oas'
import { DOCK_VIEW_ENUM } from "../lib"
import { data as apiSpec } from "#modules/oas/data/petstore"
import { data as oasSampleSpecs } from "#modules/oas/data/sample-api-specs"

export const appMachine = setup({
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
    spawnOasRef: assign(({ context, spawn }) => {
      context.oasRef = spawn("oasMachine", {
        systemId: DOCK_VIEW_ENUM.OAS_INSTANCE_ID,
        input: {
          apiSpec: oasSampleSpecs
        }
      })
    }),

  },
  actors: {
    dockViewAdapterMachine,
    dynamicPanelLabMachine,
    oasMachine
  },
  guards: {},
}).createMachine({
  context: ({ input }: any) => {
    return {
      dockViewAdapterRef: null,
      dynamicPanelLabRef: null,
      oasRef: null,
      ...input,
    }
  },
  entry: enqueueActions(({ enqueue }) => {
    enqueue("spawnDockViewAdapter")
    enqueue("spawnDynamicPanelLab")
    enqueue("spawnOasRef")
  }),
})

import { assign, enqueueActions, setup } from "xstate"
import { dockViewAdapterMachine } from "./machine.dock-view.adapter"
import { dynamicPanelLabMachine } from "./machine.dynamic-panel.lab"
import { oasMachine } from './oas/machine.oas'
import { oasManagerMachine } from './oas/machine.oas-manager'
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
    spawnOasManagerRef: assign(({ context, spawn }) => {
      context.oasManagerRef = spawn("oasManagerMachine", {
        systemId: DOCK_VIEW_ENUM.OAS_MANAGER_INSTANCE_ID,
        input: {}
      })
    }),


  },
  actors: {
    dockViewAdapterMachine,
    dynamicPanelLabMachine,
    oasMachine,
    oasManagerMachine
  },
  guards: {},
}).createMachine({
  context: ({ input }: any) => {
    return {
      dockViewAdapterRef: null,
      dynamicPanelLabRef: null,
      oasRef: null,
      oasManagerRef: null,
      ...input,
    }
  },
  entry: enqueueActions(({ enqueue }) => {
    enqueue("spawnDockViewAdapter")
    enqueue("spawnDynamicPanelLab")
    enqueue("spawnOasRef")
    enqueue("spawnOasManagerRef")

  }),
})

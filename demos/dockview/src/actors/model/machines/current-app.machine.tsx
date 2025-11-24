import { assign, enqueueActions, setup } from "xstate"
import { nodeManagerMachine, dockAdapterMachine } from "./node.machine"
import { ROOT_SYSTEM_IDS } from "#actors/model/shared/constants"

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
  },
  actors: {
    nodeManagerMachine,
    dockAdapterMachine
  },
  guards: {},
}).createMachine({
  context: ({ input }: any) => {
    return {
      nodeManagerRef: null,
      dockAdapterRef: null,
      ...input,
    }
  },
  entry: enqueueActions(({ enqueue, context, event }) => {
    enqueue("spawnNodeManager")
    enqueue("spawnDockAdapter")
  }),
})

import { assign, enqueueActions, setup } from "xstate"
import { nodeManagerMachine } from "./node.machine"
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
  },
  actors: {
    nodeManagerMachine,
  },
  guards: {},
}).createMachine({
  context: ({ input }: any) => {
    return {
      nodeManagerRef: null,
      ...input,
    }
  },
  entry: enqueueActions(({ enqueue, context, event }) => {
    enqueue("spawnNodeManager")
  }),
})

import { assign, enqueueActions, setup } from "xstate"
import { nodeRootMachine } from './machine.node.root'
import { nodeItemMachine } from './machine.node.item'
import { ACTOR_CONSTANTS } from "../constants"

export const appMachine = setup({
  types: {
    context: {} as any,
    events: {} as any,
  } as any,
  actions: {
    spawnNodeRoot: assign(({ context, spawn }) => {
      context.dockAdapterRef = spawn("nodeRootMachine", {
        systemId: ACTOR_CONSTANTS.APP_NODE_ACTOR_ID_ROOT,
      })
    }),
  },
  actors: {
    nodeRootMachine,
  },
  guards: {},
}).createMachine({
  context: ({ input }: any) => {
    return {
      nodeRootRef: null,
      ...input,
    }
  },
  entry: enqueueActions(({ enqueue }) => {
    enqueue("spawnNodeRoot")
  }),
})

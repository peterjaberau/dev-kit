import { assign, enqueueActions, setup } from "xstate"
import { nodeManagerMachine } from "./node-manager"

export const nodeInstanceMachine = setup({
  types: {
    context: {} as any,
    events: {} as any,
  } as any,
  actions: {
    spawnNodeManager: assign(({ context, spawn, self }) => {
      context.jsonTreeManagerRef = spawn("nodeManagerMachine", {
        id: "node-mananger",
        systemId: "node-mananger",
        input: {
          data: context?.data,
        },
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
      data: input?.data,
      managerRef: null,
    }
  },
  entry: enqueueActions(({ context, enqueue, check, event }) => {
    enqueue("spawnNodeManager")
  }),
})

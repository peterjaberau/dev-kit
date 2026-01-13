import { assign, enqueueActions, setup } from "xstate"
import { treeMachine } from "./tree.machine"
import { CONSTANTS } from "../utils"

export const appMachine = setup({
  types: {
    context: {} as any,
    events: {} as any,
  } as any,
  actions: {
    spawnTree: assign(({ context, spawn, self }) => {
      context.treeRef = spawn("treeMachine", {
        id: CONSTANTS.TREE,
        systemId: CONSTANTS.TREE,
        input: {
          data: context?.data,
        },
      })
    }),
  },
  actors: {
    treeMachine,
  },
  guards: {},
}).createMachine({
  context: ({ input }: any) => {
    return {
      data: input?.data,
      treeRef: null,
    }
  },
  entry: enqueueActions(({ context, enqueue, check, event }) => {
    enqueue("spawnTree")
  }),
})

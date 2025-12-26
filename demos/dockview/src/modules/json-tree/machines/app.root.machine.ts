import { assign, enqueueActions, setup } from "xstate"
import { createNode } from './node.create'

export const appRootMachine = setup({
  types: {
    context: {} as any,
    events: {} as any,
  } as any,
  actions: {
    handleInitiate: assign(({ context }) => {}),
    spawnRootNode: assign(({ context, spawn, self }) => {
      context.nodeRef = spawn(createNode({
        refs: {
          parent: self,
        },
        dataConfig: {
          value: context?.data
        },
      }))
    }),

  },
  actors: {

  },
  guards: {},
}).createMachine({
  context: ({ input }: any) => {
    return {
      nodeRef: null,
      nodeRecursiveRef: null,
      data: input?.data,
      collapsed: true,
      enableClipboard: true,
      editable: false,
      displayArrayIndex: true,
      displaySize: true,
    }
  },
  entry: enqueueActions(({ context, enqueue, check, event}) => {
    enqueue('spawnRootNode')
  }),
})

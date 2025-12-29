import { assign, enqueueActions, setup } from "xstate"
import { createNode } from './node.create'
import { machineConstants } from "../utils/constants"

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
          name: machineConstants.NODE_ROOT_NAME,
          value: context?.data
        },
        viewConfig: {
          isOpen: true,
        }
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
      nodeMetaRef: null,
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

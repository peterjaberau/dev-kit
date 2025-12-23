import { assign, enqueueActions, setup } from "xstate"
import { nodeMachine } from './node.machine'
import { machineConstants} from '../utils/constants'

export const appRootMachine = setup({
  types: {
    context: {} as any,
    events: {} as any,
  } as any,
  actions: {
    handleInitiate: assign(({ context }) => {}),
    spawnRootNode: assign(({ context, spawn, self }) => {
      context.nodeRootRef = spawn("nodeMachine", {
        systemId: machineConstants.NODE_ROOT,
        input: {
          refs: {
            internal: {
              parent: self
            },
          },
          config: {
            data: context?.data
          },
        }
      })
    }),
  },
  actors: {
    nodeMachine
  },
  guards: {},
}).createMachine({
  context: ({ input }: any) => {
    return {
      nodeRootRef: null,
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

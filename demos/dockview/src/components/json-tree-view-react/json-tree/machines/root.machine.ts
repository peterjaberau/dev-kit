import { assign, enqueueActions, setup } from "xstate"
import { nodeMachine } from './node.machine'
import { machineConstants} from '../utils/constants'

export const rootMachine = setup({
  types: {
    context: {} as any,
    events: {} as any,
  } as any,
  actions: {
    handleInitiate: assign(({ context }) => {}),
    spawnNode: assign(({ context, spawn, self }) => {
      context.nodeRef = spawn("nodeMachine", {
        systemId: machineConstants.NODE,
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
      nodeRef: null,
      data: input?.data,
      collapsed: true,
      enableClipboard: true,
      editable: false,
      displayArrayIndex: true,
      displaySize: true,
    }
  },
  entry: enqueueActions(({ context, enqueue, check, event}) => {
    enqueue('spawnNode')
  }),
})

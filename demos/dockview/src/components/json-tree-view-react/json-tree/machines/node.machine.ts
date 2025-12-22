import { assign, enqueueActions, setup } from "xstate"
import { isObject, isArray, isBigint, isBoolean, isNumber, isString } from '../utils'

export const nodeMachine = setup({
  types: {
    context: {} as any,
    events: {} as any,
  } as any,
  actions: {
    handleDataTypeEval: assign(({ context, event }: any, params: any) => {
      const data = context?.config?.data
      context.runtime.nodeDataType = typeof data
    }),
  },
  actors: {},
  guards: {
    isBranchNode: (({ context }: any) => {
      const data = context?.config?.data
      return isArray(data) || isObject(data)
    }),
    isLeafNode: (({ context }: any) => {
      const data = context?.config?.data
      return !isArray(data) && !isObject(data)
    }),
  },
}).createMachine({
  initial: "loading",
  context: ({ input, self }: any) => {
    return {
      refs: {
        internal: {
          self: self,
          parent: input?.refs?.internal?.parent || null
        },
        external: {}
      },
      config: {
        data: input?.data
      },
      runtime: {
        nodeDataType: null,

      },
    }
  },
  states: {
    loading: {
      entry: enqueueActions(({ enqueue, context, event }) => {
        enqueue("handleDataTypeEval")
      }),
    }
  }
})

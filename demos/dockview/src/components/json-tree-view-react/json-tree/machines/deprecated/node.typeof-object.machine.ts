import { assign, createMachine, enqueueActions, setup } from "xstate"
import { nodeMachine } from './node.machine'


export const nodeObjectMachine: any = setup({
  types: {} as any,
  actors: {
    nodeMachine
  },
  actions: {
    spawnNodes: assign(({ context, spawn, self }) => {
      const data = context?.config?.data
      Object.keys(data).forEach((key) => {



        // const node =  spawn(nodeMachine, {
        //   input: {
        //     refs: {
        //       internal: {
        //         // parentNode: context?.refs?.internal?.parent,
        //         parent: self
        //       },
        //     },
        //     config: {
        //       data: context?.data[key]
        //     },
        //     info: {
        //       parentPath: [
        //         ...context?.info?.parentPath, key
        //       ]
        //     }
        //   }
        // })

        // context.refs.internal.nodes = {
        //   ...context?.refs?.internal?.nodes,
        //   [key]: node
        // }
      })

    }),
  },


}).createMachine({
  // initial: "initiating",
  context: ({ input, self }: any) => {
    return {
      refs: {
        internal: {
          self: self,
          parent: input?.refs?.internal?.parent,
          nodes: {}
        },
        external: {
          ...input?.refs?.external,
        },
      },
      config: {
        data: input?.config?.data
      },
      info: {},
      runtime: {},
    }
  },
  // states: {
  //   initiating: {
  //     entry: enqueueActions(({ enqueue, context, event }) => {
  //       enqueue("spawnNodes")
  //     })
  //   }
  // }

})

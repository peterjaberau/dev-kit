import { assign, enqueueActions, setup } from "xstate"
import { nodeTreeLeafMachine } from "./node.tree.leaf.machine"
import { nodeTypeofArrayMachine } from './node.typeof.array'
import { nodeTypeofObjectMachine } from './node.typeof.object'

const getNodeInfo = (context: any) => {
  return context?.refs?.relations?.nodes?.current?.getSnapshot()?.context?.info || {}
}

export const nodeTreeBranchMachine = setup({
  types: {} as any,
  actions: {
    spawnNodeArray: assign(({ context, spawn }) => {
      context.refs.relations.branch = spawn("nodeTypeofArrayMachine", {
        input: {
          refs: {
            internal: {
              parent: self,
            },
          },
        },
      })
    }),
    spawnNodeObject: assign(({ context, spawn }) => {
      context.refs.relations.leaf = spawn("nodeTypeofObjectMachine", {
        input: {
          refs: {
            internal: {
              parent: self,
            },
          },
        },
      })
    }),
  },
  actors: {
    nodeTypeofArrayMachine,
    nodeTypeofObjectMachine
  },
  guards: {
    isArrayNode: ({ context }: any) => {
      return getNodeInfo(context)?.is?.isArray
    },
    isObjectNode: ({ context }: any) => {
      return getNodeInfo(context)?.is?.isObject
    },
  },
}).createMachine({
  context: ({ input, self }: any) => {

    return {
      refs: {
        internal: {
          self: self,
          ...input?.refs?.internal,
        },
        external: {
          ...input?.refs?.external,
        },
        relations: {
          nodes: {
           ...input?.refs?.relations?.nodes
          },
          tree: {
            branch: null,
            leaf: null,
            ...input?.refs?.relations?.tree
          },
        },
      },
      config: {
        ...input?.config,
      },
      info: {
        ...input?.info,
        is: {
          ...input?.info?.is,
        },
      },
      runtime: {
        /* config state in runtime */
      },
    }
  },
  // entry: enqueueActions(({ enqueue, context, event }) => {
  //   enqueue("spawnNodeArray")
  //   enqueue("spawnNodeObject")
  // }),
})

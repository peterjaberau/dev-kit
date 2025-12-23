import { assign, enqueueActions, setup } from "xstate"
import { nodeTreeBranchMachine } from "./node.tree.branch.machine"
import { nodeTreeLeafMachine } from "./node.tree.leaf.machine"

export const nodeTreeRootMachine = setup({
  types: {} as any,
  actions: {
    spawnNodeTreeBranch: assign(({ context, spawn, self }) => {
      context.refs.relations.tree.branch = spawn("nodeTreeBranchMachine", {
        input: {
          refs: {
            internal: {
              parent: self,
            },
            relations: {
              nodes: {
                current: context?.refs?.relations?.nodes?.current,
                parent: null,
              },
            },
          },
        },
      })
    }),
    spawnNodeTreeLeaf: assign(({ context, spawn, self }) => {
      context.refs.relations.tree.leaf = spawn("nodeTreeLeafMachine", {
        input: {
          refs: {
            internal: {
              parent: self,
            },
            relations: {
              nodes: {
                current: context?.refs?.relations?.nodes?.current,
                parent: null,
              },
            },
          },
        },
      })
    }),
  },
  actors: {
    nodeTreeBranchMachine,
    nodeTreeLeafMachine,
  },
  guards: {
    isBranchNode: ({ context }: any) => {
      return context?.info?.is?.isBranch
    },
    isLeafNode: ({ context }: any) => {
      return context?.info?.is?.isLeaf
    },

  },
}).createMachine({
  initial: 'initiating',
  context: ({ input, self }: any) => {
    // const parentInfo = input?.refs?.internal?.parent?.getSnapshot()?.context?.info?.is || {}

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
            ...input?.refs?.relations?.nodes,
          },
          tree: {
            branch: null,
            leaf: null,
            ...input?.refs?.relations?.tree,
          },
        },
      },
      config: input?.config,
      info: input?.info,
      runtime: {
        /* config state in runtime */
      },
    }
  },
  states: {
    initiating: {
      always: [
        { guard: "isBranchNode", actions: ["spawnNodeTreeBranch"], target: "ready", },
        { guard: "isLeafNode", actions: ["spawnNodeTreeLeaf"], target: "ready", },
      ],
    },
    ready: {},
  },
})

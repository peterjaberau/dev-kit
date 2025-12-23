import { assign, enqueueActions, setup, raise } from "xstate"
import { isBranch, isLeaf, isFalsy, typeOf, isArray, isObject, machineConstants } from "../utils"
import { nodeTreeRootMachine } from "./node.tree.root.machine"
import { nodeTreeBranchMachine } from "./node.tree.branch.machine"
import { nodeTreeLeafMachine } from "./node.tree.leaf.machine"

export const nodeMachine = setup({
  types: {
    context: {} as any,
    events: {} as any,
  } as any,
  actions: {
    handleInitiate: assign(({ context }) => {}),
    evalNodeType: assign(({ context, event, self }: any, params: any) => {
      const data = context?.config?.data

      const isRootNode = isFalsy(context?.refs?.relations?.nodes?.parent)
      const isBranchNode = isBranch(data)
      const isLeafNode = isLeaf(data)
      const isRootBranch = isRootNode && isBranchNode
      const isRootLeaf = isRootNode && isLeafNode
      const isChildBranch = isBranchNode && !isRootNode
      const isChildLeaf = isLeafNode && !isRootNode

      const isArrayNode = isArray(context?.config?.data)
      const isObjectNode = isObject(context?.config?.data)

      context.info.typeof = typeOf(data)
      context.info.is = {
        isRoot: isRootNode,
        isRootBranch: isRootBranch,
        isRootLeaf: isRootLeaf,
        isBranch: isBranchNode,
        isLeaf: isLeafNode,
        isChildBranch: isChildBranch,
        isChildLeaf: isChildLeaf,
        isArray: isArrayNode,
        isObject: isObjectNode,
      }
    }),

    spawnNodeTreeRoot: assign(({ context, spawn, self }) => {
      context.refs.relations.tree.root = spawn("nodeTreeRootMachine", {
        input: {
          refs: {
            internal: {
              parent: self,
            },
            relations: {
              nodes: {
                current: self,
                parent: null,
              },
            },
          },
          info: context?.info,
          config: {
            data: context?.config?.data
          }
        },
      })
    }),
    spawnNodeTreeBranch: assign(({ context, spawn, self }) => {
      context.refs.relations.tree.branch = spawn("nodeTreeBranchMachine", {
        input: {
          refs: {
            internal: {
              parent: self,
            },
            relations: {
              nodes: {
                current: self,
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
                current: self,
                parent: null,
              },
            },
          },
        },
      })
    }),
  },
  actors: {
    nodeTreeRootMachine,
    nodeTreeBranchMachine,
    nodeTreeLeafMachine,
  },
  guards: {
    isRootNode: ({ context }: any) => {
      return context?.info?.is?.isRoot
    },
    isRootBranchNode: ({ context }: any) => {
      return context?.info?.is?.isRootBranch
    },
    isRootLeafNode: ({ context }: any) => {
      return context?.info?.is?.isRootLeaf
    },
    isBranchNode: ({ context }: any) => {
      return context?.info?.is?.isBranch
    },
    isLeafNode: ({ context }: any) => {
      return context?.info?.is?.isLeaf
    },
    isChildBranchNode: ({ context }: any) => {
      return context?.info?.is?.isChildBranch
    },
    isChildLeafNode: ({ context }: any) => {
      return context?.info?.is?.isChildLeaf
    },
    isBranchArray: ({ context }: any) => {
      return context?.info?.is?.isBranch
    },
    isBranchObject: ({ context }: any) => {
      return context?.info?.is?.isBranch
    },
    isBranchScalar: ({ context }: any) => {
      return context?.info?.is?.isBranch
    },
  },
}).createMachine({
  initial: "initiating",
  context: ({ input, self }: any) => {
    return {
      refs: {
        internal: {
          self: self,
          parent: input?.refs?.internal?.parent || null,
        },
        external: {},
        relations: {
          nodes: {
            // data source actors, at node level
            current: self,
            parent: input?.refs?.relations?.nodes?.parent,
          },
          tree: {
            root: null,
            branch: null,
            leaf: null,
          },
        },
      },
      config: {
        data: input?.config?.data,
      },
      info: {
        typeof: null,
        is: {
          isRoot: null,
          isRootBranch: null, // root node is object or array
          isRootLeaf: null, // root node is scalar
          isBranch: null, // node is object or array
          isChildBranch: null,
          isChildLeaf: null,
          isLeaf: null, // node is scalar
          isArray: null,
          isObject: null,
        },
      },
      runtime: {
        /* config state in runtime */
      },
    }
  },

  states: {
    initiating: {
      entry: ["evalNodeType"],
      always: [
        { guard: "isRootBranchNode", actions: ["spawnNodeTreeRoot"], target: "ready", },
        { guard: "isRootLeafNode", actions: ["spawnNodeTreeRoot"], target: "ready", },
        { guard: "isChildBranchNode", actions: ["spawnNodeTreeBranch"], target: "ready", },
        { guard: "isChildLeafNode", actions: ["spawnNodeTreeLeaf"], target: "ready", },
      ],
    },
    ready: {},
  },
})

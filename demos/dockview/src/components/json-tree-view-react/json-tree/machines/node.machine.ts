import { assign, enqueueActions, setup, raise } from "xstate"
import { isBranch, isLeaf, isFalsy, typeOf, isArray, isObject, machineConstants } from "../utils"

import { nodeObjectMachine } from './node.typeof-object.machine'
import { nodeArrayMachine } from './node.typeof-array.machine'
import { nodeScalarMachine } from './node.typeof-scalar.machine'

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
      const isScalarNode = isLeaf(data)
      const isObjectNode = isObject(context?.config?.data)
      const isArrayNode = isArray(context?.config?.data)

      context.info.typeof = typeOf(data)
      context.info.is = {
        isRoot: isRootNode,
        isScalar: isScalarNode,
        isObject: isObjectNode,
        isArray: isArrayNode,
      }
    }),

    spawnNodeScalar: assign(({ context, spawn, self }) => {
      context.refs.relations.tree.root = spawn("nodeScalarMachine", {
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
    spawnNodeObject: assign(({ context, spawn, self }) => {
      context.refs.relations.tree.root = spawn("nodeObjectMachine", {
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
    spawnNodeArray: assign(({ context, spawn, self }) => {
      context.refs.relations.tree.root = spawn("nodeArrayMachine", {
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


  },
  actors: {
    nodeObjectMachine,
    nodeArrayMachine,
    nodeScalarMachine,

  },
  guards: {
    isRootNode: ({ context }: any) => {
      return context?.info?.is?.isRoot
    },
    isScalarNode: ({ context }: any) => {
      return context?.info?.is?.isScalar
    },
    isObjectNode: ({ context }: any) => {
      return context?.info?.is?.isObject
    },
    isArrayNode: ({ context }: any) => {
      return context?.info?.is?.isArray
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
          isScalar: null,
          isArray: null,
          isObject: null,

          isRootBranch: null, // root node is object or array
          isRootLeaf: null, // root node is scalar
          isBranch: null, // node is object or array
          isChildBranch: null,
          isChildLeaf: null,
          isLeaf: null, // node is scalar

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
        { guard: "isScalarNode", actions: ["spawnNodeScalar"], target: "ready", },
        { guard: "isObjectNode", actions: ["spawnNodeObject"], target: "ready", },
        { guard: "isArrayNode", actions: ["spawnNodeArray"], target: "ready", },
      ],
    },
    ready: {},
  },
})

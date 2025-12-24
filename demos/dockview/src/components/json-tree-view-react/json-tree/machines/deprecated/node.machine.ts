import { assign, enqueueActions, setup, raise, createMachine } from "xstate"
import { isBranch, isLeaf, isFalsy, typeOf, isArray, isObject, machineConstants } from "../utils"

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

    spawnNodeScalar: enqueueActions(({ context, enqueue, self }) => {
      if (context.runtime.spawned) return
      context.runtime.spawned = true

      enqueue.spawnChild(nodeMachine, {
        input: {
          refs: {
            internal: { parent: self },
            relations: {
              nodes: { current: self, parent: null },
            },
          },
          config: {
            data: context.config.data,
          },
        },
      })
    }),

    spawnNodeObject: enqueueActions(({ context, enqueue, self }) => {
      if (context.runtime.spawned) return
      context.runtime.spawned = true

      const data = context.config.data

      Object.keys(data).forEach((key) => {
        enqueue.spawnChild(nodeMachine, {
          input: {
            refs: {
              internal: { parent: self },
              relations: {
                nodes: { current: self, parent: null },
              },
            },
            config: {
              data: data[key],
            },
          },
        })
      })
    }),

    spawnNodeArray: enqueueActions(({ context, enqueue, self }) => {
      if (context.runtime.spawned) return
      context.runtime.spawned = true

      const data = context.config.data

      data.forEach((item: any) => {
        enqueue.spawnChild(nodeMachine, {
          input: {
            refs: {
              internal: { parent: self },
            },
            config: {
              data: item,
            },
          },
        })
      })
    }),
  },
  actors: {},
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
          self,
          parent: input?.refs?.internal?.parent || null,
          instance: null,
        },
        external: {},
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
        },
      },
      runtime: {
        spawned: false,
      },
    }
  },

  states: {
    initiating: {
      entry: ["evalNodeType"],
      // always: [
      //   { guard: "isScalarNode", actions: ["spawnNodeScalar"], target: "ready" },
      //   { guard: "isObjectNode", actions: ["spawnNodeObject"], target: "ready" },
      //   { guard: "isArrayNode", actions: ["spawnNodeArray"], target: "ready" },
      // ],
    },
    ready: {},
  },
})


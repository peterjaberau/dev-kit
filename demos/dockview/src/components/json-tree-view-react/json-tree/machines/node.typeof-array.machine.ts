import { assign, createMachine, setup } from "xstate"


export const nodeArrayMachine = setup({
  types: {} as any,
  actions: {
    // spawnNodeArray: assign(({ context, spawn }) => {
    //   context.refs.relations.branch = spawn("nodeTypeofArrayMachine", {
    //     input: {
    //       refs: {
    //         internal: {
    //           parent: self,
    //         },
    //       },
    //     },
    //   })
    // }),
  },
  actors: {
    // nodeTypeofArrayMachine,
    // nodeTypeofObjectMachine
  },
  guards: {

  },
}).createMachine({
  context: ({ input, self }: any) => {

    return {
      refs: {
        internal: {
          self: self,
          parent: input?.refs?.internal?.parent
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
  // entry: enqueueActions(({ enqueue, context, event }) => {
  //   enqueue("spawnNodeArray")
  //   enqueue("spawnNodeObject")
  // }),
})

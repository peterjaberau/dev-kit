import { assign, enqueueActions, setup } from "xstate"

export const rootMachine = setup({
  types: {
    context: {} as any,
    events: {} as any,
  } as any,
  actions: {},
  actors: {},
  guards: {},
}).createMachine({
  context: ({ input }: any) => {
    return {
      ...input,
    }
  },
  entry: enqueueActions(({ enqueue }) => {}),
})

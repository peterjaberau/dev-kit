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
  initial: "idle",
  context: ({ input }: any) => {
    return {
      data: input?.data,
      collapsed: true,
      enableClipboard: true,
      editable: false,
      displayArrayIndex: true,
      displaySize: true,
    }
  },
  states: {
    idle: {},
  },
})

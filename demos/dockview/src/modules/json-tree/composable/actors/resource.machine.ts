import { setup } from "xstate"

export const createResource = (input: any) => {
  return setup({
    actions: {},
    actors: {},
  }).createMachine({
    id: "node",
    initial: "idle",
    context: () => {
      return {
        data: input?.data,
      }
    },
    states: {
      idle: {},
    },
  })
}

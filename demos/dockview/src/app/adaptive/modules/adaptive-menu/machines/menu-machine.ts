import { assign, enqueueActions, setup } from "xstate"
import { menuManagerMachine } from "./menu-manager-machine"

export const menuMachine = setup({
  types: {
    context: {} as any,
    events: {} as any,
  } as any,
  actions: {
    spawnMenuManager: assign(({ context, spawn, self }) => {
      context.menuManagerRef = spawn("menuManagerMachine", {
        id: "menu-mananger",
        systemId: "menu-mananger",
        input: {
          data: context?.data,
        },
      })
    }),
  },
  actors: {
    menuManagerMachine,
  },
  guards: {},
}).createMachine({
  context: ({ input }: any) => {
    return {
      data: input?.data,
      menuManagerRef: null,
    }
  },
  entry: enqueueActions(({ context, enqueue, check, event }) => {
    enqueue("spawnMenuManager")
  }),
})

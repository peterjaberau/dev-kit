import { fromPromise, setup, assign } from "xstate"

export const jsonOperationsMachine = setup({
  types: {
    context: {} as any,
    events: {} as any,
  } as any,
  actions: {
    saveLoadedData: assign(({ context, event }: any, params: any) => {
      console.log("dataLoader---input---", params)
    }),
    logError: assign(({ context, event }: any, params: any) => {
      console.log("agent error ---", { params, event })
    }),
  },
  actors: {
    dataLoader: fromPromise(async ({ input }) => {
      return input
    }),
  },
  guards: {},
}).createMachine({
  initial: "idle",
  context: ({ input }: any) => {
    return {}
  },
  states: {
    idle: {
      on: {
        LOAD_DATA: {
          target: "dataLoading",
        },
      },
    },
    dataLoading: {
      invoke: {
        src: "dataLoader",
        input: ({ context, event }: any) => {
          return event.params
        },
        onDone: {
          target: "idle",
          actions: [
            {
              type: "saveLoadedData",
              params: ({ event }: any) => {
                return event.output
              },
            },
          ],
        },
        onError: {
          target: "error",
        },
      },
    },
    error: {
      entry: ["logError"],
    },
  },
})

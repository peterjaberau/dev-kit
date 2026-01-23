import { setup, assign, enqueueActions } from "xstate"
import { jsonManagerMachine, jsonViewsMachine, jsonOperationsMachine} from './agents'

export const playgroundMachine = setup({
  types: {
    context: {} as any,
    events: {} as any,
  } as any,
  actions: {
    jsonManager: assign(({ context, spawn }: any) => {
      context.refs.agent = spawn("jsonManagerMachine", {
        id: "json-manager",
        systemId: "json-manager",
        input: {
          data: context?.data,
          config: {},
        },
      })
    }),
    jsonViews: assign(({ context, spawn }) => {
      context.refs.view = spawn("jsonViewsMachine", {
        id: "json-views",
        systemId: "json-views",
        input: {},
      })
    }),
    jsonOperations: assign(({ context, spawn }) => {
      context.refs.localStorage = spawn("jsonOperationsMachine", {
        id: "json-operations",
        systemId: "json-operations",
        input: {
        },
      })
    }),
  },
  actors: {
    jsonManagerMachine,
    jsonViewsMachine,
    jsonOperationsMachine,
  },
  guards: {},
}).createMachine({
  context: ({ input }: any) => {
    return {
      refs: {
        jsonManager: null,
        jsonViews: null,
        jsonOperations: null,
      },
      data: input?.data,
      plugins: {
        localStorage: { appKey: "__json_play__" },
      },
      config: {
        view: input?.view,

        preferences: {
          indent: 2,
        },
      },
      current: {
        view: null,
      },
    }
  },
  entry: enqueueActions(({ context, enqueue, check, event }) => {
    enqueue("jsonManager")
    enqueue("jsonViews")
    enqueue("jsonOperations")
  }),
})

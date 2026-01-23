import { setup, assign, enqueueActions, fromPromise } from "xstate"
import {
  jsonManagerMachine,
  jsonViewsMachine,
  jsonOperationsMachine ,
} from "./agents"
import { getConfigDefaultsOperation } from '../operations'

export const playgroundMachine = setup({
  types: {
    context: {} as any,
    events: {} as any,
  } as any,
  actions: {
    jsonManager: assign(({ context, spawn }: any) => {
      context.refs.jsonManager = spawn("jsonManagerMachine", {
        id: "json-manager",
        systemId: "json-manager",
        input: {},
      })
    }),
    jsonViews: assign(({ context, spawn }) => {
      context.refs.jsonViews = spawn("jsonViewsMachine", {
        id: "json-views",
        systemId: "json-views",
        input: {},
      })
    }),
    jsonOperations: assign(({ context, spawn }) => {
      context.refs.jsonOperations = spawn("jsonOperationsMachine", {
        id: "json-operations",
        systemId: "json-operations",
        input: {},
      })
    }),

    initiatePlayground: assign(({ context, event }: any, params: any) => {
      const { config } = params?.config
      return {
        ...context,
        current: {
          ...context.current,
          view: event.view || null,
        },
      }
    }),

    persistConfigDefaults: assign(({ context, event }: any, params: any) => {
      console.log("persistConfigDefaults---", {
        event,
        params,
      })
      // context.data = params
    }),
  },
  actors: {
    jsonManagerMachine,
    jsonViewsMachine,
    jsonOperationsMachine,
    getConfigDefaultsOperation,
  },
  guards: {},
}).createMachine({
  initial: "waitingForInitiation",
  context: ({ input }: any) => {
    return {
      refs: {
        jsonManager: null,
        jsonViews: null,
        jsonOperations: null,
      },
      config: {
        global: input?.config?.global,
        store: input?.config?.store,
        jsonViews: input?.config?.jsonViews,
        jsonDoc: input?.config?.jsonDoc,
        jsonSearch: input?.config?.jsonSearch,
        jsonColumnView: input?.config?.jsonColumnView,
        jsonTree: input?.config?.jsonTree,
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
  states: {
    waitingForInitiation: {
      on: {
        "playground.initiate": {
          target: "initiating",
        },
      },
    },
    initiating: {
      invoke: {
        src: "getConfigDefaultsOperation",
        // input: ({ context, event }: any) => {
        //   return event.params
        // },
        onDone: {
          target: "idle",
          actions: [
            {
              type: "persistConfigDefaults",
              params: ({ event }: any) => {
                return event.output
              },
            },
          ],
        },
        onError: {
          target: "idle",
        },
      },
    },
    idle: {
      on: {},
    },
  },
})

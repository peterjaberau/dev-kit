import { setup, assign, enqueueActions, fromPromise } from "xstate"
import { jsonManagerMachine } from "./json-manager-machine"
import { jsonViewsMachine } from "./json-views-machine"
import { jsonOperationsMachine } from "./json-operations-machine"
import { getConfigDefaultsOperation } from "../helpers"

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

    persistConfigDefaults: assign(({ context, event }: any, params: any) => {
      const { global, store, jsonViews, jsonDoc, jsonSearch, jsonColumnView, jsonTree } = params

      context.config = {
        ...context.config,
        global: global?.defaults,
        store: store?.defaults,
        jsonViews: jsonViews?.defaults,
        jsonDoc: jsonDoc?.defaults,
        jsonSearch: jsonSearch?.defaults,
        jsonColumnView: jsonColumnView?.defaults,
        jsonTree: jsonTree?.defaults,
      }
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
        inspector: {
          enable: input?.config?.inspector?.defaults?.enable || false,
        },
        store: input?.config?.store,
        jsonViews: input?.config?.jsonViews,
        jsonDoc: input?.config?.jsonDoc,
        jsonSearch: input?.config?.jsonSearch,
        jsonColumnView: input?.config?.jsonColumnView,
        jsonTree: input?.config?.jsonTree,
      },
    }
  },
  on: {
    "inspection.on": { actions: assign(({ context }) => (context.config.inspector.enable = true)) },
    "inspection.off": { actions: assign(({ context }) => (context.config.inspector.enable = false)) },
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
      on: {
        "playground.reset": {},
      },
    },
  },
})

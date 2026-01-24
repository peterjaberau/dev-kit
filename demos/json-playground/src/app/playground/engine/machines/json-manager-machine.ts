import { fromPromise, setup, assign, enqueueActions, fromCallback } from "xstate"
import { createDocFromJson } from "../helpers"

export const jsonManagerMachine = setup({
  actions: {
    createExecutionFromConfig: assign(({ context, event }: any) => {
      context.execution = {
        jsonDoc: context.config.jsonDoc,
        preferences: context.config.preferences,
      }
    }),

    rawJsonPersist: assign(({ context, event }: any) => {
      context.source.jsonRaw = event?.params?.content
    }),

    persistDoc: assign(({ context, event }: any, params: any) => {
      console.log('---persistDoc---', params)
      context.execution.jsonDoc = params
    }),
  },
  actors: {
    createDocFromJson: fromPromise(async ({ input }) => await createDocFromJson(input)),
  },
  guards: {},
}).createMachine({
  initial: "idle",
  context: ({ input }: any) => {
    return {
      source: {
        jsonRaw: input?.jsonRaw ?? null,
      },
      config: {
        preferences: {
          indent: 2,
        },
        jsonDoc: {
          id: null,
          type: "raw",
          title: null,
          content: null,
          readOnly: false,
          minimal: false,
          path: [],
        },
      },
      execution: {
        jsonDoc: null,
        preferences: null,
        json: {
          serialized: null,

          stable: null,
        },
      },
    }
  },
  entry: ["createExecutionFromConfig"],
  states: {
    idle: {
      on: {
        "doc.create-from-json": {
          target: "creatingDocFromJson",
        },
        // "json.stablize": {},
      },
    },
    creatingDocFromJson: {
      entry: ["rawJsonPersist"],
      invoke: {
        src: "createDocFromJson",
        input: ({ context, event }: any) => {
          return {
            ...context?.config?.jsonDoc,
            content: context?.source?.jsonRaw,
          }
        },
        onDone: {
          target: "idle",
          actions: [
            {
              type: "persistDoc",
              params: ({ event }: any) => {
                return event.output
              },
            },
          ],
        },
        onError: {
          target: "idle",
          actions: [
            ({ context, event }) => {
              console.error("Error creating doc from JSON:", event)
            },
          ],
        },
      },
    },
    stablizingJson: {
      invoke: {
        src: "createDocFromJson",
        input: ({ context, event }: any) => {
          return {
            ...context?.config?.jsonDoc,
            content: context?.source?.jsonRaw,
          }
        },
        onDone: {
          target: "idle",
          actions: [
            {
              type: "persistDoc",
              params: ({ event }: any) => {
                return event.output
              },
            },
          ],
        },
        onError: {
          target: "idle",
          actions: [
            ({ context, event }) => {
              console.error("Error creating doc from JSON:", event)
            },
          ],
        },
      },
    },
  },
})

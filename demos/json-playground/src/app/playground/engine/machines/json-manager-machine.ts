import { fromPromise, setup, assign, enqueueActions, fromCallback } from "xstate"
import { createDocFromJson } from "../helpers"

export const jsonManagerMachine = setup({
  actions: {

    rawJsonPersist: assign(({ context, event }: any) => {
      context.source.jsonRaw = event?.params?.content
    }),
    persistDoc: assign(({ context, event }: any, params: any) => {
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
        jsonDoc: {
          defaults: {
            id: null,
            type: "raw",
            title: null,
            content: null,
            readOnly: false,
          },
        },
      },
      execution: {
        jsonDoc: {},
      },
    }
  },
  states: {
    idle: {
      on: {
        "doc.create-from-json": {
          target: "creatingDocFromJson",
        },
      },
    },
    creatingDocFromJson: {
      entry: ['rawJsonPersist'],
      invoke: {
        src: "createDocFromJson",
        input: ({ context, event }: any) => {
          return {
            ...context?.config?.jsonDoc?.defaults,
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
            }
          ]
        },
      },
    },
  },
})

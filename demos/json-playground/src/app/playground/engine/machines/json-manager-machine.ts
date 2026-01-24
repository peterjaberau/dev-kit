import { fromPromise, setup, assign, enqueueActions, fromCallback } from "xstate"
import { makeDocFromJson, makeJsonPresentation, makeStabeJson, makeSchemaFromJson,
makeParsedJson, makeFriendlyJson, makeCompactedJson, makeStringJson, makeMinifiedJson
} from "../helpers"

export const jsonManagerMachine = setup({
  actions: {
    createExecutionFromConfig: assign(({ context, event }: any) => {
      context.execution = {
        jsonDoc: context.config.jsonDoc,
        preferences: context.config.preferences,
        jsonPresentation: {
          parsed: {
            data: null,
          },
          string: {
            data: null,
          },
          minified: {
            data: null,
          },
          compacted: {
            data: null,
          },
          friendly: {
            data: null,
          },
        },
        jsonStablized: {
          data: null,
        },
        jsonSchema: {
          data: null,
        },
      }
    }),
    rawJsonPersist: assign(({ context, event }: any) => {
      context.source.jsonRaw = event?.params?.content
    }),
    persistDoc: assign(({ context, event }: any, params: any) => {
      console.log("---persistDoc---", params)
      context.execution.jsonDoc = params
    }),
    persistStableJsonHander: assign(({ context, event }: any, params: any) => {
      context.execution.jsonStablized.data = params
    }),
    persistJsonSchemaHander: assign(({ context, event }: any, params: any) => {
      context.execution.jsonSchema.data = params
    }),
  },
  actors: {
    makeDocFromJson: fromPromise(async ({ input }) => await makeDocFromJson(input)),
    makeStabeJson: fromPromise(({ input }) => {
      return makeStabeJson(input)
    }),
    makeSchemaFromJson: fromPromise(({ input }) => {
      return makeSchemaFromJson(input)
    }),
    //   makeSchemaFromJson
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
        jsonPresentation: {
          parsed: {
            data: null,
          },
          string: {
            data: null,
          },
          minified: {
            data: null,
          },
          compacted: {
            data: null,
          },
          friendly: {
            data: null,
          },
        },
        jsonStablized: {
          data: null,
        },
        jsonSchema: {
          data: null,
        },
      },
    }
  },
  entry: ["createExecutionFromConfig"],
  states: {
    idle: {
      on: {
        "doc.make-from-json": {
          target: "makingDocFromJson",
        },
        "json.make-presentation": {
          target: ["makingJsonPresentation"],
        },
        "json.make-stable": {
          target: "makingJsonStable",
        },
        "json.make-schema": {
          target: "makingSchemaFromJson",
        },
      },
    },
    makingDocFromJson: {
      entry: ["rawJsonPersist"],
      invoke: {
        src: "makeDocFromJson",
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
    makingJsonPresentation: {
      entry: enqueueActions(({ event, enqueue, check, context}) => {
        const jsonContent = context?.execution?.jsonDoc?.content

        // makeParsedJson
        enqueue.assign(() => {
          context.execution.jsonPresentation.parsed.data = makeParsedJson(jsonContent)
        })

        enqueue.assign(() => {
          context.execution.jsonPresentation.friendly.data = makeFriendlyJson(context.execution.jsonPresentation.parsed.data)
        })

      }),
      always: {
        // actions: ["jsonPresentationHandler"],
        target: "idle",
      },
    },
    makingJsonStable: {
      invoke: {
        src: "makeStabeJson",
        input: ({ context, event }: any) => {
          return {
            json: context?.execution?.jsonPresentation?.parsed.data,
            keyOrder: [],
          }
        },
        onDone: {
          target: "idle",
          actions: [
            {
              type: "persistStableJsonHander",
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
              console.error("Error", event)
            },
          ],
        },
      },
    },
    makingSchemaFromJson: {
      invoke: {
        src: "makeSchemaFromJson",
        input: ({ context, event }: any) => {
          return {
            json: context?.execution?.jsonStablized.data,
            includeSchema: true,
          }
        },
        onDone: {
          target: "idle",
          actions: [
            {
              type: "persistJsonSchemaHander",
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
              console.error("Error", event)
            },
          ],
        },
      },
    },
  },
})

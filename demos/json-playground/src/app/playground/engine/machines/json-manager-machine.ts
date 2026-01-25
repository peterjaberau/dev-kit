import { fromPromise, setup, assign, enqueueActions, fromCallback } from "xstate"
import { makeDocFromJson, makeJsonPresentation, makeStabeJson, makeSchemaFromJson,
makeParsedJson, makeFriendlyJson, makeCompactedJson, makeStringJson, makeMinifiedJson
} from "../helpers"

import { createRandomId } from '../helpers/functions'
import { parsedJsonData as sourceData } from '../../store/data'
import { stableJson } from '../utilities/stableJson'
import { inferSchema } from "@jsonhero/schema-infer"

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
      json: {
        id: createRandomId(),
        source: sourceData.xstateOpenapi,
        parsed: null,
        stable: null,
        schema: null,
        search: {
          status: null,
          query: null,
          results: [],
        },
      },
    }
  },
  entry: ["createExecutionFromConfig"],
  states: {
    idle: {
      entry: enqueueActions(({ event, enqueue, check, context}) => {
        function ensureParsed(value: any) {
          if (typeof value === "string") {
            try {
              return JSON.parse(value)
            } catch {
              return null
            }
          }
          return value
        }

        const source = context.json.source
        const parsed = ensureParsed(source)
        const stable = stableJson(parsed)
        const schema = inferSchema(stable).toJSONSchema({ includeSchema: true })

        console.log("---initial-json---", {
          source: context.json.source,
          parsed,
          stable,
          schema,

        })

        // console.log("---ensure-parsed-input---", {
        //   source: context.json.source,
        //   ensureParsed: ensureParsed(context.json.source),
        //   stableFromSource: stableJson(context.json.source),
        //   stableFromParsed: ensureParsed(stableJson(context.json.source)),
        // })

        // parsed json
        enqueue.assign({
          ...context,
          json: {
            ...context.json,
            // parsed: ensureParsed(context.json.source),
            parsed: context.json.source,
          },
        })

        console.log("---parsed-json---", stableJson(context?.json?.parsed))

        // stable json
        enqueue.assign({
          ...context,
          json: {
            ...context.json,
            stable: stableJson(context?.json?.parsed)
          },
        })
      }),
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

          console.log('---sabilize schema input----', {
            json: context?.execution?.jsonPresentation?.parsed.data,
            keyOrder: [],
          })

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

                console.log('---stable-json-output---', event);

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

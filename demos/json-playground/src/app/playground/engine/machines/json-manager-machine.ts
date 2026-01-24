import { fromPromise, setup, assign, enqueueActions, fromCallback } from "xstate"
import { makeDocFromJson, makeJsonPresentation, makeStabeJson } from "../helpers"

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
      console.log("---persistDoc---", params)
      context.execution.jsonDoc = params
    }),

    persistStableJsonHander: assign(({ context, event }: any, params: any) => {
      context.execution.jsonStablized = params
    }),

    jsonPresentationHandler: assign(({ context, event }: any, params: any) => {
      context.execution.jsonPresentation = makeJsonPresentation(
        context?.execution?.jsonDoc?.content,
        context?.execution?.preferences?.indent,
      )
    }),
  },
  actors: {
    makeDocFromJson: fromPromise(async ({ input }) => await makeDocFromJson(input)),
    makeStabeJson: fromPromise(({ input }) => {
      return makeStabeJson(input)
    }),
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
          parsed: null,
          string: null,
          minified: null,
          compacted: null,
          friendly: null,
        },
        jsonStablized: null,
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
          actions: ["jsonPresentationHandler"],
        },
        "json.make-stable": {
          target: "makingJsonStable",
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
    makingJsonStable: {
      invoke: {
        src: "makeStabeJson",
        input: ({ context, event }: any) => {
          return {
            json: context?.execution?.jsonPresentation?.parsed,
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
  },
})

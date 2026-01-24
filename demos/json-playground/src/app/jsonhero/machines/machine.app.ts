import { setup, assign, enqueueActions } from "xstate"
import { jsonDocsMachine } from "./machine.json-docs"
import { preferencesMachine } from "./machine.preferences"

export const appMachine = setup({
  types: {
    context: {} as any,
    events: {} as any,
  } as any,
  actions: {
    spawnJsonDocs: assign(({ context, spawn }: any) => {
      context.refs.jsonDocs = spawn("jsonDocsMachine", {
        id: "json-docs",
        systemId: "json-docs",
        input: {},
      })
    }),
    spawnPreferences: assign(({ context, spawn }: any) => {
      context.refs.preferences = spawn("preferencesMachine", {
        id: "preferences",
        systemId: "preferences",
        input: {},
      })
    }),
  },
  actors: {
    jsonDocsMachine,
    preferencesMachine,
  },
  guards: {},
}).createMachine({
  initial: "idle",
  context: ({ input }: any) => {
    return {
      refs: {
        preferences: null,
        jsonDocs: null,
      },
      inspector: {
        enable: false,
      },
    }
  },
  entry: enqueueActions(({ context, enqueue, check, event }) => {
    enqueue("spawnJsonDocs")
    enqueue("spawnPreferences")
  }),
  states: {
    idle: {
      on: {},
    },
  },
})

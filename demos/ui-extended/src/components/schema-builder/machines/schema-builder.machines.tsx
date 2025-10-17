import { createMachine, assign, setup, spawnChild, enqueueActions, fromCallback, fromPromise } from "xstate"
import {
  appConfigDefaults,
  sessionConfigDefaults,
  currentAppConfigDefaults,
} from "./schema-builder.config"
import { mockData } from "./schema-builder.data"

export const appMachine = setup({
  types: {} as any,
  actions: {
    resetAppConfig: assign(({ context, event }) => {}),
  },
  actors: {},
  guards: {},
}).createMachine({
  initial: "idle",
  context: ({ input }: any) => ({
    ...appConfigDefaults,
    ...input,
  }),
  states: {
    idle: {
      on: {
        resetAppConfig: { actions: ["resetAppConfig"] },
      },
    },
  },
})

export const sessionMachine = setup({
  types: {} as any,
  actions: {
    resetSessionConfig: assign(({ context, event }) => {}),
  },
  actors: {},
  guards: {},
}).createMachine({
  initial: "idle",
  context: ({ input }: any) => ({
    ...sessionConfigDefaults,
    ...input,
  }),
  states: {
    idle: {
      on: {
        resetSessionConfig: { actions: ["resetSessionConfig"] },
      },
    },
  },
})



export const currentAppMachine = setup({
  types: {} as any,
  actions: {
    resetCurrentAppConfig: assign(({ context, event }) => {}),
  },
  actors: {},
  guards: {},
}).createMachine({
  initial: "idle",
  context: ({ input }: any) => ({
    ...currentAppConfigDefaults,
    ...input,
  }),
  states: {
    idle: {
      on: {
        resetCurrentAppConfig: { actions: ["resetCurrentAppConfig"] },
      },
    },
  },
})


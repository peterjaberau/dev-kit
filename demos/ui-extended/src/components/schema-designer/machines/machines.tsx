"use client"
import { createMachine, assign, setup, spawnChild, enqueueActions, fromCallback, fromPromise } from "xstate"
import { appConfigDefaults, sessionConfigDefaults, currentAppConfigDefaults } from "./config"
import { mockData } from "./data"

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
    // determine the number of element objects from schema and uischema
    resetCurrentAppConfig: assign(({ context, event }) => {}),
  },
  actors: {},
  guards: {},
}).createMachine({
  initial: "idle",
  context: ({ input }: any) => ({
    ...currentAppConfigDefaults,
    ...mockData.simple,
    ...input,


  }),
  states: {
    idle: {
      // entry: enqueueActions(({ context, enqueue }) => {
      //   enqueue("countElementsFromSchema")
      //   enqueue("generateCategoryHash")
      // }),
      on: {
        resetCurrentAppConfig: { actions: ["resetCurrentAppConfig"] },
      },
    },
  },
})

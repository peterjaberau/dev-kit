import { createMachine, assign, setup, spawnChild, enqueueActions, fromCallback, fromPromise } from "xstate"
import {
  configDefaults,
  sessionConfigDefaults,
  currentAppConfigDefaults,
  currentInstanceConfigDefaults,
} from "./engine.config"
import { dataConfigMock, dataSessionMock, dataCurrentAppMock, dataCurrentInstanceMock } from "./engine.data"

export const configMachine = setup({
  types: {} as any,
  actions: {
    resetConfig: assign(({ context, event }) => {}),
  },
  actors: {},
  guards: {},
}).createMachine({
  initial: "idle",
  context: ({ input }: any) => ({
    ...configDefaults,
    ...dataConfigMock,
    ...input,
  }),
  states: {
    idle: {
      on: {
        resetConfig: { actions: ["resetConfig"] },
      },
    },
  },
})

export const sessionMachine = setup({
  types: {} as any,
  actions: {
    resetSession: assign(({ context, event }) => {}),
  },
  actors: {},
  guards: {},
}).createMachine({
  initial: "idle",
  context: ({ input }: any) => ({
    ...sessionConfigDefaults,
    ...dataSessionMock,
    ...input,
  }),
  states: {
    idle: {
      on: {
        resetSession: { actions: ["resetSession"] },
      },
    },
  },
})

export const currentInstanceMachine = setup({
  types: {} as any,
  actions: {
    resetCurrentInstance: assign(({ context, event }) => {}),
  },
  actors: {},
  guards: {},
}).createMachine({
  initial: "idle",
  context: ({ input }: any) => ({
    ...currentInstanceConfigDefaults,
    ...dataCurrentInstanceMock,
    ...input,
  }),
  states: {
    idle: {
      on: {
        resetCurrentInstance: { actions: ["resetCurrentInstance"] },
      },
    },
  },
})

export const currentAppMachine = setup({
  types: {} as any,
  actions: {
    resetCurrentApp: assign(({ context, event }) => {}),
  },
  actors: {},
  guards: {},
}).createMachine({
  initial: "idle",
  context: ({ input }: any) => ({
    ...currentAppConfigDefaults,
    ...dataCurrentAppMock,
    ...input,
  }),
  states: {
    idle: {
      on: {
        resetCurrentApp: { actions: ["resetCurrentApp"] },
      },
    },
  },
})


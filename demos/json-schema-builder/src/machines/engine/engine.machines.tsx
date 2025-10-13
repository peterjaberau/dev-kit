import { createMachine, assign, setup, spawnChild, enqueueActions, fromCallback, fromPromise } from "xstate"
import { buildMetaSchema } from "./engine.utils"
import {
  configDefaults,
  sessionConfigDefaults,
  currentAppConfigDefaults,
  currentInstanceConfigDefaults,
  settingsConfig,
} from "./engine.config"
import { dataConfigMock, dataSessionMock, dataCurrentAppMock, dataCurrentInstanceMock } from "./engine.data"
import { LOCAL_STORAGE_KEYS } from "./engine.constants"
import { showError } from "@/utils/toast"
import { SchemaField } from "#components/FieldEditor"
import { v4 as uuidv4 } from "uuid"

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

export const dataSourceMachine = setup({
  types: {} as any,
  actions: {
    resetCurrentApp: assign(({ context, event }) => {}),
  },
  actors: {},
  guards: {},
}).createMachine({
  context: ({ input }: any) => ({
    userData: {},
    userSchemaData: {},
    newSchemaWasFetched: {},
    settingsData: settingsConfig.SETTINGS_DATA_DEFAULT,
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

export const schemaSourceMachine = setup({
  types: {} as any,
  actions: {
    resetCurrentApp: assign(({ context, event }) => {}),
  },
  actors: {},
  guards: {},
}).createMachine({
  context: ({ input }: any) => ({
    metaSchemaData: buildMetaSchema(settingsConfig.SETTINGS_DATA_DEFAULT.metaSchema),
    settingsSchemaData: settingsConfig.SETTINGS_SCHEMA,
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

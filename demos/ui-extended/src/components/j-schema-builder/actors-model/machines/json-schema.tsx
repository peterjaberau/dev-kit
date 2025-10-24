import { assign, setup } from "xstate"
import {
  jSchemaBuilderTools,
  jSchemaBuilderToolsSchema,
  jSchemaBuilderToolsSubSchema,
  jSchemaFormsUiRules,
  jSchemaStandardsDraft07
} from '../shared/data/j-schema'

export const jsonSchemaStandardsMachine = setup({
  types: {} as any,
  actions: {
  },
  actors: {},
  guards: {},
}).createMachine({
  initial: "idle",
  context: ({ input }: any) => ({
    draft07: jSchemaStandardsDraft07,
    ...input,
  }),
  states: {
    idle: {
      on: {
      },
    },
  },
})

export const jsonSchemaToolsMachine = setup({
  types: {} as any,
  actions: {
  },
  actors: {},
  guards: {},
}).createMachine({
  initial: "idle",
  context: ({ input }: any) => ({
    builderTools: jSchemaBuilderTools,
    builderToolsSchema: jSchemaBuilderToolsSchema,
    builderToolsSubSchema: jSchemaBuilderToolsSubSchema,
    ...input,
  }),
  states: {
    idle: {
      on: {
      },
    },
  },
})


export const jsonSchemaFormsMachine = setup({
  types: {} as any,
  actions: {
  },
  actors: {},
  guards: {},
}).createMachine({
  initial: "idle",
  context: ({ input }: any) => ({
    uiRules: jSchemaFormsUiRules,
    ...input,
  }),
  states: {
    idle: {
      on: {
      },
    },
  },
})

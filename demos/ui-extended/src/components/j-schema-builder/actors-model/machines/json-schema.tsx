import { assign, setup } from "xstate"
import { jSchemaBuilderTools, jSchemaBuilderToolsSchema, jSchemaBuilderToolsSubSchema, jSchemaFormsUiRules, jSchemaStandardsDraft07 } from "../shared/data/j-schema"
import { pathCrumbsAtom, showPathCrumbsAtom } from "#jSchemaBuilder/json-schema-viewer/components/PathCrumbs/state"

export const jsonSchemaStandardsMachine = setup({
  types: {} as any,
  actions: {},
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
      on: {},
    },
  },
})

export const jsonSchemaToolsMachine = setup({
  types: {} as any,
  actions: {},
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
      on: {},
    },
  },
})

export const jsonSchemaFormsMachine = setup({
  types: {} as any,
  actions: {},
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
      on: {},
    },
  },
})

export const jsonSchemaTreeMachine = setup({
  types: {} as any,
  actions: {},
  actors: {},
  guards: {},
}).createMachine({
  initial: "idle",
  context: ({ input }: any) => ({
    options: {
      defaultExpandedDepth: 0,
      viewMode: "standalone", //'read' | 'write' | 'standalone'
      hideExamples: false,
    },
    components: {
      pathCrumbs: {
        showPathCrumbs: false,
      },
    },
    ...input,
  }),
  states: {
    idle: {
      on: {},
    },
  },
})

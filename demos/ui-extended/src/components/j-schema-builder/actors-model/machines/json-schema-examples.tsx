import { assign, setup } from "xstate"
import {
  data as JsonSchemaExamples
} from '../shared/data/j-schema-examples'
import {
  data as JsonSchemaViewerExamples
} from '../shared/data/j-schema-viewer-examples'
import { data } from "#jSchemaBuilder/json-schema-viewer/__fixtures__"


export const jsonSchemaExamplesMachine = setup({
  types: {} as any,
  actions: {
  },
  actors: {},
  guards: {},
}).createMachine({
  initial: "idle",
  context: ({ input }: any) => ({
    data: JsonSchemaExamples,
    dataViewer: {
      SimpleAllOf: JsonSchemaViewerExamples.combiners.allOfs.base,
      CircularAllOf: JsonSchemaViewerExamples.combiners.allOfs.complex,
      ArrayOneOf: JsonSchemaViewerExamples.combiners.oneofWithArrayType,
      OneOfMulti: JsonSchemaViewerExamples.combiners.oneofWithMultiTypes,
      ArrayOneOf2: JsonSchemaViewerExamples.combiners.oneofWithinArrayItem,
      anyOfObject: JsonSchemaViewerExamples.combiners.anyOf,
      defaultSchema: JsonSchemaViewerExamples.defaultSchema,
      stressSchema: JsonSchemaViewerExamples.stressSchema,
      arrayOfComplexObjects: JsonSchemaViewerExamples.arrays.ofComplexObject,
      boxFileSchema: JsonSchemaViewerExamples.realWorld.boxFile,
      githubIssueSchema: JsonSchemaViewerExamples.realWorld.githubIssue,
      refSchema: JsonSchemaViewerExamples.references.base,
      nullRefSchema: JsonSchemaViewerExamples.references.nullish,
      brokenRefArraySchema: JsonSchemaViewerExamples.arrays.ofRefs,
      allOfRefSchema: JsonSchemaViewerExamples.references.allOfRenference,
      fullAllOfRefDoc: JsonSchemaViewerExamples.references.fullAllOfReference,
      extensionsSchema: JsonSchemaViewerExamples.extensions.simple
    },
    ...input,
  }),
  states: {
    idle: {
      on: {
      },
    },
  },
})


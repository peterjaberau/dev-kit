import { assign, setup } from "xstate"
import {
  data as JsonSchemaExamples
} from '../shared/data/j-schema-exmples'

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
    ...input,
  }),
  states: {
    idle: {
      on: {
      },
    },
  },
})


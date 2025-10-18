"use client"
import { createMachine, assign, setup, spawnChild, enqueueActions, fromCallback, fromPromise } from "xstate"
import { appConfigDefaults, sessionConfigDefaults, currentAppConfigDefaults } from "./schema-builder.config"
import { mockData, mockFormBuilderData } from "./schema-builder.data"
import { countElementsFromSchema } from "#schemaBuilder/app/utils"

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
    countElementsFromSchema: assign(({ context }) => {
      const { schema } = context

      if (!schema.properties) {
        context.schemaElementsCount = 0
      }

      const elementDict: { [key: string]: any } = {}
      let elementCount = 0

      // read regular elements from properties
      Object.entries(schema.properties).forEach(([parameter]) => {
        elementDict[parameter] = {}
        elementCount += 1
      })

      // read dependent elements from dependencies
      if (schema.dependencies) {
        Object.keys(schema.dependencies).forEach((parent) => {
          const group = schema.dependencies[parent]
          if (group.oneOf) {
            let possibilityIndex = 0
            group.oneOf.forEach((possibility: { [key: string]: any }) => {
              if (!(elementDict[parent] || {}).dependents) {
                elementDict[parent] = elementDict[parent] || {}
                elementDict[parent].dependents = []
              }
              elementDict[parent].dependents.push({
                children: [],
                value: possibility.properties[parent],
              })
              Object.entries(possibility.properties).forEach(([parameter]) => {
                // create a new element if not present in main properties
                if (!Object.keys(elementDict).includes(parameter)) {
                  elementDict[parameter] = {}
                  elementCount += 1
                }
                if (parameter !== parent) {
                  const newElement = elementDict[parameter]
                  newElement.dependent = true
                  newElement.parent = parent
                  elementDict[parent].dependents[possibilityIndex].children.push(parameter)
                }
              })
              possibilityIndex += 1
            })
          } else if (group.properties) {
            Object.entries(group.properties).forEach(([parameter]) => {
              elementDict[parameter] = elementDict[parameter] || {}
              elementCount += 1
              if (elementDict[parent]) {
                if (elementDict[parent].dependents) {
                  elementDict[parent].dependents[0].children.push(parameter)
                } else {
                  elementDict[parent].dependents = [{ children: [parameter] }]
                }
              } else {
                elementDict[parent] = {}
                elementDict[parent].dependents = [{ children: [parameter] }]
              }
            })
          } else {
            console.error("unsupported dependency type encountered")
          }
        })
      }

      context.schemaElementsCount = elementCount
    }),
    generateCategoryHash: assign(({ context }) => {
      const { allFormInputs } = context

      const categoryHash: { [key: string]: any } = {}
      Object.keys(allFormInputs).forEach((categoryName) => {
        const formInput = allFormInputs[categoryName]
        formInput.matchIf.forEach((match: any) => {
          match.types.forEach((type: any) => {
            const hash = `type:${type === "null" ? "" : type};widget:${match.widget || ""};field:${match.field || ""};format:${match.format || ""};$ref:${
              match.$ref ? "true" : "false"
            };enum:${match.enum ? "true" : "false"}`
            if (categoryHash[hash]) {
              throw new Error(`Duplicate hash: ${hash}`)
            }
            categoryHash[hash] = categoryName
          })
        })
      })

      context.categoryHash = categoryHash
    }),

    resetCurrentAppConfig: assign(({ context, event }) => {}),
  },
  actors: {},
  guards: {},
}).createMachine({
  initial: "idle",
  context: ({ input }: any) => ({
    ...currentAppConfigDefaults,
    ...mockData.simple,
    allFormInputs: mockFormBuilderData.allFormInputs,
    unsupportedFeatures: mockFormBuilderData.unsupportedFeatures,
    categoryHash: mockFormBuilderData.categoryHash,
    mods: mockFormBuilderData.mods,
    constants: {
      supportedPropertyParameters: new Set(mockFormBuilderData.constants.supportedPropertyParameters),
      supportedUiParameters: new Set(mockFormBuilderData.constants.supportedUiParameters),
    },

    ...input,
    // schema: mockData.simple.schema,
    // uiSchema: mockData.simple.uiSchema,
    // formData: mockData.simple.formData,
    // allFormInputs: mockFormBuilderData.allFormInputs,
    // unsupportedFeatures: mockFormBuilderData.unsupportedFeatures,
    //
    // schemaElementsCount: mockFormBuilderData.schemaElementsCount,
    // categoryHash: mockFormBuilderData.categoryHash,
    // mods: mockFormBuilderData.mods,

  }),
  states: {
    idle: {
      entry: enqueueActions(({ context, enqueue }) => {
        enqueue("countElementsFromSchema")
        enqueue("generateCategoryHash")
      }),
      on: {
        resetCurrentAppConfig: { actions: ["resetCurrentAppConfig"] },
      },
    },
  },
})

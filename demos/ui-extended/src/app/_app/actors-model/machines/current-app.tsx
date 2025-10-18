import { assign, setup } from "xstate"
import { currentAppConfigDefaults } from "../shared/config"
import { mockData, dataNavigations } from "../shared/data"

export const currentAppMachine = setup({
  types: {} as any,
  actions: {
    resetAction: assign(({ context, event }) => {}),
    selectCategory: assign(({ context, event }) => {
      const { payload } = event
      const { id } = payload

      const category = context.topNavigation.find((item: any) => item.id === id)

      context.memoryValues = {
        ...context.memoryValues,
        selectedCategory: category,
        selectedCategoryItem: category.items[0]
      }
    }),
    selectCategoryItem: assign(({ context, event }) => {
      const { payload } = event
      const { id } = payload
      context.memoryValues.selectedCategoryItem = context.memoryValues.selectedCategory.items.find((item: any) => item.id === id)
    }),


  },
  actors: {},
  guards: {},
}).createMachine({
  initial: "idle",
  context: ({ input }: any) => ({
    ...currentAppConfigDefaults,
    topNavigation: dataNavigations.examples,
    memoryValues: {
      selectedCategory: dataNavigations.examples[0],
      selectedCategoryItem: dataNavigations.examples[0].items[0],
    },
    ...input,
  }),
  states: {
    idle: {
      on: {
        RESET: { actions: ["resetAction"] },
        CATEGORY_SELECT: {
          actions: ['selectCategory']
        },
        CATEGORY_ITEM_SELECT: {
          actions: ['selectCategoryItem']
        }
      },
    },
  },
})

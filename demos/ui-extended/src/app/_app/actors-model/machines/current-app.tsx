import { assign, setup } from "xstate"
import { currentAppConfigDefaults } from "../shared/config"
import { mockData, dataCategoryList, dataCategoryListItems } from "../shared/data"

export const currentAppMachine = setup({
  types: {} as any,
  actions: {
    resetAction: assign(({ context, event }) => {}),
    selectCategory: assign(({ context, event }) => {
      const { payload } = event
      const { id } = payload

      const category = context.topNavigation.categoryList.find((item: any) => item.id === id)
      const categoryItems = context.topNavigation.categoryListItems.filter((item: any) => item.parentId === category.id)



      context.memoryValues = {
        ...context.memoryValues,
        selectedCategory: category,
        selectedCategoryItem: categoryItems.length > 0 ? categoryItems[0] : null
      }
    }),
    selectCategoryItem: assign(({ context, event }) => {
      const { payload } = event
      const { id } = payload
      context.memoryValues.selectedCategoryItem = context.topNavigation.categoryListItems.find((item: any) => item.id === id)

    }),


  },
  actors: {},
  guards: {},
}).createMachine({
  initial: "idle",
  context: ({ input }: any) => ({
    ...currentAppConfigDefaults,
    topNavigation: {
      categoryList: dataCategoryList,
      categoryListItems: dataCategoryListItems,
    },
    memoryValues: {
      selectedCategory: dataCategoryList[0],
      selectedCategoryItem: dataCategoryListItems.filter((item: any) => item.parentId === 'root')[0]
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

import { assign, enqueueActions, setup } from "xstate"

const config = {
  items: [
    { label: "Marketing", value: "marketing" },
    { label: "Sales", value: "sales" },
    { label: "Engineering", value: "engineering" },
    { label: "Design", value: "design" },
    { label: "Product", value: "product" },
    { label: "Customer Support", value: "support" },
    { label: "Finance", value: "finance" },
    { label: "Human Resources", value: "hr" },
    { label: "Operations", value: "operations" },
    { label: "Research", value: "research" },
    { label: "Legal", value: "legal" },
    { label: "Business Development", value: "business-dev" },
  ],
  defaultValue: "marketing"
}

export const pluginScopePickerMachine = setup({
  types: {} as any,
  actions: {
    load: assign(({ context, event }) => {
      context.items = config.items
      context.defaultValue = config.defaultValue
    }),
    setValue: assign(({ context, event }) => {
      const { value = null } = event.payload || {}
      context.value = value
    }),
  },
  actors: {},
  guards: {},
}).createMachine({
  initial: "loading",
  context: ({ input }: any) => ({
    defaultValue: null,
    value: null,
    items: [],
    ...input,
  }),
  states: {
    loading: {
      on: {
        START_LOADING_REQUEST: {
          actions: enqueueActions(({ enqueue, context, check, event }) => {
            enqueue("load")
          }),
          target: "ready",
        },
      },
    },
    ready: {
      on: {
        VALUE_CHANGE: { actions: ["setValue"] },
      },
    },
  },
})

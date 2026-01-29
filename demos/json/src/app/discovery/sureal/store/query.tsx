import { omit } from "radash";
import { queryStoreDemo } from './data'
import { createStoreHook } from "@xstate/store-react"

export const useQueryStore = createStoreHook({
  context: {
    queryState: {},
    isQueryValid: true,
  },
  on: {
    loadSample: (context) => ({
      ...context,
      ...queryStoreDemo
    }),

    updateQueryState: (context, event: { key: any, value: any }) => ({
      ...context,
      queryState: { ...context.queryState, [event.key]: event.value },
    }),
    removeQueryState: (context, event: { key: any }) => ({
      ...context,
      //@ts-ignore
      queryState: omit(context.queryState, [event.key])
    }),
    setQueryValid: (context, event: { valid: any }) => ({
      ...context,
      isQueryValid: event.valid,
    }),
  },
})

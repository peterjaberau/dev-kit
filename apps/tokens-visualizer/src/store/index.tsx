import { createStoreHook } from "@xstate/store/react"
import { data } from "#actors/data/data-mock"

export const useStore: any = createStoreHook({
  context: {
    appModel: data.appModel,
    graphModel: data.graphModel,
    graphDataSource: data.graphDataSource,
  } as any,
  on: {},
})

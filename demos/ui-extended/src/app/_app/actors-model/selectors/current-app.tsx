import { useRootActors } from "../hooks"
import { useSelector } from "@xstate/react"

export const useCurrentApp = () => {
  const { rootCurrentAppRef: currentAppRef } = useRootActors()

  const sendToCurrentApp = currentAppRef.send
  const currentAppState: any = useSelector(currentAppRef, (state) => state)
  const currentAppContext = currentAppState.context

  const topNavigation = currentAppContext.topNavigation
  const memoryValues = currentAppContext.memoryValues
  const selectedCategory = memoryValues.selectedCategory
  const selectedCategoryItem = memoryValues.selectedCategoryItem

  const selectCategory = (id: string) => sendToCurrentApp({ type: 'CATEGORY_SELECT', payload: { id } })
  const selectCategoryItem = (id: string) => sendToCurrentApp({ type: 'CATEGORY_ITEM_SELECT', payload: { id } })

  console.log({
    topNavigation,
    selectedCategory,
    selectedCategoryItem
  })


  return {
    currentAppRef,
    sendToCurrentApp,

    currentAppState,
    currentAppContext,

    topNavigation,
    memoryValues,
    selectedCategory,
    selectedCategoryItem,

    selectCategory,
    selectCategoryItem
  }
}

import { useSelector } from "@xstate/react"
import { useAppStore } from "."

export const useCurrentApp = () => {
  const { currentAppRef } = useAppStore()

  const currentAppState: any = useSelector(currentAppRef, (state) => state)
  const currentAppContext = currentAppState?.context
  
  return {
    currentAppState,
    currentAppContext,
    componentsRef: currentAppContext?.componentsRef,
    actionsRef: currentAppContext?.actionsRef,
    appInfoRef: currentAppContext?.appInfoRef,
    executionRef: currentAppContext?.executionRef,
    layoutInfoRef: currentAppContext?.layoutInfoRef,
    historyRef: currentAppContext?.historyRef,
    currentAppRef,
    sendToCurrentApp: currentAppRef.send,
  }
}
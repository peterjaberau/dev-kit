import { useSelector } from "@xstate/react"
import { useAppStore } from "."

export const useConfig = () => {
  const { configRef } = useAppStore()

  const configState: any = useSelector(configRef, (state) => state)
  const configContext = configState?.context
  
  return {
    configState,
    configContext,
    configRef,
    sendToConfig: configRef.send,
  }
}
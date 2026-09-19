import { useSelector } from "@xstate/react"
import { useCurrentApp } from "."

export const useCurrentAppHistory = () => {
  const { historyRef } = useCurrentApp()

  const historyState: any = useSelector(historyRef, (state) => state)
  const historyContext = historyState?.context

  return {
    historyRef,
    historyState,
    historyContext,
    sendToHistory: historyRef.send,
  }
}
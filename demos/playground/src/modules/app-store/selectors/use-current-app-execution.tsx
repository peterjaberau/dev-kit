import { useSelector } from "@xstate/react"
import { useCurrentApp } from "."

export const useCurrentAppExecution = () => {
  const { executionRef } = useCurrentApp()

  const executionState: any = useSelector(executionRef, (state) => state)
  const executionContext = executionState?.context

  return {
    executionRef,
    executionState,
    executionContext,
    sendToExecution: executionRef.send,
  }
}
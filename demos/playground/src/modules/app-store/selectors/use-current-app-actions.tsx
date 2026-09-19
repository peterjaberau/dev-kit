import { useSelector } from "@xstate/react"
import { useCurrentApp } from "."

export const useCurrentAppActions = () => {
  const { actionsRef } = useCurrentApp()

  const actionsState: any = useSelector(actionsRef, (state) => state)
  const actionsContext = actionsState?.context

  return {
    actionsRef,
    actionsState,
    actionsContext,
    sendToActions: actionsRef.send,
  }
}
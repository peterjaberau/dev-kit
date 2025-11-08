import { useRootActors } from "../hooks"
import { useSelector } from "@xstate/react"

export const useCurrentApp = () => {
  const { rootCurrentAppRef: currentAppRef } = useRootActors()


  const sendToCurrentApp = currentAppRef.send
  const currentAppState: any = useSelector(currentAppRef, (state) => state)
  const currentAppContext = currentAppState.context

  return {
    currentAppRef,
    sendToCurrentApp,

    currentAppState,
    currentAppContext,
  }
}

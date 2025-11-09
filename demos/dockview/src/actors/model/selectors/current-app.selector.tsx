import { useRootActors } from "../hooks"
import { useSelector } from "@xstate/react"

export const useCurrentApp = () => {
  const { rootCurrentAppRef: currentAppRef } = useRootActors()



  const currentAppState: any = useSelector(currentAppRef, (state) => state)

  const currentAppContext = currentAppState.context

  const sendToCurrentApp = currentAppRef.send

  return {
    currentAppRef,
    sendToCurrentApp,

    currentAppState,
    currentAppContext,
  }
}

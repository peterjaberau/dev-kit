import { useRootActors } from "../hooks"
import { useSelector } from "@xstate/react"

export const useApp = () => {
  const { rootAppRef: appRef } = useRootActors()

  const sendToApp = appRef.send
  const appState: any = useSelector(appRef, (state) => state)
  const appContext = appState.context

  return {
    appRef,
    sendToApp,

    appState,
    appContext,
  }
}

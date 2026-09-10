import { useRootActors } from "."
import { useSelector } from "@xstate/react"

export const useApp = () => {
  const { rootAppRef: appRef } = useRootActors()

  const sendToApp = appRef.send
  const appState: any = useSelector(appRef, (state) => state)
  const appContext = appState.context

  const dockViewAdapterRef = appContext.dockViewAdapterRef




  return {
    appRef,
    sendToApp,

    appState,
    appContext,

    dockViewAdapterRef,
  }
}

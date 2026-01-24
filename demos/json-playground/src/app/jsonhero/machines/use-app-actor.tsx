import { useSelector } from "@xstate/react"
import { AppContext } from "./provider.app"

export const useAppActor = () => {
  const appRef: any = AppContext.useActorRef()
  const appId = appRef?.id

  const sendToApp = appRef.send
  const appState: any = useSelector(appRef, (state: any) => state)
  const appContext = appState.context

  /** Inspector */
  const isInspectorEnabled = appContext.config?.inspector?.enable ?? false
  const enableInspection = () => sendToApp({ type: "inspection.on" })
  const disableInspection = () => sendToApp({ type: "inspection.off" })

  return {
    appRef,
    appId,

    sendToApp,
    appState,
    appContext,

    //inspector
    isInspectorEnabled,
    enableInspection,
    disableInspection,
  }
}
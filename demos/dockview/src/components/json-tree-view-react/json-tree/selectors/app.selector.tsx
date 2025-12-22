import { useSelector } from "@xstate/react"
import { AppContext } from '../providers'

export function useApp() {

  const appRef = AppContext.useActorRef()
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

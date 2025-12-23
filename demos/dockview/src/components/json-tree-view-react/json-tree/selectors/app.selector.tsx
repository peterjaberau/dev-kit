'use client'
import { useSelector } from "@xstate/react"
import { AppContext } from '../providers'

export function useApp() {

  const appRef = AppContext.useActorRef()
  const sendToApp = appRef.send

  const appState: any = useSelector(appRef, (state) => state)
  const appContext = appState.context

  const appId = appRef?.id

  return {
    appId,
    appRef,
    sendToApp,

    appState,
    appContext,
  }
}

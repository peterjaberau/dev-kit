'use client'
import { useSelector } from "@xstate/react"
import { AppContext } from '../providers'

export function useApp() {
  console.log("JT useApp started:", AppContext)

  const appRef = AppContext.useActorRef()
  const sendToApp = appRef.send

  const appState: any = useSelector(appRef, (state) => state)
  const appContext = appState.context

  const appId = appRef?.id

  console.log("JT useApp exposed:", {
    appId,
    appRef,

    appState,
    appContext,
  })

  return {
    appId,
    appRef,
    sendToApp,

    appState,
    appContext,
  }
}

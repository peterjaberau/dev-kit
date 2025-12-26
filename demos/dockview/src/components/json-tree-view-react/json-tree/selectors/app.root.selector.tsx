'use client'
import { useSelector } from "@xstate/react"
import { useApp } from "./app.selector"
import { getSpawnedActor } from "../utils"
import { machineConstants } from "../utils"

export function useAppRoot() {
  const { appRef } = useApp()
  console.log("Legacy useApp started:", appRef)

  const appRootRef = getSpawnedActor(machineConstants.APP_ROOT, appRef)
  const sendToAppRoot = appRootRef?.send
  const appRootState: any = useSelector(appRootRef, (state) => state)
  const appRootContext = appRootState?.context

  const nodeRef = appRootContext?.nodeRef

  const appRootId = appRootRef?.id

  const data = appRootContext?.data

  return {
    appRootId,
    appRootRef,
    sendToAppRoot,
    appRootState,
    appRootContext,
    nodeRef,
    data,
  }
}

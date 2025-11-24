'use client'
import { useRootActors } from "../hooks"
import { useSelector } from "@xstate/react"

export const useDockAdapter = () => {

  const { rootDockAdapterRef: dockAdapterRef } = useRootActors()

  const dockAdapterState: any = useSelector(dockAdapterRef, (state) => state)

  const dockAdapterContext = dockAdapterState.context

  const sendToDockAdapter = dockAdapterRef.send

  return {
    dockAdapterRef,
    sendToDockAdapter,

    dockAdapterState,
    dockAdapterContext,
  }
}

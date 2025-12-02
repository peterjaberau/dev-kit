'use client'
import { useSelector } from "@xstate/react"
import { DockViewContext } from '#plugin-dock-view'

export function useDockViewRoot() {
  const rootRef = DockViewContext.useActorRef()
  const sendToRoot = rootRef.send

  const rootState: any = useSelector(rootRef, (state) => state)
  const rootContext = rootState.context

  return {
    rootRef,
    sendToRoot,

    rootState,
    rootContext,
  }
}

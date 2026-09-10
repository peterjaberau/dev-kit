import { useRootActors } from "."
import { useSelector } from "@xstate/react"

export const useDockView = () => {
  const { rootDockviewRef: dockviewRef } = useRootActors()

  const sendToDockview = dockviewRef.send
  const dockviewState: any = useSelector(dockviewRef, (state) => state)
  const dockviewContext = dockviewState.context

  const dockViewAdapterRef = dockviewContext.dockViewAdapterRef




  return {
    dockviewRef,
    sendToDockview,

    dockviewState,
    dockviewContext,

    dockViewAdapterRef,
  }
}

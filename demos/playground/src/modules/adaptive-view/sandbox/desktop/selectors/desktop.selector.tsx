import { useSelector } from "@xstate/react"
import { DesktopContext } from "../providers/DesktopProvider"

export const useDesktop = () => {
  const actorRef = DesktopContext.useActorRef()

  const state = useSelector(actorRef, (state) => state)
  const context = state.context

  return {
    isReady: state.matches("ready"),
    desktopRef: actorRef,
    sendToDesktop: actorRef.send,
    desktopContext: context,
    dockviewApi: context.dockviewApi,
    currentDesktop: context.current,
  }
}

export const useDesktopCurrent = () => {
  const { currentDesktop } = useDesktop()

  return {
    panelCount: currentDesktop.panelCount,
  }
}

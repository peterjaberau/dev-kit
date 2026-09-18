import { useSelector } from "@xstate/react"
import { DesktopContext } from "../providers/DesktopProvider"

export const useDesktop = () => {
  const actorRef = DesktopContext.useActorRef()
  const sendTo = actorRef.send

  const state = useSelector(actorRef, (state) => state)
  const context = state.context

  return {
    isInitiating: state.matches("initiating"),
    isStarting: state.matches("starting"),
    isReady: state.matches("ready"),
    desktopRef: actorRef,
    sendToDesktop: sendTo,
    desktopState: state,
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
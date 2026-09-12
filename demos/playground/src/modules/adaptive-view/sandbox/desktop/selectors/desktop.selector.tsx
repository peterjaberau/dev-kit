import { useSelector } from "@xstate/react"
import { DesktopContext } from "../providers"




export const useDesktop = () => {
  const actorRef = DesktopContext.useActorRef()
  const sendTo = actorRef.send

  const state = useSelector(actorRef, (state) => state)
  const context = state.context

  return {
    desktopRef: actorRef,
    sendToDesktop: sendTo,
    desktopState: state,
    desktopContext: context,
    dockviewApi: context.dockviewApi,
    currentDesktop: context.current,
  }
}

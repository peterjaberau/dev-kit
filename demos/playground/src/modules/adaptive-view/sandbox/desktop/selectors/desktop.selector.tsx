import { useSelector } from "@xstate/react"
import { DesktopContext } from "../providers"
import { useCallback } from "react"



export const useDesktop = () => {
  const actorRef = DesktopContext.useActorRef()
  const sendTo = actorRef.send

  // const sendTo = (type: string, params: any) => {
  //   actorRef.send({
  //     type: type,
  //     params,
  //   })
  // }

  const state = useSelector(actorRef, (state) => state)
  const context = state.context

  return {
    desktopRef: actorRef,
    sendToDesktop: sendTo,
    desktopState: state,
    desktopContext: context,
    dockviewApi: context.dockviewApi,
  }
}

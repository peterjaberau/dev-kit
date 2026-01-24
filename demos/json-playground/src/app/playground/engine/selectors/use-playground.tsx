import { useSelector } from "@xstate/react"
import { PlaygroundContext } from "../providers"

export const usePlayground = () => {
  const playgroundRef: any = PlaygroundContext.useActorRef()
  const playgroundId = playgroundRef?.id

  const sendToPlayground = playgroundRef.send
  const playgroundState: any = useSelector(playgroundRef, (state: any) => state)
  const playgroundContext = playgroundState.context

  const jsonManagerRef = playgroundRef?.refs?.manager
  const jsonViewsRef = playgroundRef?.refs?.views
  const jsonOperationsRef = playgroundRef?.refs?.manager

  /** Inspector */
  const isInspectorEnabled = playgroundContext.config?.inspector?.enable ?? false
  const enableInspection = () => sendToPlayground({ type: "inspection.on" })
  const disableInspection = () => sendToPlayground({ type: "inspection.off" })

  /** Fire events */
  const fireInitiate = () => sendToPlayground({ type: "playground.initiate" })

  return {
    playgroundRef,
    playgroundId,

    sendToPlayground,
    playgroundState,
    playgroundContext,

    jsonManagerRef,
    jsonViewsRef,
    jsonOperationsRef,

    //inspector
    isInspectorEnabled,
    enableInspection,
    disableInspection,

    //events
    fireInitiate,
  }
}

import { useRootActors } from "../hooks"
import { useSelector } from "@xstate/react"

export const useSession = () => {
  const { rootSessionRef: sessionRef } = useRootActors()

  const sendToSession = sessionRef.send
  const sessionState: any = useSelector(sessionRef, (state) => state)
  const sessionContext = sessionState.context

  return {
    sessionRef,
    sendToSession,

    sessionState,
    sessionContext,
  }
}

import { useSelector } from "@xstate/react"
import { ActorsModelContext } from "../../provider"

export function useRoot() {
  const rootRef = ActorsModelContext.useActorRef()
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

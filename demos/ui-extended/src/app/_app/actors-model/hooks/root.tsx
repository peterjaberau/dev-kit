import { useSelector } from "@xstate/react"
import { RootContext } from "../provider"

export function useRoot() {
  const rootRef = RootContext.useActorRef()
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


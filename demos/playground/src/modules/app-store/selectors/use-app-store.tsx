import { useSelector } from "@xstate/react"
import { AppStoreContext } from "../providers"

export const useAppStore = () => {
  const actorRef = AppStoreContext.useActorRef()

  const appStoreState = useSelector(actorRef, (state) => state)
  const appStoreContext = appStoreState.context



  return {
    appStoreRef: actorRef,
    appStoreState,
    appStoreContext,
    configRef: appStoreContext?.configRef,
    currentAppRef: appStoreContext?.currentAppRef,
    currentUserRef: appStoreContext?.currentUserRef,
    resourceRef: appStoreContext?.resourceRef,
    sendToAppStore: actorRef.send,
  }
}


import { useSelector } from "@xstate/react"
import { useAppStore } from "."

export const useCurrentUser = () => {
  const { currentUserRef } = useAppStore()

  const currentUserState: any = useSelector(currentUserRef, (state) => state)
  const currentUserContext = currentUserState?.context
  
  return {
    currentUserState,
    currentUserContext,
    currentUserRef,
    sendToCurrentUser: currentUserRef.send,

  }
}
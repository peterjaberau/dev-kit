import { useSelector } from "@xstate/react"
import { useAppStore } from "."

export const useResource = () => {
  const { resourceRef } = useAppStore()

  const resourceState: any = useSelector(resourceRef, (state) => state)
  const resourceContext = resourceState?.context
  
  return {
    resourceRef,
    resourceState,
    resourceContext,
    sendToResource: resourceRef.send,
  }
}
import { useRootActors } from "../hooks"
import { useSelector } from "@xstate/react"

export const useCurrentAppExample = () => {
  const { rootCurrentAppExampleRef: currentAppExampleRef } = useRootActors()


  const currentAppExampleState: any = useSelector(currentAppExampleRef, (state) => state)

  const currentAppExampleContext = currentAppExampleState.context

  const sendToCurrentAppExample = currentAppExampleRef.send

  return {
    currentAppExampleRef,
    sendToCurrentAppExample,

    currentAppExampleState,
    currentAppExampleContext,
  }
}

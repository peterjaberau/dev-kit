import { useSelector } from "@xstate/react"
import { usePlayground } from "./use-playground"

export const useJsonManager = () => {
  const { playgroundContext } = usePlayground()
  const jsonManagerRef = playgroundContext?.refs?.jsonManager
  const jsonManagerId = jsonManagerRef?.id

  const sendToJsonManager = jsonManagerRef?.send

  const jsonManagerState: any = useSelector(jsonManagerRef, (state) => state)
  const jsonManagerContext = jsonManagerState?.context

  return {
    jsonManagerRef,
    jsonManagerId,
    sendToJsonManager,
    jsonManagerState,
    jsonManagerContext,
  }
}

import { usePlayground } from "./use-playground"
import { useSelector } from "@xstate/react"

export const useJsonOperations = () => {
  const { playgroundContext } = usePlayground()
  const jsonOperationsRef = playgroundContext?.refs?.jsonOperations
  const jsonOperationsId = jsonOperationsRef?.id

  const sendToJsonOperations = jsonOperationsRef?.send

  const jsonOperationsState: any = useSelector(jsonOperationsRef, (state) => state)
  const jsonOperationsContext = jsonOperationsState?.context

  return {
    jsonOperationsRef,
    jsonOperationsId,

    sendToJsonOperations,
    jsonOperationsState,
    jsonOperationsContext,
  }
}

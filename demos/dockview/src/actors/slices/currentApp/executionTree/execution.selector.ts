import { useRootActors } from "#actors/model/hooks"

export const executionSelector = () => {
  const { currentAppExecutionActorRef: executionRef } = useRootActors()
  const executionState = executionRef?.getSnapshot()
  const executionContext = executionState?.context

  return {
    executionRef,
    executionState,
    executionContext,
  }
}

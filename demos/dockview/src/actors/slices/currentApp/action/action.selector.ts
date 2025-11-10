import { useRootActors } from "#actors/model/hooks"

export const actionSelector = () => {
  const { currentAppActionActorRef: actionRef } = useRootActors()
  const actionState = actionRef?.getSnapshot()
  const actionContext = actionState?.context

  return {
    actionRef,
    actionState,
    actionContext,
  }
}

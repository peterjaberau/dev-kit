import { useRootActors } from "#actors/model/hooks"

export const resourceSelector = () => {
  const { resourceActorRef: resourceRef } = useRootActors()
  const resourceState = resourceRef?.getSnapshot()
  const resourceContext = resourceState?.context

  return {
    resourceRef,
    resourceState,
    resourceContext,
  }
}

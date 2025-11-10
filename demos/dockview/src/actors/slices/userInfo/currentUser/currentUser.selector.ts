import { useRootActors } from "#actors/model/hooks"

export const currentUserSelector = () => {
  const { currentUserActorRef: currentUserRef } = useRootActors()
  const currentUserState = currentUserRef?.getSnapshot()
  const currentUserContext = currentUserState?.context

  return {
    currentUserRef,
    currentUserState,
    currentUserContext,
  }
}

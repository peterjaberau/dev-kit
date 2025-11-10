import { useRootActors } from "#actors/model/hooks"

export const componentsSelector = () => {
  const { currentAppComponentsActorRef: componentsRef } = useRootActors()
  const componentsState = componentsRef?.getSnapshot()
  const componentsContext = componentsState?.context

  return {
    componentsRef,
    componentsState,
    componentsContext,
  }
}

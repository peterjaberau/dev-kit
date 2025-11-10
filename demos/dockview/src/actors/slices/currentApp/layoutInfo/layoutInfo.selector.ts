import { useRootActors } from "#actors/model/hooks"

export const layoutInfoSelector = () => {
  const { currentAppLayoutInfoActorRef: layoutInfoRef } = useRootActors()
  const layoutInfoState = layoutInfoRef?.getSnapshot()
  const layoutInfoContext = layoutInfoState?.context

  return {
    layoutInfoRef,
    layoutInfoState,
    layoutInfoContext,
  }
}

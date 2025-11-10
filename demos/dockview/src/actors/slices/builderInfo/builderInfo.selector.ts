import { useRootActors } from "#actors/model/hooks"

export const builderInfoSelector = () => {
  const { builderInfoActorRef: builderInfoRef } = useRootActors()
  const builderInfoState = builderInfoRef?.getSnapshot()
  const builderInfoContext = builderInfoState?.context

  return {
    builderInfoRef,
    builderInfoState,
    builderInfoContext,
  }
}

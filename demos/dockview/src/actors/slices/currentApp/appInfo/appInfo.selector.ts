import { useRootActors } from "#actors/model/hooks"

export const appInfoSelector = () => {
  const { currentAppAppInfoActorRef: appInfoRef } = useRootActors()
  const appInfoState = appInfoRef?.getSnapshot()
  const appInfoContext = appInfoState?.context

  return {
    appInfoRef,
    appInfoState,
    appInfoContext,
  }
}

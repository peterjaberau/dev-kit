import { useRootActors } from "#actors/model/hooks"

export const configSelector = () => {
  const { configActorRef: configRef } = useRootActors()
  const configState = configRef?.getSnapshot()
  const configContext = configState?.context

  return {
    configRef,
    configState,
    configContext,
  }
}

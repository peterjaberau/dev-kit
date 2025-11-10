import { useRootActors } from "#actors/model/hooks"

export const teamSelector = () => {

  const { teamActorRef: teamRef } = useRootActors()
  const teamState = teamRef?.getSnapshot()
  const teamContext = teamState?.context

  return {
    teamRef,
    teamState,
    teamContext,
  }
}

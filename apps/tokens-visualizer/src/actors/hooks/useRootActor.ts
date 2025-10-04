import { RootActorContext } from "#actors/provider"

export function useRootActor() {
  const rootActorRef = RootActorContext.useActorRef()



  return {
    rootActorRef,
  }
}

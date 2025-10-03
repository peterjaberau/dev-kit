import { useRootActor } from "./useRootActor"
import { getSpawnedActor } from "../utils"
import { SYSTEM_ACTOR_ID } from "../constants"

export function useActors() {
  const { rootActorRef } = useRootActor()

  const exampleActorRef = getSpawnedActor(SYSTEM_ACTOR_ID.EXAMPLE, rootActorRef)

  return {
    rootActorRef,
    exampleActorRef,
  }
}

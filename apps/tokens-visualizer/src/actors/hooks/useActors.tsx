import { useRootActor } from "./useRootActor"
import { getSpawnedActor } from "../utils"
import { SYSTEM_ACTOR_ID } from "../constants"

export function useActors() {
  const { rootActorRef } = useRootActor()

  const searchActorRef = getSpawnedActor(SYSTEM_ACTOR_ID.SEARCH, rootActorRef)

  const tokenVisualizerLogicRef = getSpawnedActor(SYSTEM_ACTOR_ID.TOKEN_VISUALISER_LOGIC, rootActorRef)

  return {
    rootActorRef,
    searchActorRef,
    tokenVisualizerLogicRef,
  }
}

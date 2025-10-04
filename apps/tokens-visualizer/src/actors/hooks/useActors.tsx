import { useRootActor } from "./useRootActor"
import { getSpawnedActor } from "../utils"
import { SYSTEM_ACTOR_ID } from "../constants"

export function useActors() {
  const { rootActorRef } = useRootActor()

  // const graphGridActorRef = getSpawnedActor(SYSTEM_ACTOR_ID.GRAPH_GRID, rootActorRef)

  const searchActorRef = getSpawnedActor(SYSTEM_ACTOR_ID.SEARCH, rootActorRef)

  return {
    rootActorRef,
    searchActorRef,
  }
}

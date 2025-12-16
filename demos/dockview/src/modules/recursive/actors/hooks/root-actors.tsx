import { useRoot } from "./root"
import { getSpawnedActor } from "./utils"
import { ACTOR_CONSTANTS } from "../constants"

export function useRootActors() {
  const { rootRef } = useRoot()

  const appRef = getSpawnedActor(ACTOR_CONSTANTS.APP_MACHINE_ID, rootRef)
  const nodeRootRef = getSpawnedActor(ACTOR_CONSTANTS.APP_NODE_ACTOR_ID_ROOT, rootRef)


  return {
    appRef,
    nodeRootRef,
  }
}

import { useRoot } from "./root"
import { getSpawnedActor } from "./utils"
import { ROOT_SYSTEM_IDS } from "../shared/constants"

export function useRootActors() {
  const { rootRef } = useRoot()

  const rootAppRef = getSpawnedActor(ROOT_SYSTEM_IDS.APP, rootRef)
  const rootSessionRef = getSpawnedActor(ROOT_SYSTEM_IDS.SESSION, rootRef)
  const rootCurrentAppRef = getSpawnedActor(ROOT_SYSTEM_IDS.CURRENT_APP, rootRef)

  return {
    rootRef,
    rootAppRef,
    rootSessionRef,
    rootCurrentAppRef,
  }
}

import { useRoot } from "./root"
import { getSpawnedActor } from "./utils"
import { ROOT_SYSTEM_IDS } from "../shared/constants"

export function useRootActors() {
  const { rootRef } = useRoot()

  const rootAppRef = getSpawnedActor(ROOT_SYSTEM_IDS.APP, rootRef)
  const rootSessionRef = getSpawnedActor(ROOT_SYSTEM_IDS.SESSION, rootRef)
  const rootCurrentAppRef = getSpawnedActor(ROOT_SYSTEM_IDS.CURRENT_APP, rootRef)

  const rootPluginScopePickerRef = getSpawnedActor(ROOT_SYSTEM_IDS.PLUGIN_SCOPE_PICKER, rootRef)

  const rootDvControllerPluginRef = getSpawnedActor(ROOT_SYSTEM_IDS.PLUGIN_DV_CONTROLLER, rootRef)


  return {
    rootRef,
    rootAppRef,
    rootSessionRef,
    rootCurrentAppRef,

    rootPluginScopePickerRef,
    rootDvControllerPluginRef
  }
}

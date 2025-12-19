import { useRoot } from "./root"
import { getSpawnedActor } from "./utils"
import { DOCK_VIEW_ENUM } from "../lib/constants"

export function useRootActors() {
  const { rootRef } = useRoot()

  const rootAppRef = getSpawnedActor(DOCK_VIEW_ENUM.APP, rootRef)
  const rootDockViewAdapterRef = getSpawnedActor(DOCK_VIEW_ENUM.ADAPTER_ID, rootRef)
  const rootDynamicPanelLabRef = getSpawnedActor(DOCK_VIEW_ENUM.DYNAMIC_PANEL_LAB_ACTOR_ID, rootRef)

  const rootOASRef = getSpawnedActor(DOCK_VIEW_ENUM.OAS_INSTANCE_ID, rootRef)
  const rootOASManagerRef = getSpawnedActor(DOCK_VIEW_ENUM.OAS_MANAGER_INSTANCE_ID, rootRef)



  return {
    rootRef,
    rootAppRef,

    rootDockViewAdapterRef,
    rootDynamicPanelLabRef,
    rootOASRef,
    rootOASManagerRef

  }
}

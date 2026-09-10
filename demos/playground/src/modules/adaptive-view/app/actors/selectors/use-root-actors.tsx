import { useRoot } from "."
import { getSpawnedActor } from "../utils"
import { DOCK_VIEW_ENUM } from "../constants"

export function useRootActors() {
  const { rootRef } = useRoot()

  const rootDockviewRef = getSpawnedActor(DOCK_VIEW_ENUM.DOCK_VIEW_ID, rootRef)
  const rootDockViewAdapterRef = getSpawnedActor(DOCK_VIEW_ENUM.ADAPTER_ID, rootRef)
  const rootDynamicPanelLabRef = getSpawnedActor(DOCK_VIEW_ENUM.DYNAMIC_PANEL_LAB_ACTOR_ID, rootRef)


  return {
    rootRef,
    rootDockviewRef,
    rootDockViewAdapterRef,
    rootDynamicPanelLabRef,
  }
}

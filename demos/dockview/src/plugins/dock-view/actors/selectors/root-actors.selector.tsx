"use client"
import { useDockViewRoot } from "./root.selector"
import { getSpawnedActor, DOCK_VIEW_ENUM } from "#plugin-shared"

export function useDockViewRootActors() {
  const { rootRef } = useDockViewRoot()

  const dockViewAdapterRef = getSpawnedActor(DOCK_VIEW_ENUM.ADAPTER_ID, rootRef)

  return {
    dockViewAdapterRef,
  }
}

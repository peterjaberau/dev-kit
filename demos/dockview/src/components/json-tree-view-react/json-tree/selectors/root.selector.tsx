import { useApp } from "./app.selector"
import { getSpawnedActor } from "../utils"
import { JSON_TREE_ENUMS } from "../utils"

export function useRoot() {
  const { appRef } = useApp()

  const rootRef = getSpawnedActor(JSON_TREE_ENUMS.ROOT, appRef)

  return {
    appRef,
    rootRef,
  }
}

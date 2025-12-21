import { useSelector } from "@xstate/react"
import { useApp } from "./app.selector"
import { getSpawnedActor } from "../utils"
import { machineConstants } from "../utils"

export function useRoot() {
  const { appRef } = useApp()

  const rootRef = getSpawnedActor(machineConstants.ROOT, appRef)
  const sendToRoot = rootRef.send
  const rootState: any = useSelector(rootRef, (state) => state)
  const rootContext = rootState.context

  const data = rootContext?.data



  return {
    rootRef,
    sendToRoot,
    rootState,
    rootContext,
    data
  }
}

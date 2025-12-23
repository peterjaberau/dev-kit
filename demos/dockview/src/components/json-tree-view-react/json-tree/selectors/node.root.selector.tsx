'use client'
import { useAppRoot } from "./app.root.selector"
import { getSpawnedActor, machineConstants } from "#json-tree-view-react/json-tree/utils"
import { useSelector } from "@xstate/react"


export const useNodeRoot = () => {
  const { appRootRef } = useAppRoot()
  const nodeRootRef = getSpawnedActor(machineConstants.NODE_ROOT, appRootRef)

  const sendToNodeRoot = nodeRootRef?.send
  const nodeRootState: any = useSelector(nodeRootRef, (state) => state)
  const nodeRootContext = nodeRootState?.context
  const nodeRootId = nodeRootRef?.id

  const data = nodeRootContext?.data


  return {
    nodeRootId,
    appRootRef,
    nodeRootRef,
    sendToNodeRoot,
    nodeRootState,
    nodeRootContext,
    data
  }
}

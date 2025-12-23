'use client'
import { useAppRoot } from "./app.root.selector"
// import { getSpawnedActor, machineConstants } from "#json-tree-view-react/json-tree/utils"
import { useSelector } from "@xstate/react"


export const useNodeRoot = () => {
  // const { appRootRef } = useAppRoot()
  // const nodeRootRef = getSpawnedActor(machineConstants.NODE_ROOT, appRootRef)

  const { nodeRootRef } = useAppRoot()

  const sendToNodeRoot = nodeRootRef?.send
  const nodeRootState: any = useSelector(nodeRootRef, (state) => state)
  const nodeRootContext = nodeRootState?.context
  const nodeRootInstanceRef = nodeRootContext?.refs?.internal?.instance

  const nodeRootId = nodeRootRef?.id
  const data = nodeRootContext?.data

  const nodeInfo = {
    type: nodeRootRef?.src,
    id: nodeRootRef?.id,
  }

  return {
    nodeRootId,
    nodeRootRef,
    sendToNodeRoot,
    nodeRootState,
    nodeRootContext,
    nodeRootInstanceRef,
    nodeInfo,
    data
  }
}

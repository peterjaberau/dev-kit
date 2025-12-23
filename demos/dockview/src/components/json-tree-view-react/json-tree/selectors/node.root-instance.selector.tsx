'use client'
// import { useAppRoot } from "./app.root.selector"
// import { getSpawnedActor, machineConstants } from "#json-tree-view-react/json-tree/utils"
import { useNodeRoot } from "./node.root.selector"
import { useSelector } from "@xstate/react"


export const useNodeRootInstance = () => {

  const { nodeRootInstanceRef } = useNodeRoot()

  const sendToNodeInstanceRoot = nodeRootInstanceRef?.send
  const nodeRootInstanceState: any = useSelector(nodeRootInstanceRef, (state) => state)
  const nodeRootInstanceContext = nodeRootInstanceState?.context

  const nodeRootInstanceId = nodeRootInstanceRef?.id


  const data = nodeRootInstanceContext?.data


  const nodeInstance = {
    type: nodeRootInstanceRef?.src,
    id: nodeRootInstanceRef?.id,
  }

  return {
    nodeRootInstanceId,
    nodeRootInstanceRef,
    sendToNodeInstanceRoot,
    nodeRootInstanceState,
    nodeRootInstanceContext,
    nodeInstance,
    data
  }
}

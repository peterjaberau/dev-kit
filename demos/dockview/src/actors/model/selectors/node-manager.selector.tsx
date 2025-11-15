'use client'
import { useRootActors } from "../hooks"
import { useSelector } from "@xstate/react"

export const useNodeManager = () => {

  const { rootNodeManagerRef: nodeManagerRef } = useRootActors()

  const nodeManagerState: any = useSelector(nodeManagerRef, (state) => state)

  const nodeManagerContext = nodeManagerState.context

  const sendToNodeManager = nodeManagerRef.send

  return {
    nodeManagerRef,
    sendToNodeManager,

    nodeManagerState,
    nodeManagerContext,
  }
}

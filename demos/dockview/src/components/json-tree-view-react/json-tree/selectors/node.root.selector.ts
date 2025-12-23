'use client'
import { useRoot } from "./root.selector"
import { useSelector } from "@xstate/react"

export const useNodeRoot = () => {
  const { nodeRef: nodeRootRef } = useRoot()

  const nodeRootState: any = useSelector(nodeRootRef, (state) => state)
  const nodeRootContext = nodeRootState?.context
  const sendToNodeRoot = nodeRootRef?.send

  const nodeTreeRootRef = nodeRootContext?.refs?.relations?.tree?.root

  const nodeRootId = nodeRootRef?.id

  return {
    nodeRootId,
    nodeRootRef,
    nodeRootState,
    nodeRootContext,
    sendToNodeRoot,

    nodeTreeRootRef
  }
}

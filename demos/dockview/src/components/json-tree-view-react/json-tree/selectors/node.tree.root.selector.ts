'use client'
import { useNodeRoot } from "./node.root.selector"
import { useSelector } from "@xstate/react"

export const useNodeTreeRoot = () => {
  const { nodeRootRef, nodeTreeRootRef } = useNodeRoot()

  const nodeTreeRootState: any = useSelector(nodeTreeRootRef, (state) => state)
  const nodeTreeRootContext = nodeTreeRootState?.context
  const sendToNodeTreeRoot = nodeTreeRootRef?.send

  const nodeTreeRootId = nodeTreeRootRef?.id

  return {
    nodeTreeRootId,
    nodeRootRef,
    nodeTreeRootRef,
    nodeTreeRootState,
    nodeTreeRootContext,
    sendToNodeTreeRoot,
  }
}

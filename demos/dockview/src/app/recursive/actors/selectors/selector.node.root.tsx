import { useRootActors } from "../hooks"
import { useSelector } from "@xstate/react"

export const useNodeRootSelector = () => {
  const { nodeRootRef } = useRootActors()

  console.log('---nodeRootRef---', { nodeRootRef})

  const sendToNodeRoot = nodeRootRef.send
  const nodeRootState: any = useSelector(nodeRootRef, (state) => state)
  const nodeRootContext = nodeRootState.context

  return {
    nodeRootRef,
    sendToNodeRoot,

    nodeRootState,
    nodeRootContext,
  }
}

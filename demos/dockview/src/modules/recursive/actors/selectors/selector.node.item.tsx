import { useSelector } from "@xstate/react"
import { getSpawnedActor, useRoot } from '../hooks';


// export const useNodeItemSelector = ({ nodeId }) => {
export const useNodeItemSelector = ({ childRef }) => {
  // const { rootRef } = useRoot()
  // const nodeItemRef = getSpawnedActor(nodeId, rootRef)

  console.log('---childRef---', { childRef})
  const nodeItemRef = childRef

  const sendToNodeItem = nodeItemRef.send
  const nodeItemState: any = useSelector(nodeItemRef, (state) => state)
  const nodeItemContext = nodeItemState.context

  return {
    nodeItemRef,
    sendToNodeItem,

    nodeItemState,
    nodeItemContext,
  }
}

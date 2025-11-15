import { useNodeManager } from "./node-manager.selector"


export const useDock = () => {
  const { nodeManagerRef, sendToNodeManager, nodeManagerState, nodeManagerContext } = useNodeManager()


  const dockDebugger = {
    dockSelector: {
      state: nodeManagerState.toJSON(),
      snapshot: nodeManagerRef.getSnapshot().toJSON(),
      stateValue: nodeManagerState.value,
      status: nodeManagerState.status
    }
  }

  return {
    dockRef: nodeManagerRef,
    sendToDock: sendToNodeManager,

    dockState: nodeManagerState,
    dockContext: nodeManagerContext,
    dockDebugger

  }
}

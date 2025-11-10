import { useCurrentAppExample } from "./current-app-example.selector"

export const useDock = () => {
  const { currentAppExampleRef, sendToCurrentAppExample, currentAppExampleState, currentAppExampleContext } = useCurrentAppExample()


  const dockDebugger = {
    dockSelector: {
      state: currentAppExampleState.toJSON(),
      snapshot: currentAppExampleRef.getSnapshot().toJSON(),
      stateValue: currentAppExampleState.value,
      status: currentAppExampleState.status
    }
  }

  return {
    dockRef: currentAppExampleRef,
    sendToDock: sendToCurrentAppExample,

    dockState: currentAppExampleState,
    dockContext: currentAppExampleContext,
    dockDebugger

  }
}

import { useCurrentApp } from "./current-app.selector"

export const useDock = () => {
  const { currentAppRef, sendToCurrentApp, currentAppState, currentAppContext } = useCurrentApp()


  const dockDebugger = {
    dockSelector: {
      state: currentAppState.toJSON(),
      snapshot: currentAppRef.getSnapshot().toJSON(),
      stateValue: currentAppState.value,
      status: currentAppState.status
    }
  }

  return {
    dockRef: currentAppRef,
    sendToDock: sendToCurrentApp,

    dockState: currentAppState,
    dockContext: currentAppContext,
    dockDebugger

  }
}

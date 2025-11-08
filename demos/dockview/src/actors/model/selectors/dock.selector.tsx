import { useCurrentApp } from "./current-app.selector"

export const useDock = () => {
  const { currentAppRef, sendToCurrentApp, currentAppState, currentAppContext } = useCurrentApp()

  return {
    dockRef: currentAppRef,
    sendToDock: sendToCurrentApp,

    dockState: currentAppState,
    dockContext: currentAppContext,
  }
}

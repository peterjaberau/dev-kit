import { useCurrentApp } from "./current-app.selector"

export const useDock = () => {
  const { currentAppRef, sendToCurrentApp, currentAppState, currentAppContext } = useCurrentApp()

  const dockViewContext = currentAppContext

  return {
    dockRef: currentAppRef,
    sendToDock: sendToCurrentApp,

    dockState: currentAppState,
    dockContext: currentAppContext,

    dockViewContext
  }
}

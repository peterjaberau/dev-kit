import { useDesktop } from "./desktop.selector"

export const useInteractions = () => {
  const { desktopContext, sendToDesktop } = useDesktop()

  return {
    sendToDesktop,
    selectedPanelId: desktopContext.interactions.selectedPanelId,
    selectedGroupId: desktopContext.interactions.selectedGroupId,
    selectedViewId: desktopContext.interactions.selectedViewId,
  }
}

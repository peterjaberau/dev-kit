'use client'
import { useSelector } from "@xstate/react"
import { useRoot } from "./root.selector"
//import { useDockViewAdapter } from "./dock-view-adapter.selector"
//import { useSelector } from "@xstate/react"


export const useNode = () => {

  const { rootContext } = useRoot()

  console.log(rootContext)

  return {
    rootContext
  }

  /*

  const { getPanel, activePanelId, dockPanelRef: panelRef }: any = useDockViewAdapter()

  const panelState: any = useSelector(panelRef(panelId), (state) => state)
  const panelContext = panelState?.context
  const sendToPanel = panelRef?.send

   */
}

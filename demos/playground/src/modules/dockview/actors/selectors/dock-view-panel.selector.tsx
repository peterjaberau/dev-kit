"use client"
import { useDockViewAdapter } from "./dock-view-adapter.selector"
import { useSelector } from "@xstate/react"
import { createTreeCollection } from "@chakra-ui/react"

// https://dockview.dev/docs/api/dockview/panelApi
export const useDockViewPanel = ({ panelId }: any) => {

  const { getPanel, activePanelId, dockPanelRef: panelRef }: any = useDockViewAdapter()

  const panelState: any = useSelector(panelRef(panelId), (state) => state)
  const panelContext = panelState?.context
  const sendToPanel = panelRef?.send


  const panel = getPanel(panelId)
  const panelApi = panel?.api
  const panelContainerApi = panel?.containerApi
  const id = panel?.id

  const componentId = panel?.component
  const group = panel?.group
  const groupId = panel?.group.id
  const maximumHeight = panel?.maximumHeight
  const maximumWidth = panel?.maximumWidth
  const minimumHeight = panel?.minimumHeight
  const minimumWidth = panel?.minimumWidth
  const params = panel?.params
  // const renderer = {}
  const title = panel?.title


  // Panel View
  const panelViewRef = panelContext?.refs?.relations?.view
  const panelViewState: any = useSelector(panelViewRef, (state) => state)
  const panelViewContext = panelViewState?.context
  const sendToPanelView = panelViewRef?.send

  const inPanelViewScopeState = panelViewState?.matches("scope") || false
  const inPanelViewScopedState = panelViewState?.matches("scoped") || false



  const panelViewScopeContext = {
    collection: createTreeCollection<any>({
      nodeToValue: (node) => node.id,
      nodeToString: (node) => node.name,
      rootNode: panelViewContext?.scope?.collection || {},
    }),
    defaultExpanded: ["panels"],
    selectedValue: [],
    filter: {
      sensitivity: "base",
    }
  }


  const panelViewScopedContext = panelViewContext?.scoped || {}


  return {
    panelRef,
    panelState,
    panelContext,
    sendToPanel,

    panelViewRef,
    panelViewState,
    panelViewContext,
    sendToPanelView,
    inPanelViewScopeState,
    inPanelViewScopedState,
    panelViewScopeContext,
    panelViewScopedContext,

    panelApi,


    isPopout: panelApi?.location.type === 'popout',
    panel: panel,
    panelContainerApi,
    componentId: panel?.component,
    group: panel?.group,
    height: panel?.height,
    id: panel?.id,
    isActive: panel?.api.isActive,
    isFocused: panel?.api.isFocused,
    isGroupActive: panel?.api.isGroupActive,
    isVisible: panel?.api.isVisible,
    location: panel?.api.location,
    tabComponent: panel?.tabComponent,
    title: panel?.title,
    width: panel?.width,
    renderer: panel?.renderer,
    params,

    close: () => panel?.api.close(),
    exitMaximized: () => panel?.api.exitMaximized(),
    getParameters: () => panel?.api.getParameters(),
    getWindow: () => panel?.api.getWindow(),
    isMaximized: () => panel?.api.isMaximized(),
    maximize: () => panel?.api.maximize(),
    setActive: () => panel?.api.setActive(),
    setTitle: (title: string) => panel?.api.setTitle(title),
    updateParameters: (parameters: any) => panel?.api.updateParameters(parameters),
    focus: () => panel?.focus(),


  }
}

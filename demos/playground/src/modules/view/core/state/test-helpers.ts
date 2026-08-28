/* v8 ignore start -- test fixture helper */
import type { ViewInset, ViewLayoutState, ViewPanelState, ViewSize, ViewTabId } from "../types"
import { viewBuildLayoutTreeFromPanels, viewSyncLayoutPanels } from "./layout-tree"
import { viewNextId } from "./reducer"

type FlatPanelInit = {
  id?: string
  inset: ViewInset
  tabs: {
    id?: string
    data: unknown
    closable?: boolean
    draggable?: boolean
  }[]
  activeTabId?: string | null
  fullScreen?: boolean
  minSize?: ViewSize
  maxSize?: ViewSize
}

export function createStateFromPanels(initial: { panels: FlatPanelInit[] }): ViewLayoutState {
  const state: ViewLayoutState = {
    panels: {},
    panelOrder: [],
    tabs: {},
    layout: null,
  }
  let hasFullScreenPanel = false
  for (const init of initial.panels) {
    const panelId = init.id ?? viewNextId("p")
    const tabs: ViewTabId[] = []
    for (const tabInit of init.tabs) {
      const tabId = tabInit.id ?? viewNextId("t")
      state.tabs[tabId] = {
        id: tabId,
        panelId,
        data: tabInit.data,
        closable: tabInit.closable ?? true,
        draggable: tabInit.draggable ?? true,
      }
      tabs.push(tabId)
    }
    const fullScreen = Boolean(init.fullScreen && !hasFullScreenPanel)
    if (fullScreen) hasFullScreenPanel = true
    state.panels[panelId] = {
      id: panelId,
      kind: "tiled",
      inset: { ...init.inset },
      tabs,
      activeTabId: init.activeTabId && tabs.includes(init.activeTabId) ? init.activeTabId : (tabs[0] ?? null),
      fullScreen,
      minSize: init.minSize,
      maxSize: init.maxSize,
    } satisfies ViewPanelState
    state.panelOrder.push(panelId)
  }
  const layout = viewBuildLayoutTreeFromPanels(state.panelOrder.map((id) => state.panels[id]!).filter(Boolean))
  return layout ? viewSyncLayoutPanels({ ...state, layout }, layout) : state
}
/* v8 ignore stop */

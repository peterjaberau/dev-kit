import { DOCK_VIEW_ENUM  } from "./constants"
import { fromCallback } from "xstate"

/**
 * xstate helpers
 */

export const getActor = (systemId: string, system: any) => {
  return system?.get(systemId)
}

export const getSystem = (actorRef: any) => {
  return actorRef?.system
}

export const getSpawnedActor = (systemId: string, actorRef: any) => {
  return actorRef?.system.get(systemId)
}


/**
 * DockView Apis and handlers
 */
export const applyDefaultLayout = ({ api, defaultConfig }: any) => {
  if (defaultConfig && defaultConfig.panels.length > 0) {
    const firstPanel = api.addPanel(defaultConfig.panels[0])
    defaultConfig.panels.slice(1).forEach((panel: any) => {
      api.addPanel(panel)
    })
    firstPanel.api.setActive()
  }
}

export const cleanupDockDisposables = ({ disposables }: any) => {
  return () => disposables.forEach((disposable: any) => disposable.dispose())
}
export const defineDockDisposables = ({ api, sendBack }: any) => {
  return [
    api.onDidAddPanel((event: any) => sendBack({ type: "onDidAddPanel", payload: event })),
    api.onDidRemovePanel((event: any) => sendBack({ type: "onDidRemovePanel", payload: event })),
    api.onDidActivePanelChange((event: any) => sendBack({ type: "onDidActivePanelChange", payload: event })),
    api.onDidMovePanel((event: any) => sendBack({ type: "onDidMovePanel", payload: event })),

    api.onDidAddGroup((event: any) => sendBack({ type: "onDidAddGroup", payload: event })),
    api.onDidRemoveGroup((event: any) => sendBack({ type: "onDidRemoveGroup", payload: event })),
    api.onDidActiveGroupChange((event: any) => sendBack({ type: "onDidActiveGroupChange", payload: event })),
    api.onDidMaximizedGroupChange((event: any) => sendBack({ type: "onDidMaximizedGroupChange", payload: event })),
  ]
}

export const handleDisposables = fromCallback(({ sendBack, input }) => {
  const { api, defaultConfig }: any = input

  const disposables = defineDockDisposables({ api, sendBack })

  loadLayoutFromLocalStorage({ api, key: DOCK_VIEW_ENUM.LOCAL_STORAGE_IDENTIFIER })
  // applyDefaultLayout({ api, defaultConfig})

  return cleanupDockDisposables({ disposables })
})

export const loadLayoutFromLocalStorage = ({ api, key }: any) => {
  const state = localStorage.getItem(key)
  if (state) {
    try {
      api.fromJSON(JSON.parse(state))
      return
    } catch {
      localStorage.removeItem("dv-demo-state")
    }
    return
  }
}

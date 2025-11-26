'use client'
import { useDockViewApi } from "./dock-view-api.selector"

export function useDockViewMeta() {
  const { activeGroupId, activePanelId, meta } = useDockViewApi()

  const groupsMeta = meta.groups
  const panelsMeta = meta.panels





  return {
    activeGroupId,
    activePanelId,
    groupsMeta,
    panelsMeta,

  }
}

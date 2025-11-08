'use client'
import { useDockApi } from "./dock-api.selector"

export function useDockMeta() {
  const { activeGroupId, activePanelId, meta } = useDockApi()

  const groupsMeta = meta.groups
  const panelsMeta = meta.panels





  return {
    activeGroupId,
    activePanelId,
    groupsMeta,
    panelsMeta,

  }
}

'use client'
import { useDockViewApi } from "."

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

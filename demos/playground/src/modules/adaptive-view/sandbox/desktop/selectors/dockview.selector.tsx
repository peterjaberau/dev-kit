import { useDesktop } from "./desktop.selector"

export const useDockview = () => {
  const { dockviewApi } = useDesktop()

  const groups = [...new Map((dockviewApi?.groups ?? []).map((group: any) => [group.id, group])).values()]
  const groupsList = groups.map((group: any) => ({
    id: group.id,
    name: group.activePanel?.title ?? group.id,
  }))

  const panels = [...new Map((dockviewApi?.panels ?? []).map((panel: any) => [panel.id, panel])).values()]
  const panelsList = panels.map((panel: any) => ({
    id: panel.id,
    name: panel.title ?? panel.id,
  }))

  return {
    dockviewApi,
    groups,
    panels,
    groupIds: groups.map((group: any) => group.id),
    groupsList,
    panelIds: panels.map((panel: any) => panel.id),
    panelsList,
    metadata: { groups: groupsList, panels: panelsList },
  }
}

export function useDockviewPanel(panelId: string) {
  const { dockviewApi } = useDockview()
  const panel = dockviewApi?.getPanel(panelId)
  const panelState = panel?.toJSON()
  const panelContext = panel
    ? {
        id: panel.id,
        title: panel.title,
        params: panel.params,
        groupId: panel.group.id,
      }
    : undefined

  return {
    dockviewApi,
    panel,
    panelApi: panel?.api,
    panelState,
    panelContext,
    panelId,
  }
}

export function useDockviewGroup(groupId: string) {
  const { dockviewApi } = useDockview()

  const group = dockviewApi?.getGroup(groupId)
  const groupState = group?.toJSON()
  const groupContext = group
    ? {
        id: group.id,
        activePanelId: group.activePanel?.id,
        panelIds: group.panels.map((panel: any) => panel.id),
      }
    : undefined

  return {
    dockviewApi,
    group,
    groupApi: group?.api,
    groupState,
    groupContext,
    groupId,
  }
}

import { useCallback } from "react"
import { useSelector } from "@xstate/react"
import { DesktopContext } from "../providers/DesktopProvider"

const emptyPanelState = { isActive: false, isVisible: false }
const emptyGroupState = {
  ...emptyPanelState,
  isMaximized: false,
  location: undefined,
  headerPosition: "top" as const,
}

function useDockviewRef() {
  return DesktopContext.useSelector((snapshot) => snapshot.context.dockviewRef)
}

export const useDockview = () => {
  const dockviewRef = useDockviewRef()
  const dockviewApi = useSelector(dockviewRef, (snapshot: any) => snapshot.context.api) ?? undefined
  const dndCompass = useSelector(dockviewRef, (snapshot: any) => snapshot.context.options.dndCompass)
  const overflow = useSelector(dockviewRef, (snapshot: any) => snapshot.context.options.overflow)
  return {
    dockviewApi,
    dockviewRef,
    sendToDockview: dockviewRef.send,
    dndCompass,
    overflow,
    tabGroupColors: dockviewApi?.tabGroupColors ?? [],
  }
}

export function useDockviewActive() {
  const dockviewRef = useDockviewRef()
  const activePanel = useSelector(dockviewRef, (state: any) => state.context.current.activePanel)
  const activeGroup = useSelector(dockviewRef, (state: any) => state.context.current.activeGroup)
  const smartGuidesEnabled = useSelector(dockviewRef, (state: any) => state.context.current.smartGuidesEnabled)
  return { activePanel, activeGroup, smartGuidesEnabled }
}

export function useDockviewEdgeGroups() {
  const dockviewRef = useDockviewRef()
  return useSelector(dockviewRef, (state: any) => state.context.current.edgeGroups)
}

export function useDockviewPanel(panelId: string) {
  const dockviewRef = useDockviewRef()
  const panel = useSelector(dockviewRef, (state: any) => state.context.current.panels[panelId] ?? emptyPanelState)
  return { sendToDockview: dockviewRef.send, ...panel }
}

export function useDockviewGroup(groupId: string) {
  const dockviewRef = useDockviewRef()
  const group = useSelector(dockviewRef, (state: any) => state.context.current.groups[groupId] ?? emptyGroupState)
  return { sendToDockview: dockviewRef.send, ...group }
}

export function useDockviewMenus({ renderers, prompt }: any) {
  const dockviewRef = useDockviewRef()
  const getTabMenuData = useCallback(
    (groupId: string, panelId: string): any[] => {
      const { api, options, menus } = dockviewRef.getSnapshot().context
      const group = api?.getGroup(groupId)
      if (!group) return []
      return (menus.tab as any[]).flatMap((item): any => {
        if (typeof item === "string") return [item]
        switch (item.kind) {
          case "overflow":
            return [
              { kind: "renderer", renderer: "overflow", mode: item.mode, active: options.overflow.mode === item.mode },
            ]
          case "docking":
            return group.api.location.type === "edge"
              ? [{ kind: "renderer", renderer: "edgeAutoHide" }]
              : [
                  { kind: "renderer", renderer: "float" },
                  { kind: "renderer", renderer: "popout" },
                ]
          case "membership": {
            const selected = api.getTabGroupForPanel({ groupId, panelId })
            const items: any[] = []
            if (selected)
              items.push({
                kind: "command",
                label: `Remove from "${selected.label || selected.id}"`,
                event: { type: "onRemovePanelFromTabGroup", params: { groupId, panelId } },
              })
            for (const tabGroup of api.getTabGroups({ groupId })) {
              if (tabGroup.id !== selected?.id)
                items.push({
                  kind: "command",
                  label: `Add to "${tabGroup.label || tabGroup.id}"`,
                  event: { type: "onAddPanelToTabGroup", params: { groupId, panelId, tabGroupId: tabGroup.id } },
                })
            }
            items.push({
              kind: "command",
              label: item.createLabel,
              prompt: item.prompt,
              event: { type: "onCreateTabGroupForPanel", params: { groupId, panelId } },
            })
            return items
          }
        }
      })
    },
    [dockviewRef],
  )
  const getTabGroupMenuData = useCallback(
    (groupId: string, tabGroupId: string): any[] => {
      const { api, menus } = dockviewRef.getSnapshot().context
      if (!api?.getGroup(groupId)) return []
      return (menus.tabGroup as any[]).map((item) =>
        typeof item === "string"
          ? item
          : {
              kind: "command",
              label: item.label,
              event: {
                type: item.eventType,
                params: item.eventType === "onDissolveTabGroup" ? { groupId, tabGroupId } : { groupId },
              },
            },
      )
    },
    [dockviewRef],
  )
  const bindMenuItems = useCallback(
    (items: any[]) =>
      items.map((item): any => {
        if (typeof item === "string") return item
        if (item.kind === "command")
          return {
            label: item.label,
            action: () => {
              if (item.prompt) {
                const label = prompt(item.prompt)
                if (label === null) return
                dockviewRef.send({ ...item.event, params: { ...item.event.params, label } })
              } else dockviewRef.send(item.event)
            },
          }
        if (item.renderer === "overflow")
          return {
            component: renderers.overflow,
            componentProps: {
              mode: item.mode,
              active: item.active,
              onSelect: (mode: "dropdown" | "wrap") => dockviewRef.send({ type: "onUpdateOverflow", params: { mode } }),
            },
          }
        return { component: renderers[item.renderer] }
      }),
    [dockviewRef, renderers, prompt],
  )
  const getTabContextMenuItems = useCallback(
    ({ panel, group }: any) => bindMenuItems(getTabMenuData(group.id, panel.id)),
    [bindMenuItems, getTabMenuData],
  )
  const getTabGroupChipContextMenuItems = useCallback(
    ({ group, tabGroup }: any) => bindMenuItems(getTabGroupMenuData(group.id, tabGroup.id)),
    [bindMenuItems, getTabGroupMenuData],
  )
  return { getTabContextMenuItems, getTabGroupChipContextMenuItems }
}

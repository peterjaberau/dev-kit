import { useCallback, useMemo, useSyncExternalStore } from "react"
import type { FC } from "react"
import type {
  DockviewApi,
  IContextMenuItemComponentProps,
  GetTabContextMenuItemsParams,
  GetTabGroupChipContextMenuItemsParams,
} from "#adaptive-view/react"
import type {
  MenuItem,
  TabMenuBuiltin,
  TabGroupMenuBuiltin,
  TabMenuTemplate,
  TabGroupMenuTemplate,
} from "../machines/desktop-menu.types"
import { useDesktop } from "./desktop.selector"

const dockviewEvents = [
  "onDidLayoutChange",
  "onDidLayoutFromJSON",
  "onDidAddPanel",
  "onDidRemovePanel",
  "onDidAddGroup",
  "onDidRemoveGroup",
  "onDidActivePanelChange",
  "onDidActiveGroupChange",
  "onDidMovePanel",
  "onDidMaximizedGroupChange",
  "onDidChangeHistory",
  "onDidTabGroupChange",
]
const panelEvents = [
  "onDidVisibilityChange",
  "onDidActiveChange",
  "onDidActiveGroupChange",
  "onDidGroupChange",
  "onDidTitleChange",
  "onDidParametersChange",
  "onDidLocationChange",
  "onDidDimensionsChange",
  "onDidRendererChange",
  "onDidChangePinned",
]
const groupEvents = [
  "onDidVisibilityChange",
  "onDidActiveChange",
  "onDidActivePanelChange",
  "onDidLocationChange",
  "onDidDimensionsChange",
  "onDidHeaderDirectionChange",
  "onDidCollapsedChange",
  "onDidPeekChange",
]

// Only the notification version is retained. Every rendered value is read from
// Dockview itself, including changes made outside desktopMachine commands.
function useApiUpdates(source: any, events: string[], desktopRef?: any) {
  const subscription = useMemo(() => {
    let version = 0
    return {
      getSnapshot: () => version,
      subscribe: (notify: () => void) => {
        const changed = () => {
          version += 1
          notify()
        }
        const disposables = events.flatMap((name) =>
          typeof source?.[name] === "function" ? [source[name](changed)] : [],
        )
        const commandSubscription = desktopRef?.on("dockviewChanged", changed)
        // Catch changes between render and subscription without copying API state.
        version += 1
        return () => {
          disposables.forEach((disposable) => disposable.dispose())
          commandSubscription?.unsubscribe()
        }
      },
    }
  }, [source, events, desktopRef])
  useSyncExternalStore(subscription.subscribe, subscription.getSnapshot, () => 0)
}

export const useDockview = () => {
  const { dockviewApi: api, desktopRef, sendToDesktop } = useDesktop()
  const dockviewApi = (api ?? undefined) as DockviewApi | undefined
  useApiUpdates(dockviewApi, dockviewEvents, desktopRef)
  return {
    dockviewApi,
    sendToDesktop,
    activeGroup: dockviewApi?.activeGroup,
    activePanel: dockviewApi?.activePanel,
    smartGuidesEnabled: dockviewApi?.smartGuidesEnabled ?? false,
  }
}

export function useDockviewPanel(panelId: string) {
  const { dockviewApi, sendToDesktop } = useDockview()
  const panel = dockviewApi?.getPanel(panelId)
  useApiUpdates(panel?.api, panelEvents)
  return {
    sendToDesktop,
    isActive: panel?.api.isActive ?? false,
    isVisible: panel?.api.isVisible ?? false,
  }
}

export function useDockviewGroup(groupId: string) {
  const { dockviewApi, sendToDesktop } = useDockview()
  const group = dockviewApi?.getGroup(groupId)
  useApiUpdates(group?.api, groupEvents)
  return {
    sendToDesktop,
    isActive: group?.api.isActive ?? false,
    isVisible: group?.api.isVisible ?? false,
    isMaximized: group?.api.isMaximized() ?? false,
    location: group?.api.location,
    headerPosition: group?.api.getHeaderPosition() ?? "top",
  }
}

export interface DockviewMenuBindings {
  renderers: Record<"overflow" | "float" | "popout" | "edgeAutoHide", FC<IContextMenuItemComponentProps>>
  prompt: (message: string) => string | null
}

export function useDockviewMenus({ renderers, prompt }: DockviewMenuBindings) {
  const { desktopRef } = useDesktop()
  const getTabMenuData = useCallback(
    (groupId: string, panelId: string): MenuItem<TabMenuBuiltin>[] => {
      const { dockviewApi: api, menus, current } = desktopRef.getSnapshot().context
      const group = api?.getGroup(groupId)
      if (!group) return []
      return (menus.tab as TabMenuTemplate[]).flatMap((item): MenuItem<TabMenuBuiltin>[] => {
        if (typeof item === "string") return [item]
        switch (item.kind) {
          case "overflow":
            return [
              { kind: "renderer", renderer: "overflow", mode: item.mode, active: current.overflow.mode === item.mode },
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
            const items: MenuItem<TabMenuBuiltin>[] = []
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
    [desktopRef],
  )
  const getTabGroupMenuData = useCallback(
    (groupId: string, tabGroupId: string): MenuItem<TabGroupMenuBuiltin>[] => {
      const { dockviewApi: api, menus } = desktopRef.getSnapshot().context
      if (!api?.getGroup(groupId)) return []
      return (menus.tabGroup as TabGroupMenuTemplate[]).map((item) =>
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
    [desktopRef],
  )
  const bindMenuItems = useCallback(
    <T extends string>(items: MenuItem<T>[]) =>
      items.map(
        (
          item,
        ):
          | T
          | {
              component: FC<IContextMenuItemComponentProps>
              componentProps?: object
            }
          | { label: string; action: () => void } => {
          if (typeof item === "string") return item
          if (item.kind === "command")
            return {
              label: item.label,
              action: () => {
                if (item.prompt) {
                  const label = prompt(item.prompt)
                  if (label === null) return
                  desktopRef.send({ ...item.event, params: { ...item.event.params, label } })
                } else desktopRef.send(item.event)
              },
            }
          if (item.renderer === "overflow")
            return {
              component: renderers.overflow,
              componentProps: {
                mode: item.mode,
                active: item.active,
                onSelect: (mode: "dropdown" | "wrap") =>
                  desktopRef.send({ type: "onUpdateOverflow", params: { mode } }),
              },
            }
          return { component: renderers[item.renderer] }
        },
      ),
    [desktopRef, renderers, prompt],
  )
  const getTabContextMenuItems = useCallback(
    ({ panel, group }: GetTabContextMenuItemsParams) => bindMenuItems(getTabMenuData(group.id, panel.id)),
    [bindMenuItems, getTabMenuData],
  )
  const getTabGroupChipContextMenuItems = useCallback(
    ({ group, tabGroup }: GetTabGroupChipContextMenuItemsParams) =>
      bindMenuItems(getTabGroupMenuData(group.id, tabGroup.id)),
    [bindMenuItems, getTabGroupMenuData],
  )
  return { getTabContextMenuItems, getTabGroupChipContextMenuItems }
}

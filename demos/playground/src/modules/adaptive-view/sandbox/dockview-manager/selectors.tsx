"use client"

import { useSelector } from "@xstate/react"
import type { ActorRefFrom } from "xstate"
import { DockviewManagerContext } from "./provider"
import { DOCKVIEW_SELECTION_ID, dockviewSelectionMachine } from "./machines"

export function useDockviewManager() {
  const dockviewManagerRef = DockviewManagerContext.useActorRef()
  const dockviewManagerState = DockviewManagerContext.useSelector((state) => state)
  const dockviewManagerContext = dockviewManagerState.context
  const api = dockviewManagerContext.api
  const layoutPanels = [...new Map((api?.panels ?? []).map((panel) => [panel.id, panel])).values()]
  const panelIds = layoutPanels.map((panel) => panel.id)
  const panelsList = layoutPanels.map((panel) => ({
    id: panel.id,
    name: panel.title ?? panel.id,
  }))
  const layoutGroups = [...new Map((api?.groups ?? []).map((group) => [group.id, group])).values()]
  const groupIds = layoutGroups.map((group) => group.id)
  const groupsList = layoutGroups.map((group) => ({
    id: group.id,
    name: group.activePanel?.title ?? group.id,
  }))
  const metadata = {
    panelsList,
    groupsList,
  }

  return {
    dockviewManagerRef,
    dockviewManagerState,
    dockviewManagerContext,
    dockviewManagerSnapshot: dockviewManagerRef.getSnapshot(),
    dockviewManagerId: dockviewManagerRef.id,
    api,
    sendToDockviewManager: dockviewManagerRef.send,
    panelIds,
    panelsList,
    groupIds,
    groupsList,
    metadata,
  }
}

export function useDockviewSelection() {
  const dockviewSelectionRef = DockviewManagerContext.useSelector(
    (state) => state.children[DOCKVIEW_SELECTION_ID] as ActorRefFrom<typeof dockviewSelectionMachine> | undefined,
  )
  const dockviewSelectionState = useSelector(dockviewSelectionRef, (state) => state)
  const dockviewSelectionContext = dockviewSelectionState?.context

  return {
    dockviewSelectionRef,
    sendToDockviewSelection: dockviewSelectionRef?.send,
    dockviewSelectionState,
    dockviewSelectionContext,
    dockviewSelectionSnapshot: dockviewSelectionRef?.getSnapshot(),
    selectedPanelId: dockviewSelectionContext?.selectedPanelId ?? null,
    selectedGroupId: dockviewSelectionContext?.selectedGroupId ?? null,
  }
}

export function useDockviewGroup(groupId: string) {
  const {
    dockviewManagerRef,
    dockviewManagerState,
    dockviewManagerContext,
    dockviewManagerSnapshot,
    api,
    sendToDockviewManager,
  } = useDockviewManager()
  const group = api?.getGroup(groupId)
  const groupState = group?.toJSON()
  const groupContext = group
    ? {
        id: group.id,
        activePanelId: group.activePanel?.id,
        panelIds: group.panels.map((panel) => panel.id),
      }
    : undefined

  return {
    dockviewManagerRef,
    dockviewManagerState,
    dockviewManagerContext,
    dockviewManagerSnapshot,
    api,
    sendToDockviewManager,
    group,
    groupApi: group?.api,
    groupState,
    groupContext,
    groupId,
  }
}

export function useDockviewPanel(panelId: string) {
  const {
    dockviewManagerRef,
    dockviewManagerState,
    dockviewManagerContext,
    dockviewManagerSnapshot,
    api,
    sendToDockviewManager,
  } = useDockviewManager()
  const panel = api?.getPanel(panelId)
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
    dockviewManagerRef,
    dockviewManagerState,
    dockviewManagerContext,
    dockviewManagerSnapshot,
    api,
    sendToDockviewManager,
    panel,
    panelApi: panel?.api,
    panelState,
    panelContext,
    panelId,
  }
}

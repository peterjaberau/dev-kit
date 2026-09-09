"use client"

import { useSelector } from "@xstate/react"
import type { ActorRefFrom } from "xstate"
import { LayoutManagerContext } from "./provider"
import { SANDBOX_LAYOUT_ID, SANDBOX_LAYOUT_GROUP_ID, SANDBOX_LAYOUT_PANEL_ID, sandboxLayoutMachine } from "./machines"

export function useLayoutManager() {
  const layoutManagerRef = LayoutManagerContext.useActorRef()
  const layoutManagerState = LayoutManagerContext.useSelector((state) => state)
  const layoutManagerContext = layoutManagerState.context
  const api = layoutManagerContext.api
  const layoutPanels = api?.panels.filter((panel) => panel.id !== SANDBOX_LAYOUT_PANEL_ID) ?? []
  const panelIds = layoutPanels.map((panel) => panel.id)
  const panelsList = layoutPanels.map((panel) => ({
    id: panel.id,
    name: panel.title ?? panel.id,
  }))
  const layoutGroups = api?.groups.filter((group) => group.id !== SANDBOX_LAYOUT_GROUP_ID) ?? []
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
    layoutManagerRef,
    layoutManagerState,
    layoutManagerContext,
    layoutManagerSnapshot: layoutManagerRef.getSnapshot(),
    layoutManagerId: layoutManagerRef.id,
    api,
    sentToLayoutManager: layoutManagerRef.send,
    panelIds,
    panelsList,
    groupIds,
    groupsList,
    metadata,
  }
}

export function useSandboxLayout() {
  const sandboxLayoutRef = LayoutManagerContext.useSelector(
    (state) => state.children[SANDBOX_LAYOUT_ID] as ActorRefFrom<typeof sandboxLayoutMachine> | undefined,
  )
  const sandboxLayoutState = useSelector(sandboxLayoutRef, (state) => state)
  const sandboxLayoutContext = sandboxLayoutState?.context

  return {
    sandboxLayoutRef,
    sentToSandboxLayout: sandboxLayoutRef?.send,
    sandboxLayoutState,
    sandboxLayoutContext,
    sandboxLayoutSnapshot: sandboxLayoutRef?.getSnapshot(),
    selectedPanelId: sandboxLayoutContext?.selectedPanelId ?? null,
    selectedGroupId: sandboxLayoutContext?.selectedGroupId ?? null,
  }
}

export function useLayoutGroup(groupId: string) {
  const {
    layoutManagerRef,
    layoutManagerState,
    layoutManagerContext,
    layoutManagerSnapshot,
    api,
    sentToLayoutManager,
  } = useLayoutManager()
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
    layoutManagerRef,
    layoutManagerState,
    layoutManagerContext,
    layoutManagerSnapshot,
    api,
    sentToLayoutManager,
    group,
    groupApi: group?.api,
    groupState,
    groupContext,
    groupId,
  }
}

export function useLayoutPanel(panelId: string) {
  const {
    layoutManagerRef,
    layoutManagerState,
    layoutManagerContext,
    layoutManagerSnapshot,
    api,
    sentToLayoutManager,
  } = useLayoutManager()
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
    layoutManagerRef,
    layoutManagerState,
    layoutManagerContext,
    layoutManagerSnapshot,
    api,
    sentToLayoutManager,
    panel,
    panelApi: panel?.api,
    panelState,
    panelContext,
    panelId,
  }
}

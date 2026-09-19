import { setup, assign, enqueueActions, emit, fromCallback } from "xstate"
import { themeMachine } from "./theme.machine"
import { localStoreMachine } from "./local-store.machine"
import type { DockviewApi } from "#adaptive-view/react"
import type { TabMenuTemplate, TabGroupMenuTemplate } from "./desktop-menu.types"
import type { ActorRefFrom } from "xstate"

const resolveProfile = (context: any, profileId?: string | null) => {
  const profiles = context.presets.dockviewProfiles
  const selected = profiles.find((profile: any) => profile.id === profileId)
  const fallback = profiles.find((profile: any) => profile.id === "default")
  const store = context.store.localStoreRef?.getSnapshot().context
  const saved = store?.data[store.settings.storeKey]
  const hasSavedProfile =
    saved &&
    typeof saved.id === "string" &&
    typeof saved.title === "string" &&
    saved.data &&
    typeof saved.data === "object" &&
    "grid" in saved.data &&
    "panels" in saved.data

  // An explicit different profile opens its preset; the matching saved profile
  // restores edits even when the URL also names that profile.
  return hasSavedProfile && (!selected || saved.id === selected.id) ? saved : (selected ?? fallback)
}

export const desktopMachine = setup({
  actors: {
    themeMachine,
    localStoreMachine,
    observeDockview: fromCallback(({ input, sendBack }: { input: DockviewApi; sendBack: (event: any) => void }) => {
      const disposables = [
        input.onDidAddPanel((panel) => sendBack({ type: "onDidAddPanel", params: { panelId: panel.id } })),
        input.onDidRemovePanel((panel) => sendBack({ type: "onDidRemovePanel", params: { panelId: panel.id } })),
        input.onDidActivePanelChange((event) =>
          sendBack({ type: "onDidActivePanelChange", params: { panelId: event.panel?.id } }),
        ),
        input.onDidAddGroup((group) => sendBack({ type: "onDidAddGroup", params: { groupId: group.id } })),
        input.onDidRemoveGroup((group) => sendBack({ type: "onDidRemoveGroup", params: { groupId: group.id } })),
        input.onDidActiveGroupChange((group) =>
          sendBack({ type: "onDidActiveGroupChange", params: { groupId: group?.id } }),
        ),
        input.onDidMovePanel((event) => sendBack({ type: "onDidMovePanel", params: { panelId: event.panel.id } })),
        input.onDidMaximizedGroupChange((event) =>
          sendBack({
            type: "onDidMaximizedGroupChange",
            params: { groupId: event.group.id, isMaximized: event.isMaximized },
          }),
        ),
      ]
      return () => disposables.forEach((disposable) => disposable.dispose())
    }),
  },
  actions: {
    initializeTabContextMenu: assign(({ context }) => ({
      menus: {
        ...context.menus,
        tab: [
          "separator",
          "close",
          "closeOthers",
          "closeAll",
          "closeLeft",
          "closeRight",
          "separator",
          "maximize",
          "separator",
          { kind: "overflow", mode: "dropdown" },
          { kind: "overflow", mode: "wrap" },
          "separator",
          { kind: "docking" },
          "separator",
          { kind: "membership", createLabel: "Add to new group", prompt: "Group name:" },
        ] satisfies TabMenuTemplate[],
      },
    })),
    initializeTabGroupContextMenu: assign(({ context }) => ({
      menus: {
        ...context.menus,
        tabGroup: [
          "rename",
          "colorPicker",
          "collapse",
          "close",
          "separator",
          { kind: "command", label: "Float group", eventType: "onFloatGroup" },
          { kind: "command", label: "Popout group", eventType: "onPopoutGroup" },
          "separator",
          { kind: "command", label: "Dissolve group", eventType: "onDissolveTabGroup" },
        ] satisfies TabGroupMenuTemplate[],
      },
    })),
    spawnLocalStore: assign(({ context, spawn }) => ({
      store: {
        ...context.store,
        localStoreRef: spawn("localStoreMachine", {
          id: "local-store",
          systemId: "local-store",
          input: { initialLayout: context.input.initialLayout },
        }),
      },
    })),
    spawnThemes: assign(({ context, spawn }) => {
      context.theme = {
        desktopThemeRef: spawn("themeMachine", {
          id: "desktop-theme",
          systemId: "desktop-theme",
          input: { type: "desktop", initialDesktopTheme: context.input.initialDesktopTheme },
        }),
        dockviewThemeRef: spawn("themeMachine", {
          id: "dockview-theme",
          systemId: "dockview-theme",
          input: { type: "dockview", initialTheme: context.input.initialTheme },
        }),
      }
    }),

    resolveInitialLayout: assign(({ context }) => {
      const profile = resolveProfile(context, context.input.dockviewProfileId)
      return {
        layout: {
          ...context.layout,
          profile,
          selectedDockviewProfileId: profile?.id ?? null,
          data: profile?.data,
        },
      }
    }),
    persistLoadedProfile: ({ context }) => {
      const profile = context.layout.profile
      const store = context.store.localStoreRef
      if (!profile || !store) return
      const { settings, data } = store.getSnapshot().context
      const saved = data[settings.storeKey] as { id?: string } | null | undefined
      if (saved == null || saved.id !== profile.id) {
        store.send({
          type: "SET_ITEM",
          key: settings.storeKey,
          value: { id: profile.id, title: profile.title, data: profile.data },
        })
      }
    },
    saveLayout: assign(({ context }) => {
      const profile = context.layout.profile
      if (!profile || !context.dockviewApi) return {}
      const payload = { id: profile.id, title: profile.title, data: context.dockviewApi.toJSON() }
      const store = context.store.localStoreRef
      store?.send({ type: "SET_ITEM", key: store.getSnapshot().context.settings.storeKey, value: payload })
      return { layout: { ...context.layout, profile: payload, data: payload.data } }
    }),
    loadLayout: assign(({ context }) => {
      const api = context.dockviewApi
      const fallbackProfile = context.presets.dockviewProfiles.find((profile: any) => profile.id === "default")
      const fallback = fallbackProfile?.data
      const apply = (data: any) => {
        if (!data) throw new Error('DesktopProvider requires a dockview profile with id "default" and layout data.')
        const layout = JSON.parse(JSON.stringify(data))
        for (const panel of Object.values(layout.panels ?? {}) as any[]) {
          if (panel.contentComponent === "instance") panel.contentComponent = "view"
          if (panel.params?.instanceId && !panel.params.viewId) {
            panel.params.viewId = panel.params.instanceId
            delete panel.params.instanceId
          }
        }
        api.fromJSON(layout)
      }
      let data = context.layout.data
      try {
        apply(data)
      } catch (error) {
        // Corrupt saved layouts must not prevent the desktop from opening.
        if (context.layout.data === fallback) throw error
        apply(fallback)
        data = fallback
      }
      return {
        layout: {
          ...context.layout,
          data,
          profile: data === context.layout.data ? context.layout.profile : fallbackProfile,
          selectedDockviewProfileId:
            data === context.layout.data ? context.layout.selectedDockviewProfileId : (fallbackProfile?.id ?? null),
        },
      }
    }),
    setDockviewApi: assign(({ event }) => ({ dockviewApi: event.params.api })),
    addPendingLogLine: assign(({ context }, params: { id: string; message: string }) => {
      const { id, message } = params
      context.current.pending = [
        {
          text: `${message} ${id}`,
          timestamp: new Date(),
        },
        ...context.current.pending,
      ]
    }),
    flushPendingLogLines: assign(({ context }) => {
      const { pending, logLines, logColorIndex } = context.current
      const { colors } = context.fixtures
      const backgroundColor = colors[logColorIndex % colors.length]

      const nextLines = pending.map((line: any) => ({
        ...line,
        backgroundColor,
      }))
      context.current = {
        ...context.current,
        logLines: [...nextLines, ...logLines],
        pending: [],
        logColorIndex: logColorIndex + 1,
      }
    }),
    clearLogLines: assign(({ context }) => {
      context.current = {
        ...context.current,
        logLines: [],
        pending: [],
      }
    }),
    incrementPanelCount: assign(({ context }) => ({
      current: { ...context.current, panelCount: context.current.panelCount + 1 },
    })),

    addPanelToTabGroup: ({ context, event }) => {
      context.dockviewApi?.addPanelToTabGroup(event.params)
    },
    removePanelFromTabGroup: ({ context, event }) => {
      context.dockviewApi?.removePanelFromTabGroup(event.params)
    },
    createTabGroupForPanel: ({ context, event }) => {
      const api = context.dockviewApi
      if (!api) return
      const { groupId, panelId, label } = event.params
      const colors = api.tabGroupColors
      const color = colors[Math.floor(Math.random() * colors.length)]?.id
      const group = api.createTabGroup({ groupId, label, color })
      api.addPanelToTabGroup({ groupId, panelId, tabGroupId: group.id })
    },
    dissolveTabGroup: ({ context, event }) => {
      context.dockviewApi?.dissolveTabGroup(event.params)
    },
    toggleEdgeGroup: ({ context, event }) => {
      const api = context.dockviewApi
      if (!api) return
      const { position } = event.params
      if (api.getEdgeGroup(position)) {
        api.removeEdgeGroup(position)
      } else {
        const group = api.addEdgeGroup(position, { id: `edge-${position}`, initialSize: 200, minimumSize: 100 })
        api.addPanel({
          id: `edge-panel-${position}-${Date.now()}`,
          component: "fixedPlaceholder",
          title: `Tab ${context.current.panelCount}`,
          position: { referenceGroup: group.id },
          params: { label: position, position },
        })
      }
    },
    addPanel: ({ context, event }) => context.dockviewApi?.addPanel(event.params.options),
    addGroup: ({ context }) => context.dockviewApi?.addGroup(),
    clearDockview: ({ context }) => context.dockviewApi?.clear(),
    notifyDockviewChanged: emit({ type: "dockviewChanged" }),
    setActivePanel: ({ context, event }) => context.dockviewApi?.getPanel(event.params.panelId)?.api.setActive(),
    setActiveGroup: ({ context, event }) => context.dockviewApi?.getGroup(event.params.groupId)?.api.setActive(),
    closePanel: ({ context, event }) => context.dockviewApi?.getPanel(event.params.panelId)?.api.close(),
    closeGroup: ({ context, event }) => context.dockviewApi?.getGroup(event.params.groupId)?.api.close(),
    floatPanel: ({ context, event }) => {
      const panel = context.dockviewApi?.getPanel(event.params.panelId)
      if (panel) context.dockviewApi.addFloatingGroup(panel)
    },
    popoutPanel: ({ context, event }) => {
      const panel = context.dockviewApi?.getPanel(event.params.panelId)
      if (panel) void context.dockviewApi.addPopoutGroup(panel)
    },
    floatGroup: ({ context, event }) => {
      const group = context.dockviewApi?.getGroup(event.params.groupId)
      if (group) context.dockviewApi.addFloatingGroup(group, event.params.options)
    },
    popoutGroup: ({ context, event }) => {
      const group = context.dockviewApi?.getGroup(event.params.groupId)
      if (group) void context.dockviewApi.addPopoutGroup(group)
    },
    toggleGroupMaximized: ({ context, event }) => {
      const api = context.dockviewApi?.getGroup(event.params.groupId)?.api
      if (api?.isMaximized()) api.exitMaximized()
      else api?.maximize()
    },
    toggleGroupVisible: ({ context, event }) => {
      const api = context.dockviewApi?.getGroup(event.params.groupId)?.api
      api?.setVisible(!api.isVisible)
    },
    setGroupHeaderPosition: ({ context, event }) => {
      context.dockviewApi?.getGroup(event.params.groupId)?.api.setHeaderPosition(event.params.position)
    },
    toggleSmartGuides: ({ context }) => {
      const api = context.dockviewApi
      api?.setSmartGuidesEnabled(!api.smartGuidesEnabled)
    },
    toggleDndCompass: assign(({ context }) => {
      context.current.dndCompass = !context.current.dndCompass
    }),
    toggleCustomGhost: assign(({ context }) => {
      context.current.customGhost = !context.current.customGhost
    }),
    toggleWatermark: assign(({ context }) => {
      context.current.watermark = !context.current.watermark
    }),
    toggleDebug: assign(({ context }) => {
      context.current.debug = !context.current.debug
    }),
    toggleShowLogs: assign(({ context }) => {
      context.current.showLogs = !context.current.showLogs
    }),
    setOverflow: assign(({ context, event }) => {
      context.current.overflow = {
        ...context.current.overflow,
        ...event.params,
        mode: event.params?.mode === "wrap" ? "wrap" : "dropdown",
      }
    }),
    selectDockviewProfile: assign(({ context, event }) => {
      const profile = resolveProfile(context, event.params.profileId ?? "default")
      return {
        layout: {
          ...context.layout,
          profile,
          selectedDockviewProfileId: profile?.id ?? null,
          data: profile?.data,
        },
      }
    }),
    toggleDesktopDesigner: assign(({ context }) => {
      context.layout.desktopDesignerOpen = !context.layout.desktopDesignerOpen
    }),
    closeDesktopDesigner: assign(({ context }) => {
      context.layout.desktopDesignerOpen = false
    }),
  },
}).createMachine({
  id: "desktop",
  initial: "initiating",
  context: ({ input }: any) => {
    const dockviewProfiles = input.dockviewProfiles ?? []
    const viewProfiles = input.viewProfiles ?? []
    const viewProfile = viewProfiles.find(({ id }: any) => id === input.viewProfileId) ?? viewProfiles[0] ?? null

    return {
      input,
      dockviewApi: null,
      menus: { tab: [] as TabMenuTemplate[], tabGroup: [] as TabGroupMenuTemplate[] },
      store: {
        localStoreRef: null as ActorRefFrom<typeof localStoreMachine> | null,
      },
      fixtures: {
        colors: [
          "rgba(255,0,0,0.2)",
          "rgba(0,255,0,0.2)",
          "rgba(0,0,255,0.2)",
          "rgba(255,255,0,0.2)",
          "rgba(0,255,255,0.2)",
          "rgba(255,0,255,0.2)",
        ],
      },

      current: {
        logLines: [],
        pending: [],

        logColorIndex: 0,

        watermark: false,
        customGhost: false,
        dndCompass: false,
        showLogs: false,
        debug: false,
        overflow: {
          mode: "dropdown",
          mru: false,
          search: true,
        },
        panelCount: 0,
      },

      view: {
        viewProfile,
      },
      theme: {
        desktopThemeRef: null,
        dockviewThemeRef: null,
      },
      presets: {
        dockviewProfiles,
      },
      layout: {
        desktopDesignerOpen: false,
        profile: null,
        selectedDockviewProfileId: null,
        data: null,
      },
    }
  },
  states: {
    initiating: {
      entry: enqueueActions(({ enqueue }) => {
        enqueue("spawnLocalStore")
        enqueue("spawnThemes")
        enqueue("initializeTabContextMenu")
        enqueue("initializeTabGroupContextMenu")
        enqueue("resolveInitialLayout")
        enqueue("persistLoadedProfile")
        enqueue.raise({ type: "onCompleteInitiation" })
      }),
      on: {
        onCompleteInitiation: { target: "starting" },
      },
    },
    starting: {
      on: {
        onSelectDockviewProfile: { actions: ["selectDockviewProfile", "persistLoadedProfile"] },
        onReady: {
          actions: ["setDockviewApi", "loadLayout", "persistLoadedProfile"],
          target: "ready",
        },
      },
    },
    ready: {
      invoke: {
        src: "observeDockview",
        input: ({ context }) => context.dockviewApi,
      },
      on: {
        onAddPanelToTabGroup: { actions: ["addPanelToTabGroup", "notifyDockviewChanged"] },
        onRemovePanelFromTabGroup: { actions: ["removePanelFromTabGroup", "notifyDockviewChanged"] },
        onCreateTabGroupForPanel: { actions: ["createTabGroupForPanel", "notifyDockviewChanged"] },
        onDissolveTabGroup: { actions: ["dissolveTabGroup", "notifyDockviewChanged"] },
        onToggleEdgeGroup: { actions: ["toggleEdgeGroup", "notifyDockviewChanged"] },
        onAddPanel: { actions: ["addPanel", "notifyDockviewChanged"] },
        onAddGroup: { actions: ["addGroup", "notifyDockviewChanged"] },
        onClearDockview: { actions: ["clearDockview", "notifyDockviewChanged"] },
        onSetActivePanel: { actions: ["setActivePanel", "notifyDockviewChanged"] },
        onSetActiveGroup: { actions: ["setActiveGroup", "notifyDockviewChanged"] },
        onClosePanel: { actions: ["closePanel", "notifyDockviewChanged"] },
        onCloseGroup: { actions: ["closeGroup", "notifyDockviewChanged"] },
        onFloatPanel: { actions: ["floatPanel", "notifyDockviewChanged"] },
        onPopoutPanel: { actions: ["popoutPanel", "notifyDockviewChanged"] },
        onFloatGroup: { actions: ["floatGroup", "notifyDockviewChanged"] },
        onPopoutGroup: { actions: ["popoutGroup", "notifyDockviewChanged"] },
        onToggleGroupMaximized: { actions: ["toggleGroupMaximized", "notifyDockviewChanged"] },
        onToggleGroupVisible: { actions: ["toggleGroupVisible", "notifyDockviewChanged"] },
        onSetGroupHeaderPosition: { actions: ["setGroupHeaderPosition", "notifyDockviewChanged"] },

        onSaveLayout: { actions: "saveLayout" },

        onReady: {
          target: "ready",
          reenter: true,
          actions: ["setDockviewApi", "loadLayout", "persistLoadedProfile"],
        },
        onDidActivePanelChange: {
          actions: enqueueActions(({ event, enqueue }) => {
            const panelId = event.params.panelId ?? null
            enqueue({
              type: "addPendingLogLine",
              params: { id: panelId ?? "none", message: "Panel Activated" },
            })
            enqueue("flushPendingLogLines")
          }),
        },

        onDidAddPanel: {
          actions: enqueueActions(({ event, enqueue }) => {
            const { panelId } = event.params
            enqueue("incrementPanelCount")
            enqueue({ type: "addPendingLogLine", params: { id: panelId, message: "Panel Added" } })
            enqueue("flushPendingLogLines")
          }),
        },
        onDidRemovePanel: {
          actions: enqueueActions(({ event, enqueue }) => {
            const { panelId } = event.params
            enqueue({ type: "addPendingLogLine", params: { id: panelId, message: "Panel Removed" } })
            enqueue("flushPendingLogLines")
          }),
        },
        onDidMovePanel: {
          actions: enqueueActions(({ event, enqueue }) => {
            const { panelId } = event.params
            enqueue({ type: "addPendingLogLine", params: { id: panelId, message: "Panel Moved" } })
            enqueue("flushPendingLogLines")
          }),
        },
        onDidAddGroup: {
          actions: enqueueActions(({ event, enqueue }) => {
            const { groupId } = event.params
            enqueue({ type: "addPendingLogLine", params: { id: groupId, message: "Group Added" } })
            enqueue("flushPendingLogLines")
          }),
        },
        onDidActiveGroupChange: {
          actions: enqueueActions(({ event, enqueue }) => {
            const groupId = event.params.groupId ?? null
            enqueue({
              type: "addPendingLogLine",
              params: { id: groupId ?? "none", message: "Group Activated" },
            })
            enqueue("flushPendingLogLines")
          }),
        },
        onDidRemoveGroup: {
          actions: enqueueActions(({ event, enqueue }) => {
            const { groupId } = event.params
            enqueue({ type: "addPendingLogLine", params: { id: groupId, message: "Group Removed" } })
            enqueue("flushPendingLogLines")
          }),
        },
        onDidMaximizedGroupChange: {
          actions: enqueueActions(({ event, enqueue }) => {
            const { groupId, isMaximized } = event.params
            enqueue({
              type: "addPendingLogLine",
              params: { id: `${groupId} [${isMaximized}]`, message: "Group Maximized Changed" },
            })
            enqueue("flushPendingLogLines")
          }),
        },

        onClearLogLines: {
          actions: "clearLogLines",
        },

        onToggleWatermark: {
          actions: ["toggleWatermark"],
        },
        onToggleCustomGhost: {
          actions: ["toggleCustomGhost"],
        },
        onToggleDndCompass: {
          actions: ["toggleDndCompass"],
        },
        onToggleSmartGuides: {
          actions: ["toggleSmartGuides", "notifyDockviewChanged"],
        },
        onToggleShowLogs: {
          actions: ["toggleShowLogs"],
        },
        onToggleDebug: {
          actions: ["toggleDebug"],
        },
        onUpdateOverflow: {
          actions: ["setOverflow"],
        },

        onSelectDockviewProfile: {
          actions: ["selectDockviewProfile", "loadLayout", "persistLoadedProfile"],
        },
        onToggleDesktopDesigner: {
          actions: ["toggleDesktopDesigner"],
        },
        onCloseDesktopDesigner: {
          actions: ["closeDesktopDesigner"],
        },
      },
    },
  },
})

import { setup, assign, enqueueActions } from "xstate"
import { themeMachine } from "./theme.machine"

export const desktopMachine = setup({
  actors: { themeMachine },
  actions: {
    resolveInitialLayout: assign(({ context }) => {
      const profiles = context.presets.dockviewProfiles
      const selected = profiles.find((profile: any) => profile.id === context.input.dockviewProfileId)
      const fallback = profiles.find((profile: any) => profile.id === "default")
      const saved = context.input.initialLayout
      const hasSavedLayout = saved && typeof saved === "object" && "grid" in saved && "panels" in saved
      return {
        layout: {
          ...context.layout,
          selectedDockviewProfileId: selected?.id ?? null,
          data: selected?.data ?? (hasSavedLayout ? saved : fallback?.data),
        },
      }
    }),
    loadLayout: assign(({ context }) => {
      const api = context.dockviewApi
      const fallback = context.presets.dockviewProfiles.find((profile: any) => profile.id === "default")?.data
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
          selectedDockviewProfileId: data === context.layout.data ? context.layout.selectedDockviewProfileId : null,
        },
        current: {
          ...context.current,
          panels: api.panels.map((panel: any) => panel.id),
          groups: api.groups.map((group: any) => group.id),
          activePanel: api.activePanel?.id ?? null,
          activeGroup: api.activeGroup?.id ?? null,
        },
        interactions: { selectedPanelId: null, selectedGroupId: null, selectedViewId: null },
      }
    }),
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
    setDockviewApi: assign(({ context, event }, params) => {
      const { api } = event.params || params
      context.dockviewApi = api
    }),
    addPendingLogLine: assign(({ context, event }, params: any) => {
      const { id, message = "" } = params || event.params
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
    resetTracking: assign(({ context }) => {
      // Reset tracked state for the new Dockview API to prevent stale IDs
      // accumulating across remounts (e.g. when toggling shell mode).
      context.current = {
        ...context.current,
        panels: [],
        groups: [],
        activePanel: null,
        activeGroup: null,
      }
      context.interactions = {
        selectedPanelId: null,
        selectedGroupId: null,
        selectedViewId: null,
      }
    }),
    incrementPanelCount: assign(({ context }) => ({
      current: { ...context.current, panelCount: context.current.panelCount + 1 },
    })),
    addPanel: assign(({ context, event }) => {
      const { panelId } = event.params
      if (!context.current.panels.includes(panelId)) {
        context.current.panels = [...context.current.panels, panelId]
      }
    }),
    removePanel: assign(({ context, event }) => {
      const { panelId } = event.params
      context.current.panels = context.current.panels.filter((id: string) => id !== panelId)
      if (context.current.activePanel === panelId) {
        context.current.activePanel = null
      }
      if (context.interactions.selectedPanelId === panelId) {
        context.interactions.selectedPanelId = null
      }
    }),
    setActivePanel: assign(({ context, event }) => {
      context.current.activePanel = event.params.panelId ?? null
    }),
    addGroup: assign(({ context, event }) => {
      const { groupId } = event.params
      if (!context.current.groups.includes(groupId)) {
        context.current.groups = [...context.current.groups, groupId]
      }
    }),
    removeGroup: assign(({ context, event }) => {
      const { groupId } = event.params
      context.current.groups = context.current.groups.filter((id: string) => id !== groupId)
      if (context.current.activeGroup === groupId) {
        context.current.activeGroup = null
      }
      if (context.interactions.selectedGroupId === groupId) {
        context.interactions.selectedGroupId = null
      }
    }),

    setActiveGroup: assign(({ context, event }) => {
      context.current.activeGroup = event.params.groupId ?? null
    }),

    selectPanel: assign(({ context, event }) => {
      const { panelId } = event.params
      context.interactions.selectedPanelId = context.interactions.selectedPanelId === panelId ? null : panelId
    }),
    selectGroup: assign(({ context, event }) => {
      const { groupId } = event.params
      context.interactions.selectedGroupId = context.interactions.selectedGroupId === groupId ? null : groupId
    }),
    selectView: assign(({ context, event }) => {
      const { viewId } = event.params
      context.interactions.selectedViewId = context.interactions.selectedViewId === viewId ? null : viewId
    }),

    toggleSmartGuides: assign(({ context }) => {
      context.current.smartGuides = !context.current.smartGuides
    }),
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
      const profile = context.presets.dockviewProfiles.find((profile: any) => profile.id === event.params.profileId)
      const fallback = context.presets.dockviewProfiles.find((profile: any) => profile.id === "default")
      return {
        layout: {
          ...context.layout,
          selectedDockviewProfileId: profile?.id ?? null,
          data: profile?.data ?? fallback?.data,
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
        viewProfileId: viewProfile?.id ?? null,
        logLines: [],
        pending: [],

        panels: [],
        groups: [],

        activePanel: null,
        activeGroup: null,

        logColorIndex: 0,

        watermark: false,
        customGhost: false,
        dndCompass: false,
        smartGuides: true,
        showLogs: false,
        debug: false,
        overflow: {
          mode: "dropdown",
          mru: false,
          search: true,
        },
        panelCount: 0,
      },

      interactions: {
        selectedPanelId: null,
        selectedGroupId: null,
        selectedViewId: null,
      },
      view: {
        viewProfile,
      },
      theme: {
        desktopThemeRef: null,
        dockviewThemeRef: null,
      },
      registry: {
        dockviewProfiles: [],
        viewProfiles: [],
      },
      presets: {
        dockviewProfiles,
        viewProfiles,
        registry: [],
      },
      dockview: {
        settings: {
          tabMenuItems: [
            "separator",
            "close",
            "closeOthers",
            "closeAll",
            "closeLeft",
            "closeRight",
            "separator",
            "maximize",
            "separator",
          ],
          tabGroupMenuItems: ["rename", "colorPicker", "collapse", "close"],
        },
      },
      layout: {
        desktopDesignerOpen: false,
        selectedDockviewProfileId: null,
        data: null,
        themeRef: null,
      },
    }
  },
  states: {
    initiating: {
      entry: enqueueActions(({ enqueue }) => {
        enqueue("spawnThemes")
        enqueue("resolveInitialLayout")
        enqueue.raise({ type: "onCompleteInitiation" })
      }),
      on: {
        onCompleteInitiation: { target: "starting" },
      },
    },
    starting: {
      on: {
        onSelectDockviewProfile: { actions: "selectDockviewProfile" },
        onReady: {
          actions: ["setDockviewApi", "loadLayout"],
          target: "ready",
        },
      },
    },
    ready: {
      on: {
        onReady: {
          actions: ["setDockviewApi", "loadLayout"],
        },
        onDidAddPanel: {
          actions: enqueueActions(({ event, enqueue }) => {
            const { panelId } = event.params
            enqueue("incrementPanelCount")
            enqueue("addPanel")
            enqueue({ type: "addPendingLogLine", params: { id: panelId, message: "Panel Added" } })
            enqueue("flushPendingLogLines")
          }),
        },
        onDidActivePanelChange: {
          actions: enqueueActions(({ event, enqueue }) => {
            const panelId = event.params.panelId ?? null
            enqueue("setActivePanel")
            enqueue({
              type: "addPendingLogLine",
              params: { id: panelId ?? "none", message: "Panel Activated" },
            })
            enqueue("flushPendingLogLines")
          }),
        },
        onDidRemovePanel: {
          actions: enqueueActions(({ event, enqueue }) => {
            const { panelId } = event.params
            enqueue("removePanel")
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
            enqueue("addGroup")
            enqueue({ type: "addPendingLogLine", params: { id: groupId, message: "Group Added" } })
            enqueue("flushPendingLogLines")
          }),
        },
        onDidActiveGroupChange: {
          actions: enqueueActions(({ event, enqueue }) => {
            const groupId = event.params.groupId ?? null
            enqueue("setActiveGroup")
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
            enqueue("removeGroup")
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
        onResetTracking: {
          actions: "resetTracking",
        },

        onSelectPanel: {
          actions: "selectPanel",
        },
        onSelectGroup: {
          actions: "selectGroup",
        },
        onSelectView: {
          actions: "selectView",
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
          actions: ["toggleSmartGuides"],
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
          actions: ["selectDockviewProfile", "loadLayout"],
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

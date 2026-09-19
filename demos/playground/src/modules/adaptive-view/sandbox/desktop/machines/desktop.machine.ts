import { setup, assign, enqueueActions, sendTo } from "xstate"
import { themeMachine } from "./theme.machine"
import { localStoreMachine } from "./local-store.machine"
import { dockviewMachine } from "./dockview.machine"
import { eventsMachine } from "./events.machine"
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
    dockviewMachine,
    eventsMachine,
  },
  actions: {
    spawnDockview: assign(({ spawn }) => ({
      dockviewRef: spawn("dockviewMachine", { id: "dockview", systemId: "dockview" }),
    })),
    spawnEvents: assign(({ spawn }) => ({
      eventsRef: spawn("eventsMachine", { id: "events", systemId: "events" }),
    })),
    requestLayout: sendTo(
      ({ context }) => context.dockviewRef!,
      ({ context }) => ({
        type: "onLoadLayout",
        params: {
          data: context.layout.data,
          fallback: context.presets.dockviewProfiles.find((profile: any) => profile.id === "default")?.data,
        },
      }),
    ),
    requestLayoutSnapshot: sendTo(
      ({ context }) => context.dockviewRef!,
      ({ context }) => ({
        type: "onSerializeLayout",
        params: { id: context.layout.profile.id, title: context.layout.profile.title },
      }),
    ),
    acceptLoadedLayout: assign(({ context, event }) => {
      if (!event.params.usedFallback) return {}
      const profile = context.presets.dockviewProfiles.find((profile: any) => profile.id === "default")
      return {
        layout: { ...context.layout, profile, data: profile?.data, selectedDockviewProfileId: profile?.id ?? null },
      }
    }),
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
    saveLayout: assign(({ context, event }) => {
      const payload = event.params
      const store = context.store.localStoreRef
      store?.send({ type: "SET_ITEM", key: store.getSnapshot().context.settings.storeKey, value: payload })
      return { layout: { ...context.layout, profile: payload, data: payload.data } }
    }),
    addPendingLogLine: assign(({ context, event }: any) => {
      let id: string
      let message: string

      switch (event.type) {
        case "dockview.onDidAddPanel":
          id = event.params.panelId
          message = "Panel Added"
          break
        case "dockview.onDidRemovePanel":
          id = event.params.panelId
          message = "Panel Removed"
          break
        case "dockview.onDidActivePanelChange":
          id = event.params.panelId ?? "none"
          message = "Panel Activated"
          break
        case "dockview.onDidMovePanel":
          id = event.params.panelId
          message = "Panel Moved"
          break
        case "dockview.onDidAddGroup":
          id = event.params.groupId
          message = "Group Added"
          break
        case "dockview.onDidRemoveGroup":
          id = event.params.groupId
          message = "Group Removed"
          break
        case "dockview.onDidActiveGroupChange":
          id = event.params.groupId ?? "none"
          message = "Group Activated"
          break
        case "dockview.onDidMaximizedGroupChange":
          id = `${event.params.groupId} [${event.params.isMaximized}]`
          message = "Group Maximized Changed"
          break
        default:
          return {}
      }

      return {
        current: {
          ...context.current,
          pending: [{ text: `${message} ${id}`, timestamp: new Date() }, ...context.current.pending],
        },
      }
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
      dockviewRef: null as ActorRefFrom<typeof dockviewMachine> | null,
      eventsRef: null as ActorRefFrom<typeof eventsMachine> | null,
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
        showLogs: false,
        debug: false,
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
        enqueue("spawnEvents")
        enqueue("spawnLocalStore")
        enqueue("spawnThemes")
        enqueue("spawnDockview")
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
        "dockview.ready": { actions: "requestLayout" },
        "dockview.layout.loaded": {
          target: "ready",
          actions: ["acceptLoadedLayout", "persistLoadedProfile"],
        },
      },
    },
    ready: {
      on: {
        onSaveLayout: { actions: "requestLayoutSnapshot" },
        "dockview.layout.serialized": { actions: "saveLayout" },
        "dockview.ready": { target: "starting", actions: "requestLayout" },
        "dockview.layout.loaded": { actions: ["acceptLoadedLayout", "persistLoadedProfile"] },
        onClearLogLines: { actions: "clearLogLines" },
        onToggleWatermark: { actions: "toggleWatermark" },
        onToggleCustomGhost: { actions: "toggleCustomGhost" },
        onToggleShowLogs: { actions: "toggleShowLogs" },
        onToggleDebug: { actions: "toggleDebug" },
        onSelectDockviewProfile: { actions: ["selectDockviewProfile", "requestLayout", "persistLoadedProfile"] },
        onToggleDesktopDesigner: { actions: "toggleDesktopDesigner" },
        onCloseDesktopDesigner: { actions: "closeDesktopDesigner" },
      },
    },
  },
  on: {
    "dockview.onDidAddPanel": {
      actions: ["incrementPanelCount", "addPendingLogLine", "flushPendingLogLines"],
    },
    "dockview.onDidRemovePanel": {
      actions: ["addPendingLogLine", "flushPendingLogLines"],
    },
    "dockview.onDidActivePanelChange": {
      actions: ["addPendingLogLine", "flushPendingLogLines"],
    },
    "dockview.onDidMovePanel": {
      actions: ["addPendingLogLine", "flushPendingLogLines"],
    },
    "dockview.onDidAddGroup": {
      actions: ["addPendingLogLine", "flushPendingLogLines"],
    },
    "dockview.onDidRemoveGroup": {
      actions: ["addPendingLogLine", "flushPendingLogLines"],
    },
    "dockview.onDidActiveGroupChange": {
      actions: ["addPendingLogLine", "flushPendingLogLines"],
    },
    "dockview.onDidMaximizedGroupChange": {
      actions: ["addPendingLogLine", "flushPendingLogLines"],
    },
  },
})

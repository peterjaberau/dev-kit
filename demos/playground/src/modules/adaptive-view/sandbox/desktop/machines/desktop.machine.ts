import { setup, assign, enqueueActions, sendTo, fromCallback, spawnChild } from "xstate"
import { themeMachine } from "./theme.machine"
import { localStoreMachine } from "./local-store.machine"
import { dockviewMachine } from "./dockview.machine"
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
    observeDockviewChanges: fromCallback(
      ({
        input,
        sendBack,
      }: {
        input: ActorRefFrom<typeof dockviewMachine>
        sendBack: (event: any) => void
      }) => {
        const subscription = input.on("dockview.changed", ({ params }: any) => sendBack(params))
        // React child effects may queue onReady before the provider starts its
        // actors. Emissions are not replayed, so reconcile readiness after
        // subscribing to cover a Dockview actor that has already started.
        if (input.getSnapshot().matches("ready")) sendBack({ type: "onDockviewReady" })
        return () => subscription.unsubscribe()
      },
    ),
  },
  actions: {
    spawnDockview: assign(({ spawn }) => ({
      dockviewRef: spawn("dockviewMachine", { id: "dockview", systemId: "dockview" }),
    })),
    subscribeToDockview: spawnChild("observeDockviewChanges", {
      id: "dockview-changes",
      input: ({ context }) => context.dockviewRef!,
    }),
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
        enqueue("spawnLocalStore")
        enqueue("spawnThemes")
        enqueue("spawnDockview")
        enqueue("subscribeToDockview")
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
        onDockviewReady: { actions: "requestLayout" },
        onDockviewLayoutLoaded: { target: "ready", actions: ["acceptLoadedLayout", "persistLoadedProfile"] },
      },
    },
    ready: {
      on: {
        onSaveLayout: { actions: "requestLayoutSnapshot" },
        onDockviewLayoutSerialized: { actions: "saveLayout" },
        onDockviewReady: { target: "starting", actions: "requestLayout" },
        onDockviewLayoutLoaded: { actions: ["acceptLoadedLayout", "persistLoadedProfile"] },
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
    onDockviewActivity: {
      actions: enqueueActions(({ event, enqueue }) => {
        if (event.params.panelAdded) enqueue("incrementPanelCount")
        enqueue({ type: "addPendingLogLine", params: event.params })
        enqueue("flushPendingLogLines")
      }),
    },
  },
})

"use client"

import { assign, enqueueActions, setup } from "xstate"
import { createActorContext } from "@xstate/react"
import type { ReactNode } from "react"
import type {
  ViewController,
  ViewDirection,
  ViewTabBehaviorUpdate,
  ViewLayoutState,
  ViewLayoutTree,
  ViewSize,
  ViewLayoutBehavior,
} from "#view/core"
import {
  viewReducer,
  viewCreateInitialState,
  viewAllPanelOrderFromState,
  viewPanelBehaviorFromState,
  type ViewReducerAction,
} from "#view/core/internal"
import { viewCreateLayoutSnapshot } from "#view/core/state/snapshot"
import { makeLifecycleEvents } from "#view/react/lifecycle"
import { initialConfig, PG_PRESETS, PG_THEMES } from "./playground-data"
import { predefinedLayouts, predefinedThemes, predefinedViewProps, defaultVariables } from "./store"

const STORAGE_KEY = "dock-view-playground-layout"

type InspectorEvent =
  | {
      type:
        | "inspector.selectPanel"
        | "inspector.selectTab"
        | "inspector.theme"
        | "inspector.preset"
        | "inspector.moveTab"
      id: string
    }
  | { type: "inspector.global" | "inspector.patchPanel"; patch: Record<string, boolean | number | null> }
  | { type: "inspector.tabBehavior"; patch: ViewTabBehaviorUpdate }
  | { type: "inspector.splitPanel"; direction: ViewDirection }
  | { type: "inspector.renameTab"; title: string }
  | { type: "inspector.exportResult"; error?: string }
  | {
      type:
        | "inspector.mount"
        | "inspector.clearEvents"
        | "inspector.addTab"
        | "inspector.removePanel"
        | "inspector.reset"
        | "inspector.save"
        | "inspector.restore"
        | "inspector.export"
        | "inspector.maximizePanel"
        | "inspector.floatPanel"
        | "inspector.popoutPanel"
        | "inspector.focusPanel"
        | "inspector.floatTab"
        | "inspector.popoutTab"
        | "inspector.removeTab"
    }

type PlaygroundEvent =
  | InspectorEvent
  | { type: "view.action"; action: ViewReducerAction }
  | { type: "onSetController"; controllerRef: ViewController | null }
  | { type: "onNewTab"; panelId: string }
  | { type: "operation.failed"; error: string }

type PlaygroundInput = { config?: Partial<typeof initialConfig>; datasets?: { themes?: typeof PG_THEMES } }
type InspectorPanelEntry = ViewLayoutBehavior & {
  id: string
  container: "tiled" | "edge" | "floating"
  kindLabel: string
  minSize?: ViewSize
  maxSize?: ViewSize
  fullScreen: boolean
  poppedOut: boolean
  tabs: { id: string; title: string; kind?: string; closable: boolean; draggable: boolean }[]
}
type InspectorState = {
  panels: InspectorPanelEntry[]
  selectedPanelId: string | null
  selectedTabId: string | null
  presetId: string
  hasSaved: boolean
  copied: boolean
  error: string | null
  events: { id: number; type: string; detail: string; timestamp: string }[]
  eventId: number
}
type PlaygroundState = {
  datasets: { themes: typeof PG_THEMES; presets: typeof PG_PRESETS }
  config: typeof initialConfig
  refs: { controllerRef: ViewController | null }
  runtime: { theme: any; variables: { id: number; seq: number } }
  layout: ViewLayoutState
  inspector: InspectorState
}

export const playgroundMachine = setup({
  types: {} as { context: PlaygroundState; events: PlaygroundEvent; input: PlaygroundInput },
  actions: {
    setController: assign(({ event }) =>
      event.type === "onSetController" ? { refs: { controllerRef: event.controllerRef } } : {},
    ),
    applyLayoutAction: assign(({ context, event }) => {
      if (event.type !== "view.action") return {}
      const layout = viewReducer(context.layout, event.action)
      const changes = makeLifecycleEvents(context.layout, layout, event.action)
      const active = changes.activeTabChange?.changes.find((change) => change.tabId)
      let eventId = context.inspector.eventId
      const timestamp = new Date().toISOString().slice(0, 19).replace("T", " ")
      const entries = Object.entries(changes)
        .filter(([, value]) => value)
        .map(([type, value]) => ({
          id: ++eventId,
          type,
          detail: JSON.stringify(value),
          timestamp,
        }))
      return {
        layout,
        inspector: {
          ...context.inspector,
          ...(active ? { selectedPanelId: active.panelId, selectedTabId: active.tabId } : {}),
          events: [...entries.reverse(), ...context.inspector.events].slice(0, 30),
          eventId,
          copied: false,
          error: null,
        },
      }
    }),
    // Flatten the normalized machine layout only after layout mutations.
    collectPanels: assign(({ context }) => ({
      inspector: {
        ...context.inspector,
        panels: viewAllPanelOrderFromState(context.layout).map((id) => {
          const panel = context.layout.panels[id]!
          return {
            id,
            container: panel.kind,
            kindLabel:
              panel.kind === "edge" ? `Edge · ${panel.edge.side}` : panel.kind === "floating" ? "Floating" : "Tiled",
            ...viewPanelBehaviorFromState(context.layout, id),
            minSize: panel.minSize,
            maxSize: panel.maxSize,
            fullScreen: panel.fullScreen ?? false,
            poppedOut: panel.kind === "floating" && !!panel.floating.popout,
            tabs: panel.tabs.map((tabId) => {
              const tab = context.layout.tabs[tabId]!
              const data = tab.data as { title?: string; kind?: string }
              return {
                id: tabId,
                title: data?.title ?? tabId,
                kind: data?.kind,
                closable: tab.closable,
                draggable: tab.draggable,
              }
            }),
          }
        }),
      },
    })),
    reconcileSelection: assign(({ context }) => {
      const { inspector, layout } = context
      // Follow a selected tab when it moves; fall back when its tab/panel disappears.
      const selectedTab = inspector.selectedTabId ? layout.tabs[inspector.selectedTabId] : undefined
      const panel =
        inspector.panels.find((p) => p.id === (selectedTab?.panelId ?? inspector.selectedPanelId)) ??
        inspector.panels[0]
      const tab = panel?.tabs.find((t) => t.id === inspector.selectedTabId) ?? panel?.tabs[0]
      return { inspector: { ...inspector, selectedPanelId: panel?.id ?? null, selectedTabId: tab?.id ?? null } }
    }),
    selectPanel: assign(({ context, event }) =>
      event.type === "inspector.selectPanel"
        ? {
            inspector: { ...context.inspector, selectedPanelId: event.id, selectedTabId: null },
          }
        : {},
    ),
    selectTab: assign(({ context, event }) =>
      event.type === "inspector.selectTab"
        ? {
            inspector: { ...context.inspector, selectedTabId: event.id },
          }
        : {},
    ),
    updateGlobal: assign(({ context, event }) =>
      event.type === "inspector.global"
        ? {
            config: { ...context.config, global: { ...context.config.global, ...event.patch } },
          }
        : {},
    ),
    updateTheme: assign(({ context, event }) => {
      if (event.type !== "inspector.theme") return {}
      const theme = context.datasets.themes.find((t) => t.id === event.id)
      return theme
        ? {
            config: { ...context.config, options: { ...context.config.options, themeId: theme.id } },
            runtime: { ...context.runtime, theme: theme.style },
          }
        : {}
    }),
    patchPanel: assign(({ context, event }) => {
      if (event.type !== "inspector.patchPanel") return {}
      const id = context.inspector.selectedPanelId
      const panel = id ? context.layout.panels[id] : undefined
      if (!panel || !id) return {}
      const { patch } = event
      const behavior = Object.fromEntries(
        ["resizable", "draggable", "droppable"]
          .filter((key) => typeof patch[key] === "boolean")
          .map((key) => [key, patch[key]]),
      )
      const updateTree = (node: ViewLayoutTree): ViewLayoutTree =>
        node.kind === "split"
          ? { ...node, children: node.children.map(updateTree) }
          : node.panelId === id
            ? { ...node, ...behavior }
            : node
      const updated = {
        ...panel,
        ...(panel.kind !== "tiled" ? { behavior: { ...panel.behavior, ...behavior } } : {}),
        ...("minSize" in patch ? { minSize: typeof patch.minSize === "number" ? patch.minSize : undefined } : {}),
        ...("maxSize" in patch ? { maxSize: typeof patch.maxSize === "number" ? patch.maxSize : undefined } : {}),
      } as typeof panel
      return {
        layout: {
          ...context.layout,
          panels: { ...context.layout.panels, [id]: updated },
          layout: context.layout.layout ? updateTree(context.layout.layout) : null,
        },
      }
    }),
    createTab: enqueueActions(({ context, event, enqueue }) => {
      const panelId = event.type === "onNewTab" ? event.panelId : context.inspector.selectedPanelId
      if (!panelId || !context.layout.panels[panelId]) return
      let id = context.runtime.variables.id
      const seq = context.runtime.variables.seq + 1
      const prefix = context.config.options.makeTabPrefix
      let tabId: string
      do {
        tabId = `${prefix.id}-${++id}`
      } while (context.layout.tabs[tabId] || context.layout.panels[tabId])
      const tab = { id: tabId, data: { title: `${prefix.title} ${seq}` } }
      enqueue.assign({ runtime: { ...context.runtime, variables: { id, seq } } })
      if (event.type === "inspector.splitPanel") {
        let newPanelId: string
        do {
          newPanelId = `panel-${++id}`
        } while (context.layout.panels[newPanelId])
        enqueue.assign({ runtime: { ...context.runtime, variables: { id, seq } } })
        enqueue.raise({
          type: "view.action",
          action: {
            type: "PANEL_SPLIT",
            panelId,
            direction: event.direction,
            newPanelId,
            sizePercent: 50,
            tabs: [tab],
            activate: true,
          },
        })
      } else enqueue.raise({ type: "view.action", action: { type: "TAB_APPEND", panelId, tab, activate: true } })
    }),
    removePanel: enqueueActions(({ context, enqueue }) => {
      const panelId = context.inspector.selectedPanelId
      if (panelId) enqueue.raise({ type: "view.action", action: { type: "PANEL_REMOVE", panelId } })
    }),
    maximizePanel: enqueueActions(({ context, enqueue }) => {
      const panelId = context.inspector.selectedPanelId
      if (panelId)
        enqueue.raise({
          type: "view.action",
          action: { type: "PANEL_FULLSCREEN_SET", panelId, fullScreen: !context.layout.panels[panelId]?.fullScreen },
        })
    }),
    floatPanel: enqueueActions(({ context, enqueue }) => {
      const panelId = context.inspector.selectedPanelId
      if (!panelId) return
      enqueue.raise({
        type: "view.action",
        action:
          context.layout.panels[panelId]?.kind === "floating"
            ? { type: "PANEL_DOCK", panelId }
            : { type: "PANEL_FLOAT", panelId, bounds: { x: 18, y: 18, width: 44, height: 50 } },
      })
    }),
    focusPanel: enqueueActions(({ context, enqueue }) => {
      const panelId = context.inspector.selectedPanelId
      if (panelId) enqueue.raise({ type: "view.action", action: { type: "PANEL_FOCUS", panelId } })
    }),
    renameTab: enqueueActions(({ context, event, enqueue }) => {
      const tabId = context.inspector.selectedTabId
      if (event.type === "inspector.renameTab" && tabId)
        enqueue.raise({
          type: "view.action",
          action: {
            type: "TAB_DATA_SET",
            tabId,
            data: { ...(context.layout.tabs[tabId]?.data as object), title: event.title },
          },
        })
    }),
    setTabBehavior: enqueueActions(({ context, event, enqueue }) => {
      const tabId = context.inspector.selectedTabId
      if (event.type === "inspector.tabBehavior" && tabId)
        enqueue.raise({ type: "view.action", action: { type: "TAB_BEHAVIOR_SET", tabId, behavior: event.patch } })
    }),
    moveTab: enqueueActions(({ context, event, enqueue }) => {
      const tabId = context.inspector.selectedTabId
      if (event.type !== "inspector.moveTab" || !tabId) return
      const target = context.layout.panels[event.id]
      if (target)
        enqueue.raise({
          type: "view.action",
          action: { type: "TAB_MOVE", tabId, to: { panelId: target.id, index: target.tabs.length } },
        })
    }),
    removeTab: enqueueActions(({ context, enqueue }) => {
      const tabId = context.inspector.selectedTabId
      if (tabId) enqueue.raise({ type: "view.action", action: { type: "TAB_REMOVE", tabId } })
    }),
    floatTab: enqueueActions(({ context, enqueue }) => {
      const tabId = context.inspector.selectedTabId
      if (!tabId) return
      let id = context.runtime.variables.id
      let newPanelId: string
      do {
        newPanelId = `float-${++id}`
      } while (context.layout.panels[newPanelId])
      enqueue.assign({ runtime: { ...context.runtime, variables: { ...context.runtime.variables, id } } })
      enqueue.raise({
        type: "view.action",
        action: { type: "TAB_FLOAT", tabId, newPanelId, bounds: { x: 20, y: 18, width: 38, height: 46 } },
      })
    }),
    // Native windows are a renderer side effect. Its controller dispatches the
    // resulting layout action back to this machine through stateControl.onAction.
    popoutPanel: ({ context, self }) => {
      const id = context.inspector.selectedPanelId
      if (!id) return
      try {
        const panel = context.layout.panels[id]
        if (panel?.kind === "floating" && panel.floating.popout) context.refs.controllerRef?.returnPanelToFloating(id)
        else
          context.refs.controllerRef?.popoutPanel(id, {
            floatingBounds: { x: 16, y: 16, width: 46, height: 54 },
            windowBounds: { left: 120, top: 90, width: 760, height: 540 },
          })
      } catch (error) {
        self.send({ type: "operation.failed", error: String(error) })
      }
    },
    popoutTab: ({ context, self }) => {
      const id = context.inspector.selectedTabId
      if (!id) return
      try {
        context.refs.controllerRef?.getTab(id)?.popout({
          floatingBounds: { x: 20, y: 18, width: 38, height: 46 },
          windowBounds: { left: 140, top: 100, width: 680, height: 460 },
        })
      } catch (error) {
        self.send({ type: "operation.failed", error: String(error) })
      }
    },
    resetLayout: enqueueActions(({ context, enqueue }) => {
      enqueue.assign({ inspector: { ...context.inspector, presetId: "" } })
      enqueue.raise({
        type: "view.action",
        action: { type: "STATE_REPLACE", state: viewCreateInitialState(context.config.layout) },
      })
    }),
    loadPreset: enqueueActions(({ context, event, enqueue }) => {
      if (event.type !== "inspector.preset") return
      const preset = context.datasets.presets.find((p) => p.id === event.id)
      if (!preset) return
      enqueue.assign({ inspector: { ...context.inspector, presetId: preset.id } })
      enqueue.raise({
        type: "view.action",
        action: { type: "STATE_REPLACE", state: viewCreateInitialState(preset.layout) },
      })
    }),
    checkSavedLayout: enqueueActions(({ context, enqueue }) => {
      try {
        enqueue.assign({ inspector: { ...context.inspector, hasSaved: !!localStorage.getItem(STORAGE_KEY) } })
      } catch (error) {
        enqueue.raise({ type: "operation.failed", error: String(error) })
      }
    }),
    saveLayout: enqueueActions(({ context, enqueue }) => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(viewCreateLayoutSnapshot(context.layout)))
        enqueue.assign({ inspector: { ...context.inspector, hasSaved: true, error: null } })
      } catch (error) {
        enqueue.raise({ type: "operation.failed", error: String(error) })
      }
    }),
    restoreLayout: enqueueActions(({ context, enqueue }) => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (!raw) return
        const state = viewCreateInitialState(JSON.parse(raw))
        enqueue.assign({ inspector: { ...context.inspector, presetId: "" } })
        enqueue.raise({ type: "view.action", action: { type: "STATE_REPLACE", state } })
      } catch (error) {
        enqueue.raise({ type: "operation.failed", error: String(error) })
      }
    }),
    exportLayout: ({ context, self }) => {
      try {
        if (!navigator.clipboard) throw new Error("Clipboard is unavailable in this browser.")
        void navigator.clipboard.writeText(JSON.stringify(viewCreateLayoutSnapshot(context.layout), null, 2)).then(
          () => self.send({ type: "inspector.exportResult" }),
          () => self.send({ type: "inspector.exportResult", error: "Could not copy the layout to the clipboard." }),
        )
      } catch (error) {
        self.send({ type: "operation.failed", error: String(error) })
      }
    },
    clearCopied: assign(({ context }) => ({ inspector: { ...context.inspector, copied: false } })),
    exportResult: assign(({ context, event }) =>
      event.type === "inspector.exportResult"
        ? { inspector: { ...context.inspector, copied: !event.error, error: event.error ?? null } }
        : {},
    ),
    reportError: assign(({ context, event }) =>
      event.type === "operation.failed" ? { inspector: { ...context.inspector, error: event.error } } : {},
    ),
    clearEvents: assign(({ context }) => ({ inspector: { ...context.inspector, events: [] } })),
  },
}).createMachine({
  id: "playground",
  initial: "ready",
  context: ({ input }) => {
    const variables = {
      layoutId: defaultVariables?.layoutId,
      themeId: defaultVariables?.themeId,
      viewPropsId: defaultVariables?.viewPropsId,
      makeTabPrefix: defaultVariables?.makeTabPrefix,
    }

    const defaultLayout = predefinedLayouts.find((l) => l.id === variables.layoutId)?.data?.layout ?? {}
    const defaultViewProps = predefinedViewProps.find((v) => v.id === variables.viewPropsId)?.data?.props ?? {}
    const defaultTheme = predefinedThemes.find((t) => t.id === variables.themeId)?.data?.style ?? {}

    const store = {
      resources: [],
      predefined: {
        layouts: predefinedLayouts,
        themes: predefinedThemes,
        viewProps: predefinedViewProps,
      },
      system: {},
      currentApp: {
        components: {
          view: {
            ...defaultViewProps,
            initialLayout: defaultLayout,
          },
        },
        script: {
          variables: {
            ...variables,
          },
          data: {},
          queries: {},
          transformers: {},
          workflows: {},
        },
        settings: {
          general: {},
          customCss: {},
          preloadedScripts: {},
          libraries: {},
          page: {
            urlParameters: {},
          },
          appTheme: {
            color: {},
            typography: {},
            metrics: {},
            shadows: {},
          },
          notifications: {},
        },
        state: {
          queries: {},
          transformers: {},
          variables: {
            ...variables,
          },
          components: {
            view: {
              ...defaultViewProps,
              layout: defaultLayout,
            },
          },
          globals: {
            currentUser: null,
            localStorage: {},
            systemContext: {},
            theme: defaultTheme,
          },
        },
      },
    }

    const config = {
      store,
      ...initialConfig,
      ...input?.config,
      global: { ...initialConfig.global, ...input?.config?.global },
      options: { ...initialConfig.options, ...input?.config?.options },
    }
    const themes = input?.datasets?.themes ?? PG_THEMES
    return {
      datasets: { themes, presets: PG_PRESETS },
      config,
      refs: { controllerRef: null },
      layout: viewCreateInitialState(config.layout),
      runtime: {
        theme: themes.find((t) => t.id === config.options.themeId)?.style ?? {},
        variables: { id: 0, seq: 0 },
      },
      inspector: {
        panels: [],
        selectedPanelId: null,
        selectedTabId: null,
        presetId: "",
        hasSaved: false,
        copied: false,
        error: null,
        events: [],
        eventId: 0,
      },
    }
  },
  entry: ["collectPanels", "reconcileSelection"],
  states: { ready: {} },
  on: {
    "view.action": { actions: ["applyLayoutAction", "collectPanels", "reconcileSelection"] },
    onSetController: { actions: "setController" },
    onNewTab: { actions: "createTab" },
    "inspector.selectPanel": { actions: ["selectPanel", "reconcileSelection"] },
    "inspector.selectTab": { actions: ["selectTab", "reconcileSelection"] },
    "inspector.global": { actions: "updateGlobal" },
    "inspector.theme": { actions: "updateTheme" },
    "inspector.patchPanel": { actions: ["patchPanel", "collectPanels", "reconcileSelection"] },
    "inspector.addTab": { actions: "createTab" },
    "inspector.splitPanel": { actions: "createTab" },
    "inspector.removePanel": { actions: "removePanel" },
    "inspector.maximizePanel": { actions: "maximizePanel" },
    "inspector.floatPanel": { actions: "floatPanel" },
    "inspector.focusPanel": { actions: "focusPanel" },
    "inspector.popoutPanel": { actions: "popoutPanel" },
    "inspector.renameTab": { actions: "renameTab" },
    "inspector.tabBehavior": { actions: "setTabBehavior" },
    "inspector.moveTab": { actions: "moveTab" },
    "inspector.removeTab": { actions: "removeTab" },
    "inspector.floatTab": { actions: "floatTab" },
    "inspector.popoutTab": { actions: "popoutTab" },
    "inspector.reset": { actions: "resetLayout" },
    "inspector.preset": { actions: "loadPreset" },
    "inspector.mount": { actions: "checkSavedLayout" },
    "inspector.save": { actions: "saveLayout" },
    "inspector.restore": { actions: "restoreLayout" },
    "inspector.export": { actions: ["clearCopied", "exportLayout"] },
    "inspector.exportResult": { actions: "exportResult" },
    "inspector.clearEvents": { actions: "clearEvents" },
    "operation.failed": { actions: "reportError" },
  },
})

export const PlaygroundContext = createActorContext(playgroundMachine, {
  inspect: (event: any) => {
    console.log(event)

  }
})

export function PlaygroundProvider({ children, ...input }: PlaygroundInput & { children: ReactNode }) {
  return <PlaygroundContext.Provider options={{ input }}>{children}</PlaygroundContext.Provider>
}
export function usePlayground() {
  const playgroundRef = PlaygroundContext.useActorRef()
  const config = PlaygroundContext.useSelector((state) => state.context.config)
  const theme = PlaygroundContext.useSelector((state) => state.context.runtime.theme)
  const layout = PlaygroundContext.useSelector((state) => state.context.layout)
  return { playgroundRef, sendToPlayground: playgroundRef.send, config, layout, runtime: { theme } }
}

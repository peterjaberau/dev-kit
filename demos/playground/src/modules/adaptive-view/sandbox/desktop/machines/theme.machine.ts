import { assign, enqueueActions, setup } from "xstate"
import { desktopThemeMeta, desktopThemes, dockviewThemeMeta, dockviewThemes } from "../presets"

export type ThemeMachineType = "desktop" | "dockview"

export interface DockviewThemeCssOverrides {
  [property: `--dv-${string}`]: string | undefined
}

const normalizeDockviewTheme = (theme: any) => ({
  ...theme,
  gap: theme.gap ?? 0,
  dndOverlayMounting: theme.dndOverlayMounting ?? "relative",
  dndPanelOverlay: theme.dndPanelOverlay ?? "content",
  dndTabIndicator: theme.dndTabIndicator ?? "fill",
  dndOverlayBorder: theme.dndOverlayBorder ?? "",
  tabGroupIndicator: theme.tabGroupIndicator ?? "wrap",
  tabAnimation: theme.tabAnimation ?? "default",
  cssOverrides: { ...theme.cssOverrides },
})

export const themeMachine = setup({
  actions: {
    setDesktopTheme: assign(({ context, event }, params: any) => {
      const desktopTheme = (params || event.params)?.desktopTheme ?? context.settings.desktopDefaultTheme
      const desktopThemeProfile =
        context.presets.desktopThemes.find(({ name }: any) => name === desktopTheme) ?? context.presets.desktopThemes[0]

      context.current = { ...context.current, desktopTheme: desktopThemeProfile.name, desktopThemeProfile }
    }),
    setDockviewTheme: assign(({ context, event }, params: any) => {
      const requestedTheme = (params || event.params)?.dockviewTheme ?? context.settings.dockviewDefaultTheme
      const requestedName = typeof requestedTheme === "string" ? requestedTheme : requestedTheme?.name
      const dockviewThemeProfile =
        context.presets.dockviewThemes.find(({ name }: any) => name === requestedName) ??
        (typeof requestedTheme === "object" ? requestedTheme : context.presets.dockviewThemes[0])

      context.current = {
        ...context.current,
        dockviewTheme: dockviewThemeProfile.name,
        dockviewThemeProfile: normalizeDockviewTheme(dockviewThemeProfile),
      }
    }),
    updateDockviewTheme: assign(({ context, event }, params: any) => {
      const { patch } = params || event.params
      context.current.dockviewThemeProfile = { ...context.current.dockviewThemeProfile, ...patch }
    }),
    updateDockviewThemeCss: assign(({ context, event }, params: any) => {
      const { patch } = params || event.params
      const cssOverrides = { ...context.current.dockviewThemeProfile.cssOverrides }

      for (const [key, value] of Object.entries(patch)) {
        if (value === undefined || value === "") {
          delete cssOverrides[key]
        } else {
          cssOverrides[key] = value
        }
      }

      context.current.dockviewThemeProfile = { ...context.current.dockviewThemeProfile, cssOverrides }
    }),
    resetDockviewTheme: assign(({ context }) => {
      const preset =
        context.presets.dockviewThemes.find(({ name }: any) => name === context.current.dockviewTheme) ??
        context.presets.dockviewThemes[0]
      context.current.dockviewThemeProfile = normalizeDockviewTheme(preset)
    }),
  },
}).createMachine({
  id: "theme",
  initial: "initiating",
  context: ({ input }: any) => ({
    type: input.type as ThemeMachineType,
    metadata: { dockviewThemeMeta, desktopThemeMeta },
    presets: { dockviewThemes, desktopThemes },
    current: {
      desktopTheme: null,
      desktopThemeProfile: null,
      dockviewTheme: null,
      dockviewThemeProfile: null,
    },
    settings: {
      dockviewDefaultTheme: input.initialTheme?.name ?? "githubLight",
      desktopDefaultTheme: input.initialDesktopTheme ?? "desktop-default",
    },
    initialTheme: input.initialTheme,
  }),
  states: {
    initiating: {
      entry: enqueueActions(({ context, enqueue }) => {
        if (context.type === "desktop") {
          enqueue("setDesktopTheme")
        } else {
          enqueue({
            type: "setDockviewTheme",
            params: { dockviewTheme: context.initialTheme ?? context.settings.dockviewDefaultTheme },
          })
        }
      }),
      always: "ready",
    },
    ready: {
      on: {
        onSelectDesktopTheme: { actions: "setDesktopTheme" },
        onSelectDockviewTheme: { actions: "setDockviewTheme" },
        onUpdateDockviewTheme: { actions: "updateDockviewTheme" },
        onUpdateDockviewThemeCss: { actions: "updateDockviewThemeCss" },
        onResetDockviewTheme: { actions: "resetDockviewTheme" },
      },
    },
  },
})

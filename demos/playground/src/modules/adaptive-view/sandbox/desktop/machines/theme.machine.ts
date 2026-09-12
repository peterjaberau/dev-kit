import { setup, assign, enqueueActions } from "xstate"
import { themePresets, themeMetadata } from "../presets/theme.presets"


export const themeMachine = setup({
  actions: {
    setDesktopTheme: assign(({ context, event }, params) => {
      const { desktopTheme = context.settings.desktopDefaultTheme } = event.params || params
      const desktopThemeProfile = context.presets.themes.find(({ theme }: any) => theme.name === desktopTheme)
      context.current = {
        ...context.current,
        desktopTheme,
        desktopThemeProfile,
      }
    }),
    setDockviewTheme: assign(({ context, event }, params) => {
      const { dockviewTheme = context.settings.dockviewDefaultTheme } = event.params || params
      const dockviewThemeProfile = context.presets.themes.find(({ theme }: any) => theme.name === dockviewTheme)
      context.current = {
        ...context.current,
        dockviewTheme,
        dockviewThemeProfile: {
          gap: dockviewTheme.gap ?? 0,
          dndOverlayMounting: dockviewTheme.dndOverlayMounting ?? "relative",
          dndPanelOverlay: dockviewTheme.dndPanelOverlay ?? "content",
          dndTabIndicator: dockviewTheme.dndTabIndicator ?? "fill",
          dndOverlayBorder: dockviewTheme.dndOverlayBorder ?? "",
          tabGroupIndicator: dockviewTheme.tabGroupIndicator ?? "wrap",
          tabAnimation: dockviewTheme.tabAnimation ?? "default",
          cssOverrides: {},
        },
      }
    }),
    updateDockviewTheme: assign(({ context, event }, params) => {
      const { patch } = event.params || params
      context.current = {
        ...context.current.dockviewThemeProfile,
        ...patch,
      }
    }),
    updateDockviewThemeCss: assign(({ context, event }, params) => {}),
    resetDockviewTheme: assign(({ context, event }, params) => {}),
  },
  actors: {},
}).createMachine({
  id: "theme",
  initial: "initiating",
  context: ({ input }: any) => ({
    metadata: {
      theme: themeMetadata,
    },
    presets: {
      themes: themePresets,
    },
    current: {
      desktopTheme: null,
      desktopThemeProfile: {},

      dockviewTheme: null,
      dockviewThemeProfile: {
        gap: 0,
        dndOverlayMounting: "relative",
        dndPanelOverlay: "content",
        dndTabIndicator: "fill",
        dndOverlayBorder: "",
        tabGroupIndicator: "wrap",
        tabAnimation: "default",
        cssOverrides: {},
      },
    },
    settings: {
      desktopDefaultTheme: "githubLight",
      dockviewDefaultTheme: "githubLight",
    },
  }),
  states: {
    initiating: {
      entry: enqueueActions(({ context, enqueue }) => {
        enqueue("setDesktopTheme")
        enqueue("setDockviewTheme")
      }),
      always: "ready",
    },
    ready: {
      on: {
        onSelectDesktopTheme: {
          actions: ["setDesktopTheme"],
        },
        onSelectDockviewTheme: {
          actions: ["setDockviewTheme"],
        },
        onUpdateDockviewTheme: {
          actions: ["updateDockviewTheme"],
        },
        onUpdateDockviewThemeCss: {
          actions: ["updateDockviewThemeCss"],
        },
        onResetDockviewTheme: {
          actions: ["resetDockviewTheme"],
        },
      },
    },
  },
})


/*
sandboxThemes ---> themeMachine context.layout.presets (LAYOUT_MANAGER_BUILTIN_THEMES)


 */
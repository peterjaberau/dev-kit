import { DESKTOP_DARK_COLORS, DESKTOP_LIGHT_COLORS } from "./desktop.colors"

export const dockviewThemeMeta: any[] = [
  {
    name: "dark",
    label: "Dark",
  },
  {
    name: "light",
    label: "Light",
  },
  {
    name: "visualStudio",
    label: "Visual Studio",
  },
  {
    name: "abyss",
    label: "Abyss",
  },
  {
    name: "dracula",
    label: "Dracula",
  },
  {
    name: "lightSpaced",
    label: "Light Spaced",
  },
  {
    name: "abyssSpaced",
    label: "Abyss Spaced",
  },
  {
    name: "nord",
    label: "Nord",
  },
  {
    name: "nordSpaced",
    label: "Nord Spaced",
  },
  {
    name: "catppuccinMocha",
    label: "Catppuccin Mocha",
  },
  {
    name: "catppuccinMochaSpaced",
    label: "Catppuccin Mocha Spaced",
  },
  {
    name: "monokai",
    label: "Monokai",
  },
  {
    name: "solarizedLight",
    label: "Solarized Light",
  },
  {
    name: "solarizedLightSpaced",
    label: "Solarized Light Spaced",
  },
  {
    name: "githubDark",
    label: "GitHub Dark",
  },
  {
    name: "githubDarkSpaced",
    label: "GitHub Dark Spaced",
  },
  {
    name: "githubLight",
    label: "GitHub Light",
  },
  {
    name: "githubLightSpaced",
    label: "GitHub Light Spaced",
  },
]
export const dockviewThemes: any[] = [
  {
    name: "dark",
    className: "dockview-theme-dark",
    colorScheme: "dark",
  },
  {
    name: "light",
    className: "dockview-theme-light",
    colorScheme: "light",
  },
  {
    name: "visualStudio",
    className: "dockview-theme-vs",
    colorScheme: "dark",
    // --dv-tabs-and-actions-container-height is 20px, but the VS theme applies
    // box-sizing: content-box + border-bottom: 2px, so the rendered strip is 22px.
    edgeGroupCollapsedSize: 22,
  },
  {
    name: "abyss",
    className: "dockview-theme-abyss",
    colorScheme: "dark",
    tabGroupIndicator: "none",
  },
  {
    name: "dracula",
    className: "dockview-theme-dracula",
    colorScheme: "dark",
  },
  {
    name: "lightSpaced",
    className: "dockview-theme-light-spaced",
    colorScheme: "light",
    gap: 10,
    edgeGroupCollapsedSize: 44,
    dndOverlayMounting: "absolute",
    dndPanelOverlay: "group",
    dndTabIndicator: "line",
    dndOverlayBorder: "2px solid var(--dv-active-sash-color)",
  },
  {
    name: "abyssSpaced",
    className: "dockview-theme-abyss-spaced",
    colorScheme: "dark",
    gap: 10,
    edgeGroupCollapsedSize: 44,
    dndOverlayMounting: "absolute",
    dndPanelOverlay: "group",
    dndTabIndicator: "line",
    dndOverlayBorder: "2px solid var(--dv-active-sash-color)",
  },
  {
    name: "nord",
    className: "dockview-theme-nord",
    colorScheme: "dark",
  },
  {
    name: "nordSpaced",
    className: "dockview-theme-nord-spaced",
    colorScheme: "dark",
    gap: 10,
    edgeGroupCollapsedSize: 44,
    dndOverlayMounting: "absolute",
    dndPanelOverlay: "group",
    dndTabIndicator: "line",
    dndOverlayBorder: "2px solid var(--dv-active-sash-color)",
  },
  {
    name: "catppuccinMocha",
    className: "dockview-theme-catppuccin-mocha",
    colorScheme: "dark",
  },
  {
    name: "catppuccinMochaSpaced",
    className: "dockview-theme-catppuccin-mocha-spaced",
    colorScheme: "dark",
    gap: 10,
    edgeGroupCollapsedSize: 44,
    dndOverlayMounting: "absolute",
    dndPanelOverlay: "group",
    dndTabIndicator: "line",
    dndOverlayBorder: "2px solid var(--dv-active-sash-color)",
  },
  {
    name: "monokai",
    className: "dockview-theme-monokai",
    colorScheme: "dark",
  },
  {
    name: "solarizedLight",
    className: "dockview-theme-solarized-light",
    colorScheme: "light",
  },
  {
    name: "solarizedLightSpaced",
    className: "dockview-theme-solarized-light-spaced",
    colorScheme: "light",
    gap: 10,
    edgeGroupCollapsedSize: 44,
    dndOverlayMounting: "absolute",
    dndPanelOverlay: "group",
    dndTabIndicator: "line",
    dndOverlayBorder: "2px solid var(--dv-active-sash-color)",
  },
  {
    name: "githubDark",
    className: "dockview-theme-github-dark",
    colorScheme: "dark",
  },
  {
    name: "githubDarkSpaced",
    className: "dockview-theme-github-dark-spaced",
    colorScheme: "dark",
    gap: 10,
    edgeGroupCollapsedSize: 44,
    dndOverlayMounting: "absolute",
    dndPanelOverlay: "group",
    dndTabIndicator: "line",
    dndOverlayBorder: "2px solid var(--dv-active-sash-color)",
  },
  {
    name: "githubLight",
    className: "dockview-theme-github-light",
    colorScheme: "light",
  },
  {
    name: "githubLightSpaced",
    className: "dockview-theme-github-light-spaced",
    colorScheme: "light",
    gap: 10,
    edgeGroupCollapsedSize: 44,
    dndOverlayMounting: "absolute",
    dndPanelOverlay: "group",
    dndTabIndicator: "line",
    dndOverlayBorder: "2px solid var(--dv-active-sash-color)",
  },
]

export const desktopThemeMeta: any[] = [
  {
    name: "desktop-default",
    label: "Desktop Default",
  },
]

export const desktopThemes: any = [
  {
    name: "desktop-default",
    colors: {
      dark: DESKTOP_DARK_COLORS,
      light: DESKTOP_LIGHT_COLORS,
    },
    theme: {
      bg: "var(--ifm-background-surface-color, #14141d)", // panel body
      card: "var(--ifm-background-color, #0d0d15)", // nested section cards
      surface: "var(--ifm-hover-overlay, rgba(255,255,255,0.05))",
      surfaceHover: "var(--dv-accent-soft, var(--ifm-hover-overlay, rgba(255,255,255,0.08)))",
      inputBg: "var(--ifm-background-color, rgba(255,255,255,0.04))",

      // Borders
      border: "var(--dv-border, var(--ifm-toc-border-color, rgba(255,255,255,0.12)))",
      borderStrong: "var(--dv-border-strong, var(--ifm-color-emphasis-300, rgba(255,255,255,0.2)))",

      // Text
      heading: "var(--ifm-heading-color, #f4f4f8)",
      text: "var(--ifm-font-color-base, #c7c9d6)",
      muted: "var(--ifm-color-content-secondary, rgba(255,255,255,0.6))",
      faint: "var(--ifm-color-emphasis-500, rgba(255,255,255,0.42))",

      // Accent
      accent: "var(--ifm-color-primary, #5d94f4)",
      accentContrast: "var(--dv-accent-contrast, #ffffff)",
      accentSoft: "var(--dv-accent-soft, rgba(93,148,244,0.16))",
      accentSoftHover: "var(--dv-accent-soft-hover, rgba(93,148,244,0.28))",

      // Elevation
      shadowSm: "var(--dv-shadow-sm, 0 1px 2px rgba(0,0,0,0.4))",
      shadowMd: "var(--dv-shadow-md, 0 4px 14px rgba(0,0,0,0.4))",
      shadowLg: "var(--dv-shadow-lg, 0 20px 44px -14px rgba(0,0,0,0.7))",
      glow: "0 2px 10px color-mix(in srgb, var(--ifm-color-primary, #5d94f4) 40%, transparent)",

      // Shape
      radius: 12,
      radiusSm: 8,
      radiusChip: 6,

      // Type
      ui: 'var(--ifm-font-family-base, "Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif)',
      mono: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
    },
  },
]

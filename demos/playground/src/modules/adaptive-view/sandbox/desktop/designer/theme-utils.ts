import type { CSSProperties } from "react"
import { TabAnimation, DockviewTheme } from "#adaptive-view/react"
import { desktopThemes } from "../presets"

export interface DockviewThemeCssOverrides {
  "--dv-group-view-background-color"?: string
  "--dv-tabs-and-actions-container-background-color"?: string
  "--dv-tabs-and-actions-container-height"?: string
  "--dv-tabs-and-actions-container-font-size"?: string
  "--dv-border-radius"?: string
  "--dv-spacing-padding"?: string
  "--dv-tab-border-radius"?: string
  "--dv-sash-border-radius"?: string
  "--dv-floating-group-border"?: string
  "--dv-activegroup-visiblepanel-tab-background-color"?: string
  "--dv-activegroup-hiddenpanel-tab-background-color"?: string
  "--dv-inactivegroup-visiblepanel-tab-background-color"?: string
  "--dv-inactivegroup-hiddenpanel-tab-background-color"?: string
  "--dv-activegroup-visiblepanel-tab-color"?: string
  "--dv-activegroup-hiddenpanel-tab-color"?: string
  "--dv-inactivegroup-visiblepanel-tab-color"?: string
  "--dv-inactivegroup-hiddenpanel-tab-color"?: string
  "--dv-tab-divider-color"?: string
  "--dv-separator-border"?: string
  "--dv-paneview-header-border-color"?: string
  "--dv-icon-hover-background-color"?: string
  "--dv-drag-over-background-color"?: string
  "--dv-drag-over-border"?: string
  "--dv-active-sash-color"?: string
  "--dv-sash-color"?: string
  "--dv-scrollbar-background-color"?: string
  "--dv-floating-box-shadow"?: string
  "--dv-floating-border"?: string
  "--dv-floating-group-dragging-opacity"?: string
}

export interface DockviewThemeState {
  gap: number
  dndOverlayMounting: "absolute" | "relative"
  dndPanelOverlay: "content" | "group"
  dndTabIndicator: "line" | "fill"
  dndOverlayBorder: string
  tabGroupIndicator: "wrap" | "none"
  tabAnimation: TabAnimation
  cssOverrides: DockviewThemeCssOverrides
}

export function generateDockviewThemeCodeSnippet(baseTheme: DockviewTheme, state: DockviewThemeState): string {
  const name = baseTheme.name
  const importName = `theme${name.charAt(0).toUpperCase()}${name.slice(1)}`

  const overrideEntries = Object.entries(state.cssOverrides).filter(
    ([, value]) => value !== undefined && value !== "",
  ) as [string, string][]

  const themeFields: string[] = []
  if (state.gap !== (baseTheme.gap ?? 0)) {
    themeFields.push(`  gap: ${state.gap},`)
  }
  if (state.dndOverlayMounting !== (baseTheme.dndOverlayMounting ?? "relative")) {
    themeFields.push(`  dndOverlayMounting: '${state.dndOverlayMounting}',`)
  }
  if (state.dndPanelOverlay !== (baseTheme.dndPanelOverlay ?? "content")) {
    themeFields.push(`  dndPanelOverlay: '${state.dndPanelOverlay}',`)
  }
  if (state.dndTabIndicator !== (baseTheme.dndTabIndicator ?? "fill")) {
    themeFields.push(`  dndTabIndicator: '${state.dndTabIndicator}',`)
  }
  if (state.dndOverlayBorder !== (baseTheme.dndOverlayBorder ?? "")) {
    themeFields.push(`  dndOverlayBorder: '${state.dndOverlayBorder}',`)
  }
  if (state.tabGroupIndicator !== (baseTheme.tabGroupIndicator ?? "wrap")) {
    themeFields.push(`  tabGroupIndicator: '${state.tabGroupIndicator}',`)
  }
  if (state.tabAnimation !== (baseTheme.tabAnimation ?? "default")) {
    themeFields.push(`  tabAnimation: '${state.tabAnimation}',`)
  }

  let output = `import { ${importName} } from '#adaptive-view/react';\n\n`

  if (themeFields.length > 0) {
    output += `const myTheme = {\n  ...${importName},\n${themeFields.join("\n")}\n};\n`
  } else {
    output += `const myTheme = ${importName};\n`
  }

  if (overrideEntries.length > 0) {
    output += `\n// Apply to the div wrapping <DockviewReact>:\nconst cssOverrides: React.CSSProperties = {\n`
    for (const [key, value] of overrideEntries) {
      output += `  '${key}': '${value}',\n`
    }
    output += `};\n`
  }

  return output
}

// Tokens for the desktop designer. These map to the docs'
// own `--dv-*` design tokens (and `--ifm-*`) so the panel matches the rest of
// the site and flips with its light/dark mode. Double fallbacks (--dv-* →
// --ifm-* → hard hex) keep it looking right in standalone previews.
// build where the docs variables don't exist.
export const LM: any = Object.fromEntries(
  Object.entries(desktopThemes[0].theme).map(([key, fallback]) => [key, `var(--desktop-theme-${key}, ${fallback})`]),
)

// Shared button styles (grid/panel/group action rows): the site's secondary /
// primary button recipe, so every button reads clearly in light and dark.
export const designerButton: CSSProperties = {
  padding: "5px 11px",
  fontSize: 12,
  fontWeight: 600,
  fontFamily: LM.ui,
  border: `1px solid ${LM.border}`,
  borderRadius: LM.radiusSm,
  background: LM.surface,
  color: LM.text,
  cursor: "pointer",
  transition: "background 0.15s, border-color 0.15s, color 0.15s",
}

export const designerButtonActive: CSSProperties = {
  ...designerButton,
  background: "var(--ifm-color-primary, #5d94f4)",
  borderColor: LM.accent,
  color: LM.accentContrast,
  boxShadow: LM.glow,
}

export const designerIconButton: CSSProperties = {
  ...designerButton,
  padding: "4px 7px",
  color: LM.muted,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
}

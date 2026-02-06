import type { BaseSchema } from "./base"

export interface ColorPalette {
  primary?: string
  secondary?: string
  accent?: string
  background?: string
  foreground?: string
  muted?: string
  mutedForeground?: string
  border?: string
  input?: string
  ring?: string
  success?: string
  warning?: string
  destructive?: string
  info?: string
  card?: string
  cardForeground?: string
  popover?: string
  popoverForeground?: string
}

export interface Typography {
  fontSans?: string[]
  fontSerif?: string[]
  fontMono?: string[]
  fontSize?: number
  lineHeight?: number
  headingWeight?: number
  bodyWeight?: number
}

export interface SpacingScale {
  base?: number
  scale?: Record<string, string>
}

export interface BorderRadius {
  sm?: string
  default?: string
  md?: string
  lg?: string
  xl?: string
}

export type ThemeMode = "light" | "dark" | "system"

export interface ThemeDefinition {
  name: string
  label?: string
  light?: ColorPalette
  dark?: ColorPalette
  typography?: Typography
  spacing?: SpacingScale
  radius?: BorderRadius
  cssVariables?: Record<string, string>
  tailwind?: Record<string, any>
}

export interface ThemeSchema extends BaseSchema {
  type: "theme"
  mode?: ThemeMode
  themes?: ThemeDefinition[]
  activeTheme?: string
  allowSwitching?: boolean
  persistPreference?: boolean
  storageKey?: string
}

export interface ThemeSwitcherSchema extends BaseSchema {
  type: "theme-switcher"
  variant?: "dropdown" | "toggle" | "buttons"
  showMode?: boolean
  showThemes?: boolean
  lightIcon?: string
  darkIcon?: string
}

export interface ThemePreviewSchema extends BaseSchema {
  type: "theme-preview"
  theme?: ThemeDefinition
  mode?: ThemeMode
  showColors?: boolean
  showTypography?: boolean
  showComponents?: boolean
}

import { ReactNode, RefObject } from "react"
export interface Props {
  [key: string]: any
}
export type ModValue = boolean | string | number | undefined | null
export type Mods<T extends Record<string, ModValue> = {}> = T & {
  [key: string]: ModValue
}

export type ItemMods = Mods<{
  "has-icon"?: boolean
  "has-start-content"?: boolean
  "has-end-content"?: boolean
  "has-right-icon"?: boolean
  "has-label"?: boolean
  "has-prefix"?: boolean
  "has-suffix"?: boolean
  "has-description"?: boolean
  "has-actions"?: boolean
  "has-actions-content"?: boolean
  "show-actions-on-hover"?: boolean
  "preserve-actions-space"?: boolean
  checkbox?: boolean
  disabled?: boolean
  selected?: boolean
  loading?: boolean
  size?: string
  description?: string
  type?: string
  theme?: string
  shape?: string
}>

export type ItemVariant =
  | "default.primary"
  | "default.secondary"
  | "default.outline"
  | "default.neutral"
  | "default.clear"
  | "default.link"
  | "default.item"
  | "default.card"
  | "danger.primary"
  | "danger.secondary"
  | "danger.outline"
  | "danger.neutral"
  | "danger.clear"
  | "danger.link"
  | "danger.item"
  | "danger.card"
  | "success.primary"
  | "success.secondary"
  | "success.outline"
  | "success.neutral"
  | "success.clear"
  | "success.link"
  | "success.item"
  | "success.card"
  | "special.primary"
  | "special.secondary"
  | "special.outline"
  | "special.neutral"
  | "special.clear"
  | "special.link"
  | "special.item"
  | "note.card"

export interface ItemProps {
  icon?: ReactNode
  rightIcon?: ReactNode
  prefix?: ReactNode
  suffix?: ReactNode
  description?: ReactNode
  descriptionPlacement?: "inline" | "block"
  isSelected?: boolean
  actions?: ReactNode | true
  showActionsOnHover?: boolean
  preserveActionsSpace?: boolean
  disableActionsFocus?: boolean
  size?: "xsmall" | "small" | "medium" | "large" | "xlarge" | "inline" | number | (string & {})
  type?: "item" | "header" | "primary" | "secondary" | "outline" | "neutral" | "clear" | "link" | "card" | (string & {})
  theme?: "default" | "danger" | "success" | "special" | "note" | (string & {})
  hotkeys?: string
  htmlType?: "button" | "submit" | "reset"
  labelProps?: Props
  descriptionProps?: Props
  keyboardShortcutProps?: Props
  loadingSlot?: "auto" | "icon" | "rightIcon" | "prefix" | "suffix"
  isLoading?: boolean
  shape?: "card" | "button" | "sharp" | "pill"
  labelRef?: RefObject<HTMLElement>
  level?: 1 | 2 | 3 | 4 | 5 | 6
  highlight?: string
  highlightCaseSensitive?: boolean
  variant?: ItemVariant
}
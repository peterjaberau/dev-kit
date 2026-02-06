import type { BaseSchema } from "./base"

export interface AppSchema extends BaseSchema {
  type: "app"
  name?: string
  title?: string
  description?: string
  logo?: string
  favicon?: string
  layout?: "sidebar" | "header" | "empty"
  menu?: MenuItem[]
  actions?: AppAction[]
  homePageId?: string
  requiredPermissions?: string[]
}

export interface MenuItem {
  type?: "item" | "group" | "separator"
  label?: string
  icon?: string
  path?: string
  href?: string
  children?: MenuItem[]
  badge?: string | number
  hidden?: boolean | string
}

export interface AppAction {
  type: "button" | "dropdown" | "user"
  label?: string
  icon?: string
  onClick?: string
  avatar?: string
  description?: string
  items?: MenuItem[]
  shortcut?: string
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
}

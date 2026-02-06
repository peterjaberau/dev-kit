import type { BaseSchema, SchemaNode } from "./base"

export interface NavLink {
  label: string
  href: string
  icon?: string
  active?: boolean
  disabled?: boolean
  children?: NavLink[]
  badge?: string | number
}

export interface HeaderBarSchema extends BaseSchema {
  type: "header-bar"
  title?: string
  logo?: string
  nav?: NavLink[]
  left?: SchemaNode | SchemaNode[]
  center?: SchemaNode | SchemaNode[]
  right?: SchemaNode | SchemaNode[]
  sticky?: boolean
  height?: string | number
  variant?: "default" | "bordered" | "floating"
}

export interface SidebarSchema extends BaseSchema {
  type: "sidebar"
  title?: string
  nav?: NavLink[]
  content?: SchemaNode | SchemaNode[]
  footer?: SchemaNode | SchemaNode[]
  position?: "left" | "right"
  collapsible?: boolean
  defaultCollapsed?: boolean
  collapsed?: boolean
  width?: string | number
  collapsedWidth?: string | number
  onCollapsedChange?: (collapsed: boolean) => void
  variant?: "default" | "bordered" | "floating"
}

export interface BreadcrumbItem {
  label: string
  href?: string
  icon?: string
  onClick?: () => void
}

export interface BreadcrumbSchema extends BaseSchema {
  type: "breadcrumb"
  items: BreadcrumbItem[]
  separator?: string
  maxItems?: number
}

export interface PaginationSchema extends BaseSchema {
  type: "pagination"
  currentPage?: number
  page?: number
  totalPages: number
  siblings?: number
  showFirstLast?: boolean
  showPrevNext?: boolean
  onPageChange?: (page: number) => void
}

export interface NavigationMenuItem {
  label: string
  href?: string
  description?: string
  icon?: string
  children?: NavigationMenuItem[]
}

export interface NavigationMenuSchema extends BaseSchema {
  type: "navigation-menu"
  items?: NavigationMenuItem[]
  orientation?: "horizontal" | "vertical"
}

export interface ButtonGroupButton {
  label: string
  variant?: "default" | "secondary" | "destructive" | "outline" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  disabled?: boolean
  onClick?: () => void
  className?: string
}

export interface ButtonGroupSchema extends BaseSchema {
  type: "button-group"
  buttons?: ButtonGroupButton[]
  variant?: "default" | "secondary" | "destructive" | "outline" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
}

export type NavigationSchema =
  | HeaderBarSchema
  | SidebarSchema
  | BreadcrumbSchema
  | PaginationSchema
  | NavigationMenuSchema
  | ButtonGroupSchema

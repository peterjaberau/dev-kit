import type { BaseSchema, SchemaNode } from "./base"
import type { ActionSchema } from "./crud"
import type { TableColumn } from "./data-display"
import type { FormField } from "./form"

export type ViewType = "list" | "detail" | "grid" | "kanban" | "calendar" | "timeline" | "map"

export interface DetailViewField {
  name: string
  label?: string
  type?: "text" | "image" | "link" | "badge" | "date" | "datetime" | "json" | "html" | "markdown" | "custom"
  format?: string
  render?: SchemaNode
  value?: any
  readonly?: boolean
  visible?: boolean | string
  span?: number
}

export interface DetailViewSection {
  title?: string
  description?: string
  icon?: string
  fields: DetailViewField[]
  collapsible?: boolean
  defaultCollapsed?: boolean
  columns?: number
  visible?: boolean | string
}

export interface DetailViewTab {
  key: string
  label: string
  icon?: string
  content: SchemaNode | SchemaNode[]
  visible?: boolean | string
  badge?: string | number
}

export interface DetailViewSchema extends BaseSchema {
  type: "detail-view"
  title?: string
  api?: string
  resourceId?: string | number
  objectName?: string
  data?: any
  layout?: "vertical" | "horizontal" | "grid"
  columns?: number
  sections?: DetailViewSection[]
  fields?: DetailViewField[]
  actions?: ActionSchema[]
  tabs?: DetailViewTab[]
  showBack?: boolean
  backUrl?: string
  onBack?: string
  showEdit?: boolean
  editUrl?: string
  showDelete?: boolean
  deleteConfirmation?: string
  loading?: boolean
  header?: SchemaNode
  footer?: SchemaNode
  related?: Array<{
    title: string
    type: "list" | "grid" | "table"
    api?: string
    data?: any[]
    columns?: TableColumn[]
    fields?: string[]
  }>
}

export interface ViewSwitcherSchema extends BaseSchema {
  type: "view-switcher"
  views: Array<{
    type: ViewType
    label?: string
    icon?: string
    schema?: SchemaNode
  }>
  defaultView?: ViewType
  activeView?: ViewType
  variant?: "tabs" | "buttons" | "dropdown"
  position?: "top" | "bottom" | "left" | "right"
  onViewChange?: string
  persistPreference?: boolean
  storageKey?: string
}

export interface FilterUISchema extends BaseSchema {
  type: "filter-ui"
  filters: Array<{
    field: string
    label?: string
    type: "text" | "number" | "select" | "date" | "date-range" | "boolean"
    operator?: "equals" | "contains" | "startsWith" | "gt" | "lt" | "between" | "in"
    options?: Array<{ label: string; value: any }>
    placeholder?: string
  }>
  values?: Record<string, any>
  onChange?: string
  showClear?: boolean
  showApply?: boolean
  layout?: "inline" | "popover" | "drawer"
}

export interface SortUISchema extends BaseSchema {
  type: "sort-ui"
  fields: Array<{
    field: string
    label?: string
  }>
  sort?: Array<{
    field: string
    direction: "asc" | "desc"
  }>
  onChange?: string
  multiple?: boolean
  variant?: "dropdown" | "buttons"
}

export type ViewComponentSchema = DetailViewSchema | ViewSwitcherSchema | FilterUISchema | SortUISchema

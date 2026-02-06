export type ActionParamFieldType =
  | "text"
  | "textarea"
  | "number"
  | "boolean"
  | "date"
  | "datetime"
  | "time"
  | "select"
  | "email"
  | "phone"
  | "url"
  | "password"
  | "file"
  | "color"
  | "slider"
  | "rating"

export type ActionLocation =
  | "list_toolbar"
  | "list_item"
  | "record_header"
  | "record_more"
  | "record_related"
  | "global_nav"

export type ActionComponent = "action:button" | "action:icon" | "action:menu" | "action:group"

export type ActionType = "script" | "url" | "modal" | "flow" | "api"

export interface ActionParam {
  name: string
  label: string
  type: ActionParamFieldType
  required?: boolean
  options?: Array<{ label: string; value: string }>
  defaultValue?: unknown
  helpText?: string
  placeholder?: string
  validation?: string
}

export interface ActionSchema {
  name: string
  label: string
  icon?: string
  locations?: ActionLocation[]
  component?: ActionComponent
  type: ActionType
  target?: string
  execute?: string
  endpoint?: string
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
  params?: ActionParam[]
  confirmText?: string
  successMessage?: string
  errorMessage?: string
  refreshAfter?: boolean
  toast?: {
    showOnSuccess?: boolean
    showOnError?: boolean
    duration?: number
  }
  visible?: string
  enabled?: string
  variant?: "default" | "primary" | "secondary" | "destructive" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
  className?: string
  description?: string
  permission?: string
  tags?: string[]
}

export interface ActionGroup {
  name: string
  label: string
  icon?: string
  actions: ActionSchema[]
  visible?: string
  display?: "dropdown" | "inline"
}

export interface ActionContext {
  record?: Record<string, any>
  selectedRecords?: Record<string, any>[]
  user?: Record<string, any>
  [key: string]: any
}

export interface ActionResult {
  success: boolean
  data?: any
  error?: string
  refresh?: boolean
  close?: boolean
}

export type ActionExecutor = (
  action: ActionSchema,
  context: ActionContext,
  params?: Record<string, any>,
) => Promise<ActionResult>

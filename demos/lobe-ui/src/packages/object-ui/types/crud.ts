import type { BaseSchema, SchemaNode } from "./base"
// import type { FormField } from "./form"
// import type { TableColumn } from "./data-display"

export type ActionExecutionMode = "sequential" | "parallel"

export interface ActionCallback {
  type: "toast" | "message" | "redirect" | "reload" | "custom" | "ajax" | "dialog"
  message?: string
  url?: string
  api?: string
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"
  dialog?: SchemaNode
  handler?: string
}

export interface ActionCondition {
  expression: string
  then?: ActionSchema | ActionSchema[]
  else?: ActionSchema | ActionSchema[]
}

export interface ActionSchema extends BaseSchema {
  type: "action"
  label: string
  level?: "primary" | "secondary" | "success" | "warning" | "danger" | "info" | "default"
  icon?: string
  variant?: "default" | "outline" | "ghost" | "link"
  disabled?: boolean
  actionType?: "button" | "link" | "dropdown" | "ajax" | "confirm" | "dialog"
  api?: string
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"
  data?: any
  headers?: Record<string, string>
  confirm?: {
    title?: string
    message?: string
    confirmText?: string
    cancelText?: string
    confirmVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost"
  }
  confirmText?: string
  dialog?: {
    title?: string
    content?: SchemaNode | SchemaNode[]
    size?: "sm" | "default" | "lg" | "xl" | "full"
    actions?: ActionSchema[]
  }
  successMessage?: string
  errorMessage?: string
  onSuccess?: ActionCallback
  onFailure?: ActionCallback
  chain?: ActionSchema[]
  chainMode?: ActionExecutionMode
  condition?: ActionCondition
  reload?: boolean
  close?: boolean
  onClick?: () => void | Promise<void>
  redirect?: string
  tracking?: {
    enabled?: boolean
    event?: string
    metadata?: Record<string, any>
  }
  timeout?: number
  retry?: {
    maxAttempts?: number
    delay?: number
  }
}

export interface CRUDOperation {
  type: "create" | "read" | "update" | "delete" | "export" | "import" | "custom"
  label?: string
  icon?: string
  enabled?: boolean
  api?: string
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"
  confirmText?: string
  successMessage?: string
  visibleOn?: string
  disabledOn?: string
}

export interface CRUDFilter {
  name: string
  label?: string
  type?: "input" | "select" | "date-picker" | "date-range" | "number-range"
  operator?: "equals" | "contains" | "startsWith" | "endsWith" | "gt" | "gte" | "lt" | "lte" | "between" | "in"
  options?: Array<{ label: string; value: string | number }>
  placeholder?: string
  defaultValue?: any
}

export interface CRUDToolbar {
  showCreate?: boolean
  showRefresh?: boolean
  showExport?: boolean
  showImport?: boolean
  showFilter?: boolean
  showSearch?: boolean
  actions?: ActionSchema[]
}

export interface CRUDPagination {
  enabled?: boolean
  pageSize?: number
  pageSizeOptions?: number[]
  showTotal?: boolean
  showSizeChanger?: boolean
}

export interface CRUDSchema extends BaseSchema {
  type: "crud"
  title?: string
  resource?: string
  api?: string
  // columns: TableColumn[]
  // fields?: FormField[]
  columns: any[]
  fields?: any[]
  operations?: {
    create?: boolean | CRUDOperation
    read?: boolean | CRUDOperation
    update?: boolean | CRUDOperation
    delete?: boolean | CRUDOperation
    export?: boolean | CRUDOperation
    import?: boolean | CRUDOperation
    [key: string]: boolean | CRUDOperation | undefined
  }
  toolbar?: CRUDToolbar
  filters?: CRUDFilter[]
  pagination?: CRUDPagination
  defaultSort?: string
  defaultSortOrder?: "asc" | "desc"
  selectable?: boolean | "single" | "multiple"
  batchActions?: ActionSchema[]
  rowActions?: ActionSchema[]
  emptyState?: SchemaNode
  loading?: boolean
  loadingComponent?: SchemaNode
  mode?: "table" | "grid" | "list" | "kanban"
  gridColumns?: number
  cardTemplate?: SchemaNode
  kanbanColumns?: Array<{
    id: string
    title: string
    color?: string
  }>
  kanbanGroupField?: string
}

export interface DetailSchema extends BaseSchema {
  type: "detail"
  title?: string
  api?: string
  resourceId?: string | number
  groups?: Array<{
    title?: string
    description?: string
    fields: Array<{
      name: string
      label?: string
      type?: "text" | "image" | "link" | "badge" | "date" | "datetime" | "json" | "html" | "custom"
      format?: string
      render?: SchemaNode
    }>
  }>
  actions?: ActionSchema[]
  tabs?: Array<{
    key: string
    label: string
    content: SchemaNode | SchemaNode[]
  }>
  showBack?: boolean
  onBack?: () => void
  loading?: boolean
}

export interface CRUDDialogSchema extends BaseSchema {
  type: "crud-dialog"
  title?: string
  description?: string
  content?: SchemaNode | SchemaNode[]
  size?: "sm" | "default" | "lg" | "xl" | "full"
  actions?: ActionSchema[]
  open?: boolean
  onClose?: () => void
  closeOnOutsideClick?: boolean
  closeOnEscape?: boolean
  showClose?: boolean
}

export type CRUDComponentSchema = ActionSchema | CRUDSchema | DetailSchema | CRUDDialogSchema

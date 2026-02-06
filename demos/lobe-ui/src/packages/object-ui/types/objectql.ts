import type { BaseSchema } from "./base"
import type { TableColumn } from "./data-display"
import type { FormField } from "./form"

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE"

export interface HttpRequest {
  url: string
  method?: HttpMethod
  headers?: Record<string, string>
  params?: Record<string, unknown>
  body?: Record<string, unknown> | string | FormData | Blob
}

export type ViewData =
  | {
      provider: "object"
      object: string
    }
  | {
      provider: "api"
      read?: HttpRequest
      write?: HttpRequest
    }
  | {
      provider: "value"
      items: unknown[]
    }

export interface ListColumn {
  field: string
  label?: string
  width?: number
  align?: "left" | "center" | "right"
  hidden?: boolean
  sortable?: boolean
  resizable?: boolean
  wrap?: boolean
  type?: string
}

export interface SelectionConfig {
  type?: "none" | "single" | "multiple"
}

export interface PaginationConfig {
  pageSize?: number
  pageSizeOptions?: number[]
}

export interface KanbanConfig {
  groupByField: string
  summarizeField?: string
  columns: string[]
}

export interface CalendarConfig {
  startDateField: string
  endDateField?: string
  titleField: string
  colorField?: string
}

export interface GanttConfig {
  startDateField: string
  endDateField: string
  titleField: string
  progressField?: string
  dependenciesField?: string
  colorField?: string
}

export interface SortConfig {
  field: string
  order: "asc" | "desc"
}

export interface ObjectGridSchema extends BaseSchema {
  type: "object-grid"
  name?: string
  label?: string
  objectName: string
  data?: ViewData
  columns?: string[] | ListColumn[]
  filter?: any[]
  sort?: string | SortConfig[]
  searchableFields?: string[]
  resizable?: boolean
  reorderableColumns?: boolean
  striped?: boolean
  bordered?: boolean
  selection?: SelectionConfig
  pagination?: PaginationConfig
  className?: string
  fields?: string[]
  staticData?: any[]
  selectable?: boolean | "single" | "multiple"
  pageSize?: number
  showSearch?: boolean
  showFilters?: boolean
  showPagination?: boolean
  defaultSort?: {
    field: string
    order: "asc" | "desc"
  }
  defaultFilters?: Record<string, any>
  resizableColumns?: boolean
  title?: string
  description?: string
  operations?: {
    create?: boolean
    read?: boolean
    update?: boolean
    delete?: boolean
    export?: boolean
    import?: boolean
  }
  rowActions?: string[]
  batchActions?: string[]
  editable?: boolean
  keyboardNavigation?: boolean
  frozenColumns?: number
}

export interface ObjectFormSchema extends BaseSchema {
  type: "object-form"
  objectName: string
  mode: "create" | "edit" | "view"
  recordId?: string | number
  title?: string
  description?: string
  fields?: string[]
  customFields?: FormField[]
  initialData?: Record<string, any>
  groups?: Array<{
    title?: string
    description?: string
    fields: string[]
    collapsible?: boolean
    defaultCollapsed?: boolean
  }>
  layout?: "vertical" | "horizontal" | "inline" | "grid"
  columns?: number
  showSubmit?: boolean
  submitText?: string
  showCancel?: boolean
  cancelText?: string
  showReset?: boolean
  initialValues?: Record<string, any>
  onSuccess?: (data: any) => void | Promise<void>
  onError?: (error: Error) => void
  onCancel?: () => void
  readOnly?: boolean
  className?: string
}

export interface ObjectViewSchema extends BaseSchema {
  type: "object-view"
  objectName: string
  title?: string
  description?: string
  layout?: "drawer" | "modal" | "page"
  table?: Partial<Omit<ObjectGridSchema, "type" | "objectName">>
  form?: Partial<Omit<ObjectFormSchema, "type" | "objectName" | "mode">>
  showSearch?: boolean
  showFilters?: boolean
  showCreate?: boolean
  showRefresh?: boolean
  operations?: {
    create?: boolean
    read?: boolean
    update?: boolean
    delete?: boolean
  }
  onNavigate?: (recordId: string | number, mode: "view" | "edit") => void
  className?: string
}

export interface ListViewSchema extends BaseSchema {
  type: "list-view"
  objectName: string
  viewType?: "grid" | "kanban" | "gallery" | "calendar" | "timeline" | "gantt" | "map"
  fields?: string[]
  filters?: Array<any[] | string>
  sort?: Array<{ field: string; order: "asc" | "desc" }>
  options?: Record<string, any>
}

export interface ObjectMapSchema extends BaseSchema {
  type: "object-map"
  objectName: string
  locationField?: string
  titleField?: string
}

export interface ObjectGanttSchema extends BaseSchema {
  type: "object-gantt"
  objectName: string
  startDateField?: string
  endDateField?: string
  titleField?: string
  dependencyField?: string
  progressField?: string
}

export interface ObjectCalendarSchema extends BaseSchema {
  type: "object-calendar"
  objectName: string
  startDateField?: string
  endDateField?: string
  titleField?: string
  defaultView?: "month" | "week" | "day" | "agenda"
}

export interface ObjectKanbanSchema extends BaseSchema {
  type: "object-kanban"
  objectName: string
  groupField: string
  titleField?: string
  cardFields?: string[]
}

export interface ObjectChartSchema extends BaseSchema {
  type: "object-chart"
  objectName: string
  chartType: "bar" | "line" | "pie" | "area" | "scatter"
  xAxisField: string
  yAxisFields?: string[]
  aggregation?: "cardinality" | "sum" | "avg" | "min" | "max"
}

export type ObjectQLComponentSchema =
  | ObjectGridSchema
  | ObjectFormSchema
  | ObjectViewSchema
  | ObjectMapSchema
  | ObjectGanttSchema
  | ObjectCalendarSchema
  | ObjectKanbanSchema
  | ObjectChartSchema
  | ListViewSchema

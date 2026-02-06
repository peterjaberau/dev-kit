import type { BaseSchema, SchemaNode } from "./base"
import type { ChartSchema } from "./data-display"
import type { DataSource } from "./data"

export type ReportExportFormat = "pdf" | "excel" | "csv" | "json" | "html"

export type ReportScheduleFrequency = "once" | "daily" | "weekly" | "monthly" | "quarterly" | "yearly"

export type ReportAggregationType = "sum" | "avg" | "min" | "max" | "count" | "distinct"

export interface ReportField {
  name: string
  label?: string
  type?: "string" | "number" | "date" | "boolean"
  aggregation?: ReportAggregationType
  format?: string
  showInSummary?: boolean
  sortOrder?: number
}

export interface ReportFilter {
  field: string
  operator: "equals" | "not_equals" | "contains" | "greater_than" | "less_than" | "between" | "in" | "not_in"
  value?: any
  values?: any[]
}

export interface ReportGroupBy {
  field: string
  label?: string
  sort?: "asc" | "desc"
}

export interface ReportSection {
  type: "header" | "summary" | "chart" | "table" | "text" | "page-break"
  title?: string
  content?: SchemaNode | SchemaNode[]
  chart?: ChartSchema
  columns?: ReportField[]
  text?: string
  visible?: boolean | string
}

export interface ReportSchedule {
  enabled?: boolean
  frequency?: ReportScheduleFrequency
  dayOfWeek?: number
  dayOfMonth?: number
  time?: string
  timezone?: string
  recipients?: string[]
  subject?: string
  body?: string
  formats?: ReportExportFormat[]
}

export interface ReportExportConfig {
  format: ReportExportFormat
  filename?: string
  includeHeaders?: boolean
  orientation?: "portrait" | "landscape"
  pageSize?: "A4" | "A3" | "Letter" | "Legal"
  options?: Record<string, any>
}

export interface ReportSchema extends BaseSchema {
  type: "report"
  title?: string
  description?: string
  dataSource?: DataSource
  fields?: ReportField[]
  filters?: ReportFilter[]
  groupBy?: ReportGroupBy[]
  sections?: ReportSection[]
  schedule?: ReportSchedule
  defaultExportFormat?: ReportExportFormat
  exportConfigs?: Record<ReportExportFormat, ReportExportConfig>
  showExportButtons?: boolean
  showPrintButton?: boolean
  showScheduleButton?: boolean
  refreshInterval?: number
  loading?: boolean
  data?: any[]
}

export interface ReportBuilderSchema extends BaseSchema {
  type: "report-builder"
  report?: ReportSchema
  dataSources?: DataSource[]
  availableFields?: ReportField[]
  showPreview?: boolean
  onSave?: string
  onCancel?: string
}

export interface ReportViewerSchema extends BaseSchema {
  type: "report-viewer"
  report?: ReportSchema
  data?: any[]
  showToolbar?: boolean
  allowExport?: boolean
  allowPrint?: boolean
  loading?: boolean
}

import type { BaseSchema, SchemaNode } from "./base"

export interface AlertSchema extends BaseSchema {
  type: "alert"
  title?: string
  description?: string
  variant?: "default" | "destructive"
  icon?: string
  dismissible?: boolean
  onDismiss?: () => void
  children?: SchemaNode | SchemaNode[]
}

export interface StatisticSchema extends BaseSchema {
  type: "statistic"
  label?: string
  value: string | number
  trend?: "up" | "down" | "neutral"
  description?: string
  icon?: string
}

export interface BadgeSchema extends BaseSchema {
  type: "badge"
  label?: string
  variant?: "default" | "secondary" | "destructive" | "outline"
  icon?: string
  children?: SchemaNode | SchemaNode[]
}

export interface AvatarSchema extends BaseSchema {
  type: "avatar"
  src?: string
  alt?: string
  fallback?: string
  size?: "sm" | "default" | "lg" | "xl"
  shape?: "circle" | "square"
}

export interface ListSchema extends BaseSchema {
  type: "list"
  items: ListItem[]
  ordered?: boolean
  dividers?: boolean
  dense?: boolean
}

export interface ListItem {
  id?: string
  label?: string
  description?: string
  icon?: string
  avatar?: string
  disabled?: boolean
  onClick?: () => void
  content?: SchemaNode | SchemaNode[]
}

export interface TableColumn {
  header: string
  accessorKey: string
  className?: string
  cellClassName?: string
  width?: string | number
  minWidth?: string | number
  align?: "left" | "center" | "right"
  fixed?: "left" | "right"
  type?: "text" | "number" | "date" | "datetime" | "currency" | "percent" | "boolean" | "action"
  sortable?: boolean
  filterable?: boolean
  resizable?: boolean
  cell?: (value: any, row: any) => any
}

export interface TableSchema extends BaseSchema {
  type: "table"
  caption?: string
  columns: TableColumn[]
  data: any[]
  footer?: SchemaNode | SchemaNode[] | string
  hoverable?: boolean
  striped?: boolean
}

export interface DataTableSchema extends BaseSchema {
  type: "data-table"
  caption?: string
  toolbar?: SchemaNode[]
  columns: TableColumn[]
  data: any[]
  pagination?: boolean
  pageSize?: number
  searchable?: boolean
  selectable?: boolean | "single" | "multiple"
  sortable?: boolean
  exportable?: boolean
  rowActions?: boolean
  resizableColumns?: boolean
  reorderableColumns?: boolean
  onRowEdit?: (row: any) => void
  onRowDelete?: (row: any) => void
  onSelectionChange?: (selectedRows: any[]) => void
  onColumnsReorder?: (columns: TableColumn[]) => void
}

export interface MarkdownSchema extends BaseSchema {
  type: "markdown"
  content: string
  sanitize?: boolean
  components?: Record<string, any>
}

export interface TreeNode {
  id: string
  label: string
  icon?: string
  defaultExpanded?: boolean
  selectable?: boolean
  children?: TreeNode[]
  data?: any
}

export interface TreeViewSchema extends BaseSchema {
  type: "tree-view"
  data: TreeNode[]
  defaultExpandedIds?: string[]
  defaultSelectedIds?: string[]
  expandedIds?: string[]
  selectedIds?: string[]
  multiSelect?: boolean
  showLines?: boolean
  onSelectChange?: (selectedIds: string[]) => void
  onExpandChange?: (expandedIds: string[]) => void
}

export type ChartType = "line" | "bar" | "area" | "pie" | "donut" | "radar" | "scatter"

export interface ChartSeries {
  name: string
  data: number[]
  color?: string
}

export interface ChartSchema extends BaseSchema {
  type: "chart"
  chartType: ChartType
  title?: string
  description?: string
  categories?: string[]
  series: ChartSeries[]
  height?: string | number
  width?: string | number
  showLegend?: boolean
  showGrid?: boolean
  animate?: boolean
  config?: Record<string, any>
}

export interface TimelineEvent {
  id?: string
  title: string
  description?: string
  date: string | Date
  icon?: string
  color?: string
  content?: SchemaNode | SchemaNode[]
}

export interface TimelineSchema extends BaseSchema {
  type: "timeline"
  events: TimelineEvent[]
  orientation?: "vertical" | "horizontal"
  position?: "left" | "right" | "alternate"
}

export interface BreadcrumbItem {
  label: string
  href?: string
}

export interface BreadcrumbSchema extends BaseSchema {
  type: "breadcrumb"
  items: BreadcrumbItem[]
  separator?: string
}

export interface KbdSchema extends BaseSchema {
  type: "kbd"
  label?: string
  keys?: string | string[]
}

export interface HtmlSchema extends BaseSchema {
  type: "html"
  html: string
}

export type DataDisplaySchema =
  | AlertSchema
  | BadgeSchema
  | AvatarSchema
  | ListSchema
  | TableSchema
  | DataTableSchema
  | MarkdownSchema
  | TreeViewSchema
  | ChartSchema
  | TimelineSchema
  | HtmlSchema
  | StatisticSchema
  | BreadcrumbSchema
  | KbdSchema

import type { BaseSchema, SchemaNode } from "./base"

export interface DashboardSchema extends BaseSchema {
  type: "dashboard"
  columns?: number
  gap?: number
  widgets: Array<{
    id: string
    title?: string
    component: SchemaNode
    layout?: { x: number; y: number; w: number; h: number }
  }>
}

export interface KanbanColumn {
  id: string
  title: string
  items: KanbanCard[]
  color?: string
  limit?: number
  collapsed?: boolean
}

export interface KanbanCard {
  id: string
  title: string
  description?: string
  labels?: string[]
  assignees?: string[]
  dueDate?: string | Date
  priority?: "low" | "medium" | "high" | "critical"
  content?: SchemaNode | SchemaNode[]
  data?: any
}

export interface KanbanSchema extends BaseSchema {
  type: "kanban"
  columns: KanbanColumn[]
  draggable?: boolean
  onCardMove?: (cardId: string, fromColumn: string, toColumn: string, position: number) => void
  onCardClick?: (card: KanbanCard) => void
  onColumnAdd?: (column: KanbanColumn) => void
  onCardAdd?: (columnId: string, card: KanbanCard) => void
}

export type CalendarViewMode = "month" | "week" | "day" | "agenda"

export interface CalendarEvent {
  id: string
  title: string
  description?: string
  start: string | Date
  end: string | Date
  allDay?: boolean
  color?: string
  data?: any
}

export interface CalendarViewSchema extends BaseSchema {
  type: "calendar-view"
  events: CalendarEvent[]
  defaultView?: CalendarViewMode
  view?: CalendarViewMode
  defaultDate?: string | Date
  date?: string | Date
  views?: CalendarViewMode[]
  editable?: boolean
  onEventClick?: (event: CalendarEvent) => void
  onEventCreate?: (start: Date, end: Date) => void
  onEventUpdate?: (event: CalendarEvent) => void
  onDateChange?: (date: Date) => void
  onViewChange?: (view: CalendarViewMode) => void
}

export type FilterOperator =
  | "equals"
  | "not_equals"
  | "contains"
  | "not_contains"
  | "starts_with"
  | "ends_with"
  | "greater_than"
  | "less_than"
  | "greater_than_or_equal"
  | "less_than_or_equal"
  | "is_empty"
  | "is_not_empty"
  | "in"
  | "not_in"

export interface FilterCondition {
  field: string
  operator: FilterOperator
  value?: any
}

export interface FilterGroup {
  operator: "and" | "or"
  conditions: (FilterCondition | FilterGroup)[]
}

export interface FilterBuilderSchema extends BaseSchema {
  type: "filter-builder"
  fields: FilterField[]
  defaultValue?: FilterGroup
  value?: FilterGroup
  onChange?: (filter: FilterGroup) => void
  allowGroups?: boolean
  maxDepth?: number
}

export interface FilterField {
  name: string
  label: string
  type: "string" | "number" | "date" | "boolean" | "select"
  operators?: FilterOperator[]
  options?: { label: string; value: any }[]
}

export interface CarouselItem {
  id?: string
  content: SchemaNode | SchemaNode[]
}

export interface CarouselSchema extends BaseSchema {
  type: "carousel"
  items: CarouselItem[]
  autoPlay?: number
  showArrows?: boolean
  showDots?: boolean
  loop?: boolean
  itemsPerView?: number
  gap?: number
  onSlideChange?: (index: number) => void
}

export interface ChatMessage {
  id: string
  role: "user" | "assistant" | "system"
  content: string
  timestamp?: string | Date
  metadata?: any
}

export interface ChatbotSchema extends BaseSchema {
  type: "chatbot"
  messages: ChatMessage[]
  placeholder?: string
  loading?: boolean
  onSendMessage?: (message: string) => void | Promise<void>
  showAvatars?: boolean
  userAvatar?: string
  assistantAvatar?: string
  markdown?: boolean
  height?: string | number
}

export interface DashboardWidgetLayout {
  x: number
  y: number
  w: number
  h: number
}

export interface DashboardWidgetSchema {
  id: string
  title?: string
  component: SchemaNode
  layout?: DashboardWidgetLayout
}

export interface DashboardSchema extends BaseSchema {
  type: "dashboard"
  columns?: number
  gap?: number
  widgets: DashboardWidgetSchema[]
}

export type ComplexSchema =
  | KanbanSchema
  | CalendarViewSchema
  | FilterBuilderSchema
  | CarouselSchema
  | ChatbotSchema
  | DashboardSchema

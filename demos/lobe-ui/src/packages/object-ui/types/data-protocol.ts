import type { SortConfig as BaseSortConfig } from "./objectql"
import type { FilterOperator as BaseFilterOperator } from "./complex"

export type QueryASTNodeType =
  | "select"
  | "from"
  | "where"
  | "join"
  | "group_by"
  | "order_by"
  | "limit"
  | "offset"
  | "subquery"
  | "aggregate"
  | "window"
  | "field"
  | "literal"
  | "operator"
  | "function"

export interface QueryASTNode {
  type: QueryASTNodeType
  [key: string]: any
}

export interface SelectNode extends QueryASTNode {
  type: "select"
  fields: (FieldNode | AggregateNode | WindowNode)[]
  distinct?: boolean
}

export interface FromNode extends QueryASTNode {
  type: "from"
  table: string
  alias?: string
}

export interface WhereNode extends QueryASTNode {
  type: "where"
  condition: OperatorNode
}

export type JoinStrategy = "auto" | "database" | "hash" | "loop"

export interface JoinNode extends QueryASTNode {
  type: "join"
  join_type: "inner" | "left" | "right" | "full" | "cross"
  table: string
  alias?: string
  on: OperatorNode
  strategy?: JoinStrategy
}

export interface GroupByNode extends QueryASTNode {
  type: "group_by"
  fields: FieldNode[]
  having?: OperatorNode
}

export interface OrderByNode extends QueryASTNode {
  type: "order_by"
  fields: Array<{
    field: FieldNode
    direction: "asc" | "desc"
  }>
}

export interface LimitNode extends QueryASTNode {
  type: "limit"
  value: number
}

export interface OffsetNode extends QueryASTNode {
  type: "offset"
  value: number
}

export interface SubqueryNode extends QueryASTNode {
  type: "subquery"
  query: QueryAST
  alias?: string
}

export interface AggregateNode extends QueryASTNode {
  type: "aggregate"
  function: "count" | "sum" | "avg" | "min" | "max" | "first" | "last" | "count_distinct" | "array_agg" | "string_agg"
  field?: FieldNode
  alias?: string
  distinct?: boolean
  separator?: string
}

export type WindowFunction =
  | "row_number"
  | "rank"
  | "dense_rank"
  | "percent_rank"
  | "lag"
  | "lead"
  | "first_value"
  | "last_value"
  | "sum"
  | "avg"
  | "count"
  | "min"
  | "max"

export type WindowFrameUnit = "rows" | "range"

export type WindowFrameBoundary =
  | "unbounded_preceding"
  | "unbounded_following"
  | "current_row"
  | { type: "preceding"; offset: number }
  | { type: "following"; offset: number }

export interface WindowFrame {
  unit: WindowFrameUnit
  start: WindowFrameBoundary
  end?: WindowFrameBoundary
}

export interface WindowNode extends QueryASTNode {
  type: "window"
  function: WindowFunction
  field?: FieldNode
  alias: string
  partitionBy?: FieldNode[]
  orderBy?: Array<{ field: FieldNode; direction: "asc" | "desc" }>
  frame?: WindowFrame
  offset?: number
  defaultValue?: LiteralNode
}

export interface FieldNode extends QueryASTNode {
  type: "field"
  table?: string
  name: string
  alias?: string
}

export interface LiteralNode extends QueryASTNode {
  type: "literal"
  value: any
  data_type?: "string" | "number" | "boolean" | "date" | "null"
}

export interface OperatorNode extends QueryASTNode {
  type: "operator"
  operator: ComparisonOperator | LogicalOperator
  operands: (FieldNode | LiteralNode | OperatorNode | FunctionNode)[]
}

export interface FunctionNode extends QueryASTNode {
  type: "function"
  name: string
  arguments: (FieldNode | LiteralNode | FunctionNode)[]
  alias?: string
}

export type ComparisonOperator =
  | "="
  | "!="
  | "<>"
  | ">"
  | ">="
  | "<"
  | "<="
  | "like"
  | "ilike"
  | "in"
  | "not_in"
  | "is_null"
  | "is_not_null"
  | "between"
  | "contains"
  | "starts_with"
  | "ends_with"

export type LogicalOperator = "and" | "or" | "not"

export interface QueryAST {
  select: SelectNode
  from: FromNode
  joins?: JoinNode[]
  where?: WhereNode
  group_by?: GroupByNode
  order_by?: OrderByNode
  limit?: LimitNode
  offset?: OffsetNode
}

export interface QuerySchema {
  object: string
  fields?: string[]
  filter?: AdvancedFilterSchema
  sort?: QuerySortConfig[]
  limit?: number
  offset?: number
  joins?: JoinConfig[]
  aggregations?: AggregationConfig[]
  group_by?: string[]
  windows?: WindowConfig[]
  expand?: string[]
  search?: string
}

export interface QuerySortConfig extends BaseSortConfig {
  nulls?: "first" | "last"
}

export interface JoinConfig {
  type: "inner" | "left" | "right" | "full"
  object: string
  on: {
    local_field: string
    foreign_field: string
  }
  alias?: string
}

export interface AggregationConfig {
  function: "count" | "sum" | "avg" | "min" | "max" | "count_distinct" | "array_agg" | "string_agg"
  field?: string
  alias?: string
  distinct?: boolean
  separator?: string
}

export interface WindowConfig {
  function: WindowFunction
  field?: string
  alias: string
  partitionBy?: string[]
  orderBy?: Array<{ field: string; direction: "asc" | "desc" }>
  frame?: WindowFrame
  offset?: number
  defaultValue?: any
}

export interface AdvancedFilterSchema {
  operator?: "and" | "or" | "not"
  conditions?: AdvancedFilterCondition[]
  groups?: AdvancedFilterSchema[]
}

export interface AdvancedFilterCondition {
  field: string
  operator: AdvancedFilterOperator
  value?: any
  values?: any[]
  case_sensitive?: boolean
}

export type AdvancedFilterOperator =
  | BaseFilterOperator
  | "like"
  | "ilike"
  | "is_null"
  | "is_not_null"
  | "between"
  | "not_between"
  | "date_equals"
  | "date_after"
  | "date_before"
  | "date_in_range"
  | "date_today"
  | "date_yesterday"
  | "date_tomorrow"
  | "date_this_week"
  | "date_last_week"
  | "date_next_week"
  | "date_this_month"
  | "date_last_month"
  | "date_next_month"
  | "date_this_year"
  | "date_last_year"
  | "date_next_year"
  | "lookup_equals"
  | "lookup_contains"
  | "lookup_starts_with"
  | "search"
  | "search_phrase"
  | "search_proximity"

export interface DateRangeFilter {
  start?: Date | string
  end?: Date | string
  preset?: DateRangePreset
}

export type DateRangePreset =
  | "today"
  | "yesterday"
  | "tomorrow"
  | "this_week"
  | "last_week"
  | "next_week"
  | "this_month"
  | "last_month"
  | "next_month"
  | "this_quarter"
  | "last_quarter"
  | "next_quarter"
  | "this_year"
  | "last_year"
  | "next_year"
  | "last_7_days"
  | "last_30_days"
  | "last_90_days"
  | "next_7_days"
  | "next_30_days"
  | "next_90_days"

export interface FilterBuilderConfig {
  fields: FilterFieldConfig[]
  default_operator?: "and" | "or"
  allow_groups?: boolean
  max_depth?: number
}

export interface FilterFieldConfig {
  name: string
  label: string
  type: string
  operators?: AdvancedFilterOperator[]
  options?: Array<{ label: string; value: any }>
}

export interface AdvancedValidationSchema {
  field?: string
  rules: AdvancedValidationRule[]
  messages?: Record<string, string>
  on?: ("blur" | "change" | "submit")[]
  async?: boolean
  debounce?: number
}

export interface AdvancedValidationRule {
  type: ValidationRuleType
  params?: any
  message?: string
  validator?: ValidationFunction
  async_validator?: AsyncValidationFunction
  depends_on?: string[]
  severity?: "error" | "warning" | "info"
}

export type ValidationRuleType =
  | "required"
  | "min_length"
  | "max_length"
  | "pattern"
  | "email"
  | "url"
  | "phone"
  | "min"
  | "max"
  | "integer"
  | "positive"
  | "negative"
  | "date_min"
  | "date_max"
  | "date_range"
  | "date_future"
  | "date_past"
  | "min_items"
  | "max_items"
  | "unique_items"
  | "object_schema"
  | "field_match"
  | "field_compare"
  | "conditional"
  | "custom"
  | "async_custom"
  | "remote_validation"
  | "unique_check"
  | "exists_check"

export type ValidationFunction = (value: any, context?: ValidationContext) => boolean | string

export type AsyncValidationFunction = (value: any, context?: ValidationContext) => Promise<boolean | string>

export interface ValidationContext {
  values?: Record<string, any>
  field?: any
  parent?: any
  user?: any
}

export interface AdvancedValidationResult {
  valid: boolean
  errors: AdvancedValidationError[]
  warnings?: AdvancedValidationError[]
}

export interface AdvancedValidationError {
  field: string
  message: string
  code?: string
  rule?: ValidationRuleType
  severity?: "error" | "warning" | "info"
  context?: Record<string, any>
}

export interface BaseValidation {
  name: string
  label?: string
  description?: string
  active: boolean
  events: Array<"insert" | "update" | "delete">
  severity: "error" | "warning" | "info"
  message: string
  tags?: string[]
}

export interface ScriptValidation extends BaseValidation {
  type: "script"
  condition: string
}

export interface UniquenessValidation extends BaseValidation {
  type: "unique"
  fields: string[]
  scope?: string
  caseSensitive?: boolean
}

export interface StateMachineValidation extends BaseValidation {
  type: "state_machine"
  stateField: string
  transitions: Array<{
    from: string | string[]
    to: string
    condition?: string
  }>
}

export interface CrossFieldValidation extends BaseValidation {
  type: "cross_field"
  fields: string[]
  condition: string
}

export interface AsyncValidation extends BaseValidation {
  type: "async"
  endpoint: string
  method?: "GET" | "POST"
  debounce?: number
  cache?: {
    enabled: boolean
    ttl?: number
  }
}

export interface ConditionalValidation extends BaseValidation {
  type: "conditional"
  condition: string
  rules: ObjectValidationRule[]
}

export interface FormatValidation extends BaseValidation {
  type: "format"
  field: string
  pattern: string | RegExp
  format?: "email" | "url" | "phone" | "ipv4" | "ipv6" | "uuid" | "iso_date" | "credit_card"
  flags?: string
}

export interface RangeValidation extends BaseValidation {
  type: "range"
  field: string
  min?: number | string | Date
  max?: number | string | Date
  minExclusive?: boolean
  maxExclusive?: boolean
}

export type ObjectValidationRule =
  | ScriptValidation
  | UniquenessValidation
  | StateMachineValidation
  | CrossFieldValidation
  | AsyncValidation
  | ConditionalValidation
  | FormatValidation
  | RangeValidation

export interface DriverInterface {
  name: string
  version?: string
  connect(config: ConnectionConfig): Promise<void>
  disconnect(): Promise<void>
  query<T = any>(sql: string, params?: any[]): Promise<DriverQueryResult<T>>
  executeAST<T = any>(ast: QueryAST): Promise<DriverQueryResult<T>>
  find<T = any>(table: string, query: QuerySchema): Promise<DriverQueryResult<T>>
  findOne<T = any>(table: string, id: any): Promise<T | null>
  insert<T = any>(table: string, data: Partial<T>): Promise<T>
  update<T = any>(table: string, id: any, data: Partial<T>): Promise<T>
  delete(table: string, id: any): Promise<boolean>
  batch<T = any>(operations: BatchOperation[]): Promise<BatchResult<T>>
  transaction<T = any>(callback: (trx: TransactionContext) => Promise<T>): Promise<T>
  getSchema(objectName: string): Promise<any>
  cache?: CacheManager
  pool?: ConnectionPool
}

export interface ConnectionConfig {
  host?: string
  port?: number
  database?: string
  username?: string
  password?: string
  url?: string
  ssl?: boolean | object
  pool?: {
    min?: number
    max?: number
    idle_timeout?: number
    connection_timeout?: number
  }
  options?: Record<string, any>
}

export interface DriverQueryResult<T = any> {
  data: T[]
  total?: number
  page?: number
  pageSize?: number
  hasMore?: boolean
  cursor?: string
  metadata?: {
    execution_time?: number
    from_cache?: boolean
    rows_affected?: number
  }
}

export interface BatchOperation {
  type: "insert" | "update" | "delete"
  table: string
  data?: any
  id?: any
}

export interface BatchResult<T = any> {
  success: T[]
  failed: Array<{
    operation: BatchOperation
    error: Error
  }>
  total: number
  success_count: number
  failure_count: number
}

export interface TransactionContext {
  query<T = any>(sql: string, params?: any[]): Promise<DriverQueryResult<T>>
  insert<T = any>(table: string, data: Partial<T>): Promise<T>
  update<T = any>(table: string, id: any, data: Partial<T>): Promise<T>
  delete(table: string, id: any): Promise<boolean>
  commit(): Promise<void>
  rollback(): Promise<void>
}

export interface CacheManager {
  get<T = any>(key: string): Promise<T | null>
  set<T = any>(key: string, value: T, ttl?: number): Promise<void>
  delete(key: string): Promise<void>
  clear(): Promise<void>
  has(key: string): Promise<boolean>
}

export interface ConnectionPool {
  acquire(): Promise<any>
  release(connection: any): Promise<void>
  stats(): {
    total: number
    idle: number
    active: number
    waiting: number
  }
  close(): Promise<void>
}

export interface DatasourceSchema {
  name: string
  type: DatasourceType
  label?: string
  connection: ConnectionConfig
  driver?: DriverInterface
  is_default?: boolean
  health_check?: {
    enabled?: boolean
    interval?: number
    timeout?: number
    query?: string
  }
  monitoring?: {
    enabled?: boolean
    metrics?: DatasourceMetric[]
    alerts?: DatasourceAlert[]
  }
  retry?: {
    max_attempts?: number
    delay?: number
    backoff?: boolean
  }
  metadata?: Record<string, any>
}

export type DatasourceType =
  | "postgres"
  | "mysql"
  | "mongodb"
  | "sqlite"
  | "mssql"
  | "oracle"
  | "rest"
  | "graphql"
  | "objectql"
  | "custom"

export type DatasourceMetric =
  | "query_count"
  | "query_duration"
  | "error_rate"
  | "connection_count"
  | "cache_hit_rate"
  | "throughput"

export interface DatasourceAlert {
  name: string
  metric: DatasourceMetric
  threshold: number
  operator: ">" | "<" | ">=" | "<=" | "="
  severity: "info" | "warning" | "error" | "critical"
  actions?: Array<"log" | "email" | "slack" | "webhook">
}

export interface DatasourceManager {
  register(datasource: DatasourceSchema): void
  unregister(name: string): void
  get(name: string): DatasourceSchema | undefined
  getDefault(): DatasourceSchema | undefined
  switch(name: string): void
  getActive(): DatasourceSchema | undefined
  list(): DatasourceSchema[]
  checkHealth(name: string): Promise<HealthCheckResult>
  getMetrics(name: string): Promise<DatasourceMetrics>
}

export interface HealthCheckResult {
  datasource: string
  status: "healthy" | "degraded" | "unhealthy"
  response_time?: number
  error?: string
  timestamp: Date
  details?: Record<string, any>
}

export interface DatasourceMetrics {
  datasource: string
  queries: {
    total: number
    success: number
    failed: number
    avg_duration: number
  }
  connections: {
    active: number
    idle: number
    total: number
  }
  cache?: {
    hits: number
    misses: number
    hit_rate: number
  }
  error_rate: number
  timestamp: Date
}

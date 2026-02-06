export interface QueryParams {
  $select?: string[]
  $filter?: Record<string, any>
  $orderby?: Record<string, "asc" | "desc"> | string[] | Array<{ field: string; order?: "asc" | "desc" }>
  $skip?: number
  $top?: number
  $expand?: string[]
  $search?: string
  $count?: boolean
  [key: string]: any
}

export interface QueryResult<T = any> {
  data: T[]
  total?: number
  page?: number
  pageSize?: number
  hasMore?: boolean
  cursor?: string
  metadata?: Record<string, any>
}

export interface DataSource<T = any> {
  find(resource: string, params?: QueryParams): Promise<QueryResult<T>>
  findOne(resource: string, id: string | number, params?: QueryParams): Promise<T | null>
  create(resource: string, data: Partial<T>): Promise<T>
  update(resource: string, id: string | number, data: Partial<T>): Promise<T>
  delete(resource: string, id: string | number): Promise<boolean>
  bulk?(resource: string, operation: "create" | "update" | "delete", data: Partial<T>[]): Promise<T[]>
  getObjectSchema(objectName: string): Promise<any>
}

export interface DataScope {
  dataSource?: DataSource
  data?: any
  loading?: boolean
  error?: Error | string | null
  refresh?: () => Promise<void>
  setData?: (data: any) => void
}

export interface DataContext {
  scopes: Record<string, DataScope>
  registerScope: (name: string, scope: DataScope) => void
  getScope: (name: string) => DataScope | undefined
  removeScope: (name: string) => void
}

export interface DataBinding {
  source?: string
  resource?: string
  params?: QueryParams
  transform?: (data: any) => any
  refreshInterval?: number
  cache?: boolean
  cacheTTL?: number
}

export interface ValidationError {
  field: string
  message: string
  code?: string
}

export interface APIError {
  message: string
  status?: number
  code?: string
  errors?: ValidationError[]
  data?: any
}

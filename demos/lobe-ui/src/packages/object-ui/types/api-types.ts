import type { BaseSchema } from "./base"

export type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "HEAD" | "OPTIONS"

export interface APIRequest {
  url: string
  method?: HTTPMethod
  headers?: Record<string, string>
  data?: any
  params?: Record<string, any>
  timeout?: number
  withCredentials?: boolean
  transformRequest?: string
  transformResponse?: string
}

export interface APIConfig {
  request?: APIRequest
  onSuccess?: string
  onError?: string
  showLoading?: boolean
  successMessage?: string
  errorMessage?: string
  reload?: boolean
  redirect?: string
  close?: boolean
  retry?: {
    maxAttempts?: number
    delay?: number
    retryOn?: number[]
  }
  cache?: {
    key?: string
    duration?: number
    staleWhileRevalidate?: boolean
  }
}

export interface EventHandler {
  event: string
  type: "action" | "api" | "script" | "navigation" | "dialog" | "toast" | "custom"
  action?: {
    name: string
    params?: Record<string, any>
  }
  api?: APIConfig
  script?: string
  navigate?: {
    to: string
    type?: "push" | "replace" | "reload"
    params?: Record<string, any>
    external?: boolean
  }
  dialog?: {
    type: "alert" | "confirm" | "prompt" | "modal"
    title?: string
    content?: string | BaseSchema
    actions?: Array<{
      label: string
      handler?: EventHandler
    }>
  }
  toast?: {
    type: "success" | "error" | "warning" | "info"
    message: string
    duration?: number
  }
  condition?: string
  preventDefault?: boolean
  stopPropagation?: boolean
  debounce?: number
  throttle?: number
}

export interface EventableSchema extends BaseSchema {
  events?: EventHandler[]
  onClick?: EventHandler | string
  onChange?: EventHandler | string
  onSubmit?: EventHandler | string
  onFocus?: EventHandler | string
  onBlur?: EventHandler | string
  onMouseEnter?: EventHandler | string
  onMouseLeave?: EventHandler | string
  onKeyDown?: EventHandler | string
  onKeyUp?: EventHandler | string
}

export interface DataFetchConfig {
  api: string | APIRequest
  fetchOnMount?: boolean
  pollInterval?: number
  dependencies?: string[]
  defaultData?: any
  transform?: string
  filter?: string
  sort?: {
    field: string
    order: "asc" | "desc"
  }
  pagination?: {
    page?: number
    pageSize?: number
    enabled?: boolean
  }
}

export interface DataFetchableSchema extends BaseSchema {
  dataSource?: DataFetchConfig
  loading?: boolean
  error?: string | null
  data?: any
}

export interface ExpressionContext {
  data?: any
  state?: any
  form?: any
  user?: any
  env?: Record<string, any>
  utils?: Record<string, (...args: any[]) => any>
}

export interface ExpressionSchema {
  type: "expression"
  value: string
  defaultValue?: any
  reactive?: boolean
}

export type APISchema = EventableSchema | DataFetchableSchema | ExpressionSchema

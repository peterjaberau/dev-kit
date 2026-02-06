export interface PluginScope {
  name: string
  version: string
  registerComponent(type: string, component: any, meta?: ComponentMeta): void
  getComponent(type: string): any | undefined
  useState<T>(key: string, initialValue: T): [T, (value: T | ((prev: T) => T)) => void]
  getState<T>(key: string): T | undefined
  setState<T>(key: string, value: T): void
  on(event: string, handler: PluginEventHandler): () => void
  emit(event: string, data?: any): void
  emitGlobal(event: string, data?: any): void
  onGlobal(event: string, handler: PluginEventHandler): () => void
  cleanup(): void
}

export interface ComponentMeta {
  label?: string
  icon?: string
  category?: string
  inputs?: ComponentInput[]
  defaultProps?: Record<string, any>
  defaultChildren?: any[]
  examples?: Record<string, any>
  isContainer?: boolean
  resizable?: boolean
  resizeConstraints?: {
    width?: boolean
    height?: boolean
    minWidth?: number
    maxWidth?: number
    minHeight?: number
    maxHeight?: number
  }
}

export interface ComponentInput {
  name: string
  type: "string" | "number" | "boolean" | "enum" | "array" | "object" | "color" | "date" | "code" | "file" | "slot"
  label?: string
  defaultValue?: any
  required?: boolean
  enum?: string[] | { label: string; value: any }[]
  description?: string
  advanced?: boolean
  inputType?: string
}

export type PluginEventHandler = (data?: any) => void

export interface PluginScopeConfig {
  enableStateIsolation?: boolean
  enableEventIsolation?: boolean
  allowGlobalEvents?: boolean
  maxStateSize?: number
}

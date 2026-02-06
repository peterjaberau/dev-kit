import type { BaseSchema, SchemaNode } from "./base"

export interface BlockVariable {
  name: string
  label?: string
  type?: "string" | "number" | "boolean" | "object" | "array" | "component"
  defaultValue?: any
  description?: string
  required?: boolean
  validation?: any
  enum?: any[]
}

export interface BlockSlot {
  name: string
  label?: string
  description?: string
  defaultContent?: SchemaNode | SchemaNode[]
  allowedTypes?: string[]
  maxChildren?: number
  required?: boolean
}

export interface BlockMetadata {
  name: string
  label?: string
  description?: string
  category?: string
  icon?: string
  tags?: string[]
  author?: string
  version?: string
  license?: string
  repository?: string
  preview?: string
  premium?: boolean
}

export interface BlockSchema extends BaseSchema {
  type: "block"
  meta?: BlockMetadata
  variables?: BlockVariable[]
  slots?: BlockSlot[]
  template?: SchemaNode | SchemaNode[]
  values?: Record<string, any>
  slotContent?: Record<string, SchemaNode | SchemaNode[]>
  blockRef?: string
  editable?: boolean
}

export interface BlockLibraryItem {
  id: string
  meta: BlockMetadata
  schema: BlockSchema
  installs?: number
  rating?: number
  ratingCount?: number
  updatedAt?: string
  createdAt?: string
}

export interface BlockLibrarySchema extends BaseSchema {
  type: "block-library"
  apiEndpoint?: string
  category?: string
  searchQuery?: string
  tags?: string[]
  showPremium?: boolean
  blocks?: BlockLibraryItem[]
  loading?: boolean
  onInstall?: string
  onPreview?: string
}

export interface BlockEditorSchema extends BaseSchema {
  type: "block-editor"
  block?: BlockSchema
  showVariables?: boolean
  showSlots?: boolean
  showTemplate?: boolean
  showPreview?: boolean
  onSave?: string
  onCancel?: string
}

export interface BlockInstanceSchema extends BaseSchema {
  type: "block-instance"
  blockId: string
  blockName?: string
  values?: Record<string, any>
  slotContent?: Record<string, SchemaNode | SchemaNode[]>
  overrideStyles?: boolean
}

export interface ComponentSchema extends BaseSchema {
  type: "component"
  componentName?: string
  props?: Record<string, any>
  children?: SchemaNode | SchemaNode[]
}

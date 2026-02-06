import type { BaseSchema, SchemaNode } from "./base"

export interface AccordionItem {
  value: string
  title: string
  content: SchemaNode | SchemaNode[]
  disabled?: boolean
  icon?: string
}

export interface AccordionSchema extends BaseSchema {
  type: "accordion"
  items: AccordionItem[]
  accordionType?: "single" | "multiple"
  collapsible?: boolean
  defaultValue?: string | string[]
  value?: string | string[]
  onValueChange?: (value: string | string[]) => void
  variant?: "default" | "bordered" | "separated"
}

export interface CollapsibleSchema extends BaseSchema {
  type: "collapsible"
  trigger: string | SchemaNode
  content: SchemaNode | SchemaNode[]
  defaultOpen?: boolean
  open?: boolean
  disabled?: boolean
  onOpenChange?: (open: boolean) => void
}

export interface ToggleGroupItem {
  value: string
  label: string
  icon?: string
  disabled?: boolean
}

export interface ToggleGroupSchema extends BaseSchema {
  type: "toggle-group"
  selectionType?: "single" | "multiple"
  variant?: "default" | "outline"
  size?: "default" | "sm" | "lg"
  items?: ToggleGroupItem[]
  defaultValue?: string | string[]
  value?: string | string[]
  disabled?: boolean
  onValueChange?: (value: string | string[]) => void
}

export type DisclosureSchema = AccordionSchema | CollapsibleSchema | ToggleGroupSchema

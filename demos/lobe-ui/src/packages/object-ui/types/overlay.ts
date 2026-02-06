import type { BaseSchema, SchemaNode } from "./base"

export type OverlayPosition = "top" | "right" | "bottom" | "left"

export type OverlayAlignment = "start" | "center" | "end"

export interface DialogSchema extends BaseSchema {
  type: "dialog"
  title?: string
  description?: string
  content?: SchemaNode | SchemaNode[]
  trigger?: SchemaNode
  defaultOpen?: boolean
  open?: boolean
  footer?: SchemaNode | SchemaNode[]
  modal?: boolean
  onOpenChange?: (open: boolean) => void
}

export interface AlertDialogSchema extends BaseSchema {
  type: "alert-dialog"
  title?: string
  description?: string
  trigger?: SchemaNode
  defaultOpen?: boolean
  open?: boolean
  cancelLabel?: string
  confirmLabel?: string
  confirmVariant?: "default" | "destructive"
  onConfirm?: () => void | Promise<void>
  onCancel?: () => void
  onOpenChange?: (open: boolean) => void
}

export interface SheetSchema extends BaseSchema {
  type: "sheet"
  title?: string
  description?: string
  content?: SchemaNode | SchemaNode[]
  trigger?: SchemaNode
  defaultOpen?: boolean
  open?: boolean
  side?: OverlayPosition
  footer?: SchemaNode | SchemaNode[]
  onOpenChange?: (open: boolean) => void
}

export interface DrawerSchema extends BaseSchema {
  type: "drawer"
  title?: string
  description?: string
  content?: SchemaNode | SchemaNode[]
  trigger?: SchemaNode
  defaultOpen?: boolean
  open?: boolean
  direction?: OverlayPosition
  onOpenChange?: (open: boolean) => void
}

export interface PopoverSchema extends BaseSchema {
  type: "popover"
  content: SchemaNode | SchemaNode[]
  trigger: SchemaNode
  defaultOpen?: boolean
  open?: boolean
  side?: OverlayPosition
  align?: OverlayAlignment
  onOpenChange?: (open: boolean) => void
}

export interface TooltipSchema extends BaseSchema {
  type: "tooltip"
  content: string | SchemaNode
  children: SchemaNode
  side?: OverlayPosition
  align?: OverlayAlignment
  delayDuration?: number
}

export interface HoverCardSchema extends BaseSchema {
  type: "hover-card"
  content: SchemaNode | SchemaNode[]
  trigger: SchemaNode
  defaultOpen?: boolean
  open?: boolean
  side?: OverlayPosition
  openDelay?: number
  closeDelay?: number
  onOpenChange?: (open: boolean) => void
}

export interface MenuItem {
  label: string
  icon?: string
  disabled?: boolean
  onClick?: () => void
  shortcut?: string
  children?: MenuItem[]
  separator?: boolean
}

export interface DropdownMenuSchema extends BaseSchema {
  type: "dropdown-menu"
  items: MenuItem[]
  trigger: SchemaNode
  defaultOpen?: boolean
  open?: boolean
  side?: OverlayPosition
  align?: OverlayAlignment
  onOpenChange?: (open: boolean) => void
}

export interface ContextMenuSchema extends BaseSchema {
  type: "context-menu"
  items: MenuItem[]
  children: SchemaNode | SchemaNode[]
}

export interface MenubarMenu {
  label: string
  items: MenuItem[]
}

export interface MenubarSchema extends BaseSchema {
  type: "menubar"
  menus?: MenubarMenu[]
}

export type OverlaySchema =
  | DialogSchema
  | AlertDialogSchema
  | SheetSchema
  | DrawerSchema
  | PopoverSchema
  | TooltipSchema
  | HoverCardSchema
  | DropdownMenuSchema
  | ContextMenuSchema
  | MenubarSchema

import type { BaseSchema, SchemaNode } from "./base"

export interface DivSchema extends BaseSchema {
  type: "div"
  children?: SchemaNode | SchemaNode[]
}

export interface SpanSchema extends BaseSchema {
  type: "span"
  value?: string
  children?: SchemaNode | SchemaNode[]
}

export interface TextSchema extends BaseSchema {
  type: "text"
  value?: string
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "body" | "caption" | "overline"
  align?: "left" | "center" | "right" | "justify"
}

export interface ImageSchema extends BaseSchema {
  type: "image"
  src: string
  alt?: string
  width?: string | number
  height?: string | number
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down"
}

export interface IconSchema extends BaseSchema {
  type: "icon"
  name: string
  size?: number
  color?: string
}

export interface SeparatorSchema extends BaseSchema {
  type: "separator"
  orientation?: "horizontal" | "vertical"
  decorative?: boolean
}

export interface ContainerSchema extends BaseSchema {
  type: "container"
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | "full" | "screen" | false
  centered?: boolean
  padding?: number
  children?: SchemaNode | SchemaNode[]
}

export interface FlexSchema extends BaseSchema {
  type: "flex"
  direction?: "row" | "col" | "row-reverse" | "col-reverse"
  justify?: "start" | "end" | "center" | "between" | "around" | "evenly"
  align?: "start" | "end" | "center" | "baseline" | "stretch"
  gap?: number
  wrap?: boolean
  children?: SchemaNode | SchemaNode[]
}

export interface StackSchema extends Omit<FlexSchema, "type"> {
  type: "stack"
}

export interface GridSchema extends BaseSchema {
  type: "grid"
  columns?: number | Record<string, number>
  gap?: number
  children?: SchemaNode | SchemaNode[]
}

export interface CardSchema extends BaseSchema {
  type: "card"
  title?: string
  description?: string
  header?: SchemaNode | SchemaNode[]
  body?: SchemaNode | SchemaNode[]
  children?: SchemaNode | SchemaNode[]
  footer?: SchemaNode | SchemaNode[]
  variant?: "default" | "outline" | "ghost"
  hoverable?: boolean
  clickable?: boolean
  onClick?: () => void
}

export interface TabsSchema extends BaseSchema {
  type: "tabs"
  defaultValue?: string
  value?: string
  orientation?: "horizontal" | "vertical"
  items: TabItem[]
  onValueChange?: (value: string) => void
}

export interface TabItem {
  value: string
  label: string
  icon?: string
  disabled?: boolean
  content: SchemaNode | SchemaNode[]
}

export interface ScrollAreaSchema extends BaseSchema {
  type: "scroll-area"
  height?: string | number
  width?: string | number
  orientation?: "vertical" | "horizontal" | "both"
  children?: SchemaNode | SchemaNode[]
}

export interface ResizableSchema extends BaseSchema {
  type: "resizable"
  direction?: "horizontal" | "vertical"
  minHeight?: string | number
  withHandle?: boolean
  panels: ResizablePanel[]
}

export interface ResizablePanel {
  id: string
  defaultSize?: number
  minSize?: number
  maxSize?: number
  content: SchemaNode | SchemaNode[]
}

export interface AspectRatioSchema extends BaseSchema {
  type: "aspect-ratio"
  ratio?: number
  image?: string
  alt?: string
  body?: SchemaNode | SchemaNode[]
  children?: SchemaNode | SchemaNode[]
}

export interface PageRegion {
  name: string
  type?: "header" | "sidebar" | "main" | "footer" | "aside"
  width?: string
  components: SchemaNode[]
  className?: string
}

export interface PageSchema extends BaseSchema {
  type: "page"
  title?: string
  icon?: string
  description?: string
  regions?: PageRegion[]
  body?: SchemaNode[]
  children?: SchemaNode | SchemaNode[]
}

export type LayoutSchema =
  | DivSchema
  | SpanSchema
  | TextSchema
  | ImageSchema
  | IconSchema
  | SeparatorSchema
  | ContainerSchema
  | FlexSchema
  | StackSchema
  | GridSchema
  | CardSchema
  | TabsSchema
  | ScrollAreaSchema
  | ResizableSchema
  | AspectRatioSchema
  | PageSchema

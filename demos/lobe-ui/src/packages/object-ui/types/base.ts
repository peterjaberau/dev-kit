export interface BaseSchema {
  type: string

  id?: string
  name?: string
  label?: string
  description?: string
  placeholder?: string
  className?: string
  style?: Record<string, string | number>
  data?: any
  body?: SchemaNode | SchemaNode[]
  children?: SchemaNode | SchemaNode[]
  visible?: boolean
  visibleOn?: string
  hidden?: boolean
  hiddenOn?: string
  disabled?: boolean
  disabledOn?: string
  testId?: string
  ariaLabel?: string
  [key: string]: any
}

export type SchemaNode = BaseSchema | string | number | boolean | null | undefined

export interface ComponentRendererProps<TSchema extends BaseSchema = BaseSchema> {
  schema: TSchema
  [key: string]: any
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
  min?: number
  max?: number
  step?: number
  placeholder?: string
}

export interface ComponentMeta {
  label?: string
  icon?: string
  category?: string
  inputs?: ComponentInput[]
  defaultProps?: Record<string, any>
  defaultChildren?: SchemaNode[]
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
  tags?: string[]
  description?: string
}

export interface ComponentConfig extends ComponentMeta {
  type: string
  component: any
}

export interface HTMLAttributes {
  id?: string
  className?: string
  style?: Record<string, any>
  title?: string
  role?: string
  "aria-label"?: string
  "aria-describedby"?: string
  "data-testid"?: string
}

export interface EventHandlers {
  onClick?: (event?: any) => void | Promise<void>
  onChange?: (value: any, event?: any) => void | Promise<void>
  onSubmit?: (data: any, event?: any) => void | Promise<void>
  onFocus?: (event?: any) => void
  onBlur?: (event?: any) => void
  onKeyDown?: (event?: any) => void
  onKeyUp?: (event?: any) => void
  onMouseEnter?: (event?: any) => void
  onMouseLeave?: (event?: any) => void
}

export interface StyleProps {
  padding?: number | string
  margin?: number | string
  gap?: number | string
  backgroundColor?: string
  textColor?: string
  borderWidth?: number | string
  borderColor?: string
  borderRadius?: number | string
}

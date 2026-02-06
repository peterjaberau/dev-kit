import type { BaseSchema, SchemaNode } from "./base"

export interface ButtonSchema extends BaseSchema {
  type: "button"
  label?: string
  variant?: "default" | "secondary" | "destructive" | "outline" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  disabled?: boolean
  loading?: boolean
  icon?: string
  iconPosition?: "left" | "right"
  onClick?: () => void | Promise<void>
  buttonType?: "button" | "submit" | "reset"
  children?: SchemaNode | SchemaNode[]
}

export interface InputSchema extends BaseSchema {
  type: "input"
  name?: string
  label?: string
  placeholder?: string
  inputType?: "text" | "email" | "password" | "number" | "tel" | "url" | "search" | "date" | "time" | "datetime-local"
  defaultValue?: string | number
  value?: string | number
  required?: boolean
  disabled?: boolean
  readOnly?: boolean
  description?: string
  error?: string
  onChange?: (value: string | number) => void
  wrapperClass?: string
  min?: number
  max?: number
  step?: number
  maxLength?: number
  pattern?: string
}

export interface TextareaSchema extends BaseSchema {
  type: "textarea"
  name?: string
  label?: string
  placeholder?: string
  defaultValue?: string
  value?: string
  rows?: number
  required?: boolean
  disabled?: boolean
  readOnly?: boolean
  description?: string
  error?: string
  onChange?: (value: string) => void
  maxLength?: number
}

export interface SelectOption {
  label: string
  value: string
  disabled?: boolean
  icon?: string
}

export interface SelectSchema extends BaseSchema {
  type: "select"
  name?: string
  label?: string
  placeholder?: string
  defaultValue?: string
  value?: string
  options: SelectOption[]
  required?: boolean
  disabled?: boolean
  description?: string
  error?: string
  onChange?: (value: string) => void
}

export interface CheckboxSchema extends BaseSchema {
  type: "checkbox"
  name?: string
  label?: string
  defaultChecked?: boolean
  checked?: boolean
  disabled?: boolean
  description?: string
  error?: string
  onChange?: (checked: boolean) => void
}

export interface RadioOption {
  label: string
  value: string
  disabled?: boolean
  description?: string
}

export interface RadioGroupSchema extends BaseSchema {
  type: "radio-group"
  name?: string
  label?: string
  defaultValue?: string
  value?: string
  options: RadioOption[]
  orientation?: "horizontal" | "vertical"
  disabled?: boolean
  description?: string
  error?: string
  onChange?: (value: string) => void
}

export interface SwitchSchema extends BaseSchema {
  type: "switch"
  name?: string
  label?: string
  defaultChecked?: boolean
  checked?: boolean
  disabled?: boolean
  description?: string
  onChange?: (checked: boolean) => void
}

export interface ToggleSchema extends BaseSchema {
  type: "toggle"
  label?: string
  defaultPressed?: boolean
  pressed?: boolean
  disabled?: boolean
  variant?: "default" | "outline"
  size?: "default" | "sm" | "lg"
  onChange?: (pressed: boolean) => void
  children?: SchemaNode | SchemaNode[]
}

export interface SliderSchema extends BaseSchema {
  type: "slider"
  name?: string
  label?: string
  defaultValue?: number[]
  value?: number[]
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  description?: string
  onChange?: (value: number[]) => void
}

export interface FileUploadSchema extends BaseSchema {
  type: "file-upload"
  name?: string
  label?: string
  accept?: string
  multiple?: boolean
  maxSize?: number
  maxFiles?: number
  disabled?: boolean
  description?: string
  error?: string
  onChange?: (files: FileList | File[]) => void
}

export interface DatePickerSchema extends BaseSchema {
  type: "date-picker"
  name?: string
  label?: string
  placeholder?: string
  defaultValue?: Date | string
  value?: Date | string
  minDate?: Date | string
  maxDate?: Date | string
  format?: string
  disabled?: boolean
  description?: string
  error?: string
  onChange?: (date: Date | undefined) => void
}

export interface CalendarSchema extends BaseSchema {
  type: "calendar"
  defaultValue?: Date | Date[]
  value?: Date | Date[]
  mode?: "single" | "multiple" | "range"
  minDate?: Date | string
  maxDate?: Date | string
  disabled?: boolean
  onChange?: (date: Date | Date[] | undefined) => void
}

export interface InputOTPSchema extends BaseSchema {
  type: "input-otp"
  name?: string
  label?: string
  length?: number
  defaultValue?: string
  value?: string
  disabled?: boolean
  description?: string
  error?: string
  onChange?: (value: string) => void
  onComplete?: (value: string) => void
}

export interface ValidationRule {
  required?: string | boolean
  minLength?: { value: number; message: string }
  maxLength?: { value: number; message: string }
  min?: { value: number; message: string }
  max?: { value: number; message: string }
  pattern?: { value: string | RegExp; message: string }
  validate?: (value: any) => boolean | string | Promise<boolean | string>
}

export interface FieldCondition {
  field: string
  equals?: any
  notEquals?: any
  in?: any[]
  custom?: (formData: any) => boolean
}

export interface FormField {
  id?: string
  name: string
  label?: string
  description?: string
  type?: string
  inputType?: string
  required?: boolean
  disabled?: boolean
  placeholder?: string
  options?: SelectOption[] | RadioOption[]
  validation?: ValidationRule
  condition?: FieldCondition
  colSpan?: number
  [key: string]: any
}

export interface FormSchema extends BaseSchema {
  type: "form"
  fields?: FormField[]
  defaultValues?: Record<string, any>
  submitLabel?: string
  cancelLabel?: string
  showCancel?: boolean
  layout?: "vertical" | "horizontal"
  columns?: number
  validationMode?: "onSubmit" | "onBlur" | "onChange" | "onTouched" | "all"
  resetOnSubmit?: boolean
  disabled?: boolean
  mode?: "edit" | "read" | "disabled"
  actions?: SchemaNode[]
  onSubmit?: (data: Record<string, any>) => void | Promise<void>
  onChange?: (data: Record<string, any>) => void
  onCancel?: () => void
  showActions?: boolean
  fieldContainerClass?: string
  children?: SchemaNode | SchemaNode[]
}

export interface LabelSchema extends BaseSchema {
  type: "label"
  text?: string
  label?: string
  content?: string
  htmlFor?: string
}

export interface ComboboxOption {
  value: string
  label: string
  disabled?: boolean
}

export interface ComboboxSchema extends BaseSchema {
  type: "combobox"
  name?: string
  label?: string
  placeholder?: string
  options?: ComboboxOption[]
  defaultValue?: string
  value?: string
  disabled?: boolean
  description?: string
  error?: string
  onChange?: (value: string) => void
}

export interface CommandItem {
  value: string
  label: string
  icon?: string
}

export interface CommandGroup {
  heading?: string
  items: CommandItem[]
}

export interface CommandSchema extends BaseSchema {
  type: "command"
  placeholder?: string
  emptyText?: string
  groups?: CommandGroup[]
  onChange?: (value: string) => void
}

export type FormComponentSchema =
  | ButtonSchema
  | InputSchema
  | TextareaSchema
  | SelectSchema
  | CheckboxSchema
  | RadioGroupSchema
  | SwitchSchema
  | ToggleSchema
  | SliderSchema
  | FileUploadSchema
  | DatePickerSchema
  | CalendarSchema
  | InputOTPSchema
  | FormSchema
  | LabelSchema
  | ComboboxSchema
  | CommandSchema

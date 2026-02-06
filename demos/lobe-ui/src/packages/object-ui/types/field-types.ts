export interface BaseFieldMetadata {
  name: string
  label?: string
  type: string
  help?: string
  description?: string
  required?: boolean
  readonly?: boolean
  placeholder?: string
  defaultValue?: any
  permissions?: { read?: boolean; write?: boolean; edit?: boolean }
  sortable?: boolean
  filterable?: boolean
  visible_on?: VisibilityCondition
  validate?: ValidationFunction | ValidationRule
  depends_on?: string[]
  indexed?: boolean
  unique?: boolean
}

export type VisibilityCondition = {
  field: string
  operator?: "=" | "!=" | ">" | ">=" | "<" | "<=" | "in"
  value?: any
  and?: VisibilityCondition[]
  or?: VisibilityCondition[]
}

export type ValidationFunction = (value: any) => boolean | string | Promise<boolean | string>

export type ValidationRule = {
  required?: boolean | string
  minLength?: number
  maxLength?: number
  min?: number
  max?: number
  pattern?: string | RegExp
  custom?: ValidationFunction
}

export interface TextFieldMetadata extends BaseFieldMetadata {
  type: "text"
  min_length?: number
  max_length?: number
  pattern?: string | RegExp
}

export interface TextareaFieldMetadata extends BaseFieldMetadata {
  type: "textarea"
  min_length?: number
  max_length?: number
  rows?: number
}

export interface MarkdownFieldMetadata extends BaseFieldMetadata {
  type: "markdown"
  max_length?: number
}

export interface HtmlFieldMetadata extends BaseFieldMetadata {
  type: "html"
  max_length?: number
}

export interface NumberFieldMetadata extends BaseFieldMetadata {
  type: "number"
  min?: number
  max?: number
  precision?: number
  step?: number
}

export interface CurrencyFieldMetadata extends BaseFieldMetadata {
  type: "currency"
  currency?: string
  precision?: number
  min?: number
  max?: number
}

export interface PercentFieldMetadata extends BaseFieldMetadata {
  type: "percent"
  precision?: number
  min?: number
  max?: number
}

export interface BooleanFieldMetadata extends BaseFieldMetadata {
  type: "boolean"
}

export interface DateFieldMetadata extends BaseFieldMetadata {
  type: "date"
  format?: string
  min_date?: string | Date
  max_date?: string | Date
}

export interface DateTimeFieldMetadata extends BaseFieldMetadata {
  type: "datetime"
  format?: string
  min_date?: string | Date
  max_date?: string | Date
}

export interface TimeFieldMetadata extends BaseFieldMetadata {
  type: "time"
  format?: string
}

export interface SelectOptionMetadata {
  label: string
  value: string
  color?: string
  icon?: string
  disabled?: boolean
}

export interface SelectFieldMetadata extends BaseFieldMetadata {
  type: "select"
  options?: SelectOptionMetadata[]
  multiple?: boolean
  searchable?: boolean
}

export interface EmailFieldMetadata extends BaseFieldMetadata {
  type: "email"
  max_length?: number
}

export interface PhoneFieldMetadata extends BaseFieldMetadata {
  type: "phone"
  format?: string
}

export interface UrlFieldMetadata extends BaseFieldMetadata {
  type: "url"
  max_length?: number
}

export interface PasswordFieldMetadata extends BaseFieldMetadata {
  type: "password"
  min_length?: number
  max_length?: number
}

export interface FileMetadata {
  name: string
  original_name?: string
  size?: number
  mime_type?: string
  url?: string
}

export interface FileFieldMetadata extends BaseFieldMetadata {
  type: "file"
  multiple?: boolean
  accept?: string[]
  max_size?: number
  max_files?: number
}

export interface ImageFieldMetadata extends BaseFieldMetadata {
  type: "image"
  multiple?: boolean
  accept?: string[]
  max_size?: number
  max_files?: number
  max_width?: number
  max_height?: number
}

export interface LocationFieldMetadata extends BaseFieldMetadata {
  type: "location"
  default_zoom?: number
}

export interface LookupFieldMetadata extends BaseFieldMetadata {
  type: "lookup" | "master_detail"
  reference_to?: string
  reference_field?: string
  multiple?: boolean
  searchable?: boolean
  options?: SelectOptionMetadata[]
}

export interface FormulaFieldMetadata extends BaseFieldMetadata {
  type: "formula"
  formula?: string
  return_type?: "text" | "number" | "boolean" | "date" | "datetime"
  auto_compute?: boolean
}

export interface SummaryFieldMetadata extends BaseFieldMetadata {
  type: "summary"
  summary_object?: string
  summary_field?: string
  summary_type?: "count" | "sum" | "avg" | "min" | "max" | "first" | "last"
  summary_filter?: Record<string, any>
  auto_update?: boolean
}

export interface AutoNumberFieldMetadata extends BaseFieldMetadata {
  type: "auto_number"
  format?: string
  starting_number?: number
}

export interface UserFieldMetadata extends BaseFieldMetadata {
  type: "user" | "owner"
  multiple?: boolean
}

export interface ObjectFieldMetadata extends BaseFieldMetadata {
  type: "object"
  schema?: Record<string, any>
}

export interface VectorFieldMetadata extends BaseFieldMetadata {
  type: "vector"
  dimensions?: number
  distance_metric?: "cosine" | "euclidean" | "dot_product"
  indexed?: boolean
  normalize?: boolean
}

export interface GridColumnDefinition {
  name: string
  label?: string
  type: string
  required?: boolean
  defaultValue?: any
  width?: number
  validate?: ValidationRule
}

export interface GridFieldMetadata extends BaseFieldMetadata {
  type: "grid"
  columns?: GridColumnDefinition[]
  min_rows?: number
  max_rows?: number
  allow_add?: boolean
  allow_delete?: boolean
  allow_reorder?: boolean
}

export interface ColorFieldMetadata extends BaseFieldMetadata {
  type: "color"
}

export interface CodeFieldMetadata extends BaseFieldMetadata {
  type: "code"
}

export interface AvatarFieldMetadata extends BaseFieldMetadata {
  type: "avatar"
}

export interface SignatureFieldMetadata extends BaseFieldMetadata {
  type: "signature"
}

export interface QRCodeFieldMetadata extends BaseFieldMetadata {
  type: "qrcode"
}

export interface AddressFieldMetadata extends BaseFieldMetadata {
  type: "address"
}

export interface GeolocationFieldMetadata extends BaseFieldMetadata {
  type: "geolocation"
}

export interface SliderFieldMetadata extends BaseFieldMetadata {
  type: "slider"
  min?: number
  max?: number
}

export interface RatingFieldMetadata extends BaseFieldMetadata {
  type: "rating"
  max?: number
}

export interface MasterDetailFieldMetadata extends BaseFieldMetadata {
  type: "master_detail"
  reference_to?: string
}

export type FieldMetadata =
  | TextFieldMetadata
  | TextareaFieldMetadata
  | MarkdownFieldMetadata
  | HtmlFieldMetadata
  | NumberFieldMetadata
  | CurrencyFieldMetadata
  | PercentFieldMetadata
  | BooleanFieldMetadata
  | DateFieldMetadata
  | DateTimeFieldMetadata
  | TimeFieldMetadata
  | SelectFieldMetadata
  | EmailFieldMetadata
  | PhoneFieldMetadata
  | UrlFieldMetadata
  | PasswordFieldMetadata
  | FileFieldMetadata
  | ImageFieldMetadata
  | LocationFieldMetadata
  | LookupFieldMetadata
  | FormulaFieldMetadata
  | SummaryFieldMetadata
  | AutoNumberFieldMetadata
  | UserFieldMetadata
  | ObjectFieldMetadata
  | VectorFieldMetadata
  | GridFieldMetadata
  | ColorFieldMetadata
  | CodeFieldMetadata
  | AvatarFieldMetadata
  | SignatureFieldMetadata
  | QRCodeFieldMetadata
  | AddressFieldMetadata
  | GeolocationFieldMetadata
  | SliderFieldMetadata
  | RatingFieldMetadata
  | MasterDetailFieldMetadata

export interface ObjectTrigger {
  name: string
  when: "before" | "after"
  on: "create" | "update" | "delete" | "read"
  condition?: string
  action: "validation" | "workflow" | "notification" | "calculation" | "custom"
  config?: Record<string, any>
}

export interface SharingRule {
  name: string
  criteria?: Record<string, any>
  access_level: "read" | "edit" | "full"
  share_with?: { users?: string[]; roles?: string[]; groups?: string[] }
}

export interface ObjectPermission {
  profile?: string
  roles?: string[]
  create?: boolean
  read?: boolean
  update?: boolean
  delete?: boolean
  record_level?: {
    own_records_only?: boolean
    sharing_rules?: SharingRule[]
  }
  field_permissions?: Record<string, { read?: boolean; edit?: boolean }>
}

export interface ObjectIndex {
  name: string
  fields: string[]
  unique?: boolean
  type?: "btree" | "hash" | "gist" | "gin"
}

export interface ObjectRelationship {
  name: string
  object: string
  type: "one-to-one" | "one-to-many" | "many-to-one" | "many-to-many"
  foreign_key?: string
  cascade_delete?: boolean
}

export interface ObjectSchemaMetadata {
  name: string
  label?: string
  description?: string
  fields: Record<string, FieldMetadata>
  permissions?: ObjectPermission
  extends?: string
  triggers?: ObjectTrigger[]
  primary_key?: string
  indexes?: ObjectIndex[]
  relationships?: ObjectRelationship[]
  name_field?: string
  soft_delete?: boolean
  audit_trail?: boolean
  version?: string
  cache?: {
    enabled?: boolean
    ttl?: number
    invalidation?: "time" | "event" | "manual"
  }
}

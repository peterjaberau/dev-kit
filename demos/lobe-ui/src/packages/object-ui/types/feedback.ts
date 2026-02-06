import type { BaseSchema } from "./base"
export interface LoadingSchema extends BaseSchema {
  type: "loading"
  label?: string
  size?: "sm" | "default" | "lg"
  variant?: "spinner" | "dots" | "pulse"
  fullscreen?: boolean
}

export interface ProgressSchema extends BaseSchema {
  type: "progress"
  value?: number
  max?: number
  variant?: "default" | "success" | "warning" | "error"
  showLabel?: boolean
  size?: "sm" | "default" | "lg"
  indeterminate?: boolean
}

export interface SkeletonSchema extends BaseSchema {
  type: "skeleton"
  variant?: "text" | "circular" | "rectangular"
  width?: string | number
  height?: string | number
  lines?: number
  animate?: boolean
}

export interface ToastSchema extends BaseSchema {
  type: "toast"
  title?: string
  description?: string
  variant?: "default" | "success" | "warning" | "error" | "info"
  duration?: number
  position?: "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right"
  action?: {
    label: string
    onClick: () => void
  }
  onDismiss?: () => void
}

export interface ToasterSchema extends BaseSchema {
  type: "toaster"
  position?: "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right"
  limit?: number
}

export interface SpinnerSchema extends BaseSchema {
  type: "spinner"
  size?: "sm" | "md" | "lg" | "xl"
}

export interface EmptySchema extends BaseSchema {
  type: "empty"
  title?: string
  description?: string
  icon?: string
}

export interface SonnerSchema extends BaseSchema {
  type: "sonner"
  message?: string
  title?: string
  description?: string
  variant?: "default" | "success" | "error" | "warning" | "info"
  buttonLabel?: string
  buttonVariant?: "default" | "secondary" | "destructive" | "outline" | "ghost" | "link"
}

export type FeedbackSchema =
  | LoadingSchema
  | ProgressSchema
  | SkeletonSchema
  | ToastSchema
  | ToasterSchema
  | SpinnerSchema
  | EmptySchema
  | SonnerSchema

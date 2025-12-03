import React from "react"
import { PanelContentEmpty } from "./panel-content-empty"
import { PanelContentError } from "./panel-content-error"
import { PanelContentLoader } from "./panel-content-loader"
import { PanelContentPlaceholder } from "./panel-content-placeholder"

export interface PanelContentProps {
  children?: React.ReactNode
  renderAs?: "empty" | "placeholder" | "error" | "loader" | undefined
  title?: string
  description?: string
  [key: string]: any
}

export const ContentRenderMap = {
  empty: PanelContentEmpty,
  placeholder: PanelContentPlaceholder,
  error: PanelContentError,
  loader: PanelContentLoader,
}

export const PanelContent = ({ renderAs, children, ...rest }: PanelContentProps) => {
  // If renderAs not provided → render children
  if (!renderAs) return <>{children}</>
  // Now TS knows renderAs is defined
  const Component = ContentRenderMap[renderAs]
  // Fallback if someone passes an invalid value (runtime safety)
  if (!Component) return <>{children}</>

  return <Component {...rest} />
}

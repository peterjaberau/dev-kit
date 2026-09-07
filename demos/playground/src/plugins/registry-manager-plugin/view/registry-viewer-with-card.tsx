"use client"
import { CardWithScrollArea } from "../components/card-with-scroll-area"
import { ComponentRenderer } from "#registry"
import { RegistryThemeProvider } from './registry-theme-provider'

export interface RegistryViewerWithCardProps {
  componentId?: string | any
  title?: string
  options?: any
  data?: any
}

export default function Index(props: RegistryViewerWithCardProps) {
  const { componentId, title = "untitled", options = {}, data = null } = props

  return (
    <RegistryThemeProvider>
      <CardWithScrollArea title={title}>
        <ComponentRenderer id={componentId} props={options} />
      </CardWithScrollArea>
    </RegistryThemeProvider>
  )
}

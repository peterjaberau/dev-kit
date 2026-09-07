"use client"
import { WrapperWithScrollArea } from "../components/wrapper-with-scroll-area"
import { ComponentRenderer } from "#registry"
import { RegistryThemeProvider } from './registry-theme-provider'

export interface RegistryViewerProps {
  componentId?: string | any
  options?: any
  data?: any
}

export default function Index(props: RegistryViewerProps) {
  const { componentId, options = {}, data = null } = props

  return (
    <RegistryThemeProvider>
      <WrapperWithScrollArea>
        <ComponentRenderer id={componentId} props={options} />
      </WrapperWithScrollArea>
    </RegistryThemeProvider>
  )
}

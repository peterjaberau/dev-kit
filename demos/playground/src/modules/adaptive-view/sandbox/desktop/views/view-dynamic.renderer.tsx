"use client"

import { Text } from "@chakra-ui/react"
import { useView } from "../selectors"
import { ComponentRenderer } from "#registry"
import { RegistryThemeProvider } from "#plugins/registry-manager-plugin/view/registry-theme-provider"

export interface ViewDynamicRendererProps {
  viewId?: string
  componentId?: string
  options?: Record<string, unknown>
}

export function ViewDynamicRenderer({ viewId = "", componentId, options }: ViewDynamicRendererProps) {
  const { viewPlugin, viewProps } = useView(viewId)
  const resolvedComponentId = componentId ?? viewPlugin
  const resolvedOptions = options ?? viewProps

  if (!resolvedComponentId) {
    return <Text padding="3">View not found: {viewId || "unconfigured"}</Text>
  }
  return (
    <div
      data-id="view-dynamic-renderer"
      data-desktop-theme-isolated
      style={{ width: "100%", height: "100%", minWidth: 0, minHeight: 0 }}
    >
      <RegistryThemeProvider>
        <ComponentRenderer id={resolvedComponentId} props={resolvedOptions} />
      </RegistryThemeProvider>
    </div>
  )
}

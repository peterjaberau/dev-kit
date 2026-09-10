"use client"

import type { ReactNode } from "react"
import { Box, type BoxProps } from "@chakra-ui/react"
import type { DockviewApi, IDockviewPanelProps } from "#adaptive-view/react"
import { PanelRenderer } from "../../adaptive-view/sandbox/components/panelRenderer"

export interface LayoutPanelProps extends BoxProps {
  api: DockviewApi
  panelProps: IDockviewPanelProps
  children: ReactNode
  scrollable?: boolean
}

export function LayoutPanel({ api, panelProps, children, scrollable = true, ...boxProps }: LayoutPanelProps) {
  return (
    <PanelRenderer api={panelProps.api} scrollable={scrollable}>
      <Box
        data-debugger-layout-id={api.id}
        data-debugger-panel-id={panelProps.api.id}
        width="full"
        minWidth={0}
        minHeight="full"
        {...boxProps}
      >
        {children}
      </Box>
    </PanelRenderer>
  )
}

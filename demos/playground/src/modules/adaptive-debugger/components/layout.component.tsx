"use client"

import type { ReactNode } from "react"
import { Box, type BoxProps } from "@chakra-ui/react"
import type { DockviewApi, IDockviewPanelProps } from "#adaptive-view/react"

export interface LayoutPanelProps extends BoxProps {
  api: DockviewApi
  panelProps: IDockviewPanelProps
  children: ReactNode
}

export function LayoutPanel({ api, panelProps, children, ...boxProps }: LayoutPanelProps) {
  return (
    <Box
      data-debugger-layout-id={api.id}
      data-debugger-panel-id={panelProps.api.id}
      width="full"
      height="full"
      minWidth={0}
      minHeight={0}
      overflow="hidden"
      {...boxProps}
    >
      {children}
    </Box>
  )
}

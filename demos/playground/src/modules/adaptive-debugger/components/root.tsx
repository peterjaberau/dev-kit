"use client"

import { Box, FloatingPanel, IconButton, Portal } from "@chakra-ui/react"
import { LuBug, LuX } from "react-icons/lu"
import { AdaptiveDebuggerProvider } from "../provider"
import { useAdaptiveDebugger } from "../selectors"
import { AdaptiveDebuggerLayout } from "./layout"

function AdaptiveDebuggerPanel() {
  const { open, sentToAdaptiveDebugger } = useAdaptiveDebugger()

  return (
    <FloatingPanel.Root
      open={open}
      onOpenChange={(details) =>
        sentToAdaptiveDebugger({
          type: "ON_OPEN_CHANGE",
          open: details.open,
        })
      }
    >
      <FloatingPanel.Trigger asChild>
        <IconButton
          aria-label="Open adaptive debugger"
          position="fixed"
          right="4"
          top="50%"
          transform="translateY(-50%)"
          zIndex="modal"
          colorPalette="blue"
          boxShadow="lg"
        >
          <LuBug />
        </IconButton>
      </FloatingPanel.Trigger>

      <Portal>
        <FloatingPanel.Positioner>
          <FloatingPanel.Content
            width="min(760px, calc(100vw - 32px))"
            height="min(560px, calc(100vh - 32px))"
            minWidth="360px"
            minHeight="280px"
            zIndex="modal"
          >
            <FloatingPanel.Header>
              <FloatingPanel.DragTrigger flex="1">
                <FloatingPanel.Title>Adaptive Debugger</FloatingPanel.Title>
              </FloatingPanel.DragTrigger>
              <FloatingPanel.Control>
                <FloatingPanel.CloseTrigger asChild>
                  <IconButton aria-label="Close adaptive debugger" size="xs" variant="ghost">
                    <LuX />
                  </IconButton>
                </FloatingPanel.CloseTrigger>
              </FloatingPanel.Control>
            </FloatingPanel.Header>
            <FloatingPanel.Body padding="0" overflow="hidden">
              <Box width="full" height="full" minHeight={0}>
                <AdaptiveDebuggerLayout />
              </Box>
            </FloatingPanel.Body>
            <FloatingPanel.ResizeTriggers />
          </FloatingPanel.Content>
        </FloatingPanel.Positioner>
      </Portal>
    </FloatingPanel.Root>
  )
}

export function AdaptiveDebuggerRoot() {
  return (
    <AdaptiveDebuggerProvider>
      <AdaptiveDebuggerPanel />
    </AdaptiveDebuggerProvider>
  )
}

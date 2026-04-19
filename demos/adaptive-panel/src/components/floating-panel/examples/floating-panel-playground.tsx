"use client"

import * as React from "react"
import { Box, Button, Flex, HStack, Stack, Switch, Text, Portal } from "@chakra-ui/react"
import { FloatingPanel, useFloatingPanel } from ".."

const axes = ["n", "s", "e", "w", "ne", "nw", "se", "sw"] as const

type SwitchFieldProps = {
  label: string
  checked: boolean
  onCheckedChange: (checked: boolean) => void
}

function SwitchField(props: SwitchFieldProps) {
  const { label, checked, onCheckedChange } = props

  return (
    <Switch.Root checked={checked} onCheckedChange={(e) => onCheckedChange(!!(e as any).checked)}>
      <Switch.HiddenInput />
      <Switch.Control />
      <Switch.Label>{label}</Switch.Label>
    </Switch.Root>
  )
}

function Grip() {
  // minimal “grip” visual (no extra icon deps)
  return (
    <Box
      as="span"
      aria-hidden="true"
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      w="4"
      color="fg.muted"
      userSelect="none"
      cursor="grab"
      fontSize="sm"
      lineHeight="1"
    >
      ⋮⋮
    </Box>
  )
}

export default function FloatingPanelPlayground() {
  return (
    <Flex direction="column" gap="10" p="8">
      <ControlledComposableDemo />
      <Box borderTopWidth="1px" pt="10" />
      <UncontrolledDemo />
    </Flex>
  )
}

function ControlledComposableDemo() {
  const [draggable, setDraggable] = React.useState(true)
  const [resizable, setResizable] = React.useState(true)

  const panel = useFloatingPanel({
    draggable,
    resizable,
    defaultOpen: true,
    defaultPosition: { x: 80, y: 80 },
    defaultSize: { width: 420, height: 280 },
    minSize: { width: 320, height: 180 },
  })

  return (
    <Stack gap="4" align="flex-start">
      <Text fontSize="lg" fontWeight="semibold">
        1) Controlled / composable (useFloatingPanel + RootProvider)
      </Text>

      <Box borderWidth="1px" rounded="md" p="4" bg="bg.subtle" w="full" maxW="xl">
        <Stack gap="3">
          <Text fontWeight="medium">Control Panel</Text>

          <HStack gap="2" flexWrap="wrap">
            <Button size="sm" onClick={() => panel.setOpen(true)}>
              Open
            </Button>
            <Button size="sm" variant="subtle" onClick={() => panel.setOpen(false)}>
              Close
            </Button>
            <Button size="sm" variant="outline" onClick={() => panel.setOpen(!panel.open)}>
              Toggle
            </Button>

            <Button size="sm" variant="outline" onClick={() => panel.minimize()}>
              Minimize
            </Button>
            <Button size="sm" variant="outline" onClick={() => panel.maximize()}>
              Maximize
            </Button>
            <Button size="sm" variant="outline" onClick={() => panel.restore()}>
              Restore
            </Button>
          </HStack>

          <HStack gap="6" flexWrap="wrap">
            <SwitchField label="draggable" checked={draggable} onCheckedChange={setDraggable} />
            <SwitchField label="resizable" checked={resizable} onCheckedChange={setResizable} />

            <Text fontSize="sm" color="fg.muted">
              open: {panel.open ? "true" : "false"} | dragging: {panel.dragging ? "true" : "false"} | resizing:{" "}
              {panel.resizing ? "true" : "false"}
            </Text>
          </HStack>
        </Stack>
      </Box>

      <FloatingPanel.RootProvider value={panel}>
        <FloatingPanel.Trigger asChild>
          <Button size="sm" variant="subtle">
            Trigger (provider)
          </Button>
        </FloatingPanel.Trigger>

        {/* Portal like Ark’s examples */}
        <Portal>
          <FloatingPanel.Positioner>
            <FloatingPanel.Content>
              {/* ✅ Ark-style drag: DragTrigger wraps the header area */}
              <FloatingPanel.DragTrigger>
                <FloatingPanel.Header>
                  <HStack gap="2">
                    <Grip />
                    <FloatingPanel.Title>FloatingPanel (controlled)</FloatingPanel.Title>
                  </HStack>

                  <FloatingPanel.Control gap="2">
                    <FloatingPanel.StageTrigger stage="minimized" asChild>
                      <Button size="xs" variant="outline">
                        Min
                      </Button>
                    </FloatingPanel.StageTrigger>

                    <FloatingPanel.StageTrigger stage="maximized" asChild>
                      <Button size="xs" variant="outline">
                        Max
                      </Button>
                    </FloatingPanel.StageTrigger>

                    <FloatingPanel.StageTrigger stage="default" asChild>
                      <Button size="xs" variant="outline">
                        Default
                      </Button>
                    </FloatingPanel.StageTrigger>

                    <FloatingPanel.CloseTrigger asChild>
                      <Button size="xs" variant="solid">
                        Close
                      </Button>
                    </FloatingPanel.CloseTrigger>
                  </FloatingPanel.Control>
                </FloatingPanel.Header>
              </FloatingPanel.DragTrigger>

              <FloatingPanel.Body>
                <Text fontSize="sm">Drag the header area (Ark-style). Resize using the handles.</Text>
              </FloatingPanel.Body>

              {/* Resize handles */}
              {axes.map((axis) => (
                <FloatingPanel.ResizeTrigger key={axis} axis={axis} />
              ))}
            </FloatingPanel.Content>
          </FloatingPanel.Positioner>
        </Portal>
      </FloatingPanel.RootProvider>
    </Stack>
  )
}

function UncontrolledDemo() {
  const [draggable, setDraggable] = React.useState(true)
  const [resizable, setResizable] = React.useState(true)

  return (
    <Stack gap="4" align="flex-start">
      <Text fontSize="lg" fontWeight="semibold">
        2) Uncontrolled (no provider)
      </Text>

      <HStack gap="6" flexWrap="wrap" borderWidth="1px" rounded="md" p="3">
        <SwitchField label="draggable" checked={draggable} onCheckedChange={setDraggable} />
        <SwitchField label="resizable" checked={resizable} onCheckedChange={setResizable} />
      </HStack>

      <FloatingPanel.Root
        draggable={draggable}
        resizable={resizable}
        defaultOpen={false}
        defaultPosition={{ x: 80, y: 420 }}
        defaultSize={{ width: 420, height: 260 }}
        minSize={{ width: 320, height: 180 }}
      >
        <FloatingPanel.Trigger asChild>
          <Button size="sm" variant="subtle">
            Open Panel
          </Button>
        </FloatingPanel.Trigger>

        <Portal>
          <FloatingPanel.Positioner>
            <FloatingPanel.Content>
              {/* ✅ Ark-style drag in uncontrolled version too */}
              <FloatingPanel.DragTrigger>
                <FloatingPanel.Header>
                  <HStack gap="2">
                    <Grip />
                    <FloatingPanel.Title>FloatingPanel (uncontrolled)</FloatingPanel.Title>
                  </HStack>

                  <FloatingPanel.Control gap="2">
                    <FloatingPanel.CloseTrigger asChild>
                      <Button size="xs" variant="solid">
                        Close
                      </Button>
                    </FloatingPanel.CloseTrigger>
                  </FloatingPanel.Control>
                </FloatingPanel.Header>
              </FloatingPanel.DragTrigger>

              <FloatingPanel.Body>
                <Text fontSize="sm">Drag the header. Resize using corner handles.</Text>
              </FloatingPanel.Body>

              {/* simpler resize UX: corners only */}
              <FloatingPanel.ResizeTrigger axis="se" />
              <FloatingPanel.ResizeTrigger axis="sw" />
              <FloatingPanel.ResizeTrigger axis="ne" />
              <FloatingPanel.ResizeTrigger axis="nw" />
            </FloatingPanel.Content>
          </FloatingPanel.Positioner>
        </Portal>
      </FloatingPanel.Root>
    </Stack>
  )
}

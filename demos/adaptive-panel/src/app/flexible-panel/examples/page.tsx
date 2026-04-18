"use client"

import * as React from "react"
import { Box, Button, Flex, HStack, Stack, Switch, Text, Portal } from "@chakra-ui/react"
import { FlexiblePanel, useFloatingPanel } from "#components/flexible-panel"

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

export default function Page() {
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

      <FlexiblePanel.RootProvider value={panel}>
        <FlexiblePanel.Trigger asChild>
          <Button size="sm" variant="subtle">
            Trigger (provider)
          </Button>
        </FlexiblePanel.Trigger>

        {/* Portal like Ark’s examples */}
        <Portal>
          <FlexiblePanel.Positioner>
            <FlexiblePanel.Content>
              {/* ✅ Ark-style drag: DragTrigger wraps the header area */}
              <FlexiblePanel.DragTrigger>
                <FlexiblePanel.Header>
                  <HStack gap="2">
                    <Grip />
                    <FlexiblePanel.Title>FlexiblePanel (controlled)</FlexiblePanel.Title>
                  </HStack>

                  <FlexiblePanel.Control gap="2">
                    <FlexiblePanel.StageTrigger stage="minimized" asChild>
                      <Button size="xs" variant="outline">
                        Min
                      </Button>
                    </FlexiblePanel.StageTrigger>

                    <FlexiblePanel.StageTrigger stage="maximized" asChild>
                      <Button size="xs" variant="outline">
                        Max
                      </Button>
                    </FlexiblePanel.StageTrigger>

                    <FlexiblePanel.StageTrigger stage="default" asChild>
                      <Button size="xs" variant="outline">
                        Default
                      </Button>
                    </FlexiblePanel.StageTrigger>

                    <FlexiblePanel.CloseTrigger asChild>
                      <Button size="xs" variant="solid">
                        Close
                      </Button>
                    </FlexiblePanel.CloseTrigger>
                  </FlexiblePanel.Control>
                </FlexiblePanel.Header>
              </FlexiblePanel.DragTrigger>

              <FlexiblePanel.Body>
                <Text fontSize="sm">Drag the header area (Ark-style). Resize using the handles.</Text>
              </FlexiblePanel.Body>

              {/* Resize handles */}
              {axes.map((axis) => (
                <FlexiblePanel.ResizeTrigger key={axis} axis={axis} />
              ))}
            </FlexiblePanel.Content>
          </FlexiblePanel.Positioner>
        </Portal>
      </FlexiblePanel.RootProvider>
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

      <FlexiblePanel.Root
        draggable={draggable}
        resizable={resizable}
        defaultOpen={false}
        defaultPosition={{ x: 80, y: 420 }}
        defaultSize={{ width: 420, height: 260 }}
        minSize={{ width: 320, height: 180 }}
      >
        <FlexiblePanel.Trigger asChild>
          <Button size="sm" variant="subtle">
            Open Panel
          </Button>
        </FlexiblePanel.Trigger>

        <Portal>
          <FlexiblePanel.Positioner>
            <FlexiblePanel.Content>
              {/* ✅ Ark-style drag in uncontrolled version too */}
              <FlexiblePanel.DragTrigger>
                <FlexiblePanel.Header>
                  <HStack gap="2">
                    <Grip />
                    <FlexiblePanel.Title>FlexiblePanel (uncontrolled)</FlexiblePanel.Title>
                  </HStack>

                  <FlexiblePanel.Control gap="2">
                    <FlexiblePanel.CloseTrigger asChild>
                      <Button size="xs" variant="solid">
                        Close
                      </Button>
                    </FlexiblePanel.CloseTrigger>
                  </FlexiblePanel.Control>
                </FlexiblePanel.Header>
              </FlexiblePanel.DragTrigger>

              <FlexiblePanel.Body>
                <Text fontSize="sm">Drag the header. Resize using corner handles.</Text>
              </FlexiblePanel.Body>

              {/* simpler resize UX: corners only */}
              <FlexiblePanel.ResizeTrigger axis="se" />
              <FlexiblePanel.ResizeTrigger axis="sw" />
              <FlexiblePanel.ResizeTrigger axis="ne" />
              <FlexiblePanel.ResizeTrigger axis="nw" />
            </FlexiblePanel.Content>
          </FlexiblePanel.Positioner>
        </Portal>
      </FlexiblePanel.Root>
    </Stack>
  )
}
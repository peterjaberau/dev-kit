"use client"

import * as React from "react"
import { Box, Button, Flex, HStack, Stack, Switch, Text } from "@chakra-ui/react"
import { FlexiblePanel, useFloatingPanel } from "#components/flexible-panel"
import { DockableFlexiblePanel, DockablePanelApi } from "#components/flexible-panel/DockableFlexiblePanel"
import type { Dock } from "#components/flexible-panel/usePanelDocking"

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
  const [draggable, setDraggable] = React.useState(true)
  const [resizable, setResizable] = React.useState(true)

  const panel = useFloatingPanel({
    draggable,
    resizable,
    defaultOpen: false,
    defaultPosition: { x: 600, y: 80 },
    defaultSize: { width: 600, height: 280 },
    minSize: { width: 320, height: 180 },
  })

  const [dock, setDock] = React.useState<Dock>("floating")

  const dockApiRef = React.useRef<DockablePanelApi | null>(null)

  return (
    <Flex direction="column" gap="10" p="8">
      <Text fontSize="lg" fontWeight="semibold">
        DockableFlexiblePanel (dock UI outside)
      </Text>

      <Box borderWidth="1px" rounded="md" p="4" bg="bg.subtle" w="full" maxW="xl">
        <Stack gap="3">
          <Text fontWeight="medium">Control Panel</Text>

          <HStack gap="6" flexWrap="wrap" align="center">
            <SwitchField label="draggable" checked={draggable} onCheckedChange={setDraggable} />
            <SwitchField label="resizable" checked={resizable} onCheckedChange={setResizable} />

            {/* Dock UI OUTSIDE the panel */}
            <HStack gap="2">
              <Button
                size="xs"
                variant={dock === "left" ? "solid" : "outline"}
                onClick={() => dockApiRef.current?.setDock("left")}
              >
                Left
              </Button>
              <Button
                size="xs"
                variant={dock === "right" ? "solid" : "outline"}
                onClick={() => dockApiRef.current?.setDock("right")}
              >
                Right
              </Button>
              <Button
                size="xs"
                variant={dock === "bottom" ? "solid" : "outline"}
                onClick={() => dockApiRef.current?.setDock("bottom")}
              >
                Bottom
              </Button>
              <Button
                size="xs"
                variant={dock === "floating" ? "solid" : "outline"}
                onClick={() => dockApiRef.current?.setDock("floating")}
              >
                Float
              </Button>

              <DockableFlexiblePanel
                value={panel}
                dock={dock}
                onDockChange={setDock}
                dockApiRef={dockApiRef}
                trigger={
                  <Button size="sm" variant="subtle">
                    Toggle panel
                  </Button>
                }
                triggerBehavior="toggle"
              >
                {() => (
                  <>
                    <FlexiblePanel.DragTrigger>
                      <FlexiblePanel.Header>
                        <HStack gap="2">
                          <Grip />
                          <FlexiblePanel.Title>FlexiblePanel</FlexiblePanel.Title>
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
                      <Text fontSize="sm">Docking controls are outside the panel.</Text>
                    </FlexiblePanel.Body>

                    {axes.map((axis) => (
                      <FlexiblePanel.ResizeTrigger key={axis} axis={axis} />
                    ))}
                  </>
                )}
              </DockableFlexiblePanel>
            </HStack>

            <Text fontSize="sm" color="fg.muted">
              dock: {dock} | open: {panel.open ? "true" : "false"} | pos: {panel.position.x},{panel.position.y} | size:{" "}
              {panel.size.width}×{panel.size.height}
            </Text>
          </HStack>
        </Stack>
      </Box>
    </Flex>
  )
}
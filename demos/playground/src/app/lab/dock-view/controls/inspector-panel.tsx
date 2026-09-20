"use client"

import { useState } from "react"
import { Button, CloseButton, FloatingPanel, Portal, SegmentGroup, useFloatingPanel } from "@chakra-ui/react"

import { LuGripHorizontal } from "react-icons/lu"
import { PlaygroundInspector } from "./playground-inspector"
import { InspectorActivity } from "./inspector-activity"
import { InspectorJson } from "./inspector-json"

export function InspectorPanel() {
  const [section, setSection] = useState("control")
  const floatingPanel = useFloatingPanel({
    defaultSize: { width: 600, height: 560 },
    minSize: { width: 320, height: 240 },
    persistRect: true,
    closeOnEscape: true,
    getAnchorPosition: ({ triggerRect }) => ({
      x: Math.max(8, (triggerRect?.right ?? 624) - 600),
      y: (triggerRect?.bottom ?? 16) + 8,
    }),
  })

  return (
    <FloatingPanel.RootProvider value={floatingPanel} lazyMount>
      <Button
        {...floatingPanel.getTriggerProps()}
        position="fixed"
        top="4"
        right="4"
        zIndex="sticky"
        size="sm"
        onClick={() => floatingPanel.setOpen(true)}
      >
        Inspect
      </Button>
      <Portal>
        <FloatingPanel.Positioner>
          <FloatingPanel.Content maxW="calc(100vw - 16px)" maxH="calc(100dvh - 16px)">
            <FloatingPanel.Header>
              <FloatingPanel.DragTrigger>
                <LuGripHorizontal />
                <FloatingPanel.Title>View inspector</FloatingPanel.Title>
                <SegmentGroup.Root
                  size="xs"
                  value={section}
                  onValueChange={({ value }) => {
                    if (value) setSection(value)
                  }}
                  aria-label="Inspector section"
                  flexShrink="0"
                  onPointerDown={(event) => event.stopPropagation()}
                >
                  <SegmentGroup.Indicator />
                  <SegmentGroup.Items
                    items={[
                      { value: "control", label: "Control" },
                      { value: "activity", label: "Activity" },
                      { value: "json", label: "JSON" },
                    ]}
                  />
                </SegmentGroup.Root>
              </FloatingPanel.DragTrigger>
              <FloatingPanel.Control>
                <FloatingPanel.CloseTrigger asChild>
                  <CloseButton size="2xs" aria-label="Close inspector" />
                </FloatingPanel.CloseTrigger>
              </FloatingPanel.Control>
            </FloatingPanel.Header>
            <FloatingPanel.Body minH="0" overflowY="auto" overscrollBehavior="contain" p="0">
              {section === "control" && <PlaygroundInspector />}
              {section === "activity" && <InspectorActivity />}
              {section === "json" && <InspectorJson />}
            </FloatingPanel.Body>
            <FloatingPanel.ResizeTriggers />
          </FloatingPanel.Content>
        </FloatingPanel.Positioner>
      </Portal>
    </FloatingPanel.RootProvider>
  )
}

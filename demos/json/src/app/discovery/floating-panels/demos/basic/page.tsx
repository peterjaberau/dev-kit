"use client"

import { FloatingPanel } from "@ark-ui/react/floating-panel"
import { Portal } from "@ark-ui/react/portal"
import { ArrowDownLeft, Maximize2, Minus, X, GripVertical } from "lucide-react"

export default function Basic() {
  return (
    <FloatingPanel.Root>
      <FloatingPanel.Trigger className="focus:outline-hidden rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
        Open Panel
      </FloatingPanel.Trigger>

      <Portal>
        <FloatingPanel.Positioner className="z-50">
          <FloatingPanel.Content className="data-maximized:rounded-none flex w-full min-w-80 flex-col rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-900">
            <FloatingPanel.DragTrigger>
              <FloatingPanel.Header className="flex cursor-move items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-2 dark:border-gray-700 dark:bg-gray-800">
                <div className="flex items-center gap-2">
                  <GripVertical className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                  <FloatingPanel.Title className="font-medium text-gray-900 dark:text-gray-100">
                    Floating Panel
                  </FloatingPanel.Title>
                </div>
                <FloatingPanel.Control className="flex items-center gap-1">
                  <FloatingPanel.StageTrigger
                    stage="minimized"
                    className="flex h-6 w-6 items-center justify-center rounded text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"
                  >
                    <Minus className="h-3 w-3" />
                  </FloatingPanel.StageTrigger>
                  <FloatingPanel.StageTrigger
                    stage="maximized"
                    className="flex h-6 w-6 items-center justify-center rounded text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"
                  >
                    <Maximize2 className="h-3 w-3" />
                  </FloatingPanel.StageTrigger>
                  <FloatingPanel.StageTrigger
                    stage="default"
                    className="flex h-6 w-6 items-center justify-center rounded text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"
                  >
                    <ArrowDownLeft className="h-3 w-3" />
                  </FloatingPanel.StageTrigger>
                  <FloatingPanel.CloseTrigger className="flex h-6 w-6 items-center justify-center rounded text-gray-500 transition-colors hover:bg-red-50 hover:text-red-600 dark:text-gray-400 dark:hover:bg-red-900/20 dark:hover:text-red-400">
                    <X className="h-3 w-3" />
                  </FloatingPanel.CloseTrigger>
                </FloatingPanel.Control>
              </FloatingPanel.Header>
            </FloatingPanel.DragTrigger>

            <FloatingPanel.Body className="flex flex-col gap-4 p-4">
              <p className="text-gray-600 dark:text-gray-300">
                This is a basic floating panel. You can drag it around by the header, resize it using the edges, and
                control its state using the buttons in the header.
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Try dragging, resizing, minimizing, maximizing, or closing this panel.
              </p>
            </FloatingPanel.Body>

            {/* Resize handles */}
            <FloatingPanel.ResizeTrigger axis="n" />
            <FloatingPanel.ResizeTrigger axis="e" />
            <FloatingPanel.ResizeTrigger axis="w" />
            <FloatingPanel.ResizeTrigger axis="s" />
            <FloatingPanel.ResizeTrigger axis="ne" />
            <FloatingPanel.ResizeTrigger axis="se" />
            <FloatingPanel.ResizeTrigger axis="sw" />
            <FloatingPanel.ResizeTrigger axis="nw" />
          </FloatingPanel.Content>
        </FloatingPanel.Positioner>
      </Portal>
    </FloatingPanel.Root>
  )
}

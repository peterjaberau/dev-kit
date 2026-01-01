"use client"

import { createRoot, type Root } from "react-dom/client"
import { useEffect, useRef, useState } from "react"
import { Box } from "@chakra-ui/react"

import { draggable, setCustomNativeDragPreview } from "../shared/imports/dnd"
import { DraggableItemProps } from "../shared/types"
import { DraggablePreviewItem } from "./draggable.preview-item"

export const DraggableItem = ({
  id,
  index,
  mode = "list",
  children,
  style,
  dragStyle = { opacity: 0.5 },
  getData,
  onDragStart,
  onDrop,
  badgeCount,
}: DraggableItemProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  let previewRoot: Root | null = null

  const cleanupPreview = () => {
    previewRoot?.unmount()
    previewRoot = null
  }

  useEffect(() => {
    const element = ref.current
    if (!element) return

    let previewRoot: Root | null = null
    return draggable({
      element,
      getInitialData: () => ({
        type: mode === "tree" ? "tree-item" : "list-item",
        id,
        ids: [id], // Support multi-item drag (can be overridden by getData)
        index,
        rect: element.getBoundingClientRect(),
        ...getData?.(),
      }),
      onGenerateDragPreview: ({ nativeSetDragImage }) => {
        setCustomNativeDragPreview({
          nativeSetDragImage,
          render: ({ container }) => {
            cleanupPreview()

            previewRoot = createRoot(container)
            previewRoot.render(<DraggablePreviewItem badgeCount={badgeCount}>{children}</DraggablePreviewItem>)
          },
        })
      },
      onDragStart: () => {
        setIsDragging(true)
        onDragStart?.()
      },
      onDrop: () => {
        previewRoot?.unmount()
        previewRoot = null
        setIsDragging(false)
        onDrop?.()
      },
    })
  }, [id, index, mode, getData, onDragStart, onDrop, badgeCount])

  return (
    <Box
      ref={ref}
      css={{
        ...style,
        ...(isDragging && dragStyle),
      }}
    >
      {children}
    </Box>
  )
}

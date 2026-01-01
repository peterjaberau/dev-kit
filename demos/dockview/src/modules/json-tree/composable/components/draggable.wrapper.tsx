"use client"
import { chakra } from "@chakra-ui/react"
import React, { useEffect, useRef, useState } from "react"
import { draggable } from "../shared/imports/dnd"
import { DraggableWrapperProps } from "../shared/types"

export function DraggableWrapper({
  dragId,
  index,
  children,
  style,
  dragStyle = {
    opacity: 0.5,
    transform: "rotate(1deg)",
    boxShadow: "md",
  },
  onDragStart,
  onDrop,
  getData,
}: DraggableWrapperProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    return draggable({
      element,
      getInitialData: ({ element }) => ({
        type: "draggable-item",
        dragId,
        index,
        rect: element.getBoundingClientRect(),
        ...getData?.(),
      }),
      onDragStart: () => {
        setIsDragging(true)
        onDragStart?.({ dragId, index })
      },
      onDrop: () => {
        setIsDragging(false)
        onDrop?.()
      },
    })
  }, [dragId, index, onDragStart, onDrop, getData])

  return (
    <chakra.div
      ref={ref}
      css={{
        ...style,
        ...(isDragging ? dragStyle : {}),
      }}
    >
      {children}
    </chakra.div>
  )
}

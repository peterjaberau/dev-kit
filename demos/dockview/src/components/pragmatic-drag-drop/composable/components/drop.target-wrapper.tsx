"use client"

import React, { useEffect, useRef, useState } from "react"
import { dropTargetForElements } from "../shared/imports/dnd"
import { DropTargetWrapperProps } from "../shared/types"

// Define interfaces for drag and drop data structures
export function DropTargetWrapper({
  children,
  style,
  dropStyle,
  onDrop,
  canDrop,
  getData,
  dropTargetId,
  onDragEnter: onDragEnterProp,
  onDragLeave: onDragLeaveProp,
  onDrag: onDragProp,
}: DropTargetWrapperProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isDropTarget, setIsDropTarget] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    return dropTargetForElements({
      element,
      getData: ({ input }) => ({
        type: "drop-target",
        dropTargetId,
        ...(getData
          ? typeof getData === "function" && getData.length === 0
            ? getData()
            : getData({ input, element })
          : {}),
      }),
      canDrop: canDrop ? ({ source }) => canDrop({ source }) : undefined,
      onDragEnter: ({ source, location }) => {
        setIsDropTarget(true)
        onDragEnterProp?.({ source, location })
      },
      onDragLeave: ({ source, location }) => {
        setIsDropTarget(false)
        onDragLeaveProp?.({ source, location })
      },
      onDrag: ({ source, location }) => {
        onDragProp?.({ source, location })
      },
      onDrop: ({ source, location }) => {
        setIsDropTarget(false)
        onDrop({ source, location })
      },
    })
  }, [onDrop, canDrop, getData, dropTargetId, onDragEnterProp, onDragLeaveProp, onDragProp])

  return (
    <div
      ref={ref}
      style={{
        ...style,
        ...(isDropTarget ? dropStyle : {}),
      }}
    >
      {children}
    </div>
  )
}

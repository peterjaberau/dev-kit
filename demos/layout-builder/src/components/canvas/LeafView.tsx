"use client"

import { useState, useRef } from "react"
import type { LeafNode, Orientation } from "#store/layoutSlice"
import { IconButton } from '@chakra-ui/react'
import { LuX, LuPlus } from 'react-icons/lu'
import type React from "react"

export default function LeafView({
  leaf,
  selected,
  onSelect,
  onDragStart,
  onDrop,
  onDropEdge,
  onRename,
  onDelete,
  onSplit,
}: {
  leaf: LeafNode
  selected: boolean
  onSelect: () => void
  onDragStart: () => void
  onDrop: () => void
  onDropEdge?: (edge: "top" | "right" | "bottom" | "left") => void
  onRename?: (newLabel: string) => void
  onDelete?: () => void
  onSplit?: (orientation: Orientation) => void
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(leaf.label)
  const [dragOverEdge, setDragOverEdge] = useState<"top" | "right" | "bottom" | "left" | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleStartEdit = () => {
    setIsEditing(true)
    setEditValue(leaf.label)
    // Focus input after render
    setTimeout(() => {
      inputRef.current?.focus()
      inputRef.current?.select()
    }, 0)
  }

  const handleSaveEdit = () => {
    const trimmedValue = editValue.trim()
    if (trimmedValue && trimmedValue !== leaf.label && onRename) {
      onRename(trimmedValue)
    }
    setIsEditing(false)
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    setEditValue(leaf.label)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleSaveEdit()
    } else if (e.key === "Escape") {
      e.preventDefault()
      handleCancelEdit()
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()

    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const edgeThreshold = 60 // pixels from edge

    // Determine which edge is closest
    const distanceTop = y
    const distanceBottom = rect.height - y
    const distanceLeft = x
    const distanceRight = rect.width - x

    const minDistance = Math.min(distanceTop, distanceBottom, distanceLeft, distanceRight)

    if (minDistance < edgeThreshold) {
      if (minDistance === distanceTop) {
        setDragOverEdge("top")
      } else if (minDistance === distanceBottom) {
        setDragOverEdge("bottom")
      } else if (minDistance === distanceLeft) {
        setDragOverEdge("left")
      } else {
        setDragOverEdge("right")
      }
    } else {
      setDragOverEdge(null)
    }
  }

  const handleDragLeave = () => {
    setDragOverEdge(null)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()

    if (dragOverEdge && onDropEdge) {
      // Move the dragged pane to this edge
      onDropEdge(dragOverEdge)
    } else {
      // Default drop behavior (swap)
      onDrop()
    }

    setDragOverEdge(null)
  }

  return (
    <div
      ref={containerRef}
      className={`flex h-full w-full flex-col border ${
        selected ? "border-white/30 ring-2 ring-indigo-500/70" : "border-white/20"
      } group relative cursor-grab transition-shadow active:cursor-grabbing`}
      draggable
      onDragStart={(e) => {
        // Check if drag started from a gutter or rename area
        const target = e.target as HTMLElement
        if (target.closest(".gutter-button") || target.closest(".rename-area")) {
          e.preventDefault()
          return
        }
        e.dataTransfer.setData("text/plain", leaf.id)
        onDragStart()
      }}
      onClick={(e) => {
        e.stopPropagation()
        onSelect()
      }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Edge snap drop zones - visual indicators */}
      {dragOverEdge === "top" && (
        <div className="pointer-events-none absolute left-0 right-0 top-0 z-40 h-1/3 border-2 border-dashed border-indigo-400 bg-indigo-500/30">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="rounded bg-indigo-600 px-3 py-1 text-xs font-semibold text-white">Split Here</span>
          </div>
        </div>
      )}
      {dragOverEdge === "bottom" && (
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-40 h-1/3 border-2 border-dashed border-indigo-400 bg-indigo-500/30">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="rounded bg-indigo-600 px-3 py-1 text-xs font-semibold text-white">Split Here</span>
          </div>
        </div>
      )}
      {dragOverEdge === "left" && (
        <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-40 w-1/3 border-2 border-dashed border-indigo-400 bg-indigo-500/30">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="rounded bg-indigo-600 px-3 py-1 text-xs font-semibold text-white">Split Here</span>
          </div>
        </div>
      )}
      {dragOverEdge === "right" && (
        <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-40 w-1/3 border-2 border-dashed border-indigo-400 bg-indigo-500/30">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="rounded bg-indigo-600 px-3 py-1 text-xs font-semibold text-white">Split Here</span>
          </div>
        </div>
      )}

      {/* Gutters for splitting */}
      {onSplit &&
        [
          {
            key: "top",
            className:
              "absolute top-0 left-0 right-0 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10",
            orientation: "col" as Orientation,
            style: {},
            title: "Split horizontally (stack)",
            buttonClass: "px-2 py-0",
          },
          {
            key: "right",
            className:
              "absolute top-0 right-0 bottom-0 w-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10",
            orientation: "row" as Orientation,
            style: { writingMode: "vertical-rl" as React.CSSProperties["writingMode"] },
            title: "Split vertically (side-by-side)",
            buttonClass: "px-2 py-0 writing-mode-vertical",
          },
          {
            key: "bottom",
            className:
              "absolute bottom-0 left-0 right-0 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10",
            orientation: "col" as Orientation,
            style: {},
            title: "Split horizontally (stack)",
            buttonClass: "px-2 py-0",
          },
          {
            key: "left",
            className:
              "absolute top-0 left-0 bottom-0 w-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10",
            orientation: "row" as Orientation,
            style: { writingMode: "vertical-rl" as React.CSSProperties["writingMode"] },
            title: "Split vertically (side-by-side)",
            buttonClass: "px-2 py-0 writing-mode-vertical",
          },
        ].map((gutter) => (
          <div key={gutter.key} className={gutter.className} onClick={(e) => e.stopPropagation()}>
            <IconButton
              size='2xs'
              variant='ghost'
              onClick={(e) => {
                e.stopPropagation()
                onSplit(gutter.orientation)
              }}
              title={gutter.title}
            >
              <LuPlus />
            </IconButton>


          </div>
        ))}

      <div
        className="rename-area relative flex flex-1 items-center justify-center text-xs font-semibold text-white"
        style={{ background: `linear-gradient(135deg, ${leaf.color} 0%, ${leaf.color}CC 60%)` }}
      >
        {/* Delete button - appears on hover */}
        {onDelete && (
          <IconButton
            size='2xs'
            variant='ghost'
            css={{
              position: 'absolute',
              right: 2,
              top: 2,
              zIndex: 999
            }}
            aria-label="Delete pane"
            title="Delete pane"
            onClick={(e) => {
              e.stopPropagation()
              onDelete()
            }}
          >
            <LuX />
          </IconButton>
        )}

        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleSaveEdit}
            onKeyDown={handleKeyDown}
            className="z-20 rounded border-2 border-white/50 bg-white/90 px-2 py-1 text-center text-xs font-semibold text-gray-800 outline-none focus:border-white"
            style={{ minWidth: "60px", maxWidth: "120px" }}
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <span
            className="z-20 cursor-pointer select-none rounded px-2 py-1 transition-colors hover:bg-white/20"
            title="Click to rename"
            onClick={(e) => {
              e.stopPropagation()
              if (onRename) {
                handleStartEdit()
              }
            }}
          >
            {leaf.label}
          </span>
        )}
      </div>
    </div>
  )
}

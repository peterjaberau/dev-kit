"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import invariant from "tiny-invariant"
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine"
import {
  draggable,
  dropTargetForElements,
  type ElementDropTargetEventBasePayload,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter"
import { pointerOutsideOfPreview } from "@atlaskit/pragmatic-drag-and-drop/element/pointer-outside-of-preview"
import { setCustomNativeDragPreview } from "@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview"
import { createRoot } from "react-dom/client"
import { TreeItemDragPreview } from "#components/pragmatic-drag-drop/tree/components/tree-item-drag-preview"
import { type Instruction } from "@atlaskit/pragmatic-drag-and-drop-hitbox/list-item"

/* ---------------- helpers ---------------- */

function delay(ms: number, fn: () => void) {
  const id = window.setTimeout(fn, ms)
  return () => window.clearTimeout(id)
}

function sameInstruction(a: Instruction | null, b: Instruction | null) {
  if (a === b) return true
  if (!a || !b) return false
  return a.operation === b.operation && a.position === b.position
}

/* ---------------- types ---------------- */

type Params = {
  item: any
  dragRef: React.RefObject<HTMLElement | null>
  groupRef: React.RefObject<HTMLElement | null> | null
  uniqueContextId: symbol
  attachInstruction: any
  extractInstruction: any
}

/* ---------------- hook ---------------- */

export function useDnd({
                         item,
                         dragRef,
                         groupRef,
                         uniqueContextId,
                         attachInstruction,
                         extractInstruction,
                       }: Params) {
  const [dragState, setDragState] = useState<"idle" | "dragging">("idle")
  const [groupState, setGroupState] = useState<
    "idle" | "is-innermost-over"
  >("idle")
  const [instruction, setInstruction] = useState<Instruction | null>(null)

  const wasOpenOnDragStartRef = useRef(false)
  const cancelExpandRef = useRef<null | (() => void)>(null)

  const cancelDelayedExpand = useCallback(() => {
    cancelExpandRef.current?.()
    cancelExpandRef.current = null
  }, [])

  useEffect(() => {
    invariant(dragRef.current)

    function onChange({
                        self,
                        location,
                      }: ElementDropTargetEventBasePayload) {
      const instr = extractInstruction(self.data)
      setInstruction((prev) =>
        sameInstruction(prev, instr) ? prev : instr,
      )
    }

    const cleanups = []

    cleanups.push(
      draggable({
        element: dragRef.current,

        getInitialData: () => ({
          ...item,
          id: item.id,
          type: "list-item",
          uniqueContextId,
        }),

        onDragStart: ({ source }) => {
          setDragState("dragging")

          wasOpenOnDragStartRef.current =
            source.data?.nodeSelector?.metadata?.data?.isOpen ?? false

          cancelDelayedExpand()

          if (wasOpenOnDragStartRef.current) {
            source.data?.nodeSelector?.sendToNode({
              type: "BRANCH_OPEN_CHANGED",
              isOpen: false,
            })
          }
        },

        onDrop: ({ source }) => {
          setDragState("idle")

          if (wasOpenOnDragStartRef.current) {
            cancelExpandRef.current = delay(500, () => {
              source.data?.nodeSelector?.sendToNode({
                type: "BRANCH_OPEN_CHANGED",
                isOpen: true,
              })
              cancelExpandRef.current = null
            })
          }
        },

        onGenerateDragPreview: ({ nativeSetDragImage }) => {
          setCustomNativeDragPreview({
            getOffset: pointerOutsideOfPreview({ x: "16px", y: "8px" }),
            render: ({ container }) => {
              const root = createRoot(container)
              root.render(<TreeItemDragPreview item={item} />)
              return () => root.unmount()
            },
            nativeSetDragImage,
          })
        },
      }),
    )

    cleanups.push(
      dropTargetForElements({
        element: dragRef.current,

        getData: ({ input, element }) =>
          attachInstruction(
            { ...item, id: item.id },
            {
              input,
              element,
              operations: {
                combine: "available",
                "reorder-before": "available",
                "reorder-after": "available",
              },
            },
          ),

        canDrop: ({ source }) =>
          source.data.id !== item.id &&
          source.data.uniqueContextId === uniqueContextId,

        onDrag: onChange,
        onDragLeave: () => setInstruction(null),
        onDrop: () => setInstruction(null),
      }),
    )

    if (groupRef?.current) {
      cleanups.push(
        dropTargetForElements({
          element: groupRef.current,

          canDrop: ({ source }) =>
            source.data.uniqueContextId === uniqueContextId,

          onDragEnter: () => setGroupState("is-innermost-over"),
          onDragLeave: () => setGroupState("idle"),
          onDrop: () => setGroupState("idle"),
        }),
      )
    }

    return () => {
      cleanups.forEach((cleanup) => cleanup())
    }
  }, [
    item,
    dragRef,
    groupRef,
    uniqueContextId,
    attachInstruction,
    extractInstruction,
    cancelDelayedExpand,
  ])

  return { dragState, groupState, instruction }
}

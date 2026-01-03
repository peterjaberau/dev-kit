"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import invariant from "tiny-invariant"
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine"
import { TreeItemDragPreview } from "#components/pragmatic-drag-drop/tree/components/tree-item-drag-preview"
import {
  draggable,
  dropTargetForElements,
  type ElementDropTargetEventBasePayload,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter"
import { pointerOutsideOfPreview } from "@atlaskit/pragmatic-drag-and-drop/element/pointer-outside-of-preview"
import { setCustomNativeDragPreview } from "@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview"
import { createRoot } from "react-dom/client"
import { type Instruction } from "@atlaskit/pragmatic-drag-and-drop-hitbox/list-item"

/* ----------------------------- helpers ----------------------------- */

function delay(ms: number, fn: () => void) {
  const id = window.setTimeout(fn, ms)
  return () => window.clearTimeout(id)
}

function sameInstruction(a: Instruction | any, b: Instruction | any) {
  if (a === b) return true
  if (!a || !b) return false
  return a.operation === b.operation && a.position === b.position
}

/* ----------------------------- types ----------------------------- */

type Params = {
  item: any
  buttonRef: React.RefObject<HTMLButtonElement | null>
  groupRef: React.RefObject<HTMLDivElement | null>
  dispatch: any
  uniqueContextId: symbol
  attachInstruction: any
  extractInstruction: any
}

/* ----------------------------- hook ----------------------------- */

export function useDraggableTreeItem({
  item,
  buttonRef,
  groupRef,
  dispatch,
  uniqueContextId,
  attachInstruction,
  extractInstruction,
}: Params) {
  const [dragState, setDragState] = useState<"idle" | "dragging">("idle")
  const [groupState, setGroupState] = useState<"idle" | "is-innermost-over">("idle")
  const [instruction, setInstruction] = useState<Instruction | null>(null)

  // was the node open when drag started?
  const wasOpenOnDragStartRef = useRef(false)

  // delayed expand cancel fn
  const cancelExpandRef = useRef<null | (() => void)>(null)

  const cancelDelayedExpand = useCallback(() => {
    cancelExpandRef.current?.()
    cancelExpandRef.current = null
  }, [])

  useEffect(() => {
    invariant(buttonRef.current)

    /* ----------------------------- onChange ----------------------------- */
    function onChange({ self, source, location }: ElementDropTargetEventBasePayload) {
      const instr = extractInstruction(self.data)
      const target = location?.current.dropTargets[0]
      if (!target) return

      const sourceData = source.data
      const targetData = target.data
      const selfData = self.data

      /* ----------------------------- guards ----------------------------- */

      if (targetData.id === sourceData.id) {
        setInstruction(null)
        return
      }

      if (!targetData.parentId) {
        setInstruction(null)
        return
      }

      if (targetData.parentId !== selfData.parentId) {
        setInstruction(null)
        return
      }

      if (sourceData.nodeId === selfData.parentId) {
        setInstruction(null)
        return
      }

      setInstruction((prev) => (sameInstruction(prev, instr) ? prev : instr))
    }

    return combine(
      /* ----------------------------- draggable ----------------------------- */
      draggable({
        element: buttonRef.current,

        getInitialData: () => ({
          ...item,
          id: item.id,
          type: "tree-item",
          nodeSelector: item.nodeSelector,
          uniqueContextId,
        }),

        onDragStart: ({ source }) => {
          setDragState("dragging")

          //@ts-ignore
          wasOpenOnDragStartRef.current = source.data?.nodeSelector?.metadata?.data?.isOpen ?? false

          cancelDelayedExpand()

          if (wasOpenOnDragStartRef.current) {
            //@ts-ignore
            source.data?.nodeSelector?.sendToNode({
              type: "BRANCH_OPEN_CHANGED",
              isOpen: false,
            })
          }
        },

        onDrop: ({ source }) => {
          setDragState("idle")

          // delayed expand via sendToNode
          if (wasOpenOnDragStartRef.current) {
            cancelExpandRef.current = delay(500, () => {
              //@ts-ignore
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

      /* ----------------------------- drop target ----------------------------- */
      dropTargetForElements({
        element: buttonRef.current,

        getData: ({ input, element }) =>
          attachInstruction(
            { ...item, id: item.id },
            {
              input,
              element,
              operations: item.isDraft
                ? { combine: "blocked" }
                : {
                    combine: "available",
                    "reorder-before": "available",
                  },
            },
          ),

        canDrop: ({ source }) =>
          source.element !== buttonRef.current &&
          source.data.type === "tree-item" &&
          source.data.id !== item.id &&
          source.data.uniqueContextId === uniqueContextId,

        onDragEnter: () => {
          cancelDelayedExpand()
        },

        onDrag: onChange,

        onDragLeave: () => {
          if (wasOpenOnDragStartRef.current) {
            cancelExpandRef.current = delay(500, () => {
              item.nodeSelector?.sendToNode({
                type: "BRANCH_OPEN_CHANGED",
                isOpen: true,
              })
              cancelExpandRef.current = null
            })
          }
          setInstruction(null)
        },

        onDrop: () => {
          cancelDelayedExpand()
          setInstruction(null)
        },
      }),
    )
  }, [item, uniqueContextId, attachInstruction, extractInstruction, cancelDelayedExpand, buttonRef])

  return { dragState, groupState, instruction }
}

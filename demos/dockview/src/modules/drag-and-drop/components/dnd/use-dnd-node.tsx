"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import invariant from "tiny-invariant"
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine"
import { DragPreview } from "."
import {
  draggable,
  dropTargetForElements,
  type ElementDropTargetEventBasePayload,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter"
import { pointerOutsideOfPreview } from "@atlaskit/pragmatic-drag-and-drop/element/pointer-outside-of-preview"
import { setCustomNativeDragPreview } from "@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview"
import { createRoot } from "react-dom/client"
import {
  type Instruction,
  extractInstruction,
  attachInstruction,
} from "@atlaskit/pragmatic-drag-and-drop-hitbox/list-item"
import { useTree, useTreeItem } from "../../selectors"

function delay({ waitMs, fn }: { waitMs: number; fn: () => void }) {
  let id: number | null = window.setTimeout(() => {
    id = null
    fn()
  }, waitMs)
  return () => {
    if (id) window.clearTimeout(id)
    id = null
  }
}

function sameInstruction(a: any, b: any) {
  if (a === b) return true
  if (!a || !b) return false
  return a.operation === b.operation && a.position === b.position
}

export function useDndNode({
  item,
  sender,
  isOpen,
  // itemRef, //item is the actorRef
  buttonRef,
  groupRef,
}: any) {
  // const { uniqueContextId, dependencies } = useTree()
  // const { attachInstruction, extractInstruction } = dependencies
  // const { dataValue: item, sendToTreeItem, isOpen } = useTreeItem({ actorRef: itemRef })

  const [dragState, setDragState] = useState<"idle" | "dragging">("idle")
  const [groupState, setGroupState] = useState<"idle" | "is-innermost-over">("idle")
  const [instruction, setInstruction] = useState<Instruction | null>(null)

  useEffect(() => {
    invariant(buttonRef.current)

    function onChange({ self, location, source }: ElementDropTargetEventBasePayload) {
      const instr = extractInstruction(self.data)

      if (instr?.operation === "combine" && item.children?.length && !isOpen) {
        delay({
          waitMs: 500,
          fn: () => {
            sender && sender({ type: "toggle", open: true, itemId: item.id })
          },
        })
      }

      setInstruction((prev) => (sameInstruction(prev, instr) ? prev : instr))
    }

    return combine(
      draggable({
        element: buttonRef.current,
        getInitialData: () => {
          return {
            id: item.id,
            type: "tree-item",
            isOpenOnDragStart: isOpen,
            // uniqueContextId,
          }
        },
        onDragStart: ({ source, location }) => {
          setDragState("dragging")

          if (source.data.isOpenOnDragStart) {
            sender && sender({ type: "toggle", open: false, itemId: item.id })
          }
        },
        onDrop: ({ source, location }) => {
          setDragState("idle")

          if (source.data.isOpenOnDragStart) {
            sender && sender({ type: "toggle", open: true, itemId: item.id })
          }
        },
        onGenerateDragPreview: ({ nativeSetDragImage }) => {
          setCustomNativeDragPreview({
            getOffset: pointerOutsideOfPreview({ x: "16px", y: "8px" }),
            render: ({ container }) => {
              // root.render(null)
              const root = createRoot(container)
              root.render(<DragPreview item={item} />)

              return () => root.unmount()
            },
            nativeSetDragImage,
          })
        },
      }),
      dropTargetForElements({
        element: buttonRef.current,
        getData: ({ input, element, source }) => {
          const PRIORITY: any = {
            "not-available": 3,
            blocked: 2,
            available: 1,
          }

          const rules: any[] = [
            {
              when: (item: any) => item.isDraft,
              operations: { combine: "blocked" },
            },
            {
              // leaf node
              when: (item: any) => !item?.children,
              operations: {
                "reorder-before": "available",
                combine: "not-available",
                "reorder-after": "available",
              },
            },
            {
              // has children and is expanded, dont allow reorder-after
              when: (item: any) => item.isOpen && item.children?.length,
              operations: {
                "reorder-before": "available",
                combine: "available",
                "reorder-after": "not-available",
              },
            },
            {
              // fallback
              when: () => true,
              operations: {
                combine: "available",
                "reorder-before": "available",
              },
            },
          ]

          const resolveOperations = (item: any) => {
            const collected: any = {}

            for (const { when, operations } of rules) {
              if (typeof when === "function" && !when(item)) continue

              for (const [op, value] of Object.entries(operations)) {
                const prev = collected[op]
                if (!prev || PRIORITY[value as any] > PRIORITY[prev]) {
                  collected[op] = value
                }
              }
            }

            return collected
          }

          return attachInstruction(
            { id: item.id },
            {
              input,
              element,
              operations: resolveOperations(item),
            },
          )

          // return attachInstruction(
          //   { id: item.id },
          //   {
          //     input,
          //     element,
          //     operations: item.isDraft
          //       ? { "combine": "blocked" }
          //       : {
          //           "combine": "available",
          //           "reorder-before": "available",
          //         },
          //   },
          // )
        },
        canDrop: ({ source, input, element }) => {
          return (
            source.element !== buttonRef.current && source.data.type === "tree-item" && source.data.id !== item.id
            // source.data.id !== item.id &&
            // source.data.uniqueContextId === uniqueContextId
          )
        },

        onDragEnter: onChange,
        onDrag: onChange,
        onDragLeave: () => {
          // sendToTreeItem({ type: "toggle", open: false })
          setInstruction(null)
        },
        onDrop: () => {
          // sendToTreeItem({ type: "toggle", open: false })
          setInstruction(null)
        },
      }),
    )

    //item, uniqueContextId, attachInstruction, extractInstruction
  }, [item, attachInstruction, extractInstruction])

  useEffect(() => {
    if (!groupRef.current) return

    function onChange({ location, self, source }: ElementDropTargetEventBasePayload) {
      const [inner] = location.current.dropTargets.filter((dt) => dt.data.type === "group")
      setGroupState(inner?.element === self.element ? "is-innermost-over" : "idle")
    }

    return dropTargetForElements({
      element: groupRef.current,
      getData: () => ({ type: "group" }),
      getIsSticky: () => false,
      canDrop: ({ source, input, element }) => {
        return (
          source.data.type === "tree-item" && source.data.id !== item.id
          // source.data.id !== item.id &&
          // source.data.uniqueContextId === uniqueContextId
        )
      },

      onDragStart: onChange,
      onDropTargetChange: onChange,
      onDragLeave: () => setGroupState("idle"),
      onDrop: () => setGroupState("idle"),
    })
    //item.id, uniqueContextId
  }, [item.id])

  return { dragState, groupState, instruction }
}

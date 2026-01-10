"use client"

import { useEffect, useState } from "react"
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
import type { Instruction } from "@atlaskit/pragmatic-drag-and-drop-hitbox/list-item"
import { DragPreview } from "#modules/drag-and-drop/components/dnd/drag.preview"

function sameInstruction(a: Instruction | null, b: Instruction | null) {
  if (a === b) return true
  if (!a || !b) return false
  //@ts-ignore
  return a.operation === b.operation && a.position === b.position
}

type Params = {
  item: any
  groupRef: React.RefObject<HTMLElement> | any
  buttonRef: React.RefObject<HTMLElement> | any
  uniqueContextId: symbol
  attachInstruction: any
  extractInstruction: any
  DropIndicator?: any
}

export function useDndNode({
  item,
  buttonRef,
  groupRef,
  uniqueContextId,
  attachInstruction,
  extractInstruction,
  DropIndicator,
}: Params) {
  const [dragState, setDragState] = useState<"idle" | "dragging">("idle")
  const [groupState, setGroupState] = useState<"idle" | "is-innermost-over">("idle")
  const [instruction, setInstruction] = useState<Instruction | null>(null)

  useEffect(() => {
    invariant(buttonRef.current)

    function onChange({ self, location, source }: ElementDropTargetEventBasePayload) {
      const instr = extractInstruction(self.data)

      // if (instr?.operation === "combine" && item.children?.length && !isOpen) {
      //   delay({
      //     waitMs: 500,
      //     fn: () => {
      //       sendToTreeItem({ type: "toggle", open: true, itemId: item.id })
      //     },
      //   })
      // }

      setInstruction((prev) => (sameInstruction(prev, instr) ? prev : instr))
    }

    return combine(
      draggable({
        element: buttonRef.current,
        getInitialData: () => {
          return {
            id: item.id,
            type: "tree-item",
            // isOpenOnDragStart: isOpen,
            uniqueContextId,
          }
        },
        onDragStart: ({ source, location }) => {
          setDragState("dragging")

          // if (source.data.isOpenOnDragStart) {
          //   sendToTreeItem({ type: "toggle", open: false, itemId: item.id })
          // }
        },
        onDrop: ({ source, location }) => {
          setDragState("idle")

          // if (source.data.isOpenOnDragStart) {
          //   sendToTreeItem({ type: "toggle", open: true, itemId: item.id })
          // }
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
            source.element !== buttonRef.current &&
            source.data.type === "tree-item" &&
            source.data.id !== item.id &&
            source.data.uniqueContextId === uniqueContextId
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
  }, [item, uniqueContextId, attachInstruction, extractInstruction])

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
          source.data.type === "tree-item" &&
          source.data.id !== item.id &&
          source.data.uniqueContextId === uniqueContextId
        )
      },

      onDragStart: onChange,
      onDropTargetChange: onChange,
      onDragLeave: () => setGroupState("idle"),
      onDrop: () => setGroupState("idle"),
    })
  }, [item.id, uniqueContextId])

  return { dragState, groupState, instruction }
}

"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import invariant from "tiny-invariant"
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine"
import { DragPreview as TreeItemDragPreview } from "#drag-and-drop/components/dnd/drag.preview"
import {
  draggable,
  dropTargetForElements,
  type ElementDropTargetEventBasePayload,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter"
import { pointerOutsideOfPreview } from "@atlaskit/pragmatic-drag-and-drop/element/pointer-outside-of-preview"
import { setCustomNativeDragPreview } from "@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview"
import { createRoot } from "react-dom/client"
import { type Instruction } from "@atlaskit/pragmatic-drag-and-drop-hitbox/list-item"
import { attachInstruction } from "@atlaskit/pragmatic-drag-and-drop-hitbox/dist/types/list-item"

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

export function useDnd({
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



  useEffect(() => {
    invariant(buttonRef.current)

    function onChange({ self, source, location }: ElementDropTargetEventBasePayload) {
      const instr = extractInstruction(self.data)
      const target = location?.current.dropTargets[0]
      if (!target) return



      const sourceData = source.data
      const targetData = target.data
      const selfData = self.data

      console.log("DND - change buttonRef-------", {
        groupState,
        dragState,
        instr,
        sourceData,
        targetData,
        selfData,
        location,
        source,
        self,
      })

      /* ----------------------------- guards ----------------------------- */

      // if (targetData.id === sourceData.id) {
      //   setInstruction(null)
      //   return
      // }
      //
      // if (!targetData.parentId) {
      //   setInstruction(null)
      //   return
      // }

      // if (targetData.parentId !== selfData.parentId) {
      //   setInstruction(null)
      //   return
      // }
      //
      // if (sourceData.nodeId === selfData.parentId) {
      //   setInstruction(null)
      //   return
      // }

      setInstruction((prev) => (sameInstruction(prev, instr) ? prev : instr))
    }

    return combine(
      draggable({
        element: buttonRef.current,

        getInitialData: () => ({
          // ...item,
          id: item.id,
          type: "tree-item",
          // nodeSelector: item.nodeSelector,
          uniqueContextId,
        }),

        onDragStart: ({ source }) => {
          setDragState("dragging")
        },

        onDrop: ({ source }) => {
          setDragState("idle")

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
              when: (item: any) => !item?.children && !item?.isBranchData,
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
                // "reorder-after": "not-available",
              },
            },
            {
              // fallback
              when: () => true,
              operations: {
                "reorder-before": "available",
                combine: "available",
                // "reorder-after": "available",
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

        },

        canDrop: ({ input, element, source }) => {
          return (
            source.element !== buttonRef.current && source.data.type === "tree-item" && source.data.id !== item.id
          )


        },

        onDragEnter: () => onChange,

        onDrag: onChange,

        onDragLeave: () => {
          setInstruction(null)
        },

        onDrop: () => {
          // cancelDelayedExpand()
          setInstruction(null)
        },
      }),
    )


  }, [item, uniqueContextId, attachInstruction, extractInstruction, ])
  //cancelDelayedExpand

  useEffect(() => {
    const group = groupRef.current
    if (!group) return

    function onChange({ location, self, source }: ElementDropTargetEventBasePayload) {

      const [inner] = location.current.dropTargets.filter((dt) => dt.data.type === "group")
      setGroupState(inner?.element === self.element ? "is-innermost-over" : "idle")
    }

    return dropTargetForElements({
      element: group,
      getData: () => ({ type: "group" }),
      getIsSticky: () => false,
      canDrop: ({ source, input, element }) => source.data.type === "tree-item" && source.data.id !== item.id,

      // source.data.type === 'tree-item' &&
      // source.data.id !== item.id &&
      // source.data.uniqueContextId === uniqueContextId
      onDragStart: onChange,
      onDropTargetChange: onChange,
      onDragLeave: () => setGroupState("idle"),
      onDrop: () => setGroupState("idle"),
    })
  }, [item.id])


  return { dragState, groupState, instruction }
}

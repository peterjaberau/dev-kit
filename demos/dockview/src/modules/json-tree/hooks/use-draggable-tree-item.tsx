"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import invariant from "tiny-invariant"
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine"
import { TreeItemDragPreview } from "../components/base/tree/tree-item-drag-preview"
import {
  draggable,
  dropTargetForElements,
  type ElementDropTargetEventBasePayload,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter"
import { pointerOutsideOfPreview } from "@atlaskit/pragmatic-drag-and-drop/element/pointer-outside-of-preview"
import { setCustomNativeDragPreview } from "@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview"
import { createRoot } from "react-dom/client"
import { type Instruction } from "@atlaskit/pragmatic-drag-and-drop-hitbox/list-item"

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

type Params = {
  item: any
  buttonRef: React.RefObject<HTMLButtonElement | null>
  groupRef: React.RefObject<HTMLDivElement | null>
  dispatch: any
  uniqueContextId: symbol
  attachInstruction: any
  extractInstruction: any

  /** delegation */
  hasChildren?: any
  isOpen?: boolean
  onExpand?: () => void
  onCollapse?: () => void
}

export function useDraggableTreeItem({
  item,
  buttonRef,
  groupRef,
  dispatch,
  uniqueContextId,
  attachInstruction,
  extractInstruction,
  hasChildren,
  isOpen,
  onExpand,
  onCollapse,
}: Params) {
  const [dragState, setDragState] = useState<"idle" | "dragging">("idle")
  const [groupState, setGroupState] = useState<"idle" | "is-innermost-over">("idle")
  const [instruction, setInstruction] = useState<Instruction | null>(null)

  const cancelExpandRef = useRef<null | (() => void)>(null)

  const cancelExpand = useCallback(() => {
    cancelExpandRef.current?.()
    cancelExpandRef.current = null
  }, [])

  useEffect(() => {
    invariant(buttonRef.current)

    function onChange({ self }: ElementDropTargetEventBasePayload) {
      const instr = extractInstruction(self.data)

      if (instr?.operation === "combine" && hasChildren && !isOpen && !cancelExpandRef.current) {
        cancelExpandRef.current = delay({
          waitMs: 500,
          fn: () => onExpand?.(),
        })
      }

      if (instr?.operation !== "combine") {
        cancelExpand()
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
            uniqueContextId,
            isOpenOnDragStart: isOpen,
          }
        },
        onDragStart: ({ source, location }) => {
          setDragState("dragging")
          if (source.data.isOpenOnDragStart) {
            onCollapse?.()
          }
        },
        onDrop: ({ source, location }) => {
          setDragState("idle")
          if (source.data.isOpenOnDragStart) {
            onExpand?.()
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
      dropTargetForElements({
        element: buttonRef.current,
        getData: ({ input, element, source }) => {
          return attachInstruction({ id: item.id }, { input, element })

          // return attachInstruction(
          //   { id: item.id },
          //   {
          //     input,
          //     element,
          //     operations: item.isDraft
          //       ? { combine: "blocked" }
          //       : {
          //           combine: "available",
          //           "reorder-before": "available",
          //           "reorder-after": item.isOpen && item?.children?.length > 0 ? "available" : "not-available",
          //
          //         },
          //   },
          // )
        },
        canDrop: ({ source, input, element }) => {
          return (
            // source.element !== buttonRef.current &&
            source.data.type === "tree-item" &&
            source.data.id !== item.id &&
            source.data.uniqueContextId === uniqueContextId
          )
        },

        onDragEnter: onChange,
        onDrag: onChange,
        onDragLeave: () => {
          cancelExpand()
          setInstruction(null)
        },
        onDrop: () => {
          cancelExpand()
          setInstruction(null)
        },
      }),
    )
  }, [    item.id,
    uniqueContextId,
    attachInstruction,
    extractInstruction,
    hasChildren,
    isOpen,
    onExpand,
    onCollapse,
    cancelExpand,])

  useEffect(() => {
    if (!groupRef.current) return

    function onChange({ location, self, source }: ElementDropTargetEventBasePayload) {

      const groups = location.current.dropTargets.filter(
        (dt) => dt.data.type === "group"
      )

      const innermost = groups.at(-1)

      setGroupState(
        innermost?.element === self.element
          ? "is-innermost-over"
          : "idle"
      )

      // const [inner] = location.current.dropTargets.filter((dt) => dt.data.type === "group")
      // setGroupState(inner?.element === self.element ? "is-innermost-over" : "idle")
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

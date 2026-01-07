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
import { type Instruction } from "@atlaskit/pragmatic-drag-and-drop-hitbox/list-item"
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

type Params = {
  itemRef: any
  buttonRef: React.RefObject<HTMLButtonElement | HTMLDivElement | null>
  groupRef: React.RefObject<HTMLDivElement | null>
}

export function useDndNode({
  itemRef, //item is the actorRef
  buttonRef,
  groupRef,
}: Params) {
  const { uniqueContextId, dependencies } = useTree()
  const { attachInstruction, extractInstruction } = dependencies


  const {
    viewConfig,
    treeItemContext,
    dataValue: item,
    childItemsRef,
    treeItemChildrenRef,
    treeItemChildrenIds,
    sendToTreeItem,
    isOpen,
    treeItemId,
  } = useTreeItem({ actorRef: itemRef })

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
            sendToTreeItem({ type: "toggle", open: true, itemId: item.id })
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
            uniqueContextId,
          }
        },
        onDragStart: ({ source, location }) => {
          setDragState("dragging")

          if (source.data.isOpenOnDragStart) {
            sendToTreeItem({ type: "toggle", open: false, itemId: item.id })
          }
        },
        onDrop: ({ source, location }) => {
          setDragState("idle")

          if (source.data.isOpenOnDragStart) {
            sendToTreeItem({ type: "toggle", open: true, itemId: item.id })
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
          return attachInstruction(
            { id: item.id },
            {
              input,
              element,
              operations: item.isDraft
                ? { combine: "blocked" }
                : {
                    combine: "available",
                    "reorder-before": "available",
                    // "reorder-after": item.isOpen && item?.children?.length > 0 ? "available" : "not-available",

                    // "reorder-after": item.isOpen && item.children.length ? "not-available" : "available",
                    // "reorder-after": (item?.isOpen && item?.children?.length && item?.children?.length > 0 ) ? "not-available" : "available",
                  },
            },
          )
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

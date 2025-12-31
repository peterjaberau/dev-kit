"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import invariant from "tiny-invariant"
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine"
import { TreeItemDragPreview } from "../components/tree-item-drag-preview"
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
}

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

  const cancelExpandRef = useRef<null | (() => void)>(null)

  const cancelExpand = useCallback(() => {
    cancelExpandRef.current?.()
    cancelExpandRef.current = null
  }, [])

  useEffect(() => {
    invariant(buttonRef.current)

    function onChange({ self }: ElementDropTargetEventBasePayload) {
      // const [innermost] = location.current.dropTargets
      // if (innermost?.element !== self.element) {
      //   setInstruction(null)
      //   cancelExpand()
      //   return
      // }

      const instr = extractInstruction(self.data)

      if (instr?.operation === "combine" && item.children.length && !item.isOpen && !cancelExpandRef.current) {
        cancelExpandRef.current = delay({
          waitMs: 500,
          fn: () => dispatch({ type: "expand", itemId: item.id }),
        })
      }

      if (instr?.operation !== "combine") cancelExpand()

      // setInstruction(instr)
      setInstruction((prev) => (sameInstruction(prev, instr) ? prev : instr))
    }

    return combine(
      draggable({
        element: buttonRef.current,
        getInitialData: () => ({
          id: item.id,
          type: "tree-item",
          isOpenOnDragStart: item.isOpen,
          uniqueContextId,
        }),
        onGenerateDragPreview: ({ nativeSetDragImage }) => {
          setCustomNativeDragPreview({
            getOffset: pointerOutsideOfPreview({ x: "16px", y: "8px" }),
            render: ({ container }) => {
              // root.render(null)
              const root = createRoot(container)
              root.render(<TreeItemDragPreview item={item} />)

              return () => root.unmount()
            },
            nativeSetDragImage,
          })
        },
        onDragStart: ({ source }) => {
          setDragState("dragging")

          console.log("onDragStart ------", {
            source,
            isOpenOnDragStart: source.data.isOpenOnDragStart,
          })
          if (source.data.isOpenOnDragStart) {
            dispatch({ type: "collapse", itemId: item.id })
          }
        },
        onDrop: ({ source }) => {
          setDragState("idle")

          console.log("onDrop ------", {
            source,
            isOpenOnDragStart: source.data.isOpenOnDragStart,
          })

          if (source.data.isOpenOnDragStart) {
            dispatch({ type: "expand", itemId: item.id })
          }
        },
      }),
      dropTargetForElements({
        element: buttonRef.current,
        getData: ({ input, element }) => {
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
                  "reorder-after": item.isOpen && item?.children?.length > 0 ? "available" : "not-available",

                  // "reorder-after": item.isOpen && item.children.length ? "not-available" : "available",
                                    // "reorder-after": (item?.isOpen && item?.children?.length && item?.children?.length > 0 ) ? "not-available" : "available",
                  },
            },
          )
        },
        canDrop: ({ source }) => {


          return (
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
  }, [item, dispatch, uniqueContextId, attachInstruction, extractInstruction, cancelExpand])

  useEffect(() => {
    if (!groupRef.current) return

    function onChange({ location, self }: ElementDropTargetEventBasePayload) {
      const [inner] = location.current.dropTargets.filter((dt) => dt.data.type === "group")
      setGroupState(inner?.element === self.element ? "is-innermost-over" : "idle")
    }

    return dropTargetForElements({
      element: groupRef.current,
      getData: () => ({ type: "group" }),
      getIsSticky: () => false,
      canDrop: ({ source }) =>
        source.data.type === "tree-item" &&
        source.data.id !== item.id &&
        source.data.uniqueContextId === uniqueContextId,
      onDragStart: onChange,
      onDropTargetChange: onChange,
      onDragLeave: () => setGroupState("idle"),
      onDrop: () => setGroupState("idle"),
    })
  }, [item.id, uniqueContextId])

  return { dragState, groupState, instruction }
}

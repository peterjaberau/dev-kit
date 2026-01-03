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

    function onChange({ self, source, location }: ElementDropTargetEventBasePayload) {

      // source: configure from - draggable.getInitialData
      // target: configure from - dropTargetForElements.getData
      const instr = extractInstruction(self.data)


      const target = location?.current.dropTargets[0]
      if (!target ) return

      const sourceData = source.data
      const targetData = target.data
      const selfData = self.data

      // don't allow dropping on itself
      if (targetData.id === sourceData.id) {
        setInstruction(null)
        return
      }

      // don't allow dropping on root level
      if (!targetData.parentId) {
        setInstruction(null)
        return
      }

      // don't allow dropping between different trees
      if (targetData.parentId !== selfData.parentId) {
        setInstruction(null)
        return
      }

      // don't allow dropping on own parent
      if (sourceData.nodeId === selfData.parentId) {
        setInstruction(null)
        return
      }








      console.log("JSON-TREE ----> onChange --> ", { sourceData, targetData, selfData, self, data: self.data, location, source, instr })


      if (instr?.operation === "combine" && item.children?.length && !item.isOpen && !cancelExpandRef.current) {
        cancelExpandRef.current = delay({
          waitMs: 500,
          fn: () => dispatch({ type: "expand", itemId: item.id }),
        })
      }

      if (instr?.operation !== "combine") cancelExpand()


      // setInstruction(instr)
      setInstruction((prev) => (sameInstruction(prev, instr) ? prev : instr))

      // setInstruction(null)
    }

    return combine(
      draggable({
        element: buttonRef.current,
        getInitialData: () => {
          return {
            ...item,
            id: item.id,
            type: "tree-item",
            // node: item?.node,
            // parent: item?.parent,
            isOpenOnDragStart: item.isOpen,
            uniqueContextId,

          }
        },
        onDragStart: ({ source, location }) => {
          setDragState("dragging")

          if (source.data.isOpenOnDragStart) {
            dispatch({ type: "collapse", itemId: item.id })
          }
        },
        onDrop: ({ source, location }) => {
          setDragState("idle")


          if (source.data.isOpenOnDragStart) {
            dispatch({ type: "expand", itemId: item.id })
          }
        },
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
      }),
      dropTargetForElements({
        element: buttonRef.current,

        getData: ({ input, element, source  }) => {

          const inst = attachInstruction(
            {
              ...item,
              id: item.id
            },
            {
              input,
              element,
              operations: item.isDraft
                ? { combine: "blocked" }
                : {
                  combine: "available",
                  // "reorder-before": "available",
                  "reorder-after": "available",
                  // "reorder-after": item.isOpen && item?.children?.length > 0 ? "available" : "not-available",

                  // "reorder-after": item.isOpen && item.children.length ? "not-available" : "available",
                  // "reorder-after": (item?.isOpen && item?.children?.length && item?.children?.length > 0 ) ? "not-available" : "available",
                },
            },
          )


          // console.log('---canDrop----', { source, inst, input, element })

          return inst
        },
        canDrop: ({ source, input, element,  }) => {

          const canDropValidation = source.element !== buttonRef.current &&
            source.data.type === "tree-item" &&
            source.data.id !== item.id &&
            source.data.uniqueContextId === uniqueContextId



          // const canDropValidation = source.data.id==="node-2-1"

          // console.log('---canDrop----', source)





          return canDropValidation
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


  // console.log("JSON-TREE --> useDraggableTreeItem --> ", { dragState, groupState, instruction, item })

  return { dragState, groupState, instruction }
}

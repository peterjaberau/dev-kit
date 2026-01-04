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

  // delayed expand cancel fn
  // const cancelExpandRef = useRef<null | (() => void)>(null)

  // const cancelDelayedExpand = useCallback(() => {
  //   cancelExpandRef.current?.()
  //   cancelExpandRef.current = null
  // }, [])

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
          ...item,
          id: item.id,
          type: "tree-item",
          nodeSelector: item.nodeSelector,
          uniqueContextId,
        }),

        onDragStart: ({ source }) => {
          setDragState("dragging")

          console.log("DRAG START buttonRef ----->", { source })

          //@ts-ignore
          // wasOpenOnDragStartRef.current = source.data?.nodeSelector?.metadata?.data?.isOpen ?? false
          //
          // cancelDelayedExpand()

          // if (wasOpenOnDragStartRef.current) {
          //   //@ts-ignore
          //   source.data?.nodeSelector?.sendToNode({
          //     type: "BRANCH_OPEN_CHANGED",
          //     isOpen: false,
          //   })
          // }
        },

        onDrop: ({ source }) => {
          setDragState("idle")
          console.log("DROP  START buttonRef----->", { source })

          // delayed expand via sendToNode
          // if (wasOpenOnDragStartRef.current) {
          //   cancelExpandRef.current = delay(500, () => {
          //     //@ts-ignore
          //     source.data?.nodeSelector?.sendToNode({
          //       type: "BRANCH_OPEN_CHANGED",
          //       isOpen: true,
          //     })
          //     cancelExpandRef.current = null
          //   })
          // }
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

          const data = { id: item.id };

          console.log('----button ref-----', {
            sourceId: source.data.id,
            //@ts-ignore
            sourceSCALAR: source.data.nodeSelector?.metadata?.data?.isScalar,
            //@ts-ignore
            sourceBRANCH: source.data.nodeSelector?.metadata?.data?.isBranch,
          })

          return attachInstruction(data, {
            input,
            element,
            operations: item.isDraft
              ? { combine: 'blocked' }
              : {
                combine: 'available',
                'reorder-before': 'available',
                // Don't allow 'reorder-after' on expanded items
                'reorder-after':
                  'available'
              },
          });

          // console.log("dropTargetForElements-----", { source, sourceData })

          // return {
          //   type: "list-item",
          //   ... attachInstruction(
          //     { ...item, id: item.id },
          //     {
          //       input,
          //       element,
          //       operations: {
          //         combine: "available",
          //         "reorder-before": "available",
          //         "reorder-after": "available",
          //       },
          //     },
          //   )
          // }
          //
        },

        canDrop: ({ source }) =>
          // source.element !== buttonRef.current &&
          source.data.type === "tree-item" &&
          source.data.id !== item.id &&
          source.data.uniqueContextId === uniqueContextId,
        onDragEnter: () => onChange,

        onDrag: onChange,

        onDragLeave: () => {
          // if (wasOpenOnDragStartRef.current) {
          //   cancelExpandRef.current = delay(500, () => {
          //     item.nodeSelector?.sendToNode({
          //       type: "BRANCH_OPEN_CHANGED",
          //       isOpen: true,
          //     })
          //     cancelExpandRef.current = null
          //   })
          // }
          setInstruction(null)
        },

        onDrop: () => {
          // cancelDelayedExpand()
          setInstruction(null)
        },
      }),
    )

    console.log("DND - button --> ", { dragState, groupState, instruction, item })

  }, [item, uniqueContextId, attachInstruction, extractInstruction, ])
  //cancelDelayedExpand

  useEffect(() => {
    const group = groupRef.current
    if (!group) return

    function onChange({ location, self, source }: ElementDropTargetEventBasePayload) {
      console.log("DND - change groupRef-------", { dragState, groupState, location, source, self })

      const [inner] = location.current.dropTargets.filter((dt) => dt.data.type === "group")
      setGroupState(inner?.element === self.element ? "is-innermost-over" : "idle")
    }

    return dropTargetForElements({
      element: group,
      getData: () => ({ type: "group" }),
      getIsSticky: () => false,
      canDrop: ({ source, input, element }) =>
          source.data.type === 'tree-item' &&
          source.data.id !== item.id &&
          source.data.uniqueContextId === uniqueContextId
      ,

      onDragStart: onChange,
      onDropTargetChange: onChange,
      onDragLeave: () => setGroupState("idle"),
      onDrop: () => setGroupState("idle"),
    })
  }, [item.id, uniqueContextId])

  console.log("DND - group --> ", { dragState, groupState, instruction, item })

  return { dragState, groupState, instruction }
}

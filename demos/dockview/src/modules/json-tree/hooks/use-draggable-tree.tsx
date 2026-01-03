"use client"

import { useEffect, useState } from "react"
import invariant from "tiny-invariant"
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine"
import {
  dropTargetForElements,
  monitorForElements,
  type ElementDropTargetEventBasePayload,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter"
import { type Instruction } from "@atlaskit/pragmatic-drag-and-drop-hitbox/list-item"

type Params = {
  rootRef: React.RefObject<HTMLDivElement | null>
  groupRef: React.RefObject<HTMLDivElement | null>
  uniqueContextId: symbol
  extractInstruction: (data: any) => Instruction | null
  dispatch: (action: any) => void
}

export function useDraggableTree({ rootRef, groupRef, uniqueContextId, extractInstruction, dispatch }: Params) {
  const [groupState, setGroupState] = useState<"idle" | "is-innermost-over">("idle")

  useEffect(() => {
    invariant(rootRef.current)
    invariant(groupRef.current)

    function onGroupChange({ location, self }: ElementDropTargetEventBasePayload) {
      const [innermost] = location.current.dropTargets.filter((dt) => dt.data.type === "group")

      setGroupState(innermost?.element === self.element ? "is-innermost-over" : "idle")
    }

    return combine(
      monitorForElements({
        canMonitor: ({ source }) => source.data.type === "tree-item" && source.data.uniqueContextId === uniqueContextId,

        onDrop({ location, source }) {
          if (!location.current.dropTargets.length) return

          const target: any = location.current.dropTargets[0]
          const instruction = extractInstruction(target.data)

          if (!instruction) return

          dispatch({
            type: "instruction",
            instruction,
            itemId: source.data.id,
            targetId: target.data.id,
          })
        },
      }),

      dropTargetForElements({
        element: groupRef.current!,
        getData: () => ({ type: "group" }),
        canDrop: ({ source }) => source.data.type === "tree-item" && source.data.uniqueContextId === uniqueContextId,
        onDragStart: onGroupChange,
        onDropTargetChange: onGroupChange,
        onDragLeave: () => setGroupState("idle"),
        onDrop: () => setGroupState("idle"),
      }),
    )
  }, [dispatch, extractInstruction, uniqueContextId, rootRef, groupRef])

  return { groupState }
}

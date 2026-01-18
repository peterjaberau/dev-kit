"use client"

import { useEffect, useState } from "react"
import invariant from "tiny-invariant"
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine"
import {
  dropTargetForElements,
  monitorForElements,
  type ElementDropTargetEventBasePayload,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter"
import { extractInstruction } from "@atlaskit/pragmatic-drag-and-drop-hitbox/list-item"

export function useDndTree({ sender,  groupRef }: any) {

  const [groupState, setGroupState] = useState<"idle" | "is-innermost-over" | "is-over">("idle")

  useEffect(() => {
    invariant(groupRef.current)

    function onGroupChange({ location, self }: ElementDropTargetEventBasePayload) {
      const [innermost] = location.current.dropTargets.filter((dt) => dt.data.type === "group")

      setGroupState(innermost?.element === self.element ? "is-innermost-over" : "idle")
    }

    return combine(
      monitorForElements({
        canMonitor: ({ source }: any) => source?.data?.isTopLevel === true,

        onDrop({ location, source }) {
          const dragging = source.data
          const [innerMost] = location.current.dropTargets

          if (!innerMost) {
            return
          }



          if (!location.current.dropTargets.length) return

          const target: any = location.current.dropTargets[0]
          const instruction = extractInstruction(target.data)

          if (!instruction) return

          sender &&
            sender({
              type: "instruction",
              instruction,
              itemId: source.data.id,
              targetId: target.data.id,
            })
        },
      }),

      dropTargetForElements({
        element: groupRef.current!,
        // getData: () => ({ type: "group" }),
        //&& source.data.uniqueContextId === uniqueContextId
        // canDrop: ({ source }) => source.data.type === "tree-item",
        canDrop: ({ source }) => source.data.isTopLevel === true,

        // onDragStart: onGroupChange,
        // onDragEnter: onGroupChange,
        // onDropTargetChange: onGroupChange,

        onDragStart: () => setGroupState("is-over"),
        onDragEnter: () => setGroupState("is-over"),
        onDragLeave: () => setGroupState("idle"),
        onDrop: () => setGroupState("idle"),
      }),
    )
  }, [extractInstruction,  groupRef])

  return { groupState }
}

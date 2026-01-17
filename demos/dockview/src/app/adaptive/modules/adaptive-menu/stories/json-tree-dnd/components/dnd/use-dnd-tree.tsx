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

// import { useTree, useTreeItem } from "../../selectors"

//itemRef,
export function useDndTree({ sender,  groupRef }: any) {
  // const { uniqueContextId, dependencies } = useTree()
  // const { extractInstruction } = dependencies

  // const { sendToTreeItem } = useTreeItem({ actorRef: itemRef })

  const [groupState, setGroupState] = useState<"idle" | "is-innermost-over">("idle")

  useEffect(() => {
    // invariant(rootRef.current)
    invariant(groupRef.current)

    function onGroupChange({ location, self }: ElementDropTargetEventBasePayload) {
      const [innermost] = location.current.dropTargets.filter((dt) => dt.data.type === "group")

      setGroupState(innermost?.element === self.element ? "is-innermost-over" : "idle")
    }

    return combine(
      monitorForElements({
        //&& source.data.uniqueContextId === uniqueContextId
        canMonitor: ({ source }) => source.data.type === "tree-item",

        onDrop({ location, source }) {
          if (!location.current.dropTargets.length) return

          const target: any = location.current.dropTargets[0]
          const instruction = extractInstruction(target.data)

          if (!instruction) return

          sender && sender({
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
        //&& source.data.uniqueContextId === uniqueContextId
        canDrop: ({ source }) => source.data.type === "tree-item",
        onDragStart: onGroupChange,
        onDropTargetChange: onGroupChange,
        onDragLeave: () => setGroupState("idle"),
        onDrop: () => setGroupState("idle"),
      }),
    )
    //uniqueContextId,
  }, [extractInstruction,  groupRef])

  return { groupState }
}

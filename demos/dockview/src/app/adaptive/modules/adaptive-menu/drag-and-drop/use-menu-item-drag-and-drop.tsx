"use client"
import { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react"
import invariant from "tiny-invariant"
import { draggable, dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter"
import { pointerOutsideOfPreview } from "@atlaskit/pragmatic-drag-and-drop/element/pointer-outside-of-preview"
import { setCustomNativeDragPreview } from "@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview"

import { DragPreview } from "./drag-preview"
import { DropIndicator } from "./drop-indicator"
import { attachInstruction, extractInstruction } from "./hitbox"
import { createPortal } from "react-dom"

/**
 *
 * @internalState:
 * type = "idle"
 * type = "dragging"
 * type = "preview", container, ui
 * type = "is-over", instruction,
 *
 * - Don't include the `draggable` property if you don't want the menu item to be a draggable
 * - Don't include the `dropTarget` property if you don't want the menu item to be a drop target
 *
 */


export const idle: any = { type: "idle" }
export function useMenuItemDragAndDrop({ draggable: draggableArgs, dropTarget: dropTargetArgs }: any) {
  const draggableAnchorRef = useRef<HTMLDivElement | HTMLButtonElement | null | any>(null)
  const draggableButtonRef = useRef<HTMLDivElement | HTMLButtonElement | null | any>(null)
  const dropTargetRef = useRef<HTMLDivElement | HTMLButtonElement | null | any>(null)

  // type = "idle" | "dragging" | "preview" | "is-over"
  const [internalState, setInternalState] = useState(idle)

  const getDraggableElement = useCallback(() => {
    return draggableAnchorRef.current ?? draggableButtonRef.current ?? null
  }, [])

  // Set up draggable
  useEffect(() => {
    // Don't set up a draggable if there are no draggable args
    if (!draggableArgs) {
      return
    }
    const element = getDraggableElement()
    invariant(element, `draggableAnchorRef or draggableButtonRef not set`)

    return draggable({
      element,
      getInitialData: draggableArgs.getInitialData,
      canDrag: draggableArgs.canDrag,
      onGenerateDragPreview({ nativeSetDragImage, source, location }) {
        setCustomNativeDragPreview({
          nativeSetDragImage,
          getOffset: pointerOutsideOfPreview({
            x: "16px",
            y: "8px",
          }),
          render({ container }) {
            const args = {
              dragHandle: source.dragHandle,
              element: source.element,
              input: location.current.input,
            }
            setInternalState({
              type: "preview",
              container,
              ui: draggableArgs.getDragPreviewPieces(args),
            })
          },
        })
      },
      onDragStart() {
        setInternalState({ type: "dragging" })
      },
      onDrop() {
        setInternalState(idle)
      },
    })
  }, [draggableArgs, getDraggableElement])

  // Set up drop target
  useEffect(() => {
    if (!dropTargetArgs) {
      return
    }

    // Don't need to provide a draggable element to have a drop target.
    // Using this element in our `canDrop` check
    const draggableElement = getDraggableElement()

    const dropTarget = dropTargetRef.current
    invariant(dropTarget, `dropTargetRef was not set`)

    return dropTargetForElements({
      element: dropTarget,
      // cannot drop on self
      canDrop: (args): boolean => {
        // cannot drop on self
        if (args.source.element === draggableElement) {
          return false
        }
        if (dropTargetArgs.canDrop) {
          return dropTargetArgs.canDrop(args)
        }
        return true
      },
      // menu items are always sticky, and the GroupDropIndicator should clear stickiness
      getIsSticky: () => true,
      getData(args) {
        const data = dropTargetArgs.getData?.(args) ?? {}
        const operations = dropTargetArgs.getOperations(args)
        return attachInstruction(data, {
          input: args.input,
          element: args.element,
          operations,
        })
      },
      onDragStart({ self }) {
        const instruction = extractInstruction(self.data)
        setInternalState({ type: "is-over", instruction })
      },
      onDrag({ self }) {
        const instruction = extractInstruction(self.data)
        setInternalState((current: any) => {
          if (
            current.type === "is-over" &&
            instruction?.operation === current.instruction?.operation &&
            instruction?.blocked === current.instruction?.blocked
          ) {
            return current
          }
          return { type: "is-over", instruction }
        })
      },
      onDragLeave() {
        setInternalState(idle)
      },
      onDrop() {
        setInternalState(idle)
      },
      onDragEnter({ self }) {
        const instruction = extractInstruction(self.data)
        setInternalState({ type: "is-over", instruction })
      },
    })
  }, [dropTargetArgs, getDraggableElement])

  const dragPreview: ReactNode = (() => {
    if (internalState.type !== "preview") {
      return null
    }

    return createPortal(
      <DragPreview elemBefore={internalState?.ui?.elemBefore}>{internalState?.ui?.content}</DragPreview>,
      internalState.container,
    )
  })()

  const dropIndicator = internalState.type === "is-over" && internalState.instruction && (
    <DropIndicator instruction={internalState.instruction} />
  )

  const state = useMemo(() => {
    if (internalState.type === "preview") {
      return { type: "preview" }
    }
    // returning a new object to avoid modification of our `internalState` object
    return { ...internalState }
  }, [internalState])

  return {
    state,
    draggableButtonRef,
    dropTargetRef,
    draggableAnchorRef,
    dragPreview,
    dropIndicator,
  }
}

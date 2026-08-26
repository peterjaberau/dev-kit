"use client"

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from "react"
import { createPortal } from "react-dom"
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine"
import {
  draggable,
  dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter"
import { pointerOutsideOfPreview } from "@atlaskit/pragmatic-drag-and-drop/element/pointer-outside-of-preview"
import { setCustomNativeDragPreview } from "@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview"
import {
  attachInstruction,
  extractInstruction,
  type Instruction,
} from "./hitbox"
import { DragPreview } from "./drag-preview"
import { EXPAND_ON_HOVER_TIME } from "../constants"
import type { TreeItem } from "../types"
import { getDescendantIds } from "../utils"

interface UseNestedPanelDragAndDropProps {
  children?: TreeItem[]
  getDragPreviewPieces?: () => {
    content: ReactNode
    elemBefore?: ReactNode
  }
  hasChildren: boolean
  id: string
  index: number
  isBlocked?: boolean
  isExpanded: boolean
  level: number
  setIsExpanded: Dispatch<SetStateAction<boolean>>
  title: string
}

export function useNestedPanelDragAndDrop({
  children,
  getDragPreviewPieces,
  hasChildren,
  id,
  index,
  isBlocked,
  isExpanded,
  level,
  setIsExpanded,
  title,
}: UseNestedPanelDragAndDropProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const expandTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  )
  const hasChildrenRef = useRef(hasChildren)
  const isExpandedRef = useRef(isExpanded)
  const [instruction, setInstruction] = useState<Instruction | null>(null)
  const [preview, setPreview] = useState<{
    container: HTMLElement
    content: ReactNode
    elemBefore?: ReactNode
  } | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  useEffect(() => {
    hasChildrenRef.current = hasChildren
    isExpandedRef.current = isExpanded
  }, [hasChildren, isExpanded])

  const cancelExpand = useCallback(() => {
    clearTimeout(expandTimeout.current)
    expandTimeout.current = undefined
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reset = () => {
      setInstruction(null)
      cancelExpand()
    }

    const cleanup = combine(
      draggable({
        element: el,
        getInitialData: () => ({
          id,
          index,
          descendantIds: getDescendantIds({ id, children, title }),
        }),
        onGenerateDragPreview: ({ nativeSetDragImage }) => {
          if (!getDragPreviewPieces) return

          setCustomNativeDragPreview({
            nativeSetDragImage,
            getOffset: pointerOutsideOfPreview({
              x: "16px",
              y: "8px",
            }),
            render({ container }) {
              setPreview({
                container,
                ...getDragPreviewPieces(),
              })
            },
          })
        },
        onDragStart: () => {
          setIsDragging(true)
          setPreview(null)

          if (hasChildrenRef.current) {
            setIsExpanded(false)
          }
        },
        onDrop: () => {
          setIsDragging(false)
          setPreview(null)

          if (hasChildrenRef.current) {
            setIsExpanded(true)
          }
        },
      }),
      dropTargetForElements({
        element: el,
        getData: ({ input, element }) =>
          attachInstruction(
            { id, index, level },
            {
              input,
              element,
              operations: {
                combine: isBlocked ? "not-available" : "available",
                "reorder-before": "available",
                "reorder-after":
                  hasChildrenRef.current && isExpandedRef.current
                    ? "not-available"
                    : "available",
              },
            }
        ),
        canDrop: ({ source }) => {
          if (source.data.id === id) return false

          const descendantIds = Array.isArray(source.data.descendantIds)
            ? source.data.descendantIds
            : []

          return !descendantIds.includes(id)
        },
        onDrag: ({ self, source, location }) => {
          const isSelfSource = source.data.id === id
          const newInstruction = extractInstruction(self.data)
          const isInnerMost =
            location.current.dropTargets[0]?.element === self.element
          const isNesting = newInstruction?.operation === "combine"

          if (isSelfSource) {
            reset()
          } else if (isInnerMost) {
            setInstruction(newInstruction)

            if (
              isNesting &&
              hasChildrenRef.current &&
              !isExpandedRef.current &&
              !expandTimeout.current
            ) {
              expandTimeout.current = setTimeout(() => {
                setIsExpanded(true)
                expandTimeout.current = undefined
              }, EXPAND_ON_HOVER_TIME)
            } else if (!isNesting) {
              cancelExpand()
            }
          } else {
            reset()
          }
        },
        onDragLeave: reset,
        onDrop: reset,
      })
    )

    return () => {
      cleanup()
      setIsDragging(false)
      cancelExpand()
    }
  }, [
    cancelExpand,
    children,
    getDragPreviewPieces,
    id,
    index,
    isBlocked,
    level,
    setIsExpanded,
    title,
  ])

  const dragPreview = preview
    ? createPortal(
        <DragPreview elemBefore={preview.elemBefore}>
          {preview.content}
        </DragPreview>,
        preview.container
      )
    : null

  return { dragPreview, instruction, isDragging, ref }
}

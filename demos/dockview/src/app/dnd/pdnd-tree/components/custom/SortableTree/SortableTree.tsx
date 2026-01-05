import { useEffect, useMemo, useRef, useState } from "react"
import { chakra } from "@chakra-ui/react"

import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine"
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter"

import SortableTreeItem from "../SortableTreeItem/SortableTreeItem"
import { extractInstruction } from "../tree-item-hitbox"
import type { Instruction, ItemMode } from "../tree-item-hitbox"

import type { DataType, DropPayloadType, IdType, ItemType, PropsType } from "../types"

import { getPathToItem } from "../utilities"

const defaultGetAllowedDropInstructions = () => [
  "reorder-above" as const,
  "reorder-below" as const,
  "make-child" as const,
  "reparent" as const,
]

const defaultGetAllowedDropCustomInstructions = () => [
  "reorder-above" as const,
  "reorder-below" as const,
  "combine" as const,
]

// fallback renderers
const NOOP = () => <chakra.div />

/* ------------------------------------------------------------------ */
/* Component                                                          */
/* ------------------------------------------------------------------ */

const SortableTree = <ID extends IdType, D extends DataType>({
  children,
  flashClass,
  flashStyle,
  getAllowedDropInstructions = defaultGetAllowedDropCustomInstructions,
  // getAllowedDropInstructions = defaultGetAllowedDropInstructions,
  indentSize = 16,
  indicatorType = "line",
  items,
  onDrop,
  onExpandToggle,
  onDebugToggle,
  renderIndicator,
  renderPreview,
  renderRow,
}: PropsType<ID, D>) => {
  const [lastAction, setLastAction] = useState<DropPayloadType<ID, D> | null>(null)

  const [draggedItem, setDraggedItem] = useState<ItemType<ID, D> | null>(null)

  const containerRef = useRef<HTMLElement | null>(null)
  const lastStateRef = useRef(items)

  const uniqueContextId = useMemo(() => Symbol("unique-id"), [])

  /* ------------------------------------------------------------------ */
  /* Keep latest tree state for hitbox calculations                      */
  /* ------------------------------------------------------------------ */

  useEffect(() => {
    lastStateRef.current = items
  }, [items])

  /* ------------------------------------------------------------------ */
  /* Flash last moved element                                           */
  /* ------------------------------------------------------------------ */

  useEffect(() => {
    let raf: number | null = null

    if (lastAction?.source.element && flashStyle) {
      raf = requestAnimationFrame(() => {
        Object.assign(lastAction.source.element.style, flashStyle)
      })
    }

    if (lastAction?.source.element && flashClass) {
      raf = requestAnimationFrame(() => {
        lastAction.source.element.classList.add(flashClass)
      })
    }

    return () => {
      if (lastAction?.source.element && flashStyle) {
        raf = requestAnimationFrame(() => {
          lastAction.source.element.removeAttribute("style")
        })
      }

      if (lastAction?.source.element && flashClass) {
        lastAction.source.element.classList.remove(flashClass)
      }

      if (raf) cancelAnimationFrame(raf)
    }
  }, [flashClass, flashStyle, lastAction])

  /* ------------------------------------------------------------------ */
  /* Global drag monitor                                                */
  /* ------------------------------------------------------------------ */

  useEffect(() => {
    return combine(
      monitorForElements({
        canMonitor: ({ source }) => source.data.uniqueContextId === uniqueContextId,

        onDragStart: ({ source }) => {
          setDraggedItem(source.data as ItemType<ID, D>)
        },

        onDrop: ({ location, source }: any) => {
          setDraggedItem(null)

          // Didn't drop on anything
          if (!location.current.dropTargets.length) return

          const target = location.current.dropTargets[0] as any

          const instruction: Instruction | null = extractInstruction(target.data)

          if (instruction !== null) {
            const typedSource = source as any

            setLastAction({
              instruction,
              source: typedSource,
              target,
            })

            // Don't fire onDrop for `instruction-blocked`
            if (instruction.type === "instruction-blocked") return

            onDrop?.({
              instruction,
              source: typedSource,
              target,
            })
          }
        },
      }),
    )
  }, [onDrop, uniqueContextId])

  return children({
    containerRef,
    children: items.map((item, index, array) => {
      const mode: ItemMode = (() => {
        if (item.items?.length && item.isOpen) return "expanded"
        if (index === array.length - 1) return "last-in-group"
        return "standard"
      })()

      return (
        <SortableTreeItem<ID, D>
          draggedItem={draggedItem}
          getAllowedDropInstructions={getAllowedDropInstructions}
          getPathToItem={(targetId) =>
            getPathToItem<ID, D>({
              current: lastStateRef.current,
              targetId,
            }) ?? []
          }
          indentLevel={0}
          indentSize={indentSize}
          indicatorType={indicatorType}
          item={item}
          key={item.id}
          mode={mode}
          uniqueContextId={uniqueContextId}
          onExpandToggle={onExpandToggle}
          onDebugToggle={onDebugToggle}
          renderIndicator={renderIndicator ?? NOOP}
          renderPreview={renderPreview ?? NOOP}
        >
          {renderRow}
        </SortableTreeItem>
      )
    }),
  })
}

export default SortableTree

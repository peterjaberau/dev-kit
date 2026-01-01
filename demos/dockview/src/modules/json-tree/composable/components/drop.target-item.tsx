"use client"

import {
  dropTargetForElements,
  attachListInstruction,
  extractListInstruction,
  attachTreeInstruction,
  extractTreeInstruction,
  DropIndicator,
  TreeDropIndicator,
  GroupDropIndicator,
  beginDragIfNeeded,
  broadcastActiveTarget,
  subscribeActiveTarget,
} from "../shared/imports/dnd"
import { DropTargetItemProps } from "../shared/types"
import { useCallback, useEffect, useRef, useState } from "react"

/**
 * Generic drop target component that works with list-item, group, and tree-item modes.
 * Automatically handles indicators and instruction attachment based on mode.
 *
 * Modes:
 * - list-item: For vertical lists (tasks, sections). Shows line indicators.
 * - group: For container drops (section backgrounds). Shows group highlight.
 * - tree-item: For hierarchical items (sidebar). Shows tree indicators with indentation.
 *
 * @example
 * ```tsx
 * // List mode (for tasks)
 * <DropTargetItem id="task-1" mode="list-item" onDrop={handleDrop}>
 *   <TaskItem />
 * </DropTargetItem>
 *
 * // Group mode (for section backgrounds)
 * <DropTargetItem id="section-1" mode="group" onDrop={handleDrop}>
 *   <Section />
 * </DropTargetItem>
 *
 * // Tree mode (for sidebar)
 * <DropTargetItem id="project-1" mode="tree-item" currentLevel={1} onDrop={handleDrop}>
 *   <ProjectItem />
 * </DropTargetItem>
 * ```
 */

export const DropTargetItem = ({
  id,
  index = 0,
  mode,
  children,
  style,
  lineGap = "8px",
  currentLevel = 0,
  indentPerLevel = 0,
  getData,
  canDrop,
  validateInstruction,
  onDrop,
  onDragEnter,
  onDragLeave,
  onDrag,
}: DropTargetItemProps) => {
  const ref: any = useRef<HTMLDivElement>(null)
  const [instruction, setInstruction] = useState<any>(null)
  const [isOver, setIsOver] = useState(false)
  const clearInstructionRef = useRef<number | null>(null)
  const clearInstructionTimeoutRef = useRef<number | null>(null)

  // Subscribe to the bus to clear stale indicators when another target becomes active
  useEffect(() => {
    return subscribeActiveTarget(({ element }) => {
      const myEl = ref.current
      if (!myEl) return
      if (element && element !== myEl) {
        setInstruction(null)
      }
    })
  }, [])

  const cancelPendingClear = () => {
    if (clearInstructionRef.current !== null && typeof window !== "undefined") {
      window.cancelAnimationFrame(clearInstructionRef.current)
      clearInstructionRef.current = null
    }
    if (clearInstructionTimeoutRef.current !== null && typeof window !== "undefined") {
      window.clearTimeout(clearInstructionTimeoutRef.current)
      clearInstructionTimeoutRef.current = null
    }
  }

  const scheduleClearInstruction = useCallback(({ immediate, delay }: { immediate: boolean; delay?: number }) => {
    cancelPendingClear()

    if (immediate || typeof window === "undefined") {
      setInstruction(null)
      return
    }

    if (delay && delay > 0) {
      clearInstructionTimeoutRef.current = window.setTimeout(() => {
        setInstruction(null)
        clearInstructionTimeoutRef.current = null
      }, delay)
      return
    }

    clearInstructionRef.current = window.requestAnimationFrame(() => {
      setInstruction(null)
      clearInstructionRef.current = null
    })
  }, [])

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const cleanup = dropTargetForElements({
      element,
      getIsSticky: () => false,
      getData: ({ input, element: el }) => {
        const baseData = {
          type: mode,
          id,
          index,
          ...getData?.(),
        }

        // Attach appropriate instruction based on mode
        if (mode === "tree-item") {
          return attachTreeInstruction(baseData, {
            element: el,
            input,
            currentLevel,
            indentPerLevel,
            mode: "standard",
          })
        }
        if (mode === "list-item") {
          return attachListInstruction(baseData, {
            element: el,
            input,
            operations: {
              "reorder-before": "available",
              "reorder-after": "available",
              combine: "not-available",
            },
          })
        }
        return baseData
      },
      canDrop: canDrop ? ({ source }) => canDrop(source.data) : undefined,
      onDragEnter: (args) => {
        cancelPendingClear()
        setIsOver(true)
        onDragEnter?.(args)
      },
      onDrag: (args) => {
        cancelPendingClear()
        const { self, location, source } = args

        // Only show indicator if this is the innermost target
        const innermost = location.current.dropTargets[0]
        if (innermost?.element !== self.element) {
          setInstruction(null)
          onDrag?.(args)
          return
        }

        // Extract instruction based on mode
        let extracted: any = null
        if (mode === "tree-item") {
          extracted = extractTreeInstruction(self.data)
        } else if (mode === "list-item") {
          extracted = extractListInstruction(self.data)
        }

        // Validate instruction before showing indicator (golden path!)
        if (validateInstruction) {
          const isValid = validateInstruction(source.data, self.data, extracted)
          if (!isValid) {
            setInstruction(null)
            onDrag?.(args)
            return
          }
        }

        setInstruction(extracted)
        beginDragIfNeeded()
        broadcastActiveTarget(self.element)
        onDrag?.(args)
      },
      onDragLeave: (args) => {
        setIsOver(false)
        const hasOtherTargets = args.location.current.dropTargets.length > 0
        scheduleClearInstruction({
          immediate: !hasOtherTargets,
          delay: hasOtherTargets ? 64 : undefined,
        })
        onDragLeave?.(args)
      },
      onDrop: (args) => {
        setIsOver(false)
        scheduleClearInstruction({ immediate: true })
        onDrop?.(args)
      },
    })

    return () => {
      cleanup()
      cancelPendingClear()
    }
  }, [
    id,
    index,
    mode,
    currentLevel,
    indentPerLevel,
    getData,
    canDrop,
    validateInstruction,
    onDrop,
    onDragEnter,
    onDragLeave,
    onDrag,
    scheduleClearInstruction,
  ])

  // Group mode: simple highlighting with GroupDropIndicator
  if (mode === "group") {
    return (
      <div style={{ ...style, display: "flex", flex: 1 }} data-testid={`drop-target-${id}`}>
        {/* NOTE: important!!! Do not remove the className on GroupDropIndicator!!! The className must be applied on this element or the UI would break */}
        {/* className={cn("flex flex-1", isOver && "p-[2px]")} */}
        <GroupDropIndicator
          isActive={isOver}
          ref={ref}
          // @ts-ignore
          style={{
            display: "flex",
            flex: 1,
            padding: isOver ? "2px" : undefined,
          }}
        >
          {children}
        </GroupDropIndicator>
      </div>
    )
  }

  // List-item mode: show line indicators
  if (mode === "list-item") {
    return (
      // @ts-ignore -- className={cn(className, "relative")}
      <div ref={ref} style={{ ...style, position: "relative" }} data-testid={`drop-target-${id}`}>
        {children}
        {instruction && "operation" in instruction && (
          <DropIndicator
            // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- Type guard ensures this is ListInstruction
            instruction={instruction}
            lineType="terminal-no-bleed"
            lineGap={lineGap}
          />
        )}
      </div>
    )
  }

  // Tree-item mode: show tree indicators with Atlaskit's tree indicator
  return (
    // @ts-ignore -- className={cn(className, "relative")}
    <div ref={ref} style={{ ...style, position: "relative" }} data-testid={`drop-target-${id}`}>
      {children}
      {instruction && <TreeDropIndicator instruction={instruction} />}
    </div>
  )
}

"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Flex, IconButton } from "@chakra-ui/react"
import { LuUndo2 } from "react-icons/lu"
import type React from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  type NodeModel,
  type SplitNode,
  type Orientation,
  isSplit,
  isLeaf,
  selectLeaf as selectLeafAction,
  reset as resetAction,
  splitLeafInDirection as splitLeafInDirectionAction,
  setSplitSizes as setSplitSizesAction,
  resetSplit as resetSplitAction,
  rearrangeLeaves as rearrangeLeavesAction,
  renameLeaf as renameLeafAction,
  removeLeaf as removeLeafAction,
  moveLeafToSplit as moveLeafToSplitAction,
} from "#store/layoutSlice"
import type { RootState } from "#store"
import SplitView from "./SplitView"
import LeafView from "./LeafView"

type DragState =
  | {
      kind: "resize"
      splitId: string
      axis: "x" | "y"
      containerSize: number // width or height depending on axis
      startPos: number // clientX or clientY
      startSizes: [number, number]
      gutter: number
    }
  | {
      kind: "rearrange"
      sourceLeafId: string
    }

export default function Canvas() {
  const dispatch = useDispatch()
  const root = useSelector((s: RootState) => s.layout.root)
  const selectedLeafId = useSelector((s: RootState) => s.layout.selectedLeafId)

  // drag state (resize or rearrange)
  const [drag, setDrag] = useState<DragState | null>(null)

  // Refs to find sizes during resize
  const splitRefs = useRef(new Map<string, HTMLDivElement | null>())

  // Tree lookup helper (local pure function)
  const findNode = useCallback((n: NodeModel, id: string): NodeModel | null => {
    if (n.id === id) return n
    if (isSplit(n)) return findNode(n.children[0], id) ?? findNode(n.children[1], id)
    return null
  }, [])

  // Split a leaf in a specific direction
  const handleSplit = useCallback(
    (leafId: string, orientation: Orientation) => {
      dispatch(splitLeafInDirectionAction({ leafId, orientation }))
    },
    [dispatch],
  )

  // Reset layout
  const reset = useCallback(() => {
    dispatch(resetAction())
    setDrag(null)
  }, [dispatch])

  // Handle resizing via gutters
  const onGutterMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>, split: SplitNode) => {
    e.preventDefault()
    const container = splitRefs.current.get(split.id)
    if (!container) return
    const rect = container.getBoundingClientRect()
    const axis = split.orientation === "row" ? "x" : "y"
    const containerSize = axis === "x" ? rect.width : rect.height
    const startPos = axis === "x" ? e.clientX : e.clientY
    const gutter = split.orientation === "row" ? 6 : 6 // px
    setDrag({
      kind: "resize",
      splitId: split.id,
      axis,
      containerSize,
      startPos,
      startSizes: [...split.sizes] as [number, number],
      gutter,
    })
    // UX: show resize cursor and disable selecting text during drag
    document.body.style.userSelect = "none"
    document.body.style.cursor = axis === "x" ? "col-resize" : "row-resize"
  }, [])

  useEffect(() => {
    function onMove(ev: MouseEvent) {
      if (!drag || drag.kind !== "resize") return
      const { splitId, axis, containerSize, startPos, startSizes } = drag
      const pos = axis === "x" ? ev.clientX : ev.clientY
      const deltaPx = pos - startPos
      const deltaFrac = containerSize > 0 ? deltaPx / containerSize : 0
      // Apply to first size, clamp between 0.1 and 0.9 to keep min sizes
      const min = 0.1
      const max = 0.9
      let a = startSizes[0] + deltaFrac
      a = Math.max(min, Math.min(max, a))
      const b = 1 - a
      dispatch(setSplitSizesAction({ splitId, sizes: [a, b] }))
    }
    function onUp() {
      if (drag && drag.kind === "resize") {
        setDrag(null)
        document.body.style.userSelect = ""
        document.body.style.cursor = ""
      }
    }
    window.addEventListener("mousemove", onMove)
    window.addEventListener("mouseup", onUp)
    return () => {
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mouseup", onUp)
    }
  }, [dispatch, drag])

  // Rearrangement (swap labels/colors) via HTML5 drag and drop between leaf headers
  const onLeafDragStart = useCallback((leafId: string) => {
    setDrag({ kind: "rearrange", sourceLeafId: leafId })
  }, [])

  const onLeafDrop = useCallback(
    (targetLeafId: string) => {
      if (!drag || drag.kind !== "rearrange") return
      const sourceId = drag.sourceLeafId
      if (sourceId === targetLeafId) return setDrag(null)

      // Swap labels/colors of the two leaves
      const sourceNode = findNode(root, sourceId)
      const targetNode = findNode(root, targetLeafId)
      if (!sourceNode || !targetNode || !isLeaf(sourceNode) || !isLeaf(targetNode)) {
        setDrag(null)
        return
      }
      dispatch(rearrangeLeavesAction({ a: sourceId, b: targetLeafId }))
      setDrag(null)
    },
    [dispatch, drag, findNode, root],
  )

  const onLeafDropEdge = useCallback(
    (targetLeafId: string, edge: "top" | "right" | "bottom" | "left") => {
      if (!drag || drag.kind !== "rearrange") return
      const sourceId = drag.sourceLeafId
      if (sourceId === targetLeafId) return setDrag(null)

      // Determine orientation based on edge
      const orientation: Orientation = edge === "left" || edge === "right" ? "row" : "col"

      // Move the source leaf to split at the target
      dispatch(
        moveLeafToSplitAction({
          sourceLeafId: sourceId,
          targetLeafId,
          orientation,
        }),
      )
      setDrag(null)
    },
    [dispatch, drag],
  )

  // Render
  return (
    <Flex height="80vh" width="full" flexDirection="column" gap={4}>
      <div className="relative flex-1 overflow-hidden rounded-xl border border-white/20 bg-white/10 shadow-inner backdrop-blur-lg">
        {/* Reset button - always visible at top-left */}
        <IconButton
          size="2xs"
          variant="ghost"
          css={{
            position: "absolute",
            left: 2,
            top: 2,
            zIndex: 999,
          }}
          // className="absolute left-2 top-2 z-50 rounded-lg border border-white/30 bg-red-600/80 p-1 px-2 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-red-500"
          onClick={reset}
          title="Reset layout"
          aria-label="Reset layout"
        >
          <LuUndo2 />
        </IconButton>

        {isLeaf(root) ? (
          <LeafView
            leaf={root}
            selected={selectedLeafId === root.id}
            onSelect={() => dispatch(selectLeafAction(root.id))}
            onDragStart={() => onLeafDragStart(root.id)}
            onDrop={() => onLeafDrop(root.id)}
            onDropEdge={(edge) => onLeafDropEdge(root.id, edge)}
            onRename={(newLabel) => dispatch(renameLeafAction({ leafId: root.id, newLabel }))}
            onDelete={() => dispatch(removeLeafAction({ leafId: root.id }))}
            onSplit={(orientation) => handleSplit(root.id, orientation)}
          />
        ) : (
          <SplitView
            split={root as SplitNode}
            selectedLeafId={selectedLeafId}
            onSelectLeaf={(id) => dispatch(selectLeafAction(id))}
            onGutterMouseDown={onGutterMouseDown}
            splitRefs={splitRefs}
            onLeafDragStart={onLeafDragStart}
            onLeafDrop={onLeafDrop}
            onLeafDropEdge={onLeafDropEdge}
            onResetSplit={(splitId) => dispatch(resetSplitAction({ splitId }))}
            onRenameLeaf={(leafId, newLabel) => dispatch(renameLeafAction({ leafId, newLabel }))}
            onDeleteLeaf={(leafId) => dispatch(removeLeafAction({ leafId }))}
            onSplitLeaf={handleSplit}
          />
        )}
      </div>
    </Flex>
  )
}

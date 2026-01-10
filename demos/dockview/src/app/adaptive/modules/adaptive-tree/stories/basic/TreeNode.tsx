"use client"

import { useContext, useRef } from "react"
import { LuFile, LuFolder } from "react-icons/lu"
import { TreeContext, DependencyContext } from "#adaptive-modules/adaptive-dnd/dnd-tree-context"
import { useDndNode } from "#adaptive-modules/adaptive-dnd/use-dnd-node"
import { useDndTree } from "#adaptive-modules/adaptive-dnd/use-dnd-tree"
import { GroupDropIndicator } from "#modules/drag-and-drop/components/dnd/drop-indicator/group"

import { AdaptiveTree } from "#adaptive-tree"

export function TreeNode({ node, nodeState }: any) {
  const { uniqueContextId } = useContext(TreeContext)
  const { DropIndicator, attachInstruction, extractInstruction } =
    useContext(DependencyContext)

  const itemRef = useRef<HTMLElement | any>(null)
  const groupRef = useRef<HTMLDivElement | any>(null)

  // Item-level DnD (drag + instruction indicator)
  const { dragState, groupState, instruction } = useDndNode({
    item: node,
    groupRef: groupRef,
    buttonRef: itemRef,
    uniqueContextId,
    attachInstruction,
    extractInstruction,
    DropIndicator,
  })

  /* ────────────────────────────────
     BRANCH NODE (has children)
  ──────────────────────────────── */
  if (nodeState.isBranch) {
    return (
      <div ref={groupRef}>
        <AdaptiveTree.BranchControl ref={itemRef}>
          <LuFolder />
          <AdaptiveTree.BranchText>{node.name}</AdaptiveTree.BranchText>
        </AdaptiveTree.BranchControl>

        {/* BRANCH group indicator */}
        <GroupDropIndicator ref={groupRef} isActive={groupState === "is-innermost-over"}>
          <AdaptiveTree.Node />
        </GroupDropIndicator>
      </div>
    )
  }

  /* ────────────────────────────────
     LEAF NODE
  ──────────────────────────────── */
  return (
    <AdaptiveTree.Item ref={itemRef}>
      <LuFile />
      <AdaptiveTree.ItemText>{node.name}</AdaptiveTree.ItemText>
      {instruction && <DropIndicator instruction={instruction} />}
    </AdaptiveTree.Item>
  )
}
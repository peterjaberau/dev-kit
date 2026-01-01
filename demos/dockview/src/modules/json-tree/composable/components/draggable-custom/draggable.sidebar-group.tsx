"use client"

import { DraggableItem } from "../draggable.item"

interface DraggableSidebarGroupProps {
  groupId: string
  index: number
  projectCount: number
  children: React.ReactNode
}

/**
 * Sidebar-specific draggable wrapper for project groups.
 * Uses tree mode for hierarchical drag-and-drop.
 */
export function DraggableSidebarGroup({ groupId, index, projectCount, children }: DraggableSidebarGroupProps) {
  return (
    <DraggableItem
      id={groupId}
      index={index}
      mode="tree"
      getData={() => ({
        type: "sidebar-group",
        groupId,
        index,
        projectCount,
      })}
    >
      {children}
    </DraggableItem>
  )
}

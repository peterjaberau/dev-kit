"use client"

import { DraggableItem } from "../draggable.item"

interface DraggableSidebarProjectProps {
  projectId: string
  index: number
  groupId?: string
  children: React.ReactNode
}

/**
 * Sidebar-specific draggable wrapper for projects.
 * Uses tree mode for hierarchical drag-and-drop.
 */
export function DraggableSidebarProject({ projectId, index, groupId, children }: DraggableSidebarProjectProps) {
  return (
    <DraggableItem
      id={projectId}
      index={index}
      mode="tree"
      getData={() => ({
        type: "sidebar-project",
        projectId,
        index,
        groupId,
        isInGroup: !!groupId,
      })}
    >
      {children}
    </DraggableItem>
  )
}

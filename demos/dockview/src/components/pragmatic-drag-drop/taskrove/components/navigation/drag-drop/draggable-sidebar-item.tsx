"use client"

import { DraggableItem } from "../../ui/drag-drop/draggable-item"

interface DraggableSidebarProjectProps {
  projectId: any
  index: number
  groupId?: any
  children: React.ReactNode
}


export function DraggableSidebarProject({
  projectId,
  index,
  groupId,
  children,
}: any) {
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

interface DraggableSidebarGroupProps {
  groupId: any
  index: number
  projectCount: number
  children: React.ReactNode
}

/**
 * Sidebar-specific draggable wrapper for project groups.
 * Uses tree mode for hierarchical drag-and-drop.
 */
export function DraggableSidebarGroup({
  groupId,
  index,
  projectCount,
  children,
}: DraggableSidebarGroupProps) {
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

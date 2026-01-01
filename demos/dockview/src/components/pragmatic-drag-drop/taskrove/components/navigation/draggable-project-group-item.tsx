"use client"

import { useState } from "react"
import { useAtomValue, useSetAtom } from "jotai"
import { ChevronDown, ChevronRight, FolderOpen, Folders } from "lucide-react"
import { SidebarMenuItem, SidebarMenuButton, SidebarMenuBadge } from "../custom/sidebar"
import { useSidebarDragDrop } from "../../hooks/use-sidebar-drag-drop"
import { DraggableProjectItem } from "./draggable-project-item"
import { DraggableSidebarGroup, DropTargetSidebarGroup } from "./drag-drop"
import { editingGroupIdAtom, stopEditingGroupAtom, pathnameAtom } from "@tasktrove/atoms/ui/navigation"
import { cn } from "../../lib/utils"


/**
 * Draggable project group item for sidebar navigation.
 * Follows the golden path: uses shared drag-drop components with specialized wrappers.
 */
export function DraggableProjectGroupItem({
  group,
  projects,
  index,
}: any) {
  const [isExpanded, setIsExpanded] = useState(true)
  const [isHovered, setIsHovered] = useState(false)

  // State
  const pathname = useAtomValue(pathnameAtom)

  // Drag and drop
  const { handleDrop } = useSidebarDragDrop()



  // Get only project IDs from items (ignore nested groups)
  const projectIds = group.items.filter((item: any): item => typeof item === "string")

  // Find actual project objects for this group's direct projects
  const groupProjects = projectIds
    .map((projectId) => projects.find((p) => p.id === projectId))
    .filter((p): p is Project => !!p)

  const handleSave = (newName: string) => {
    if (newName.trim() && newName !== group.name) {
      updateProjectGroup({ id: group.id, name: newName.trim() })
    }
    stopEditing()
  }

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  const handleGroupClick = (e: React.MouseEvent) => {
    const target = e.target
    const isChevronClick = target instanceof Element && target.closest("[data-chevron]") !== null

    if (isChevronClick) {
      toggleExpanded()
    } else if (!isEditing) {
      router.push(`/projectgroups/${group.slug}`)
    }
  }

  return (
    <>
      {/* Group header with drag and drop */}
      <DropTargetSidebarGroup groupId={group.id} index={index} onDrop={handleDrop}>
        <DraggableSidebarGroup groupId={group.id} index={index} projectCount={groupProjects.length}>
          <SidebarMenuItem>
            <div
              className="relative group w-full"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <SidebarMenuButton
                asChild={false}
                isActive={isActive}
                onClick={handleGroupClick}
                className="w-full cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2 w-full">
                  {/* Chevron for expand/collapse */}
                  <span className="flex-shrink-0" data-chevron>
                    {isExpanded ? (
                      <ChevronDown className="h-3 w-3" />
                    ) : (
                      <ChevronRight className="h-3 w-3" />
                    )}
                  </span>

                  {/* Folder icon */}
                  <span className="flex-shrink-0">
                    {isExpanded ? (
                      <FolderOpen className="h-4 w-4" style={{ color: group.color }} />
                    ) : (
                      <Folders className="h-4 w-4" style={{ color: group.color }} />
                    )}
                  </span>

                  {/* Group name */}
                  {isEditing ? (
                    <EditableDiv
                      as="span"
                      value={group.name}
                      onChange={handleSave}
                      onCancel={stopEditing}
                      autoFocus
                      className="flex-1 mr-6"
                    />
                  ) : (
                    <span className="flex-1 truncate mr-6">{group.name}</span>
                  )}

                  {/* Task count badge */}
                  <SidebarMenuBadge className={cn(contextMenuVisible ? "opacity-0" : "")}>
                    {taskCount}
                  </SidebarMenuBadge>
                </div>
              </SidebarMenuButton>

              {/* Context menu */}
              <div className="absolute right-2 top-1/2 -translate-y-1/2">
                <ProjectGroupContextMenu
                  groupId={group.id}
                  isVisible={contextMenuVisible}
                  open={isMenuOpen}
                  onOpenChange={handleMenuOpenChange}
                />
              </div>
            </div>
          </SidebarMenuItem>
        </DraggableSidebarGroup>
      </DropTargetSidebarGroup>

      {/* Group contents (when expanded) */}
      {isExpanded && (
        <>
          {groupProjects.map((project, projectIndex) => (
            <DraggableProjectItem
              key={project.id}
              project={project}
              index={projectIndex}
              isInGroup={true}
              groupId={group.id}
            />
          ))}
        </>
      )}
    </>
  )
}

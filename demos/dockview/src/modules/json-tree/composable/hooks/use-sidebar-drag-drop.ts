"use client"

import { useCallback } from "react"
import { extractTreeInstruction, ElementDropTargetEventBasePayload } from "../shared/imports/dnd"
import { useResourceManager, useResource } from "../actors"
import { getDefaultSectionId } from "../shared/defaults"

import {
  findContainingGroup,
  resolveTargetLocation,
  calculateMove,
  validateDrop,
} from "../shared/lib/sidebar-drag-drop-logic"

export type DropEventData = ElementDropTargetEventBasePayload

/**
 * Simplified sidebar drag-and-drop hook using pure functions.
 *
 * Architecture:
 * 1. Pure business logic in sidebar-drag-drop-logic.ts (easy to test)
 * 2. This hook orchestrates: read atoms → call pure functions → update atoms
 *
 * Key principle: ROOT is just another ProjectGroup, not special!
 *
 * Supports:
 * - Dragging projects/groups within sidebar (reordering)
 * - Dragging tasks onto projects (assignment)
 */

/** ElementDropTargetEventBasePayload */
export function useSidebarDragDrop() {
  const { projectGroups: allGroups, projects } = useResourceManager()
  const { sendToResource: updateTasks } = useResource({ resourceId: "tasks" })
  const { sendToResource: updateGroup } = useResource({ resourceId: "projectGroups" })

  /**
   * Main drop handler - handles both sidebar reordering and task assignment
   */
  const handleDrop = useCallback(
    async (args: ElementDropTargetEventBasePayload) => {
      const { source, location, self } = args
      const sourceData = source.data
      const dropTargets = location.current.dropTargets

      // Get innermost drop target
      const dropTarget = dropTargets[0]
      if (!dropTarget) return

      // CRITICAL: Only handle drop if this is the innermost drop target
      // This prevents the same drop from being processed multiple times
      // when there are nested drop targets (golden path pattern)
      if (dropTarget.element !== self.element) {
        return
      }

      const targetData = dropTarget.data
      const sourceType = sourceData.type as string

      // Handle TASK drops (assignment to project)
      if (sourceType === "list-item" && sourceData.ids && targetData.projectId) {
        try {
          const taskIds = sourceData.ids as any[]
          const targetProjectId = targetData.projectId as any

          // Find target project to get its default section
          const targetProject = projects.find((p: any) => p.id === targetProjectId)
          if (!targetProject) {
            console.log("Target project not found")
            return
          }

          const targetSectionId = getDefaultSectionId(targetProject)
          if (!targetSectionId) {
            console.log("Target project has no default section")
            return
          }

          // Build update requests for all tasks
          const updateRequests: any[] = taskIds.map((taskId) => ({
            id: taskId,
            projectId: targetProjectId,
            sectionId: targetSectionId,
          }))

          // Update all tasks at once
          await updateTasks(updateRequests)

          const count = taskIds.length
          console.log(
            count === 1 ? `Task moved to ${targetProject.name}` : `${count} tasks moved to ${targetProject.name}`,
          )

          console.log("✅ Task(s) assigned to project:", {
            taskCount: count,
            targetProject: targetProject.name,
            targetProjectId,
            targetSectionId,
          })
        } catch (error) {
          console.log("Failed to move tasks. Please try again.")
          console.error("Error moving tasks to project:", error)
        }
        return
      }

      // Handle SIDEBAR ITEM drops (project/group reordering)
      const instruction = extractTreeInstruction(targetData)
      if (!instruction) return

      try {
        // 1. Validate the drop operation
        const error = validateDrop(sourceData, targetData)
        if (error) {
          console.log(error)
          return
        }

        // 2. Extract the dragged item ID
        const draggedItemId = (sourceData.projectId || sourceData.groupId) as string
        if (!draggedItemId) return

        // 3. Find where the item currently is (pure function)
        const rootGroup = allGroups.projectGroups
        const sourceLocation = findContainingGroup(draggedItemId, rootGroup)
        if (!sourceLocation) {
          console.log("Source location not found for item:", draggedItemId)
          return
        }

        // 4. Resolve where the item should go (pure function)
        const targetLocation = resolveTargetLocation(targetData, instruction, rootGroup)
        if (!targetLocation) {
          console.log("Could not resolve target location")
          return
        }

        // 5. Calculate the move (pure function - no mutations)
        const moveResult = calculateMove(draggedItemId, sourceLocation, targetLocation, rootGroup)

        // 6. Apply updates (only side effects happen here)
        for (const update of moveResult.updates) {
          console.log("Updating group:", update.groupId, update.newItems)
          await updateGroup({ id: update.groupId, items: update.newItems })
        }
        // Debug logging to help track down issues
        if (process.env.NODE_ENV === "development") {
          console.log("✅ Drag-drop complete:", {
            item: draggedItemId,
            updates: moveResult.updates.map((u) => ({
              groupId: u.groupId,
              itemCount: u.newItems.length,
            })),
          })
        }
      } catch (error) {
        console.log("Failed to reorder items. Please try again.")
        console.log("Error executing sidebar drag-and-drop:", error)
      }
    },
    [updateGroup, updateTasks, allGroups, projects],
  )

  return { handleDrop }
}

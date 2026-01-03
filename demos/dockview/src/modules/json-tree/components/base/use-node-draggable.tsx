import { useCallback } from "react"
import { ElementDropTargetEventBasePayload } from './drag-and-drop/types'
import { TreeInstruction, extractTreeInstruction } from "./drag-and-drop/dependencies"
import { validateDrop } from "./drag-and-drop/lib"


export function useNodeDraggable() {

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


      // Handle ITEM drops (item/branch reordering)
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
        // const draggedItemId = (sourceData.id || sourceData.parentId)
        // if (!draggedItemId) return

        // 3. Find where the item currently is (pure function)
        // const rootGroup = allGroups.projectGroups
        // const sourceLocation = findContainingGroup(draggedItemId, rootGroup)
        // if (!sourceLocation) {
        //   console.warn("Source location not found for item:", draggedItemId)
        //   return
        // }

        // 4. Resolve where the item should go (pure function)
        // const targetLocation = resolveTargetLocation(targetData, instruction, rootGroup)
        // if (!targetLocation) {
        //   console.warn("Could not resolve target location")
        //   return
        // }

        // 5. Calculate the move (pure function - no mutations)
        // const moveResult = calculateMove(draggedItemId, sourceLocation, targetLocation, rootGroup)

        // 6. Apply updates (only side effects happen here)
        // for (const update of moveResult.updates) {
        //   console.log("Updating group:", update.groupId, update.newItems)
        //   await updateGroup({ id: update.groupId, items: update.newItems })
        // }
        // Debug logging to help track down issues
        // if (process.env.NODE_ENV === "development") {
        //   console.log("✅ Drag-drop complete:", {
        //     item: draggedItemId,
        //     updates: moveResult.updates.map((u) => ({
        //       groupId: u.groupId,
        //       itemCount: u.newItems.length,
        //     })),
        //   })
        // }
      } catch (error) {
        // toast.error("Failed to reorder items. Please try again.")
        console.error("Error executing sidebar drag-and-drop:", error)
      }
    },
    []
    // [updateGroup, updateTasks, allGroups, projects],
  )

  return { handleDrop }
}

import { TreeInstruction } from "../imports/dnd"
import { isGroup, reorderInArray, moveItemBetweenArrays } from "../utils"
import { GroupLocation, MoveResult, ProjectGroup } from "../types"
import { DEFAULT_UUID } from "../contants"

/**
 * FINDING LOCATIONS
 */
export function findContainingGroup(itemId: any, searchGroup: any): any {
  const index = searchGroup.items.findIndex((item: any) => (item ? item.id === itemId : item === itemId))
  if (index !== -1) {
    return { group: searchGroup, index }
  }
  // Search nested groups recursively
  for (const item of searchGroup.items) {
    if (isGroup(item)) {
      const found: any = findContainingGroup(itemId, item)
      if (found) return found
    }
  }
  return null
}

export function getGroupById(groupId: any, rootGroup: any): any {
  // ROOT is just the top-level group
  if (groupId === DEFAULT_UUID) {
    return rootGroup
  }
  // Search for nested groups
  return findGroupByIdRecursive(groupId, rootGroup)
}

export function findGroupByIdRecursive(groupId: any, searchGroup: any): any {
  if (searchGroup.id === groupId) {
    return searchGroup
  }

  for (const item of searchGroup.items) {
    if (isGroup(item)) {
      const found = findGroupByIdRecursive(groupId, item)
      if (found) return found
    }
  }

  return null
}

/**
 * RESOLVING TARGET LOCATIONS
 */
export function resolveTargetLocation(
  targetData: Record<string, any>,
  instruction: TreeInstruction,
  rootGroup: any,
): any {
  const targetType = targetData.type
  if (typeof targetType !== "string") return null

  switch (targetType) {
    case "sidebar-project-drop-target": {
      // Dropping on/near a project
      const targetGroupId = typeof targetData.groupId === "string" ? targetData.groupId : DEFAULT_UUID
      const targetGroup = getGroupById(targetGroupId, rootGroup)
      if (!targetGroup) return null

      if (typeof targetData.index !== "number") return null
      const targetIndex = targetData.index
      const insertIndex = instruction.type === "reorder-above" ? targetIndex : targetIndex + 1

      return { group: targetGroup, index: insertIndex }
    }

    case "sidebar-group-drop-target": {
      // Dropping on/near a group header
      if (instruction.type === "make-child") {
        // Insert INTO the group (at beginning)
        if (typeof targetData.groupId !== "string") return null
        const targetGroupId = targetData.groupId
        const targetGroup = getGroupById(targetGroupId, rootGroup)
        if (!targetGroup) return null

        return { group: targetGroup, index: 0 }
      } else {
        // Insert at ROOT level (above/below the group)
        if (typeof targetData.index !== "number") return null
        const targetIndex = targetData.index
        const insertIndex = instruction.type === "reorder-above" ? targetIndex : targetIndex + 1

        return { group: rootGroup, index: insertIndex }
      }
    }

    case "sidebar-root-drop-target": {
      // Dropping on empty ROOT area (append to end)
      return { group: rootGroup, index: -1 }
    }

    default:
      return null
  }
}

/**
 * CALCULATING MOVES
 */
export function calculateMove(
  itemId: string,
  source: GroupLocation,
  target: GroupLocation,
  rootGroup: ProjectGroup,
): MoveResult {
  // Same group? Just reorder
  if (source.group.id === target.group.id) {
    // target.index is already the desired insert position (adjusted by resolveTargetLocation)
    // But we need to account for the source removal when moving within the same array
    const adjustedTargetIndex = source.index < target.index ? target.index - 1 : target.index

    const newItems = reorderInArray(source.group.items, source.index, adjustedTargetIndex)

    return {
      updates: [{ groupId: source.group.id, newItems }],
    }
  }

  // Different groups? Move between them
  // Find the actual item to move (could be ProjectId or ProjectGroup)
  const item = source.group.items[source.index]
  if (!item) {
    throw new Error(`Item at index ${source.index} not found in source group`)
  }

  const { source: newSourceItems, target: newTargetItems } = moveItemBetweenArrays(
    source.group.items,
    target.group.items,
    item,
    target.index,
  )

  // CRITICAL: If we're moving between ROOT and a nested group,
  // we need to update the nested group object within ROOT's items array
  const isRootInvolved = source.group.id === rootGroup.id || target.group.id === rootGroup.id
  const hasNestedGroup = source.group.id !== rootGroup.id && target.group.id !== rootGroup.id

  if (isRootInvolved && !hasNestedGroup) {
    // One of the groups is ROOT, and the other is a nested group
    const isSourceRoot = source.group.id === rootGroup.id
    const nestedGroupId = isSourceRoot ? target.group.id : source.group.id
    const nestedGroupNewItems = isSourceRoot ? newTargetItems : newSourceItems

    // Update the nested group reference in ROOT's items
    const rootItems = isSourceRoot ? newSourceItems : newTargetItems
    const updatedRootItems = rootItems.map((rootItem: any) => {
      if (isGroup(rootItem) && rootItem.id === nestedGroupId) {
        // Found the nested group - return updated version
        return { ...rootItem, items: nestedGroupNewItems }
      }
      return rootItem
    })

    // Return single update with corrected ROOT
    return {
      updates: [
        {
          groupId: rootGroup.id,
          newItems: updatedRootItems,
        },
      ],
    }
  }

  // Standard cross-group move (no ROOT involvement)
  return {
    updates: [
      { groupId: source.group.id, newItems: newSourceItems },
      { groupId: target.group.id, newItems: newTargetItems },
    ],
  }
}

/**
 * VALIDATION MOVES
 */
export function isValidSidebarOperation(
  sourceData: Record<string, unknown>,
  targetData: Record<string, unknown>,
  instruction: any,
): boolean {
  // Helper to check instruction type (handles both tree-item and list-item)
  // For tree-item: has "type" property (reorder-above, reorder-below, make-child)
  // For list-item: has "operation" property (reorder-before, reorder-after, combine)
  const instructionType = instruction && "type" in instruction ? instruction.type : null

  // Block project nesting (make-child on project)
  if (
    sourceData.type === "sidebar-project" &&
    targetData.type === "sidebar-project-drop-target" &&
    instructionType === "make-child"
  ) {
    return false
  }

  // Block groups from being dropped on nested projects (only applies to project targets)
  if (sourceData.type === "sidebar-group" && targetData.type === "sidebar-project-drop-target") {
    const targetGroupId = targetData.groupId
    // If the target project is inside a group (not ROOT), block it
    if (typeof targetGroupId === "string" && targetGroupId !== DEFAULT_UUID) {
      return false
    }
  }

  // Block group nesting (make-child on group)
  if (
    sourceData.type === "sidebar-group" &&
    targetData.type === "sidebar-group-drop-target" &&
    instructionType === "make-child"
  ) {
    return false
  }

  return true
}

function extractInstructionForValidation(targetData: Record<string, unknown>): TreeInstruction | null {
  const instructionSymbol = Object.getOwnPropertySymbols(targetData).find((symbol) =>
    symbol.toString().includes("tree-item-instruction"),
  )

  if (!instructionSymbol) {
    return null
  }

  // Use symbol as index to access the instruction
  const instructionValue = (targetData as Record<symbol, unknown>)[instructionSymbol]
  if (typeof instructionValue === "object" && instructionValue !== null && "type" in instructionValue) {
    return instructionValue as TreeInstruction
  }
  return null
}

export function validateDrop(sourceData: Record<string, unknown>, targetData: Record<string, unknown>): string | null {
  const instruction = extractInstructionForValidation(targetData)
  const instructionType = instruction && "type" in instruction ? instruction.type : null

  // Use shared validation logic
  if (!isValidSidebarOperation(sourceData, targetData, instruction)) {
    // Return appropriate error message based on the operation
    if (
      sourceData.type === "sidebar-project" &&
      targetData.type === "sidebar-project-drop-target" &&
      instructionType === "make-child"
    ) {
      return "Projects cannot be nested under other projects"
    }

    if (sourceData.type === "sidebar-group") {
      if (targetData.type === "sidebar-project-drop-target") {
        return "Groups can only exist at the top level"
      }
      if (targetData.type === "sidebar-group-drop-target" && instructionType === "make-child") {
        return "Groups cannot be nested under other groups"
      }
    }
  }

  return null
}

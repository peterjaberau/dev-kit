import { DEFAULT_UUID } from ".."
/**
 * VALIDATION MOVES
 */
export function isValidDndOperation(
  sourceData: Record<string, unknown>,
  targetData: Record<string, unknown>,
  instruction: any,
): boolean {
  // Helper to check instruction type (handles both tree-item and list-item)
  // For tree-item: has "type" property (reorder-above, reorder-below, make-child)
  // For list-item: has "operation" property (reorder-before, reorder-after, combine)
  const instructionType = instruction && "type" in instruction ? instruction.type : null

  // Block Item nesting (make-child on Item)
  if (
    sourceData.type === "item" &&
    targetData.type === "item-drop-target" &&
    instructionType === "make-child"
  ) {
    return false
  }

  // Block Branches from being dropped on nested Items (only applies to Item targets)
  if (sourceData.type === "branch" && targetData.type === "item-drop-target") {
    const targetId = targetData.id
    // If the target Item is inside a Branch (not ROOT), block it
    if (typeof targetId === "string" && targetId !== DEFAULT_UUID) {
      return false
    }
  }

  // Block Branch nesting (make-child on Branch)
  if (
    sourceData.type === "branch" &&
    targetData.type === "branch-drop-target" &&
    instructionType === "make-child"
  ) {
    return false
  }

  return true
}

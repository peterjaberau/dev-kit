import { reorderInArray } from "./utils/array-operations"


export function findContainingLabel(labelId: any, labels: any[]): number | null {
  const index = labels.findIndex((label) => label.id === labelId)
  return index === -1 ? null : index
}

export function resolveLabelTargetLocation(
  targetData: Record<string, unknown>,
  instruction: any,
  labels: any[],
): number | null {
  const targetType = targetData.type as string

  switch (targetType) {
    case "sidebar-label-drop-target": {
      const targetIndex = targetData.index as number
      // Tree instructions use "type" property: reorder-above, reorder-below, make-child
      const insertIndex = instruction.type === "reorder-above" ? targetIndex : targetIndex + 1

      // Ensure index is within bounds
      if (insertIndex < 0 || insertIndex > labels.length) {
        return null
      }

      return insertIndex
    }

    case "sidebar-labels-root-drop-target": {
      // Dropping on empty area - append to end
      return labels.length
    }

    default:
      return null
  }
}

export function calculateLabelMove(
  labelId: any,
  sourceIndex: number,
  targetIndex: number,
  labels: any[],
): any {
  // Validate inputs
  if (sourceIndex < 0 || sourceIndex >= labels.length) {
    throw new Error(`Invalid source index: ${sourceIndex}`)
  }

  if (targetIndex < 0 || targetIndex > labels.length) {
    throw new Error(`Invalid target index: ${targetIndex}`)
  }

  // Find the actual label to move
  const label = labels[sourceIndex]
  if (!label || label.id !== labelId) {
    throw new Error(`Label ${labelId} not found at source index ${sourceIndex}`)
  }

  // Use reorderInArray utility - handles index adjustment automatically
  const newLabels = reorderInArray(labels, sourceIndex, targetIndex)

  return {
    newLabels,
  }
}


export function isValidLabelOperation(
  sourceData: Record<string, unknown>,
  targetData: Record<string, unknown>,
  _instruction: any,
): boolean {
  const sourceType = sourceData.type as string

  // Block dropping a label on itself (label reordering validation)
  if (sourceType === "sidebar-label") {
    const targetType = targetData.type as string
    if (targetType === "sidebar-label-drop-target") {
      const sourceLabelId = sourceData.labelId as any
      const targetLabelId = targetData.labelId as any
      if (sourceLabelId === targetLabelId) {
        return false
      }
    }
  }

  // Allow all other operations (golden path - permissive by default)
  // - Label-to-label drops (for reordering) ✅
  // - Task-to-label drops (for adding label to task) ✅
  return true
}

export function validateLabelDrop(
  sourceData: Record<string, unknown>,
  targetData: Record<string, unknown>,
): any {
  const sourceType = sourceData.type as string
  const targetType = targetData.type as string

  // Only allow label sources for label reordering
  if (sourceType !== "sidebar-label" && sourceType !== "list-item") {
    return "Only labels can be dragged here"
  }

  // Only allow valid label drop targets
  if (
    targetType !== "sidebar-label-drop-target" &&
    targetType !== "sidebar-labels-root-drop-target"
  ) {
    return "Labels can only be dropped onto other labels or the labels area"
  }

  // Use shared validation logic for additional checks
  if (!isValidLabelOperation(sourceData, targetData, null)) {
    // Check if dropping label on itself
    if (sourceType === "sidebar-label" && targetType === "sidebar-label-drop-target") {
      const sourceLabelId = sourceData.labelId as any
      const targetLabelId = targetData.labelId as any
      if (sourceLabelId === targetLabelId) {
        return "Cannot drop a label on itself"
      }
    }
  }

  return null
}

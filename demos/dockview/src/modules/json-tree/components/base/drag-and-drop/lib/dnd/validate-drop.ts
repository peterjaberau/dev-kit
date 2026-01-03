import { isValidDndOperation } from './is-valid-dnd-operation'
import { extractInstructionForValidation } from './extract-instruction-for-validation'

export function validateDrop(sourceData: Record<string, unknown>, targetData: Record<string, unknown>): string | null {
  const instruction = extractInstructionForValidation(targetData)
  const instructionType = instruction && "type" in instruction ? instruction.type : null

  // Use shared validation logic
  if (!isValidDndOperation(sourceData, targetData, instruction)) {
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

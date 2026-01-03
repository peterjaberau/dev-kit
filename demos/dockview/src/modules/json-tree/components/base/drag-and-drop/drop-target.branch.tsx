import { ElementDropTargetEventBasePayload } from "./types"
import { DropTarget } from "./drop-target"
import { isValidDndOperation } from "./lib"

interface DropTargetBranchProps {
  id: string
  index: number
  children: React.ReactNode
  onDrop: (args: ElementDropTargetEventBasePayload) => void
  type?: string
}

/**
 * drop target wrapper for Branches.
 * Uses tree-item mode at level 0 (root level).
 *
 * Prevents invalid nesting:
 * - Branches cannot be nested under other Branches (make-child blocked)
 *
 * Hides invalid indicators using validateInstruction (golden path).
 */
export function DropTargetBranch({
  id,
  index,
  children,
  onDrop,
  type = "branch-drop-target",
}: DropTargetBranchProps) {
  return (
    <DropTarget
      id={id}
      index={index}
      mode="tree-item"
      currentLevel={0}
      indentPerLevel={24}
      getData={() => ({
        type: type,
        id,
        index,
      })}
      validateInstruction={isValidDndOperation}
      onDrop={onDrop}
    >
      {children}
    </DropTarget>
  )
}

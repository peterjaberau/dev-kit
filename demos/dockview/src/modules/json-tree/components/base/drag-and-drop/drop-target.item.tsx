import { ElementDropTargetEventBasePayload } from "./types"
import { DropTarget } from "./drop-target"
import { isValidDndOperation } from "./lib"

interface DropTargetItemProps {
  id: string
  index: number
  parentId?: string
  children: React.ReactNode
  onDrop: (args: ElementDropTargetEventBasePayload) => void
  type?: string
}

/**
 * drop target wrapper for Items.
 * Uses tree-item mode with proper indentation for nested Items.
 * Accepts both nodes (branches/items).
 *
 * Prevents invalid nesting:
 * - Items cannot be nested under other items (make-child blocked)
 * - Branches can only exist at ROOT level
 *
 * Hides invalid indicators using validateInstruction (golden path).
 */
export function DropTargetItem({
  id,
  index,
  parentId,
  children,
  onDrop,
  type = "item-drop-target",
}: DropTargetItemProps) {
  const currentLevel = parentId ? 1 : 0 // Items in groups are at level 1

  return (
    <DropTarget
      id={id}
      index={index}
      mode="tree-item"
      currentLevel={currentLevel}
      indentPerLevel={24}
      getData={() => ({
        type: type,
        id,
        index,
        parentId,
      })}
      canDrop={(sourceData) => {
        // Accept sidebar projects/groups (for reordering)
        if (sourceData.type === "item" || sourceData.type === "branch") {
          return true
        }
        // Accept tasks (for assignment to project)
        if (sourceData.type === "list-item" && sourceData.ids) {
          return true
        }
        return false
      }}
      validateInstruction={isValidDndOperation}
      onDrop={onDrop}
    >
      {children}
    </DropTarget>
  )
}

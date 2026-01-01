interface DropTargetSidebarGroupProps {
  groupId: GroupId
  index: number
  children: React.ReactNode
  onDrop: (args: DropEventData) => void
}

/**
 * Sidebar-specific drop target wrapper for project groups.
 * Uses tree-item mode at level 0 (root level).
 *
 * Prevents invalid nesting:
 * - Groups cannot be nested under other groups (make-child blocked)
 *
 * Hides invalid indicators using validateInstruction (golden path).
 */
export function DropTargetSidebarGroup({
                                         groupId,
                                         index,
                                         children,
                                         onDrop,
                                       }: DropTargetSidebarGroupProps) {
  return (
    <DropTargetItem
      id={groupId}
      index={index}
      mode="tree-item"
      currentLevel={0}
      indentPerLevel={24}
      getData={() => ({
        type: "sidebar-group-drop-target",
        groupId,
        index,
      })}
      validateInstruction={isValidSidebarOperation}
      onDrop={onDrop}
    >
      {children}
    </DropTargetItem>
  )
}

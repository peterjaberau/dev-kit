// tree-dnd-rules.ts
export type TreeDndConfig = {
  allowCombine?: boolean
  allowReorder?: boolean
  allowCrossContext?: boolean

  isDraftNode?: (id: string) => boolean
  hasChildren?: (id: string) => boolean
}

export function createTreeDndRules(config: TreeDndConfig) {
  const {
    allowCombine = true,
    allowReorder = true,
    allowCrossContext = false,
    isDraftNode,
    hasChildren,
  } = config

  function canDropItem({
                         source,
                         selfId,
                         uniqueContextId,
                       }: {
    source: any
    selfId: string
    uniqueContextId: symbol
  }) {
    if (source.data.type !== "tree-item") return false
    if (source.data.id === selfId) return false
    if (!allowCrossContext && source.data.uniqueContextId !== uniqueContextId)
      return false
    if (isDraftNode?.(selfId)) return false

    return true
  }

  function canDropGroup(args: Parameters<typeof canDropItem>[0]) {
    return canDropItem(args)
  }

  function attachInstruction({
                               id,
                               input,
                               element,
                             }: {
    id: string
    input: any
    element: HTMLElement
  }) {
    return {
      id,
      type: "tree-item",
      operations: {
        combine:
          allowCombine && hasChildren?.(id)
            ? "available"
            : "blocked",
        "reorder-before": allowReorder ? "available" : "blocked",
        "reorder-after": allowReorder ? "available" : "blocked",
      },
    }
  }

  return {
    canDropItem,
    canDropGroup,
    attachInstruction,
  }
}

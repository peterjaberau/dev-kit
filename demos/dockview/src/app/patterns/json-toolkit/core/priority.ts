import { defaultKeyGenerator } from "./utils"

export const createEditorPriority = (config) => {
  return {
    id: defaultKeyGenerator(),
    name: config?.name,
    reference: config?.reference,
  }
}

export const sortByPriority = (items) => {
  if (items.length === 0) {
    return []
  }

  // Separate items with and without priority
  const itemsWithPriority = items.filter((item) => item.priority !== undefined)
  const itemsWithoutPriority = items.filter((item) => item.priority === undefined)

  if (itemsWithPriority.length === 0) {
    return items
  }

  // Create a map of items by their priority ID
  const itemsByPriorityId = new Map(itemsWithPriority.map((item) => [item.priority.id, item]))

  // Build the dependency graph
  const graph = new Map()
  const inDegree = new Map()

  // Helper function to ensure a node exists in the graph
  function ensureNode(id) {
    if (!graph.has(id)) {
      graph.set(id, new Set())
      inDegree.set(id, 0)
    }
  }

  // Initialize graph and in-degree for all items
  for (const item of itemsWithPriority) {
    ensureNode(item.priority.id)
  }

  // Helper function to add an edge to the graph
  function addEdge(fromId, toId) {
    if (!graph.has(fromId) || !graph.has(toId)) {
      return
    }
    if (!graph.get(fromId).has(toId)) {
      graph.get(fromId).add(toId)
      inDegree.set(toId, (inDegree.get(toId) || 0) + 1)
    }
  }

  // Add edges based on references
  for (const item of itemsWithPriority) {
    const id = item.priority.id
    const visited = new Set()
    let ref = item.priority.reference

    while (ref) {
      const refId = ref.priority.id
      ensureNode(refId)

      // Check for cyclic reference
      if (visited.has(refId)) {
        throw new Error("Circular dependency detected in priorities")
      }
      visited.add(refId)

      if (ref.importance === "higher") {
        // Reference must come before current item
        addEdge(id, refId)
      } else {
        // Current item must come before reference
        addEdge(refId, id)
      }

      ref = ref.priority.reference
    }
  }

  const queue = []

  // Find all nodes with no incoming edges
  for (const [id, degree] of inDegree) {
    if (degree === 0) {
      queue.push(id)
    }
  }

  const result = []

  // Perform topological sort
  while (queue.length > 0) {
    const currentId = queue.shift()
    const currentItem = itemsByPriorityId.get(currentId)
    if (currentItem) {
      result.push(currentItem)
    }

    for (const neighborId of graph.get(currentId) || []) {
      const newDegree = (inDegree.get(neighborId) || 0) - 1
      inDegree.set(neighborId, newDegree)
      if (newDegree === 0) {
        queue.push(neighborId)
      }
    }
  }

  // Add any remaining items that weren't processed
  for (const item of itemsWithPriority) {
    if (!result.includes(item)) {
      result.push(item)
    }
  }

  // Append items without priority at the end in their original order
  return [...result, ...itemsWithoutPriority]
}

export const corePriority = createEditorPriority({ name: "core" })
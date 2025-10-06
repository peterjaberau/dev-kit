import { GraphNodeId } from "#shared/types"

export const createNodePayload = (id: any, type: any) => {
  return {
    id: id,
    type: type,
    x: 0,
    y: 0,
  }
}


export const getNodeAdjacencyChanges = ({ from, to, label, adjacencyList = [], nodes= [] }: any) => {
  const adjacencyChanges: any = {}
  const nodeChanges: any = {}

  const currentConnections: any = adjacencyList[from] || []

  if (!currentConnections.includes(to)) {
    adjacencyChanges[from] = [...currentConnections, to]
  }

  if (label) {
    const hostNode = nodes[from]
    if (hostNode) {
      const newAdjacencyLabels = {
        ...(hostNode.adjacencyLabels || {}),
        [to]: label,
      }
      nodeChanges[from] = { ...hostNode, adjacencyLabels: newAdjacencyLabels }
    }
  }

  return { adjacencyChanges, nodeChanges }
}

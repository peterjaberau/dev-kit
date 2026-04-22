import { useApp } from "./app.selector"
import { getSpawnedActor } from "#utils"
import { useSelector } from "@xstate/react"
import { CONSTANTS } from "../constants"
import { useMemo } from "react"
import { getRoots, getChildren, getOutEdges, getRelativeDistance } from "@statelyai/graph"

export const useGraph = () => {
  const { appRef } = useApp()
  const graphRef = getSpawnedActor(CONSTANTS.GRAPH, appRef)

  const graphId = graphRef?.id
  const graphState: any = useSelector(graphRef, (state) => state)
  const sendToGraph = graphRef?.send
  const GraphContext = graphState?.context

  const graph = graphState?.graph

  const roots: any[] = getRoots(graph)
  const root = Array.isArray(roots) && roots.length > 1 ? roots[0] : null
  const rootEdges: any[] = getOutEdges(graph, root.id)
  const rootKey = root.data.key
  const rootDescription = root.data.description
  const topLevelStates: any = getChildren(graph, root.id)

  const sortedStates = useMemo(() => {
    return [...topLevelStates].sort((a, b) => {
      const da = getRelativeDistance(graph, a.id) ?? Infinity
      const db = getRelativeDistance(graph, b.id) ?? Infinity
      return da - db
    })
  }, [topLevelStates, graph])

  return {
    graphRef,
    graphId,
    graphState,
    sendToGraph,
    graph,
    roots,
    root,
    rootEdges,
    rootKey,
    rootDescription,
    topLevelStates,
    sortedStates,
  }
}

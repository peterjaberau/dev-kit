import {
  getRoots,
  getChildren,
  getOutEdges,
  getRelativeDistance,
  type GraphNode,
  type GraphEdge,
} from "@statelyai/graph"
import { useCallback, useMemo, useState } from "react"
import { StateNodeData, TransitionData, MachineGraph } from "../../utils"
import { chakra, Button, Card, Center, Container, Heading, Icon, Stack, Text, HStack, Flex } from "@chakra-ui/react"

interface MachineVizProps {
  graph: MachineGraph
}

export function MachineVisualizer({ graph }: MachineVizProps) {

  const roots = getRoots(graph) as GraphNode<StateNodeData>[]
  if (roots.length === 0) return null

  const root: any = roots[0]
  const topLevelStates = getChildren(graph, root.id) as GraphNode<StateNodeData>[]
  const rootEdges = getOutEdges(graph, root.id) as GraphEdge<TransitionData>[]

  const sortedStates = useMemo(() => {
    return [...topLevelStates].sort((a, b) => {
      const da = getRelativeDistance(graph, a.id) ?? Infinity
      const db = getRelativeDistance(graph, b.id) ?? Infinity
      return da - db
    })
  }, [topLevelStates, graph])




  return (
    <Container py="20" maxW="5xl">
      <Card.Root>
        <Card.Header
          pb="6"
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          borderBottomWidth="1px"
        >
          <Stack gap="1">
            <Heading as="h2" textStyle="xl">
              Machine Visualizer
            </Heading>
            <Text color="fg.muted">{root.data.key}</Text>
          </Stack>
        </Card.Header>
        <Card.Body>
          {/* Root transitions */}
          {rootEdges.length > 0 && (
            <Flex css={{ flexDirection: "column", mt: 3 }}>
              {rootEdges.map((edge, i) => (
                <div>TransitionViz</div>
                // <TransitionViz key={edge.id} edge={edge} graph={graph} sourceId={root.id} isFirst={i === 0} />
              ))}
            </Flex>
          )}
          {/* Child states */}
          <Flex
            css={{
              mt: 4,
              flexWrap: "wrap",
              alignItems: "flex-start",
              gap: 2,
            }}
          >
            {sortedStates.map(
              (child) => (
                <div>StateNodeViz</div>
              ),
              // <StateNodeViz key={child.id} node={child} graph={graph} isInitial={root.data.initialId === child.id} />
            )}
          </Flex>
        </Card.Body>
      </Card.Root>
    </Container>
  )

}
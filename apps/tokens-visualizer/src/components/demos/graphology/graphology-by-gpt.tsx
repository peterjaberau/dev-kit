"use client"

import React, { useState } from "react"
import Graph from "graphology"
import { dfsFromNode } from "graphology-traversal"
import { Card, Button, Box, HStack, Stack, Container, SimpleGrid, GridItem, Textarea } from '@chakra-ui/react'

export function GraphByGPTDemo() {
  const [input, setInput] = useState<string>(
    JSON.stringify(
      [
        { source: "A", target: "B" },
        { source: "B", target: "C" },
        { source: "A", target: "D" },
        { source: "D", target: "E" },
      ],
      null,
      2,
    ),
  )
  const [nodeId, setNodeId] = useState("A")
  const [nodeId2, setNodeId2] = useState("B")
  const [result, setResult] = useState<string>("")

  const buildGraph = () => {
    const edges = JSON.parse(input)
    const graph = new Graph({ type: "directed" })

    // Build graph
    edges.forEach((e: any) => {
      graph.mergeNode(e.source)
      graph.mergeNode(e.target)
      graph.addEdge(e.source, e.target)
    })

    return graph
  }

  const handleAction = (action: string) => {
    try {
      const graph = buildGraph()

      if (!graph.hasNode(nodeId)) throw new Error(`Node ${nodeId} not found`)
      let output: any = []

      switch (action) {
        case "ancestors":
          dfsFromNode(graph, nodeId, (n) => output.push(n), {
            direction: "in",
          } as any)
          break
        case "descendants":
          dfsFromNode(graph, nodeId, (n) => output.push(n), {
            direction: "out",
          } as any)
          break
        case "adjacencies":
          output = graph.outNeighbors(nodeId)
          break
        case "intersection":
          if (!graph.hasNode(nodeId2)) throw new Error(`Node ${nodeId2} not found`)
          const descA: string[] | any[] = []
          const descB: string[] | any[] = []
          dfsFromNode(graph, nodeId, (n: any) => (descA as any).push(n), { direction: "out" } as any)
          dfsFromNode(graph, nodeId2, (n: any) => (descB as any).push(n), { direction: "out" } as any)
          output = descA.filter((x) => descB.includes(x))
          break
        default:
          output = []
      }

      setResult(JSON.stringify(output, null, 2))
    } catch (err: any) {
      setResult("❌ " + err.message)
    }
  }

  return (
    <SimpleGrid
      columns={2}
      css={{
        width: 'full',
        h: 'full',
        gap: 4,
      }}
    >
      <Card.Root css={{ h: 'full'}}>
        <Card.Header>
          <Card.Title>
            Graph JSON Input (edges)
          </Card.Title>
        </Card.Header>
        <Card.Body>
          <div style={{ marginTop: "1rem" }}>
            <label>
              Node A:
              <input style={{ marginLeft: "0.5rem" }} value={nodeId} onChange={(e) => setNodeId(e.target.value)} />
            </label>
            <label style={{ marginLeft: "1rem" }}>
              Node B (for intersection):
              <input style={{ marginLeft: "0.5rem" }} value={nodeId2} onChange={(e) => setNodeId2(e.target.value)} />
            </label>
          </div>
          <Textarea
            flex={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </Card.Body>
        <Card.Footer>
          <Button size='xs' onClick={() => handleAction("ancestors")}>Get Ancestors</Button>
          <Button size='xs' onClick={() => handleAction("descendants")}>Get Descendants</Button>
          <Button size='xs' onClick={() => handleAction("adjacencies")}>Get Adjacencies</Button>
          <Button size='xs' onClick={() => handleAction("intersection")}>Get Descendant Intersection</Button>
        </Card.Footer>




        <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem" }}>

        </div>
      </Card.Root>

      {/* Right side: Output */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <h3>Result</h3>
        <textarea style={{ flex: 1, fontFamily: "monospace", padding: "0.5rem" }} value={result} readOnly />
      </div>
    </SimpleGrid>
  )
}

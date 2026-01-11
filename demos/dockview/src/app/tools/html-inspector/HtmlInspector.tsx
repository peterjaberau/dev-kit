"use client"

import React, { useState } from "react"
import {
  Card,
  Heading,
  Text,
  Textarea,
  Button,
  Stack,
  Box,
  SimpleGrid,
  Badge,
} from "@chakra-ui/react"
import { useMachine } from "@xstate/react"
import { htmlInspectorMachine } from "./html-inspector.machine"

const SAMPLE_HTML = `<div class="card">
  <h2>Title</h2>
  <p>This is a <strong>sample</strong> HTML snippet.</p>
  <ul>
    <li>Item one</li>
    <li>Item two</li>
  </ul>
</div>`


/* ───────────────────── Tree View (simple, replace later) ───────────────────── */

function TreeNodeView({ node }: { node: any }) {
  return (
    <Box pl={4} borderLeft="1px solid" borderColor="gray.200" mt={1}>
      <Text fontSize="sm">
        <strong>{`<${node.tag}>`}</strong> {node.text && <span>“{node.text}”</span>}
      </Text>

      {node.children?.map((child: any, i: number) => (
        <TreeNodeView key={i} node={child} />
      ))}
    </Box>
  )
}

/* ───────────────────── Analytics View ───────────────────── */

function AnalyticsView({ stats }: { stats: any }) {
  return (
    <Stack gap={2}>
      <Text>
        Total Elements: <strong>{stats.totalElements}</strong>
      </Text>
      <Text>
        Max Depth: <strong>{stats.maxDepth}</strong>
      </Text>

      <Box>
        <Text mb={1}>Tag Counts:</Text>
        <Stack direction="row" wrap="wrap">
          {Object.entries(stats.tagCounts).map(([tag, count]) => (
            <Badge key={tag} colorScheme="blue">
              {tag}: {count as number}
            </Badge>
          ))}
        </Stack>
      </Box>
    </Stack>
  )
}

/* ───────────────────── Main Component ───────────────────── */

export default function HtmlInspector() {
  const [htmlInput, setHtmlInput] = useState("")

  const [state, send] = useMachine(htmlInspectorMachine, {
    input: { html: "" },
  })

  const tree = state.context.htmlToDomTree?.tree
  const stats = state.context.analytics

  return (
    <SimpleGrid columns={{ base: 1, md: 3 }} gap={4}>
      {/* ───────── HTML INPUT ───────── */}
      <Card.Root>
        <Card.Header>
          <Heading size="sm">HTML Snippet</Heading>
        </Card.Header>

        <Card.Body>
          <Textarea
            value={htmlInput}
            onChange={(e) => setHtmlInput(e.target.value)}
            placeholder="Paste HTML snippet here"
            fontFamily="mono"
            fontSize="sm"
            rows={12}
          />
        </Card.Body>

        <Card.Footer>
          <Button variant="outline" onClick={() => setHtmlInput(SAMPLE_HTML)}>
            Load Sample
          </Button>
          <Button
            colorScheme="blue"
            disabled={!htmlInput.trim()}
            onClick={() => {
              send({ type: "START", html: htmlInput })
              // send({ type: "START" })
              // send({ type: "TRANSFORM", html: htmlInput })
            }}
          >
            Parse HTML
          </Button>

          <Button
            colorScheme="blue"
            disabled={!htmlInput.trim()}
            onClick={() => {
              send({ type: "TRANSFORM"})
              // send({ type: "START" })
              // send({ type: "TRANSFORM", html: htmlInput })
            }}
          >
            TRANSFORM
          </Button>
        </Card.Footer>
      </Card.Root>

      {/* ───────── TREE VISUALIZATION ───────── */}
      <Card.Root>
        <Card.Header>
          <Heading size="sm">DOM Tree</Heading>
        </Card.Header>

        <Card.Body overflow="auto" maxH="400px">
          {!tree || tree.children.length === 0 ? (
            <Text opacity={0.6}>No tree to display</Text>
          ) : (
            tree.children.map((child: any, i: number) => <TreeNodeView key={i} node={child} />)
          )}
        </Card.Body>
      </Card.Root>

      {/* ───────── ANALYTICS ───────── */}
      <Card.Root>
        <Card.Header>
          <Heading size="sm">Analytics</Heading>
        </Card.Header>

        <Card.Body>{!stats ? <Text opacity={0.6}>No analytics yet</Text> : <AnalyticsView stats={stats} />}</Card.Body>
      </Card.Root>
    </SimpleGrid>
  )
}

"use client"
import React, { useState } from "react"
import { Card, Heading, Text, Textarea, Button, Stack, Box, SimpleGrid, Badge } from "@chakra-ui/react"
import { classToInline, inlineToClass} from './utils'
import { AdaptiveTool } from "#adaptive-tool"
export default function Page() {
  const [htmlInput, setHtmlInput] = useState("")

  return (
    <SimpleGrid columns={2} gap={4}>
      <AdaptiveTool.Root title={"Html input"} colSpan={1}
      actions={[
        {
          label: "Inline to Class",
          trigger: () => {
            inlineToClass()
          },
        }
      ]}
      >
        <Textarea
          rows={20}
          value={htmlInput}
          onChange={(e) => setHtmlInput(e.target.value)}
          placeholder="Paste HTML here"
          fontFamily="mono"
          fontSize="sm"
        />
      </AdaptiveTool.Root>

      <Card.Root>
        <Card.Header>
          <Heading size="sm">Html</Heading>
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
              send({ type: "TRANSFORM" })
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

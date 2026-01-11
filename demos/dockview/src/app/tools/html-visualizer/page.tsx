"use client"
import React, { useState } from "react"
import { Textarea } from "@chakra-ui/react"
import { Tool } from "#adaptive"
import HtmlVisualizer from "./components"
import { Box, Center, Container, Flex, GridItem, SimpleGrid, Stack } from "@chakra-ui/react"
import { useParams } from "next/navigation"
import DevPanel from "#components/ui-common/dev-panel"

export default function Page() {
  const [html, setHtml] = useState(
    `<div class="box">
  <h1>Hello</h1>
  <p>World <strong>!</strong></p>
</div>`,
  )

  return (
    <SimpleGrid w={"full"} columns={10} p={4} h={"vh"} overflow={"hidden"} gap={4}>
      <GridItem colSpan={1} flex={1} data-page="story-col-1">
        <DevPanel title={"Html"}>
          <Textarea value={html} onChange={(e) => setHtml(e.target.value)} rows={8} />
        </DevPanel>
      </GridItem>
      <GridItem colSpan={2} flex={1} data-page="story-col-2">

      </GridItem>
    </SimpleGrid>
  )
}

"use client"
import React, { useState } from "react"
import { DomAnalyzerClient } from "./components/DomAnalyzerClient"
import { AdaptiveTool } from "#adaptive-tool"
import { Textarea } from "@chakra-ui/react"
import { Box, Center, Container, Flex, GridItem, SimpleGrid, Stack } from "@chakra-ui/react"
import DevPanel from "#components/ui-common/dev-panel"
export default function Page() {
  const [htmlInput, setHtmlInput] = useState("")
  const [parsedHtml, setParsedHtml] = useState<string>("")

  return (
    <SimpleGrid w={"full"} columns={3} p={4} h={"vh"} overflow={"hidden"} gap={4}>
      <GridItem colSpan={1} flex={1}>
        <DevPanel title={"Html"}>
          <Textarea
            rows={20}
            value={htmlInput}
            onChange={(e) => setHtmlInput(e.target.value)}
            placeholder="Paste HTML here"
            fontFamily="mono"
            fontSize="sm"
          />
        </DevPanel>
      </GridItem>
      <GridItem colSpan={2} flex={1} data-page="story-col-2">
        <AdaptiveTool.Root
          title={"Dom Visualizer"}
          actions={[
            {
              label: "Parse HTML",
              trigger: () => {
                setParsedHtml(htmlInput)
                console.log("html.....")
              },
              disabled: !htmlInput.trim(),
            },
          ]}
        >
          <DomAnalyzerClient html={parsedHtml} />
        </AdaptiveTool.Root>
      </GridItem>
    </SimpleGrid>
  )
}

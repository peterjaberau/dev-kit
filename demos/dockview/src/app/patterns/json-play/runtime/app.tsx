"use client"
import React, { useEffect, useState } from "react"
import JsonView from "react18-json-view"
import { Center, Container, GridItem, Heading, SimpleGrid, Stack, Textarea } from "@chakra-ui/react"
import { AdaptiveTool } from "#adaptive-tool"

export function App() {
  return (
    <SimpleGrid columns={3} gap={10} h={"full"} w={"full"} px={6}>
      <GridItem colSpan={1} flex={1}>
        <AdaptiveTool.Root
          actions={[]}
          title={"Request"}
          // actions={[
          //   {
          //     label: "Parse HTML",
          //     trigger: () => {
          //       setParsedHtml(htmlInput)
          //       console.log("html.....")
          //     },
          //     disabled: !htmlInput.trim(),
          //   },
          // ]}
        >
          todo
        </AdaptiveTool.Root>
      </GridItem>
      <GridItem colSpan={1} flex={1}>
        <AdaptiveTool.Root title={"Response"} actions={[]}></AdaptiveTool.Root>
      </GridItem>
      <GridItem colSpan={1} flex={1}>
        <AdaptiveTool.Root actions={[]} title={"Inspect"}>
          <JsonView
            src={{}}
            collapsed={2}
            customizeCopy={(node, nodeMeta) => console.log("---node----", { node, nodeMeta })}
            theme="github"
            displaySize
            displayArrayIndex
            style={{ fontSize: 13, fontWeight: "bold" }}
          />
        </AdaptiveTool.Root>
      </GridItem>
    </SimpleGrid>
  )
}


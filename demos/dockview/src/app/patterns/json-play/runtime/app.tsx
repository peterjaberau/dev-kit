"use client"
import React, { useEffect, useState } from "react"
import { Center, Container, GridItem, Heading, SimpleGrid, Stack, Textarea } from "@chakra-ui/react"
import { AdaptiveTool } from "#adaptive-tool"
import { JsonInspect, JsonResponse, JsonRequest  } from './components'

export function App() {
  return (
    <SimpleGrid data-layer="app" columns={3} gap={10} flex={1} w={"full"} h={"full"} px={6}>
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
          <JsonRequest />
        </AdaptiveTool.Root>
      </GridItem>
      <GridItem colSpan={1} flex={1}>
        <AdaptiveTool.Root title={"Response"} actions={[]}>
          <JsonResponse />
        </AdaptiveTool.Root>
      </GridItem>
      <GridItem colSpan={1} flex={1}>
        <AdaptiveTool.Root actions={[]} title={"Inspect"}>
          <JsonInspect />
        </AdaptiveTool.Root>
      </GridItem>
    </SimpleGrid>
  )
}


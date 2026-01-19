"use client"

import { useParams } from "next/navigation"
import { ComponentRenderer } from "#adaptive-registry"
import { Center, Container, GridItem, SimpleGrid, Card, Flex, HStack, Stack } from "@chakra-ui/react"
import DraggableTree from "#drag-and-drop"
import { dataTree } from "#drag-and-drop/examples/data"
import { DragDrop } from "#drag-and-drop/components"
import DevPanel from "#components/ui-common/dev-panel"
import DynamicTreeStory from "#dynamic-tree/stories/basic-composable"
import { ScrollArea } from "#adaptive/components/ui/scoll-area"
import { CardWithScrollArea } from "#adaptive/components/ui/card-with-scroll-area"

export default function Page() {
  const params = useParams()
  const paramValue = params.name as string
  return (
    <CardWithScrollArea title={paramValue}>
      <ComponentRenderer id={paramValue} />
    </CardWithScrollArea>
  )
}

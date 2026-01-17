"use client"

import { useParams } from "next/navigation"
import { ComponentRenderer } from "#adaptive-registry"
import { Center, Container, GridItem, SimpleGrid } from "@chakra-ui/react"
import DraggableTree from "#drag-and-drop"
import { dataTree } from "#drag-and-drop/examples/data"
import { DragDrop } from "#drag-and-drop/components"
import DevPanel from "#components/ui-common/dev-panel"
import DynamicTreeStory from "#dynamic-tree/stories/basic-composable"


export default function Page() {
  const params = useParams()
  const paramValue = params.name as string
  return (
    <SimpleGrid columns={1} gap={10} h={"full"}>
      <GridItem colSpan={1} flex={1} >
        {/*<DevPanel title={paramValue}>*/}
          <Center
            p={4}
            css={{
              // backgroundColor: "bg.panel",
              p: 2,
              boxShadow: "sm",
              borderRadius: "sm",
              height: 'full'
            }}
          >
            <ComponentRenderer id={paramValue} />
          </Center>
        {/*</DevPanel>*/}
      </GridItem>
    </SimpleGrid>
  )
}

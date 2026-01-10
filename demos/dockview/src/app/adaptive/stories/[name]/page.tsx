"use client"

import { useParams } from "next/navigation"
import { ComponentRenderer } from "#adaptive-registry"
import { Container, GridItem, SimpleGrid } from "@chakra-ui/react"
import DraggableTree from "#drag-and-drop"
import { dataTree } from "#drag-and-drop/examples/data"
import { DragDrop } from "#drag-and-drop/components"
import DevPanel from "#components/ui-common/dev-panel"
import DynamicTreeStory from "#dynamic-tree/stories/basic-composable"


export default function Page() {
  const params = useParams()
  const paramValue = params.name as string
  return (
    <SimpleGrid columns={3} gap={10} h={"full"}>
      <GridItem colSpan={1} flex={1}  data-page="story-col-1">
        <DevPanel title={"Custom Tree + Dnd"}>
          <DraggableTree data={dataTree}>
            <DragDrop.Root
              css={{
                backgroundColor: "bg.panel",
                width: "320px",
                border: "1px solid",
                borderColor: "border",
                borderRadius: "sm",
                padding: 3,
              }}
            >
              <DragDrop.Tree />
            </DragDrop.Root>
          </DraggableTree>
        </DevPanel>
      </GridItem>
      <GridItem colSpan={1} flex={1}  data-page="story-col-2">
        <DevPanel title={"AdaptiveTree (collection)"}>
          <ComponentRenderer id={paramValue} />
        </DevPanel>
      </GridItem>
      <GridItem colSpan={1} flex={1}  data-page="story-col-3">
        <DevPanel title={"DynamicTree (collectionless)"}>
          <DynamicTreeStory/>
        </DevPanel>
      </GridItem>
    </SimpleGrid>
  )
}

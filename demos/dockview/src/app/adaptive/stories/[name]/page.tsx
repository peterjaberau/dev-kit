"use client"

import { useParams } from "next/navigation"
import { ComponentRenderer } from "#adaptive-registry"
import { Container, GridItem, SimpleGrid } from "@chakra-ui/react"
import DraggableTree from "#drag-and-drop"
import { dataTree } from "#drag-and-drop/examples/data"
import { DragDrop } from "#drag-and-drop/components"

export default function Page() {
  const params = useParams()
  const paramValue = params.name as string
  return (
    <Container width={"full"} backgroundColor={"bg.subtle"} boxShadow={"sm"} p={4} borderRadius={"md"}>
      <SimpleGrid columns={2} gap={10}>
        <GridItem>
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
        </GridItem>
        <GridItem>
          <ComponentRenderer id={paramValue} />
        </GridItem>
      </SimpleGrid>
    </Container>
  )
}

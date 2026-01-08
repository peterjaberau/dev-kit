"use client"
import DraggableTree from ".."

import DraggableTreeExample from "../index-example"
import { DragDrop, Tree } from "../components"
import { TreeExample } from "../components/dnd-ui/tree-example"
import { dataTree } from "./data"
import { SimpleGrid, GridItem, Container } from "@chakra-ui/react"

export const TreeSimpleExample = () => {
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
              <TreeExample />
            </DragDrop.Root>
          </DraggableTree>
        </GridItem>

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
      </SimpleGrid>
    </Container>
  )
}

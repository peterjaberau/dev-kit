"use client"
import DraggableTree from ".."
import { DragDrop, Tree } from "../components"
import { dataTree } from "./data"
import { SimpleGrid, GridItem } from "@chakra-ui/react"

export const TreeSimpleExample = () => {
  return (
    <SimpleGrid columns={3} gap={6}>
      <GridItem colSpan={2}>
        <DraggableTree data={dataTree}>
          <DragDrop.Root>
            <DragDrop.Tree />
          </DragDrop.Root>
        </DraggableTree>
      </GridItem>
      <GridItem>
        <DraggableTree data={dataTree}>
          <DragDrop.Root>
            <Tree />
          </DragDrop.Root>
        </DraggableTree>
      </GridItem>
    </SimpleGrid>
  )
}

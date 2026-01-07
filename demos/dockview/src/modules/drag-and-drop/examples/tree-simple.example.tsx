"use client"
import DraggableTree from ".."
import { DragDrop, Tree } from "../components"
import { dataTree } from "./data"
import { SimpleGrid, GridItem, Container } from "@chakra-ui/react"

export const TreeSimpleExample = () => {
  return (
    <Container width={"full"} backgroundColor={"bg.subtle"} boxShadow={"sm"} p={4} borderRadius={"md"}>
      <DraggableTree data={dataTree}>
        <DragDrop.Root
          css={{
            backgroundColor: "bg.panel",
            width: "320px",
            border: "1px solid",
            borderColor: "border",
            borderRadius: 'sm',
            padding: 3
          }}
        >
          <DragDrop.Tree />
        </DragDrop.Root>
      </DraggableTree>
    </Container>
  )
}

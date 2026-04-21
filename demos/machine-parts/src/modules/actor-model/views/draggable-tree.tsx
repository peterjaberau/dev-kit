import { DragDrop } from "../components/dnd-ui"
import { SimpleGrid, GridItem, Container } from "@chakra-ui/react"

export const DraggableTree = () => {
  return (
    <Container width={"full"} backgroundColor={"bg.subtle"} boxShadow={"sm"} p={4} borderRadius={"md"}>
      <SimpleGrid columns={1} gap={10}>
        <GridItem>
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
        </GridItem>
      </SimpleGrid>
    </Container>
  )
}

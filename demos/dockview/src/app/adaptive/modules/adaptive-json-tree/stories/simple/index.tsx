"use client"
import SimpleJsonTree from "../../"

import { DragDrop, Tree } from "../../components"
import { dataTree } from "../data"
import { SimpleGrid, GridItem, Container } from "@chakra-ui/react"


const Index = () => {
  return (
    <Container width={"full"} backgroundColor={"bg.subtle"} boxShadow={"sm"} p={4} borderRadius={"md"}>
      <SimpleGrid columns={1} gap={10}>
        <GridItem>
          <Container
            data-scope="page"
            css={{
              color: "#172B4D",
              font: "var(--ds-font-body, normal 400 14px/1.42857142857143 -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif)",
              textDecorationSkipInk: "auto",
              margin: "0px",
              padding: "12pt",
            }}
          >
            <SimpleJsonTree data-scope="json-tree-app" data={dataTree}>
              <DragDrop.Root
                data-match="sidebar-content"
                data-scope="root"
                data-auto-scrollable={true}
                css={{
                  backgroundColor: "#fff",
                  margin: "0px",
                  padding: 3,
                  flex: "1 1 0px",
                  overflow: "auto",
                  borderWidth: "thin",
                  borderStyle: "solid",
                  borderRadius: "sm",
                  width: "20pc",
                  borderColor: "#0b120e24",
                }}
              >
                <DragDrop.Tree />
              </DragDrop.Root>
            </SimpleJsonTree>
          </Container>
        </GridItem>
      </SimpleGrid>
    </Container>
  )
}
export default Index

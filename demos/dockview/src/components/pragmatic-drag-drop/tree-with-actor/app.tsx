import { AppProvider, AppUIProvider } from "#json-tree/providers"
import { RenderTree } from "./render-tree"
import { RenderTreeWithActors } from "#tree-with-actor/render-tree-with-actors"
import { SimpleGrid } from "@chakra-ui/react"

const App = (props: any) => {
  return (
    <>
      <AppProvider {...props}>
        <AppUIProvider>
          <SimpleGrid columns={2} gap={6}>
            <RenderTree />
            <RenderTreeWithActors />
          </SimpleGrid>
        </AppUIProvider>
      </AppProvider>
    </>
  )
}

export default App

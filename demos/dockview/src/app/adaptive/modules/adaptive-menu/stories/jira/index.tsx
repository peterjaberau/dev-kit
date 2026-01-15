import { Sidebar } from './sidebar'
import { AdaptiveMenu } from "#adaptive-menu"
import { Container } from "@chakra-ui/react"
import { dataTree } from "../data"


const Index = () => {
  return (
    <Container maxW="container.sm" border="1px solid black" backgroundColor={"bg.panel"} padding="4">
      <AdaptiveMenu.Root data={dataTree}>
        <Sidebar />
      </AdaptiveMenu.Root>
    </Container>
  )
}

export default Index
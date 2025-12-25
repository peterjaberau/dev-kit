import { Basic, InitialOpen, LazyMount, Disabled, NestedCollapsible, ProgrammaticOpen, RootProvider } from "#components/json-tree-view-react/collapsible/examples"
import { ChevronRightIcon } from "lucide-react"
import { Container, Stack } from "@chakra-ui/react"

const Index = (props: any) => {

  return (
    <Stack>
      <Container borderRadius="md" border="1px solid" borderColor="gray.200" padding="4" mb="4" boxShadow="sm" bg="gray.50" >
        <Basic />
      </Container >
      <Container borderRadius="md" border="1px solid" borderColor="gray.200" padding="4" mb="4" boxShadow="sm" bg="gray.50" >
        <InitialOpen />
      </Container>
      <Container borderRadius="md" border="1px solid" borderColor="gray.200" padding="4" mb="4" boxShadow="sm" bg="gray.50" >
        <LazyMount />
      </Container>
      <Container borderRadius="md" border="1px solid" borderColor="gray.200" padding="4" mb="4" boxShadow="sm" bg="gray.50" >
        <Disabled />
      </Container>
      <Container borderRadius="md" border="1px solid" borderColor="gray.200" padding="4" mb="4" boxShadow="sm" bg="gray.50" >
        <NestedCollapsible />
      </Container>

      <Container borderRadius="md" border="1px solid" borderColor="gray.200" padding="4" mb="4" boxShadow="sm" bg="gray.50" >
        <ProgrammaticOpen />
      </Container>

      <Container borderRadius="md" border="1px solid" borderColor="gray.200" padding="4" mb="4" boxShadow="sm" bg="gray.50" >
        <RootProvider />
      </Container>


    </Stack>
  )
}
export default Index

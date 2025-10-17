import { InitParameters } from "./types"
import { SchemaBuilderProvider } from "./provider"
import { chakra, Container } from "@chakra-ui/react"

interface SchemaBuilderProps {
  schema: any
  uischema: any
  onChange: (schema: any, uischema: any) => any
  onMount?: (parameters: InitParameters) => any
  mods: any
  [key: string]: any
}

const Index = () => {
  return (
    <>
      <SchemaBuilderProvider>
        <Container fluid w={"full"} h={"full"} p={0}>
          schema builder app here
        </Container>
      </SchemaBuilderProvider>
    </>
  )
}

import { SchemaFormProvider } from "./provider"
import { chakra, Container } from "@chakra-ui/react"

interface SchemaFormProps {
  [key: string]: any
}

const SchemaForm = () => {
  return (
    <>
      <SchemaFormProvider>
        <Container fluid w={"full"} h={"full"} p={0}>
          schema form app here
        </Container>
      </SchemaFormProvider>
    </>
  )
}
export default SchemaForm

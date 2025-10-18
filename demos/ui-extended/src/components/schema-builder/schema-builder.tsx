'use client'
import { SchemaBuilderProvider } from "./provider"
import { chakra, Container } from "@chakra-ui/react"
import FormBuilder from "./app/FormBuilder"


const SchemaBuilder = () => {
  return (
    <>
      <SchemaBuilderProvider>
        <Container fluid w={"full"} h={"full"} p={0}>
          <FormBuilder />
        </Container>
      </SchemaBuilderProvider>
    </>
  )
}

export default SchemaBuilder

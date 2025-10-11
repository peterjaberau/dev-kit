"use client"
import { Container } from "@chakra-ui/react"
import SchemaBuilder from "@/components/SchemaBuilder"

export default function Page() {
  return (
    <Container fluid w='full' h='full' bg={'bg.subtle'}>
      <Container p={8}>
        <SchemaBuilder />
      </Container>
    </Container>
  )
}

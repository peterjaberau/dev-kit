"use client"
import { useParams } from "next/navigation"
import { Container } from "@chakra-ui/react"
import { ComponentRenderer } from "../components"



export default function Page() {
  const params = useParams()


  return (
    <Container fluid w="full" h="100vh">
      <Container h="full" fluid py={8}>
        <ComponentRenderer id={params?.id as any} />
      </Container>
    </Container>
  )
}

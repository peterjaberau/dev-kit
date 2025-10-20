"use client"
import { useParams } from "next/navigation"
import { Container } from "@chakra-ui/react"
import { ComponentRenderer } from "../components"



export default function Page() {
  const params = useParams()


  return (
    <Container fluid w="full" h="full" minH={'500px'} px={3}>
      <Container h="full" fluid py={3} px={3}>
        <ComponentRenderer id={params?.id as any} />
      </Container>
    </Container>
  )
}

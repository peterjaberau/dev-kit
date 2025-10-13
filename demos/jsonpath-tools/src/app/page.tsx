"use client"
import { Container } from "@chakra-ui/react"
import { Playground } from "#modules/playground"

export default function Page() {
  return (
    <Container fluid w='full' h='full' bg={'bg.subtle'}>
      <Container fluid py={8}>
        <Playground />
      </Container>
    </Container>
  )
}

"use client"

// import { useParams } from "next/navigation"
import Index from "./index"
import { Center, Container } from "@chakra-ui/react"

export default function Page() {
  // const params = useParams()
  // const paramValue = params.name as string
  return (
    <Container px={10} bg={'bg.subtle'} w={'full'} h={'100vh'} maxW={'full'} overflow={'hidden'}>
      <Center h={'full'} w={'full'}>
        <Center boxShadow={'md'} flex={1}  minWidth={'1200px'} maxWidth={'50%'} minHeight={'800px'} maxHeight={'70%'}>
          <Index />
        </Center>
      </Center>

    </Container>
  )
}

"use client"
import { Flex } from "@chakra-ui/react"
import { PlaygroundApp } from "./src/app/playground/playground-app"

export default function PlaygroundPage() {
  return (
    <Flex m="0" maxW="none" p="2.5" h="100dvh" minH="0" gap="2.5" bg="bg" direction={{ base: "column", lg: "row" }}>
      <PlaygroundApp />
    </Flex>
  )
}

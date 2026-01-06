"use client"
import { TreeSimpleExample } from "#modules/drag-and-drop/examples/tree-simple.example"
import React from "react"
import { Box, Container, Flex, GridItem, SimpleGrid, Stack } from "@chakra-ui/react"

export default function Page() {
  return (
    <Container p={4}>
      <TreeSimpleExample />
    </Container>
  )
}

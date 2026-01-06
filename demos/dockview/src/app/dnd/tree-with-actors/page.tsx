"use client"
import { getInitialData } from "#tree-with-actor/data/tree"
import TreeWithActor from "#tree-with-actor"
import React from "react"
import { Box, Container, Flex, GridItem, SimpleGrid, Stack } from "@chakra-ui/react"

export default function Page() {
  return (
      <Container p={4}>
        <TreeWithActor data={getInitialData()} />
      </Container>
  )
}

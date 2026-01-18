"use client"
import React from "react"
import { Box, Container, Flex, GridItem, SimpleGrid, Stack } from "@chakra-ui/react"
import Tree from './components'

export default function Index() {
  return (
    <Container p={4}>
      <Tree />
    </Container>
  )
}

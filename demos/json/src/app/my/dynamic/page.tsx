"use client"
import { SplitterRenderer } from '../components/dynamic-splitter-renderer'
import { configDefaults } from '../config'
import { Container, Button, Stack, Wrap, Center, Splitter } from "@chakra-ui/react"

export default function Page() {

  return (
      <Container bg={"bg.panel"} p={10} top={"100px"} h={"800px"}>
        <SplitterRenderer {...configDefaults.dynamicSplitter} />
      </Container>
  )
}

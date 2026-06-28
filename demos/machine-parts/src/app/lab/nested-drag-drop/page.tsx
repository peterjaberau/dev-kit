"use client";

import { Box, Card, Container } from "@chakra-ui/react"
import { NestedDragDropDemo } from "./components";
import { NestedDragDropInlineDemo } from "./components/index-inline-demo"
import { NestedDragDropBkDemo } from "./components/index-inline-bk"

export default function Page() {
  return (
    <Container maxW="full" py="8" css={{ display: "flex", flexDirection: "row", gap: "2rem" }}>
      <Card.Root>
        <Card.Header>index - custom hook</Card.Header>
        <Card.Body p={0}>
          <Box
            as="ul"
            aria-label="Nested drag and drop panels"
            data-list
            display="flex"
            flexDirection="column"
            gap="2"
            minH="100%"
            bg="bg"
            listStyleType="none"
            m="0"
            p="4"
          >
            <NestedDragDropDemo />
          </Box>
        </Card.Body>
      </Card.Root>

      <Card.Root>
        <Card.Header>index - custom hook</Card.Header>
        <Card.Body p={0}>
          <Box
            as="ul"
            aria-label="Nested drag and drop panels"
            data-list
            display="flex"
            flexDirection="column"
            gap="2"
            minH="100%"
            bg="bg"
            listStyleType="none"
            m="0"
            p="4"
          >
            <NestedDragDropInlineDemo />
          </Box>
        </Card.Body>
      </Card.Root>
      <Card.Root>
      <Card.Header>NestedDragDropBkDemo</Card.Header>
      <Card.Body p={0}>
        <Box
          as="ul"
          aria-label="Nested drag and drop panels"
          data-list
          display="flex"
          flexDirection="column"
          gap="2"
          minH="100%"
          bg="bg"
          listStyleType="none"
          m="0"
          p="4"
        >
          <NestedDragDropBkDemo />
        </Box>
      </Card.Body>
    </Card.Root>
    </Container>
  )
}

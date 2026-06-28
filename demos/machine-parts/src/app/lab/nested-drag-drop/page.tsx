"use client";

import { Box, Container } from "@chakra-ui/react"
import { NestedDragDropDemo } from "./components";

export default function Page() {
  return (
    <Container maxW="2xl" py="8">
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
    </Container>
  )
}

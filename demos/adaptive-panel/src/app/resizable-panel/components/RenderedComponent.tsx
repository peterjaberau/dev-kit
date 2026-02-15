"use client"

import { Box } from "@chakra-ui/react"

/**
 * RenderedComponent
 * -----------------
 * - Example dynamic component that can be injected into any panel.
 * - Replace with your actual UI.
 */
export const RenderedComponent = () => {
  return (
    <Box w="full" h="100%" bg="white" boxShadow="md" borderRadius="md" p={4}>
      Dynamic Rendered Component
    </Box>
  )
}

"use client"

import React, { useState } from "react"
import { Stack, HStack, Button, Box } from "@chakra-ui/react"

export const RenderedComponent = () => {
  return <Box w={"full"} h={"full"} boxShadow={"md"} borderRadius={"md"} bg={"white"} p={4}></Box>
}

export function ResizablePanelShellExample() {
  const [isFloating, setIsFloating] = useState(false)
  const [target, setTarget] = useState("canvas")

  return (
    <Stack bg="gray.100" w="100vw" h="100vh">
      {/* Header */}
      <Stack id="header" h="50px" bg="gray.200" align="center" justify="center">
        <Button size="sm" onClick={() => setIsFloating((v) => !v)}>
          Toggle Left Panel ({isFloating ? "Floating" : "Docked"})
        </Button>
      </Stack>

      {/* Main */}
      <Stack flex={1} id="main">
        <HStack h="full" id="main-container" position="relative">
          {/* Sidebar Left */}
          <Stack id="sidebar-left" w="50px" h="100%" bg="gray.300" />

          {/* Sidepanel Left */}
          {!isFloating && <Stack id="sidepanel-left" w="200px" h="100%" bg="gray.400" />}

          {isFloating && (
            <Stack
              id="sidepanel-left"
              position="absolute"
              left="58px"
              top="0"
              w="200px"
              h="100%"
              bg="gray.400"
              zIndex={10}
              boxShadow="lg"
            />
          )}

          {/* Body */}
          <Stack id="body" flex={1} h="100%" bg="gray.500" p={4}>
            <Stack id="canvastop" h="40px" bg="gray.300" />
            <Stack id="canvas" flex={1} bg="gray.50" />
            <Stack id="canvasbottom" h="150px" bg="gray.300" />
          </Stack>

          {/* Sidepanel Right */}
          <Stack id="sidepanel-right" w="200px" h="100%" bg="gray.300" />

          {/* Sidebar Right */}
          <Stack id="sidebar-right" w="50px" h="100%" bg="gray.300" />
        </HStack>
      </Stack>

      {/* Bottom Panel */}
      <Stack id="bottompanel" h="150px" bg="gray.200" />

      {/* Footer */}
      <Stack id="footer" h="30px" bg="gray.200" />
    </Stack>
  )
}

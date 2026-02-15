"use client"

import { useState } from "react"
import { Stack, HStack, Button } from "@chakra-ui/react"
import { PanelRegistryProvider } from "../components/PanelRegistry"
import { Panel } from "../components/Panel"
import { Docked } from "../components/Docked"
import { RenderedComponent } from "../components/RenderedComponent"

export default function Page() {
  const [target, setTarget] = useState("canvas")
  const [isFloating, setIsFloating] = useState(false)

  return (
    <PanelRegistryProvider>
      <Stack h="100vh" bg="gray.100">
        {/* HEADER */}
        <Stack direction="row" p={3} bg="gray.200" justify="center">
          <HStack>
            <Button size="sm" onClick={() => setTarget("sidebar-left")}>
              Sidebar Left
            </Button>

            <Button size="sm" onClick={() => setTarget("sidepanel-left")}>
              Sidepanel Left
            </Button>

            <Button size="sm" onClick={() => setTarget("canvas")}>
              Canvas
            </Button>

            <Button size="sm" onClick={() => setTarget("sidepanel-right")}>
              Sidepanel Right
            </Button>
          </HStack>
        </Stack>

        {/* MAIN LAYOUT */}
        <Stack direction="row" flex={1}>
          <Panel id="sidebar-left" w="60px" bg="gray.300" />

          <Panel id="sidepanel-left" w="200px" bg="gray.400" />

          <Panel id="canvas" flex={1} bg="gray.50" p={4} />

          <Panel id="sidepanel-right" w="200px" bg="gray.300" />

          <Panel id="sidebar-right" w="60px" bg="gray.300" />
        </Stack>

        {/* FOOTER */}
        <Panel id="bottompanel" h="120px" bg="gray.200" />

        {/* 🔥 Dynamic Injection Layer */}
        <Docked to={target}>
          <RenderedComponent />
        </Docked>
      </Stack>
    </PanelRegistryProvider>
  )
}

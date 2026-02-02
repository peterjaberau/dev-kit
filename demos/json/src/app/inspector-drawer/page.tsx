"use client"

import { useEffect, useRef, useState } from "react"
import { Provider } from "./provider"
import { InspectorDrawer } from "./components/drawer"
import {
  Button,
  Center,
  HStack,
  chakra,
} from "@chakra-ui/react"

export default function Page() {
  const [isClient, setIsClient] = useState(false)
  const [open, setOpen] = useState(false)
  const [useContainerPortal, setUseContainerPortal] = useState(true)

  // IMPORTANT: neutral host element
  const portalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null

  return (
    <Provider>
      <HStack mb={4} gap={4}>
        <Button onClick={() => setOpen(true)}>Open Inspector</Button>

        <Button
          variant="outline"
          onClick={() => setUseContainerPortal((v) => !v)}
        >
          {useContainerPortal
            ? "Render at page level"
            : "Render inside container"}
        </Button>
      </HStack>

      <Center w="full" h="600px" bg="#f0f0f0">
        {/* 🔑 NEUTRAL OVERLAY HOST */}
        <chakra.div
          ref={portalRef}
          position="relative"
          width="900px"
          height="600px"
          bg="bg.panel"
          overflow="hidden"
        >
          <InspectorDrawer
            opened={open}
            onClose={() => setOpen(false)}
            container={useContainerPortal ? portalRef : undefined}
          />
        </chakra.div>
      </Center>
    </Provider>
  )
}
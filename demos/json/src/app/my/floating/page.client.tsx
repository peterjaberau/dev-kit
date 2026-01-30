"use client"

import { Suspense, useMemo, useState } from "react"
import {
  createHtmlPortalNode,
  InPortal,
  OutPortal,
} from "react-reverse-portal"
import {
  Container,
  Button,
  Center,
  Splitter,
  Box,
} from "@chakra-ui/react"
import FloatingSplitterPanel from "../components/floating-splitter-panel"

const portalOptions: any = {
  attributes: {
    style: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
    },
  },
}
// Ensures splitter sizes always match panel count and sum to 100
function normalizeSizes(
  sizes: number[] | null,
  count: number,
  fallback: number[]
) {
  if (!sizes || sizes.length !== count) return fallback
  const sum = sizes.reduce((a, b) => a + b, 0)
  return sum === 100 ? sizes : fallback
}

/* ---------------- page ---------------- */

export default function Page() {
  const [docked, setDocked] = useState(true)

  // stores sizes ONLY when floating panel exists
  const [sizesDocked, setSizesDocked] = useState<number[] | null>(null)

  // portal node must be stable
  const portal = useMemo(
    () => createHtmlPortalNode(portalOptions),
    []
  )

  const panels = docked
    ? [
      { id: "left" },
      { id: "body" },
      { id: "floating" },
      { id: "right" },
    ]
    : [
      { id: "left" },
      { id: "body" },
      { id: "right" },
    ]

  const defaultSize = docked
    ? normalizeSizes(
      sizesDocked,
      4,
      [20, 45, 15, 20]
    )
    : normalizeSizes(
      sizesDocked?.filter((_, i) => i !== 2) ?? null,
      3,
      [20, 60, 20]
    )

  return (
    <Container bg="bg.panel" p={10} h="800px">
      <Button mb={4} onClick={() => setDocked(v => !v)}>
        {docked ? "Undock panel" : "Dock panel"}
      </Button>

      {/* 🔑 KEY forces remount when topology changes */}
      <Splitter.Root
        key={docked ? "docked" : "undocked"}
        panels={panels}
        defaultSize={defaultSize}
        borderWidth="1px"
        minH="60"
        onResizeEnd={(e: any) => {
          if (docked) setSizesDocked(e.sizes)
        }}
      >
        {/* left */}
        <Splitter.Panel id="left">
          <Center boxSize="full">left</Center>
        </Splitter.Panel>

        <Splitter.ResizeTrigger id="left:body" />

        {/* body */}
        <Splitter.Panel id="body">
          <Center boxSize="full">body</Center>
        </Splitter.Panel>

        {/* portal SOURCE — always inside Splitter.Root */}
        <InPortal node={portal}>
          <Suspense fallback={null}>
            <FloatingSplitterPanel
              from="body"
              to="floating"
              enabled={docked}
            />
          </Suspense>
        </InPortal>

        {/* docked wiring */}
        {docked && (
          <>
            <Splitter.ResizeTrigger id="body:floating" />
            <OutPortal node={portal} />
            <Splitter.ResizeTrigger id="floating:right" />
          </>
        )}

        {/* right */}
        <Splitter.Panel id="right">
          <Center boxSize="full">right</Center>
        </Splitter.Panel>
      </Splitter.Root>

      {/* floating target */}
      {!docked && (
        <Box
          position="fixed"
          right="20px"
          top="120px"
          w="420px"
          h="300px"
          bg="bg.panel"
          borderWidth="1px"
          zIndex={1000}
          display="flex"
          flexDirection="column"
        >
          <OutPortal node={portal} />
        </Box>
      )}
    </Container>
  )
}
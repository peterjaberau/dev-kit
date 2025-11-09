"use client"
import { Container, HStack, RadioCard } from "@chakra-ui/react"
import "react18-json-view/src/style.css"
import JsonViewer from "react18-json-view"
import { memo, useEffect, useMemo } from "react"
import { useDockDebugger } from "#actors/model/selectors"

export const DvDebuggerPlugin = memo(() => {
  const { dockDebugger } = useDockDebugger()


  return (
    <Container fluid w="full" h="full" p={3}>
      <JsonViewer
        src={{
          ...dockDebugger,

        }}
        collapsed={2}
        theme="github"
        style={{
          fontSize: "13px",
          fontWeight: "500",
        }}
      />
    </Container>
  )
})

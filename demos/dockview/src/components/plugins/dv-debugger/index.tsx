"use client"
import { Container, HStack, RadioCard } from "@chakra-ui/react"
import "react18-json-view/src/style.css"
import JsonView from "react18-json-view"
import { memo, useEffect, useMemo } from "react"
import { useDockDebugger } from "#actors/model/selectors"

export const DvDebuggerPlugin = memo(() => {
  const { dockDebugger } = useDockDebugger()


  return (
    <Container fluid w="full" h="full" p={3}>
      <JsonView
        src={{
          ...dockDebugger,

        }}
        collapsed={2}
        theme="github"
        displaySize
        displayArrayIndex
        style={{ fontSize: 13, fontWeight: "bold" }}
      />
    </Container>
  )
})

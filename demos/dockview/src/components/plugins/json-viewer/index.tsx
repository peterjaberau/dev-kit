"use client"
import { Container, HStack, RadioCard } from "@chakra-ui/react"
import "react18-json-view/src/style.css"
import JsonView from "react18-json-view"
import { memo, useEffect, useMemo } from "react"
import { usePluginJsonViewer } from "#actors/model/selectors"

export const JsonViewerPlugin = memo(() => {
  const { data } = usePluginJsonViewer()


  return (
    <Container fluid w="full" h="full" p={3}>
      <JsonView
        src={data}
        collapsed={1}
        theme="github"
        displaySize
        displayArrayIndex
        style={{ fontSize: 13, fontWeight: "bold" }}
      />
    </Container>
  )
})

"use client"
import { Container, HStack, RadioCard } from "@chakra-ui/react"
import "react18-json-view/src/style.css"
import JsonViewer from "react18-json-view"
import { memo, useEffect, useMemo } from "react"
import { usePluginJsonViewer } from "#actors/model/selectors"

export const JsonViewerPlugin = memo(() => {
  const { data } = usePluginJsonViewer()


  return (
    <Container fluid w="full" h="full" p={3}>
      <JsonViewer
        src={data}
        collapsed={3}
        theme="github"
        style={{
          fontSize: "13px",
          fontWeight: "500",
        }}
      />
    </Container>
  )
})

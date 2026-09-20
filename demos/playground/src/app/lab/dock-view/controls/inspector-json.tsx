"use client"

import { useMemo } from "react"
import { Box } from "@chakra-ui/react"
import JsonView from "react18-json-view"
import { viewCreateLayoutSnapshot } from "#view/core/state/snapshot"
import { PlaygroundContext } from "../render/playground-provider"

export function InspectorJson() {
  const layout = PlaygroundContext.useSelector((state) => state.context.layout)
  // Use the same serialization as the machine's Export JSON action.
  const snapshot = useMemo(() => viewCreateLayoutSnapshot(layout), [layout])

  return (
    <Box p="4" aria-label="Exported layout JSON">
      <JsonView src={snapshot} collapsed={1} style={{ fontSize: "12px", fontWeight: "bold" }} theme="github" />
    </Box>
  )
}

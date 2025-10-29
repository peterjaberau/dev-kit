import { Box } from "@chakra-ui/react"
import * as React from "react"

export const SchemaRowPatternProperty = ({ schemaNode }: any) => {
  return (
    schemaNode.subpath.length > 1 && schemaNode.subpath[0] === "patternProperties" ? (
      <Box ml={2} color="muted">
        (pattern property)
      </Box>
    ) : null
  )
}

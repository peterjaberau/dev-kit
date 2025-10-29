import { Box, Code, HStack } from "@chakra-ui/react"
import * as React from "react"

export const SchemaRowAddon = ({ schemaNode, nestingLevel, renderRowAddon }: any) => {
  return (
    renderRowAddon ? renderRowAddon({ schemaNode, nestingLevel }) : null
  )
}

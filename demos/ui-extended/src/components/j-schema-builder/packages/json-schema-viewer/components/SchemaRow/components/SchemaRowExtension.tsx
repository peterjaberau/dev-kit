import { Box, Code, HStack } from "@chakra-ui/react"
import * as React from "react"

export const SchemaRowExtension = ({ schemaNode, nestingLevel, vendorExtensions, renderExtensionAddon, hasVendorProperties }: any) => {
  return (
    hasVendorProperties && renderExtensionAddon ? renderExtensionAddon({ schemaNode, nestingLevel, vendorExtensions }) : null
  )
}

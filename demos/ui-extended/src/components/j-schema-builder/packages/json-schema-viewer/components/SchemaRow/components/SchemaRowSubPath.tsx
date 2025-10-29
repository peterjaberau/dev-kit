import { Text } from "@chakra-ui/react"
import * as React from "react"
import last from "lodash/last"

export const SchemaRowSubPath = ({ schemaNode }: any) => {
  return (
    schemaNode.subpath.length > 0 && shouldShowPropertyName(schemaNode) && (
      <Text fontFamily="mono" fontWeight="semibold">
        {last(schemaNode.subpath)}
      </Text>
    )
  )
}

function shouldShowPropertyName(schemaNode: any) {
  return schemaNode.subpath.length === 2 && (schemaNode.subpath[0] === "properties" || schemaNode.subpath[0] === "patternProperties")
}

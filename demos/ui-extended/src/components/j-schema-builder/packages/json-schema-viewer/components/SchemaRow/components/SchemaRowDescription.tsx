import { Code, HStack } from "@chakra-ui/react"
import * as React from "react"
import { Description } from "#jSchemaBuilder/json-schema-viewer/components"

export const SchemaRowDescription = ({ schemaNode, description, combiner }: any) => {
  return (
    typeof description === "string" && (!combiner || schemaNode.parent?.fragment.description !== description) && description.length > 0 && (
      <Description value={description} />
    )
  )
}

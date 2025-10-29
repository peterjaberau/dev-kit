import * as React from "react"
import { isRegularNode } from "@stoplight/json-schema-tree"
import { getValidationsFromSchema } from "#jSchemaBuilder/json-schema-viewer/components"
import { Validations } from "#jSchemaBuilder/json-schema-viewer"

export const SchemaRowValidation = ({ schemaNode, hideExamples }: any) => {
  return <Validations validations={isRegularNode(schemaNode) ? getValidationsFromSchema(schemaNode) : {}} hideExamples={hideExamples} />
}

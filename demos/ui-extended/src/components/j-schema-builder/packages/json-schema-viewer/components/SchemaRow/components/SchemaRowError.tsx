import * as React from "react"
import { Error } from "#jSchemaBuilder/json-schema-viewer/components/shared/Error"

export const SchemaRowError = ({ schemaNode }: any) => {
  return <Error schemaNode={schemaNode} />
}

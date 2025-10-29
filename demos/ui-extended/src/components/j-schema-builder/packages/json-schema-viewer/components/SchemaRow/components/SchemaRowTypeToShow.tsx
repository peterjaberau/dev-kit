import * as React from "react"
import { Types } from "#jSchemaBuilder/json-schema-viewer/components"

export const SchemaRowTypeToShow = ({ typeToShow, choices }: any) => {
  return (
    choices.length === 1 && <Types schemaNode={typeToShow} />
  )
}

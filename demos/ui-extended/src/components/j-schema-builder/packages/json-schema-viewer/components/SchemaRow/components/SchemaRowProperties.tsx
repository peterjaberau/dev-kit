import { HStack } from "@chakra-ui/react"
import * as React from "react"
import { Properties } from "#jSchemaBuilder/json-schema-viewer/components/shared/Properties"

export const SchemaRowProperties = ({ required, deprecated, validations }: any) => {
  return <Properties required={required} deprecated={deprecated} validations={validations} />
}

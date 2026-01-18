import AdaptiveJsonTree from "#adaptive-json-tree"
import React from "react"
import { data } from "#datasets/metadata"
import { data as openapiData } from "#datasets/oas-openapi-specifications"

const Index = (props: any) => {
  return (
    <AdaptiveJsonTree
      data={{
        openapi: openapiData["non-standard-components"],
        meta: data,
      }}
    />
  )
}
export default Index

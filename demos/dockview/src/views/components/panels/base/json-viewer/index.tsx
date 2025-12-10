import { Center } from "@chakra-ui/react"
import JsonView from "react18-json-view"
import React from "react"

const Index = (props: any) => {
  return (
    <JsonView
      src={{...props}}
      collapsed={1}
      theme="github"
      displaySize
      displayArrayIndex
      style={{ fontSize: 13, fontWeight: "bold" }}
    />
  )
}
export default Index

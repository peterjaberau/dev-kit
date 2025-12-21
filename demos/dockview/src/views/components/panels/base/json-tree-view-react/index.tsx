import JsonViewTree from "#json-tree-view-react"
import React from "react"
import { data } from "#datasets/metadata"

const Index = (props: any) => {
  return (
    <JsonViewTree
      src={data}
      collapsed={2}
      theme="github"
      editable={true}
      displaySize
      displayArrayIndex
      style={{ fontSize: 13, fontWeight: "bold" }}
    />
  )
}
export default Index

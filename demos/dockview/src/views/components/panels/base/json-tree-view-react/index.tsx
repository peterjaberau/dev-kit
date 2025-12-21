import JsonTree from "#json-tree-view-react/json-tree/app"
import React from "react"
import { data } from "#datasets/metadata"

const Index = (props: any) => {
  return (
    <JsonTree
      data={data}
      // collapsed={2}
      // theme="github"
      // editable={true}
      // displaySize
      // displayArrayIndex
      // style={{ fontSize: 13, fontWeight: "bold" }}
    />
  )
}
export default Index

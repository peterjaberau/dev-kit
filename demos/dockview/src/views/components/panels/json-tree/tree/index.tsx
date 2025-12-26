import JsonTree from "#json-tree"
import React from "react"
import { data } from "#datasets/metadata"

const Index = (props: any) => {
  return <JsonTree data={data} />
}
export default Index

import JsonTreeDraggable from "#json-tree/demos/tree-draggable"
import React from "react"
import { data } from "#datasets/metadata"

const Index = (props: any) => {
  return <JsonTreeDraggable data={data} />
}
export default Index

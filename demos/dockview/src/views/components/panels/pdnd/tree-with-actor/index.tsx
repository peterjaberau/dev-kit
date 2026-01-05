import TreeWithActor from "#components/pragmatic-drag-drop/tree-with-actor"
import React from "react"

import { getInitialData } from "#components/pragmatic-drag-drop/tree-with-actor/data/tree"


const Index = () => {
  return <TreeWithActor  data={getInitialData()} />
}
export default Index


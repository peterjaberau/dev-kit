'use client'
import React, { useEffect, useRef } from "react"
import RelationGraph from "#components"
import type {
  RGLine,
  RGLink,
  RGNode,
  RGNodeSlotProps,
  RGOptions,
  RelationGraphExpose,
  RGJsonData,
  RGUserEvent,
} from "#models-core/types"
import { RelationGraphComponent } from "#components/types"

const Index = () => {
  const graphRef: any = useRef<RelationGraphComponent | null>(null as any)
  const graphOptions: RGOptions = {
    // Here you can refer to the parameters in "Graph Graph" for settings
  }

  const showGraph = () => {
    const __graph_json_data: RGJsonData = {
      rootId: "a",
      nodes: [
        { id: "a", text: "Border color", borderColor: "yellow" },
        { id: "a1", text: "No border", borderWidth: -1, color: "#ff8c00" },
        { id: "a2", text: "Plain", borderWidth: 3, color: "transparent", borderColor: "#ff8c00", fontColor: "#ff8c00" },
        // Unless it is absolutely necessary, it is not recommended to use the html attribute, you can use the node slot to display the node in any form

        { id: "a1-1", html: '<span style="color:#ff8c00">Text Node</span>' },
        {
          id: "a1-4",
          html: '<div style="border:#ff8c00 solid 2px;height:80px;width:80px;border-radius: 40px;background-color: red;" />',
          nodeShape: 0,
        },
        { id: "b", text: "Font color", color: "#43a2f1", fontColor: "#ffd700" },
        {
          id: "d",
          text: "Node Size",
          width: 150,
          height: 150,
          color: "#ff8c00",
          borderWidth: 5,
          borderColor: "#ffd700",
          fontColor: "#ffffff",
        },
        { id: "e", text: "Rectangular node", nodeShape: 1 },
        { id: "f", text: "Rectangular", borderWidth: 1, nodeShape: 1, width: 300, height: 60 },
        { id: "f1", text: "Fixed", fixed: true, x: 60, y: 60 },
        { id: "g", text: "Css Flash", styleClass: "my-node-flash-style" },
      ],
      lines: [
        { from: "a", to: "b" },
        { from: "a", to: "a1" },
        { from: "a1", to: "a1-1" },
        { from: "a", to: "a2" },
        { from: "a1", to: "a1-4" },
        { from: "a", to: "f1" },
        { from: "a", to: "d" },
        { from: "d", to: "f" },
        { from: "a", to: "g" },
        { from: "a", to: "e" },
        { from: "b", to: "e" },
      ],
    }
    const graphInstance = graphRef.current!.getInstance()
    graphInstance.setJsonData(__graph_json_data).then(() => {
      graphInstance.moveToCenter()
      graphInstance.zoomToFit()
    })
  }

  const onNodeClick = (nodeObject: RGNode, $event: RGUserEvent) => {
    console.log("onNodeClick:", nodeObject)
  }

  const onLineClick = (lineObject: RGLine, linkObject: RGLink, $event: RGUserEvent) => {
    console.log("onLineClick:", lineObject)
  }

  useEffect(() => {
    showGraph()
  }, [])

  return (
    <div>
      <div style={{ height: "calc(100vh - 60px)" }}>
        <RelationGraph ref={graphRef} options={graphOptions} onNodeClick={onNodeClick} onLineClick={onLineClick} />
      </div>
    </div>
  )
}
// @ts-ignore
export default Index

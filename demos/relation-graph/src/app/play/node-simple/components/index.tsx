'use client'
import React, { useEffect, useRef } from "react"
import RelationGraph from "#components"
import type { RefObject } from "react"
import type { RGLine, RGLink, RGNode, RGNodeSlotProps, RGOptions, RelationGraphExpose } from "#models-core/types"

const staticJsonData = {
  rootId: "2",
  nodes: [
    { id: "1", text: "node-1", myicon: "el-icon-star-on" },
    { id: "2", text: "node-2", myicon: "el-icon-setting", width: 100, height: 100 },
    { id: "3", text: "node-3", myicon: "el-icon-setting" },
    { id: "4", text: "node-4", myicon: "el-icon-star-on" },
    { id: "6", text: "node-6", myicon: "el-icon-setting" },
    { id: "7", text: "node-7", myicon: "el-icon-setting" },
    { id: "8", text: "node-8", myicon: "el-icon-star-on" },
    { id: "9", text: "node-9", myicon: "el-icon-headset" },
    { id: "71", text: "node-71", myicon: "el-icon-headset" },
    { id: "72", text: "node-72", myicon: "el-icon-s-tools" },
    { id: "73", text: "node-73", myicon: "el-icon-star-on" },
    { id: "81", text: "node-81", myicon: "el-icon-s-promotion" },
    { id: "82", text: "node-82", myicon: "el-icon-s-promotion" },
    { id: "83", text: "node-83", myicon: "el-icon-star-on" },
    { id: "84", text: "node-84", myicon: "el-icon-s-promotion" },
    { id: "85", text: "node-85", myicon: "el-icon-sunny" },
    { id: "91", text: "node-91", myicon: "el-icon-sunny" },
    { id: "92", text: "node-82", myicon: "el-icon-sunny" },
    { id: "5", text: "node-5", myicon: "el-icon-sunny" },
  ],
  lines: [
    { from: "7", to: "71", text: "Investment" },
    { from: "7", to: "72", text: "Investment" },
    { from: "7", to: "73", text: "Investment" },
    { from: "8", to: "81", text: "Investment" },
    { from: "8", to: "82", text: "Investment" },
    { from: "8", to: "83", text: "Investment" },
    { from: "8", to: "84", text: "Investment" },
    { from: "8", to: "85", text: "Investment" },
    { from: "9", to: "91", text: "Investment" },
    { from: "9", to: "92", text: "Investment" },
    { from: "1", to: "2", text: "Investment" },
    { from: "3", to: "1", text: "Executive" },
    { from: "4", to: "2", text: "Executive" },
    { from: "6", to: "2", text: "Executive" },
    { from: "7", to: "2", text: "Executive" },
    { from: "8", to: "2", text: "Executive" },
    { from: "9", to: "2", text: "Executive" },
    { from: "1", to: "5", text: "Investment" },
  ],
}

const NodeSlot: React.FC<RGNodeSlotProps> = ({ node }) => {
  console.log("NodeSlot:")
  if (node.id === "2") {
    // if rootNode
    return (
      <div
        style={{
          zIndex: 555,
          opacity: 0.5,
          lineHeight: "100px",
          width: "100px",
          height: "100px",
          color: "#000000",
          borderRadius: "50%",
          boxSizing: "border-box",
          fontSize: "18px",
          textAlign: "center",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: "100%",
            height: node.data!.percent * 100 + "%",
            marginTop: (1 - node.data!.percent) * 100 + "%",
            background: "linear-gradient(to bottom, #00FFFF, #FF00FF)",
          }}
        >
          {node.text}
        </div>
      </div>
    )
  }
  return (
    <div style={{ lineHeight: "80px", textAlign: "center" }}>
      <span>{node.text}</span>
    </div>
  )
}
const Index: React.FC = () => {
  const graphRef = useRef(null as any) as RefObject<RelationGraphExpose>
  useEffect(() => {
    showGraph()
  }, [])
  const showGraph = async () => {
    // The node and line in the above data can refer to the options in "Node" and "Link & Line" for configuration.
    // Node: https://www.relation-graph.com/#/docs/node
    // Link & Line: https://www.relation-graph.com/#/docs/link
    await graphRef.current.setJsonData(staticJsonData, (graphInstance) => {})
  }
  // The graphRef.current.setJsonData(jsonData, callback) method is a convenient method that is equivalent to the following code:
  //  const graphInstance = graphRef.current.getInstance();
  //  graphInstance.addNodes(jsonData.nodes);
  //  graphInstance.addLines(jsonData.lines);
  //  graphInstance.rootNode = graphInstance.getNodeById(jsonData.rootId);
  //  await graphInstance.doLayout(); // Layout using the layouter set in graphOptions
  //  await graphInstance.moveToCenter(); // Find the center based on node distribution and center the view
  //  await graphInstance.zoomToFit(); // Zoom to fit, so that all nodes can be displayed in the visible area


  const options: RGOptions = {
    debug: true,
    showDebugPanel: true,
    defaultLineShape: 1,
    reLayoutWhenExpandedOrCollapsed: true,
    allowShowMiniToolBar: true,
    layout: {
      layoutName: "center",
      maxLayoutTimes: 3000,
    },
    defaultExpandHolderPosition: "right",
  }
  const onNodeClick = (node: RGNode, _e: MouseEvent | TouchEvent) => {
    console.log("onNodeClick:", node.text)
    return true
  }
  const onLineClick = (line: RGLine, _link: RGLink, _e: MouseEvent | TouchEvent) => {
    console.log("onLineClick:", line.text, line.from, line.to)
    return true
  }
  return (
    <div>
      <div style={{ height: "calc(100vh - 0px)" }}>
        <RelationGraph
          ref={graphRef}
          options={options}
          nodeSlot={NodeSlot}
          onNodeClick={onNodeClick}
          onLineClick={onLineClick}
        />
      </div>
    </div>
  )
}
//@ts-ignore
export default Index

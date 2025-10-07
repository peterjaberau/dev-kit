'use client'

import React, { useContext, useEffect, useRef } from "react"
import type { RefObject } from "react"
import "#components/relation-graph/src/core4react/styles/relation-graph.css"
import "#components/relation-graph/src/core4react/styles/relation-graph-toolbar.css"
import { devLog } from "#models-core/utils/RGCommon"
import GraphDebugPanel from "./src/core4react/widgets/GraphDebugPanel"
import { GraphMiniToolBar } from "./src/core4react/widgets/GraphMiniToolBar"
import RGCanvas from "./src/core4react/RGCanvas"
import screenfull from "screenfull"
import GraphOperateStuff from "./src/core4react/widgets/GraphOperateStuff"
import GraphLoading from "./src/core4react/widgets/GraphLoading"
import { RelationGraphStoreContext } from "#components"
import { RelationGraphCompJsxProps } from "#components/types"

const RelationGraph: React.FC<RelationGraphCompJsxProps> = (props: any) => {
  const graphInstance = useContext(RelationGraphStoreContext)
  const seeksRelationGraph$ = useRef(null as any) as RefObject<HTMLDivElement>
  useEffect(() => {
    devLog("[RelationGraph mounted]")
    devLog("setDom:", seeksRelationGraph$.current)
    graphInstance.setDom(seeksRelationGraph$.current)
    graphInstance.ready()
    graphInstance.dataUpdated()
    //@ts-ignore
    screenfull && screenfull.on && screenfull.on("change", onFullscreen)
    return () => {
      //@ts-ignore
      screenfull && screenfull.off && screenfull.off("change", onFullscreen)
    }
  }, [])
  const onFullscreen = () => {
    //@ts-ignore
    graphInstance.fullscreen(screenfull.isFullscreen)
  }
  const options = graphInstance && graphInstance.options
  return (
    <div ref={seeksRelationGraph$} className={"relation-graph"} style={{ width: "100%", height: "100%" }}>
      {options && options.showDebugPanel && <GraphDebugPanel />}
      {options &&
        options.allowShowMiniToolBar === true &&
        (props.toolBarSlot ? (
          typeof props.toolBarSlot === "function" ? (
            <props.toolBarSlot relationGraph={graphInstance} />
          ) : (
            props.toolBarSlot
          )
        ) : (
          <GraphMiniToolBar />
        ))}
      {options &&
        (props.graphPlugSlot ? (
          typeof props.graphPlugSlot === "function" ? (
            <props.graphPlugSlot relationGraph={graphInstance} />
          ) : (
            props.graphPlugSlot
          )
        ) : (
          <div className="rel-graph-plug"></div>
        ))}
      {options && (
        <RGCanvas
          nodeSlot={props.nodeSlot}
          lineSlot={props.lineSlot}
          svgDefs={props.svgDefs}
          canvasPlugSlot={props.canvasPlugSlot}
          canvasPlugAboveSlot={props.canvasAboveSlot as any}
          expandHolderSlot={props.expandHolderSlot}
        ></RGCanvas>
      )}
      <GraphOperateStuff nodeSlot={props.nodeSlot} />
      <GraphLoading />
    </div>
  )
}

export default RelationGraph

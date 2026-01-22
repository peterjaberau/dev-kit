"use client"
import { useState } from "react"
import { Inspector } from "#components/dev-tools/inspector"
import JsonView from "react18-json-view"

const GlobalInspectorImplt = () => {
  const [isInspectorGlobalOpen, setIsOpenInspectorGlobal] = useState(false)

  return (
    <Inspector title="Global Inspector">
      <JsonView
        src={{}}
        collapsed={1}
        theme="github"
        displaySize
        displayArrayIndex
        style={{ fontSize: 13, fontWeight: "bold" }}
      />
    </Inspector>
  )
}
export default GlobalInspectorImplt
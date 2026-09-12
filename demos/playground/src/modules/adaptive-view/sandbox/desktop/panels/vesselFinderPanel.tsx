"use client"

import { usePanelApi } from "../providers/PanelApiContext"
import * as React from "react"

export const VesselFinderPanel = () => {
  const panelApi: any = usePanelApi()

  const srcdoc = `<!DOCTYPE html>
<html><head><style>html,body{margin:0;padding:0;height:100%;overflow:hidden;}</style></head>
<body>
<script>var width="100%";var height="100%";var latitude="51.5";var longitude="-0.12";var zoom="8";var names=false;</script>
<script src="https://www.vesselfinder.com/aismap.js"></script>
</body></html>`

  return (
    <iframe
      onMouseDown={() => {
        if (!panelApi.isActive) {
          panelApi.setActive()
        }
      }}
      srcDoc={srcdoc}
      style={{
        border: "none",
        width: "100%",
        height: "100%",
      }}
    />
  )
}

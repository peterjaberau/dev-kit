"use client"

import { usePanelApi } from "../providers/PanelApiContext"
import * as React from "react"


export const IFramePanel = () => {
  const panelApi: any = usePanelApi()

  return (
    <iframe
      onMouseDown={() => {
        if (!panelApi.isActive) {
          panelApi.setActive()
        }
      }}
      style={{
        border: "none",
        width: "100%",
        height: "100%",
      }}
      src="https://dockview.dev"
    />
  )

}
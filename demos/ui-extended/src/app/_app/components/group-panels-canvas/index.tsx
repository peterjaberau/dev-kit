"use client"
import { memo, useState, useEffect } from "react"
import { Panel, PanelGroup } from "react-resizable-panels"
import { PanelDragger } from "#components/ui/pane/dragger"
import { Box } from "@chakra-ui/react"
import { RendererPane } from "./renderer-pane"

const RendererPaneLazy = memo(RendererPane)

export function GroupPanelsCanvas() {
  const [orientation, setOrientation]: any = useState("horizontal")

  return (
    <Box height={"full"}>
      <PanelGroup direction="horizontal">
        <Panel>
          <RendererPaneLazy panelType={'new-panel'} />
        </Panel>
        <PanelDragger />

        <Panel>
          <PanelGroup direction="vertical">
            <Panel>
              <RendererPaneLazy />
            </Panel>
            <PanelDragger />
            <Panel>
              <RendererPaneLazy />
            </Panel>
          </PanelGroup>
        </Panel>

        <PanelDragger />
        <Panel>
          <RendererPaneLazy />
        </Panel>
      </PanelGroup>
    </Box>
  )
}

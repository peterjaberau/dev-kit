"use client"
import { memo, useState, useEffect } from "react"
import { Box } from "@chakra-ui/react"
import { usePanelMinSize } from "#components/ui/pane/usePanelMinSize"
import { PlaceholderPane } from "./placeholder-pane"
import { Panel, PanelGroup } from "react-resizable-panels"
import { TabsPane } from "#components/ui-examples/panel-001/tabs-pane"
import { PanelDragger } from "#components/ui/pane/dragger"
const PlaceholderPaneLazy = memo(PlaceholderPane)

export const RenderPage = () => {
  const [orientation, setOrientation]: any = useState("horizontal")
  const [minSidebarSize, rootRef] = usePanelMinSize(350)
  const [minResultHeight, wrapperRef] = usePanelMinSize(48, "height")

  return (
    <Box height={"100%"} ref={rootRef}>
      <PanelGroup direction={"horizontal"} style={{ opacity: minSidebarSize === 0 ? 0 : 1 }}>
        <>
          <Panel defaultSize={minSidebarSize} minSize={minSidebarSize} maxSize={35} id="tabs" order={1}>
            <TabsPane />
          </Panel>
          <PanelDragger />
        </>

        <Panel id="content" order={2}>
          <Box flex={1} h="100%" ref={wrapperRef}>
            <PanelGroup direction={orientation}>
              <Panel minSize={15}>
                <PanelGroup direction={orientation}>
                  <Panel id="query" order={0} minSize={35}>
                    <PlaceholderPaneLazy />
                  </Panel>

                  <>
                    <PanelDragger />
                    <Panel id="variables" order={1} defaultSize={40} minSize={35}>
                      <PlaceholderPaneLazy />
                    </Panel>
                  </>
                </PanelGroup>
              </Panel>
              <PanelDragger />
              <Panel minSize={orientation === "horizontal" ? 35 : minResultHeight} defaultSize={50}>
                <PlaceholderPaneLazy />
              </Panel>
            </PanelGroup>
          </Box>
        </Panel>
      </PanelGroup>
    </Box>
  )
}

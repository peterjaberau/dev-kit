"use client"
import { memo, useState, useEffect } from "react"
import { Panel, PanelGroup } from "react-resizable-panels"
import { PanelDragger } from "#components/ui/pane/dragger"
import { Box } from "@chakra-ui/react"
import { QueryPane } from "./query-pane"
import { ResultsPane } from "./results-pane"
import { TabsPane } from "./tabs-pane"
import { usePanelMinSize } from "#components/ui/pane/usePanelMinSize"

const QueryPaneLazy = memo(QueryPane)
const ResultsPaneLazy = memo(ResultsPane)
const TabsPaneLazy = memo(TabsPane)

export function Index() {
  const [orientation, setOrientation]: any = useState("horizontal")

  const [minSidebarSize, rootRef] = usePanelMinSize(350)
  const [minResultHeight, wrapperRef] = usePanelMinSize(48, "height")

  return (
    <Box height={"full"} ref={rootRef}>
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
                    <QueryPaneLazy />
                  </Panel>

                  <>
                    <PanelDragger />
                    <Panel id="variables" order={1} defaultSize={40} minSize={35}>
                      <QueryPaneLazy />
                    </Panel>
                  </>
                </PanelGroup>
              </Panel>
              <PanelDragger />
              <Panel minSize={orientation === "horizontal" ? 35 : minResultHeight} defaultSize={50}>
                <ResultsPaneLazy />
              </Panel>
            </PanelGroup>
          </Box>
        </Panel>
      </PanelGroup>
    </Box>
  )
}

export default Index

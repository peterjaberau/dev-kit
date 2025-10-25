"use client"
import { memo, useState, useEffect } from "react"
import { Panel, PanelGroup } from "react-resizable-panels"
import { PanelDragger } from "#components/ui/pane/dragger"
import { Box } from "@chakra-ui/react"
import { QueryPane  } from "./query-pane"
import { ExamplesListPane } from "./examples-list-pane"
import { JsonFormsPane } from "./json-forms-pane"
import { JsonTreeViewerPane } from "./json-tree-viewer"
import { JsonFormsAntdPane } from './json-forms-antd-pane'
import { JsonFormsChakraPane } from "#components/j-schema-builder/playground/json-forms-chakra-pane"

const ExamplesListPaneLazy = memo(ExamplesListPane)
const LazyJsonFormsPane = memo(JsonFormsPane)
const QueryPaneLazy = memo(QueryPane)
const LazyJsonTreeViewer = memo(JsonTreeViewerPane)
const LazyJsonFormsAntdPane = memo(JsonFormsAntdPane)
const LazyJsonFormsChakraPane = memo(JsonFormsChakraPane)


export function App() {
  const [orientation, setOrientation]: any = useState("horizontal")

  return (
    <Box height={"full"}>
      <PanelGroup direction="horizontal">
        <Panel>
          <ExamplesListPaneLazy />
        </Panel>
        <PanelDragger />

        <Panel>
          <PanelGroup direction="vertical">
            <Panel>
              <LazyJsonFormsChakraPane />
              {/*<LazyJsonFormsPane />*/}
            </Panel>
          </PanelGroup>
        </Panel>

        <PanelDragger />
        <Panel>
          {/*<JsonFormsAntdPane />*/}
          <LazyJsonTreeViewer />
        </Panel>
      </PanelGroup>
    </Box>
  )
}

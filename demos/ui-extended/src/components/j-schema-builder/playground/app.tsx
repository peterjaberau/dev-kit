"use client"
import { memo, useState, useEffect } from "react"
import { Panel, PanelGroup } from "react-resizable-panels"
import { PanelDragger } from "#components/ui/pane/dragger"
import { Box } from "@chakra-ui/react"
import { QueryPane  } from "./query-pane"
import { ExamplesListPane } from "./examples-list-pane"
import { JsonTreeViewerPane } from "./json-tree-viewer"
import { JsonFormsAntdPane } from './json-forms-antd-pane'
import { JsonSchemaViewerPane } from "./json-schema-viewer-pane"
import { JsonSchemaViewerListPane } from "./json-schema-viewer-list-pane"

import { JsonFormsChakraPane } from "#components/j-schema-builder/playground/json-forms-chakra-pane"

const ExamplesListPaneLazy = memo(ExamplesListPane)
const LazyJsonFormsChakraPane = memo(JsonFormsChakraPane)
const LazyJsonTreeViewer = memo(JsonTreeViewerPane)
const LazyJsonSchemaViewerPane = memo(JsonSchemaViewerPane)
const LazyJsonSchemaViewerListPane = memo(JsonSchemaViewerListPane)

// const LazyJsonFormsPane = memo(JsonFormsPane)
// const QueryPaneLazy = memo(QueryPane)
// const LazyJsonFormsAntdPane = memo(JsonFormsAntdPane)


export function App() {
  const [orientation, setOrientation]: any = useState("horizontal")

  return (
    <Box height={"full"}>
      <PanelGroup direction="horizontal">

        <Panel>

          <PanelGroup direction="vertical">
            <Panel>
              <LazyJsonSchemaViewerListPane />
              {/*<ExamplesListPaneLazy />*/}
            </Panel>
            <PanelDragger />
            <Panel>
              <LazyJsonTreeViewer />

              {/*<LazyJsonFormsChakraPane />*/}
              {/*<LazyJsonFormsPane />*/}
            </Panel>
          </PanelGroup>
        </Panel>








        <PanelDragger />

        <Panel>
          {/*<LazyTreeComponentPane />*/}
        </Panel>

        <PanelDragger />
        <Panel>
          {/*<JsonFormsAntdPane />*/}
          <LazyJsonSchemaViewerPane />
        </Panel>
      </PanelGroup>
    </Box>
  )
}

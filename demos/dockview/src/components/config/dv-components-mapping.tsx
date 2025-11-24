import {
  ScopePickerPlugin,
  UiPreviewerPlugin,
  CodeBlockPlugin,
  JsonViewerPlugin,
  DvControllerPlugin,
  DvDebuggerPlugin
} from "#components/plugins"
import { WidgetPlaceholder } from "#components/widgets"
import { PaneContent } from "#components/parts/pane-content"
import React from "react"
import { Container, HStack, RadioCard } from "@chakra-ui/react"
import "react18-json-view/src/style.css"
import JsonView from "react18-json-view"


export const ConfigDvComponentsMapping = {
  default: (props: any) => {
    console.log("Default panel props:", props)

    return (
      <PaneContent>
      <Container fluid w="full" h="full" p={3}>
        <JsonView
          src={props.params}
          collapsed={1}
          theme="github"
          displaySize
          displayArrayIndex
          style={{ fontSize: 13, fontWeight: "bold" }}
        />
      </Container>
      </PaneContent>

      // <div
      //   style={{
      //     height: "100%",
      //     overflow: "auto",
      //     position: "relative",
      //     padding: 5,
      //   }}
      // >
      //   <span
      //     style={{
      //       position: "absolute",
      //       top: "50%",
      //       left: "50%",
      //       transform: "translate(-50%,-50%)",
      //       pointerEvents: "none",
      //       fontSize: "42px",
      //       opacity: 0.5,
      //     }}
      //   >
      //     {props.api.title}
      //   </span>
      // </div>
    )
  },

  PlaceholderPanel: (props: any) => {
    return <WidgetPlaceholder />
  },

  scope_picker_panel: (props: any) => {
    return (
      <PaneContent>
        <ScopePickerPlugin />
      </PaneContent>
    )
  },

  ui_previewer_panel: (props: any) => {
    return (
      <PaneContent>
        <UiPreviewerPlugin />
      </PaneContent>
    )
  },

  code_block_panel: (props: any) => {
    return (
      <PaneContent>
        <CodeBlockPlugin />
      </PaneContent>
    )
  },

  json_viewer_panel: (props: any) => {
    return (
      <PaneContent>
        <JsonViewerPlugin />
      </PaneContent>
    )
  },

  dv_controller_panel: (props: any) => {
    return (
      <PaneContent>
        <DvControllerPlugin />
      </PaneContent>
    )
  },

  dv_debugger_panel: (props: any) => {
    return (
      <PaneContent>
        <DvDebuggerPlugin />
      </PaneContent>
    )
  },

}

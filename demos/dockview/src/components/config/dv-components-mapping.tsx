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


export const ConfigDvComponentsMapping = {
  default: (props: any) => {
    return (
      <div
        style={{
          height: "100%",
          overflow: "auto",
          position: "relative",
          padding: 5,
        }}
      >
        <span
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            pointerEvents: "none",
            fontSize: "42px",
            opacity: 0.5,
          }}
        >
          {props.api.title}
        </span>
      </div>
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

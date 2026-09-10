"use client"

import {
  DockviewReact,
  type DockviewReadyEvent,
  type IDockviewPanelProps,
  themeGithubLightSpaced,
} from "#adaptive-view/react"
import { adaptiveDebuggerLayout } from "../config"
import { useAdaptiveDebugger } from "../selectors"
import { LayoutPanel } from "./layout.component"
import { DebuggerGroupsView } from "./views.groups"
import { DebuggerInspectorView } from "./views.inspector"
import { DebuggerInstancesView } from "./views.instances"
import { DebuggerPanelsView } from "./views.panels"
import { DebuggerRegistryLibraryView } from "./views.registry-library"

const debuggerComponents = {
  panels: (props: IDockviewPanelProps) => (
    <LayoutPanel api={props.containerApi} panelProps={props}>
      <DebuggerPanelsView />
    </LayoutPanel>
  ),
  groups: (props: IDockviewPanelProps) => (
    <LayoutPanel api={props.containerApi} panelProps={props}>
      <DebuggerGroupsView />
    </LayoutPanel>
  ),
  instances: (props: IDockviewPanelProps) => (
    <LayoutPanel api={props.containerApi} panelProps={props}>
      <DebuggerInstancesView />
    </LayoutPanel>
  ),
  registryLibrary: (props: IDockviewPanelProps) => (
    <LayoutPanel api={props.containerApi} panelProps={props}>
      <DebuggerRegistryLibraryView />
    </LayoutPanel>
  ),
  inspector: (props: IDockviewPanelProps) => (
    <LayoutPanel api={props.containerApi} panelProps={props}>
      <DebuggerInspectorView />
    </LayoutPanel>
  ),
}

export function AdaptiveDebuggerLayout() {
  const { sentToAdaptiveDebugger } = useAdaptiveDebugger()

  const handleReady = (event: DockviewReadyEvent) => {
    event.api.fromJSON(adaptiveDebuggerLayout)
    sentToAdaptiveDebugger({ type: "ON_READY", api: event.api })
  }

  return <DockviewReact components={debuggerComponents} theme={themeGithubLightSpaced} onReady={handleReady} />
}

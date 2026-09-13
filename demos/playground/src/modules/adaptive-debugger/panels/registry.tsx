import type { FunctionComponent } from "react"
import type { IDockviewPanelProps } from "#adaptive-view/react"
import { wrap } from "#adaptive-view/sandbox/desktop/panels/registry"
import { DebuggerGroupsView } from "./groups"
import { DebuggerInspectorView } from "./inspector"
import { DebuggerPanelsView } from "./panels"
import { DebuggerRegistryLibraryView } from "./registry-library"
import { DebuggerViewsView } from "./views"

export const ADAPTIVE_DEBUGGER_PANELS: Record<string, FunctionComponent<IDockviewPanelProps>> = {
  panels: wrap(DebuggerPanelsView),
  groups: wrap(DebuggerGroupsView),
  views: wrap(DebuggerViewsView),
  registryLibrary: wrap(DebuggerRegistryLibraryView),
  inspector: wrap(DebuggerInspectorView),
}

"use client"

import { DockviewReact, type DockviewReadyEvent, themeGithubLightSpaced } from "#adaptive-view/react"
import { adaptiveDebuggerLayout } from "../config"
import { useAdaptiveDebugger } from "../selectors"
import { ADAPTIVE_DEBUGGER_PANELS } from "../panels/registry"

export function AdaptiveDebuggerLayout() {
  const { sentToAdaptiveDebugger } = useAdaptiveDebugger()

  const handleReady = (event: DockviewReadyEvent) => {
    event.api.fromJSON(adaptiveDebuggerLayout)
    sentToAdaptiveDebugger({ type: "ON_READY", api: event.api })
  }

  return <DockviewReact components={ADAPTIVE_DEBUGGER_PANELS} theme={themeGithubLightSpaced} onReady={handleReady} />
}

"use client"
import "./styles.css"
import * as React from "react"
import type { DockviewTheme } from "#adaptive-view/react"
import { useDesktop } from "./selectors"

import { dockviewProfiles, viewProfiles } from "./presets"
import AdvaptiveViewDesktop from "./app"
import { DesktopProvider } from "./providers/DesktopProvider"
import { MarketProvider } from "./providers/marketProvider"

export interface AdaptiveViewDesktopSandboxProps {
  dockviewProfileId?: string | null
  viewProfileId?: string
  initialDesktopTheme?: string
  initialTheme?: DockviewTheme
  onDockviewProfileChange?: (profileId: string | null) => void
}

function DesktopProfileSync({ dockviewProfileId, onDockviewProfileChange }: AdaptiveViewDesktopSandboxProps) {
  const { desktopRef, desktopContext, sendToDesktop } = useDesktop()
  const previousInput = React.useRef(dockviewProfileId)
  const selectedProfileId = desktopContext.layout.selectedDockviewProfileId

  React.useEffect(() => {
    // Initial input is already resolved by the machine, including saved profiles.
    // Only subsequent prop changes should request a new selection.
    if (previousInput.current !== dockviewProfileId) {
      previousInput.current = dockviewProfileId
      if (desktopRef.getSnapshot().context.layout.selectedDockviewProfileId !== dockviewProfileId) {
        sendToDesktop({ type: "onSelectDockviewProfile", params: { profileId: dockviewProfileId } })
        return
      }
    }
    onDockviewProfileChange?.(selectedProfileId)
  }, [desktopRef, dockviewProfileId, onDockviewProfileChange, selectedProfileId, sendToDesktop])

  return null
}

export default function AdaptiveViewDesktopSandbox(props: AdaptiveViewDesktopSandboxProps) {
  return (
    <div className="app" style={{ height: "100%", width: "100%" }}>
      <DesktopProvider
        input={{
          dockviewProfiles,
          viewProfiles,
          dockviewProfileId: props.dockviewProfileId,
          initialDesktopTheme: props.initialDesktopTheme,
          viewProfileId: props.viewProfileId,
          initialTheme: props.initialTheme,
        }}
      >
        <DesktopProfileSync
          dockviewProfileId={props.dockviewProfileId}
          onDockviewProfileChange={props.onDockviewProfileChange}
        />
        <MarketProvider>
          <AdvaptiveViewDesktop />
        </MarketProvider>
      </DesktopProvider>
    </div>
  )
}

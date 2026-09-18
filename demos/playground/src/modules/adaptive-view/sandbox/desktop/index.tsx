"use client"
import "./styles.css"
import { useSearchParams } from "next/navigation"

import { dockviewProfiles, viewProfiles } from "./presets"
import AdvaptiveViewDesktop from "./app"
import { DesktopProvider } from "./providers/DesktopProvider"
import { MarketProvider } from "./providers/marketProvider"

export default function AdaptiveViewDesktopSandbox(props: any) {
  const searchParams = useSearchParams()
  return (
    <div className="app" style={{ height: "100%", width: "100%" }}>
      <DesktopProvider
        input={{
          dockviewProfiles,
          viewProfiles,
          dockviewProfileId: searchParams.get("layout") ?? props.dockviewProfileId,
          initialDesktopTheme: props.initialDesktopTheme,
          viewProfileId: props.viewProfileId,
          initialTheme: props.initialTheme,
        }}
      >
        <MarketProvider>
          <AdvaptiveViewDesktop />
        </MarketProvider>
      </DesktopProvider>
    </div>
  )
}

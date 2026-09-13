"use client"
import "./styles.css"

import { dockviewProfiles, viewProfiles } from "./presets"
import AdvaptiveViewDesktop from "./app"
import { DesktopProvider } from "./providers/DesktopProvider"
import { MarketProvider } from "./providers/marketProvider"
import { StoreManagerProvider } from "../store-manager/provider"

export default function AdaptiveViewDesktopSandbox(props: any) {
  return (
    <div className="app" style={{ height: "100%", width: "100%" }}>
      <DesktopProvider
        input={{
          dockviewProfiles,
          viewProfiles,
          viewProfileId: props.viewProfileId,
          initialTheme: props.initialTheme,
        }}
      >
        <MarketProvider>
          <StoreManagerProvider>
            <AdvaptiveViewDesktop {...props} />
          </StoreManagerProvider>
        </MarketProvider>
      </DesktopProvider>
    </div>
  )
}

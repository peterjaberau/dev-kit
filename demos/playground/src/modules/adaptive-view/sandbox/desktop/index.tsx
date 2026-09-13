"use client"
import "./styles.css"

import { instanceProfiles, layoutProfiles } from "./config"
import AdvaptiveViewDesktop from "./app"
import { DesktopProvider } from "./providers/DesktopProvider"
import { MarketProvider } from "./providers/marketProvider"
import { StoreManagerProvider } from "../store-manager/provider"
import { InstanceManagerProvider } from "../instance-manager/provider"
import { DockviewManagerProvider } from "../dockview-manager/provider"

export default function AdaptiveViewDesktopSandbox(props: any) {
  return (
    <div className="app" style={{ height: "100%", width: "100%" }}>
      <DesktopProvider input={{ layoutProfiles, initialTheme: props.initialTheme }}>
        <MarketProvider>
          <StoreManagerProvider>
            <InstanceManagerProvider input={instanceProfiles[0]}>
              <DockviewManagerProvider>
                <AdvaptiveViewDesktop {...props} />
              </DockviewManagerProvider>
            </InstanceManagerProvider>
          </StoreManagerProvider>
        </MarketProvider>
      </DesktopProvider>
    </div>
  )
}

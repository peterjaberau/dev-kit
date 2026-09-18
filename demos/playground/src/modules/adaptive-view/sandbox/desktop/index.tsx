"use client"
import "./styles.css"
import { useSearchParams } from "next/navigation"
import { useLocalStore } from "../store-manager/selectors"

import { dockviewProfiles, viewProfiles } from "./presets"
import AdvaptiveViewDesktop from "./app"
import { DesktopProvider } from "./providers/DesktopProvider"
import { MarketProvider } from "./providers/marketProvider"
import { StoreManagerProvider } from "../store-manager/provider"

function DesktopSandboxProvider(props: any) {
  const searchParams = useSearchParams()
  const { value: initialLayout, localStoreRef } = useLocalStore("desktop.layout")
  if (!localStoreRef) return null
  return (
    <div className="app" style={{ height: "100%", width: "100%" }}>
      <DesktopProvider
        input={{
          dockviewProfiles,
          viewProfiles,
          initialLayout,
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

export default function AdaptiveViewDesktopSandbox(props: any) {
  return (
    <StoreManagerProvider>
      <DesktopSandboxProvider {...props} />
    </StoreManagerProvider>
  )
}

"use client"
import "./styles.css"

import { layoutProfiles } from "./config"
import AdvaptiveViewDesktop from "./app"
import { DesktopProvider } from "./providers/DesktopProvider"
import { MarketProvider } from "./providers/marketProvider"

export default function AdaptiveViewDesktopSandbox(props: any) {
  return (
    <div className="app" style={{ height: "100%", width: "100%" }}>
      <DesktopProvider input={{ layoutProfiles }}>
        <MarketProvider>
          <AdvaptiveViewDesktop {...props} />
        </MarketProvider>
      </DesktopProvider>
    </div>
  )
}

/*


export default function AdaptiveViewDesktopSandbox(props: any) {
  return (
    <div className="app" style={{ height: "100%", width: "100%" }}>
      <DesktopProvider>
        <MarketProvider>
          <AdaptiveViewApp
            input={{
              config: {
                layoutProfiles,
                instanceProfiles,
                edgeGroupPanels: EDGE_GROUP_PANELS,
              },
            }}
          >
            <AdvaptiveViewDesktop {...props} />
          </AdaptiveViewApp>
        </MarketProvider>
      </DesktopProvider>
    </div>
  )
}




 */

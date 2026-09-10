"use client"
import "./styles.css"

import { layoutProfiles, instanceProfiles, EDGE_GROUP_PANELS } from "./config"
import AdvaptiveViewDesktop from "./app"
import AdaptiveViewApp from "#adaptive-view/app"

export default function AdaptiveViewDesktopSandbox(props: any) {
  return (
    <div className="app" style={{ height: "100%", width: "100%" }}>
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
    </div>
  )
}

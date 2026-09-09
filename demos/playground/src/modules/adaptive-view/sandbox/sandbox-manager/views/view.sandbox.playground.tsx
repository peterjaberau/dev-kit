"use client"

import { Box } from "@chakra-ui/react"
import { DockviewReact, type DockviewReadyEvent, themeGithubLightSpaced } from "#adaptive-view/react"
import { ViewInstances } from "./view.instances"
import { ViewLayoutPanels } from "./view.layout-panels"
import { ViewLayoutGroups } from "./view.layout-groups"

const playgroundComponents = {
  instances: ViewInstances,
  panels: ViewLayoutPanels,
  groups: ViewLayoutGroups,
}

export function ViewSandboxPlayground() {
  return (
    <Box width="full" height="full" minWidth={0} minHeight={0}>
      <DockviewReact
        components={playgroundComponents}
        theme={themeGithubLightSpaced}
        onReady={(event: DockviewReadyEvent) => {
          event.api.addPanel({
            id: "instances",
            component: "instances",
            title: "Instances",
          })
          event.api.addPanel({
            id: "panels",
            component: "panels",
            title: "Panels",
          })
          event.api.addPanel({
            id: "groups",
            component: "groups",
            title: "Groups",
          })
        }}
      />
    </Box>
  )
}

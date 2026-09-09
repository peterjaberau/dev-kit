import { Orientation, type DockviewApi } from "#adaptive-view/react"

export const adaptiveDebuggerLayout: ReturnType<DockviewApi["toJSON"]> = {
  grid: {
    root: {
      type: "branch",
      data: [
        {
          type: "leaf",
          data: {
            id: "adaptive-debugger-group",
            views: ["panels", "groups", "instances", "inspector"],
            activeView: "panels",
          },
        },
      ],
    },
    width: 720,
    height: 520,
    orientation: Orientation.HORIZONTAL,
  },
  panels: {
    panels: {
      id: "panels",
      contentComponent: "panels",
      title: "Panels",
    },
    groups: {
      id: "groups",
      contentComponent: "groups",
      title: "Groups",
    },
    instances: {
      id: "instances",
      contentComponent: "instances",
      title: "Instances",
    },
    inspector: {
      id: "inspector",
      contentComponent: "inspector",
      title: "Inspector",
    },
  },
}

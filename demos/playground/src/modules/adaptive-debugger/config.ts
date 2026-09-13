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
            views: ["panels", "groups", "views", "registryLibrary", "inspector"],
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
    views: {
      id: "views",
      contentComponent: "views",
      title: "Views",
    },
    registryLibrary: {
      id: "registryLibrary",
      contentComponent: "registryLibrary",
      title: "Registry Library",
    },
    inspector: {
      id: "inspector",
      contentComponent: "inspector",
      title: "Inspector",
    },
  },
}

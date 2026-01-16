import dynamic from "next/dynamic"

export const registerAdaptiveMenu = {
  prefix: "adaptive-menu-",
  loaders: {
    compare: () => import("#adaptive-menu/stories/compare"),
    jira: () => import("#adaptive-menu/stories/jira"),
  },
}



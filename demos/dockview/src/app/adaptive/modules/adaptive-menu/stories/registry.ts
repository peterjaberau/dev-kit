import dynamic from "next/dynamic"

export const registerAdaptiveMenu = {
  prefix: "adaptive-menu-",
  loaders: {
    compare: () => import("#adaptive-menu/stories/compare"),
    // 'jira-refactor-1': () => import("#adaptive-menu/stories/jira-refactor-cycle1"),
    jira: () => import("#adaptive-menu/stories/jira"),
  },
}



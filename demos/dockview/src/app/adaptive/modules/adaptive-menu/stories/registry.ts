import dynamic from "next/dynamic"
import { createRegistryKey } from "#adaptive-registry"

export const registerAdaptiveMenu = {
  prefix: "adaptive-menu-",
  loaders: {
    compare: () => import("#adaptive-menu/stories/compare"),
    // 'jira-refactor-1': () => import("#adaptive-menu/stories/jira-refactor-cycle1"),
    jira: () => import("#adaptive-menu/stories/jira"),
    "json-tree-dnd": () => import("#adaptive-menu/stories/json-tree-dnd/components"),

    "drag-and-drop": () => import("#views/components/panels/json-tree/drag-and-drop"),
  },
}

//  "drag-and-drop": dynamic(() => import("#views/components/panels/json-tree/drag-and-drop"), { ssr: false }),
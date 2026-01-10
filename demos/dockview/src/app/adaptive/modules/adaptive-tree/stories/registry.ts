import dynamic from "next/dynamic"

const namePrefix = "adaptive-tree-"

export const registerAdaptiveTree = {
  prefix: "adaptive-tree-",
  loaders: {
    basic: () => import("#adaptive-tree/stories/basic"),
    'basic-composable': () => import("#adaptive-tree/stories/basic-composable"),
    async: () => import("#adaptive-tree/stories/async"),
  },
}
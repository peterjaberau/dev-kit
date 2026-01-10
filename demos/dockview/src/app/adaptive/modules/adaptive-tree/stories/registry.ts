import dynamic from "next/dynamic"

const namePrefix = "adaptive-tree-"

export const registerAdaptiveTree = {
  prefix: "adaptive-tree-",
  loaders: {
    basic: () => import("#adaptive-tree/stories/basic"),
    async: () => import("#adaptive-tree/stories/async"),
  },
}
import dynamic from "next/dynamic"

const namePrefix = "dynamic-tree-"

export const registerDynamicTree = {
  prefix: "dynamic-tree-",
  loaders: {
    basic: () => import("#dynamic-tree/stories/basic"),
    "basic-composable": () => import("#dynamic-tree/stories/basic-composable"),
    async: () => import("#dynamic-tree/stories/async"),
  },
}
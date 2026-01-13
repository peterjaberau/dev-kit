import dynamic from "next/dynamic"

export const registerAdaptiveJsonTree = {
  prefix: "adaptive-json-tree-",
  loaders: {
    compare: () => import("#adaptive-json-tree/stories/compare"),
    simple: () => import("#adaptive-json-tree/stories/simple"),
    inlined: () => import("#adaptive-json-tree/stories/inlined-html"),
    origin: () => import("#adaptive-json-tree/stories/origin-html"),
  },
}
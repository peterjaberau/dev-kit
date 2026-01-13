import dynamic from "next/dynamic"

export const registerAdaptiveMenu = {
  prefix: "adaptive-menu-",
  loaders: {
    compare: () => import("#adaptive-menu/stories/compare"),
    simple: () => import("#adaptive-menu/stories/simple"),
    inlined: () => import("#adaptive-menu/stories/inlined-html"),
    origin: () => import("#adaptive-menu/stories/origin-html"),
  },
}
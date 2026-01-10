import dynamic from "next/dynamic"

const namePrefix = "adaptive-json-"

export const registerAdaptiveJson = {
  prefix: "adaptive-json-",
  loaders: {
    all: () => import("#adaptive-json/stories/all"),
    basic: () => import("#adaptive-json/stories/basic"),
    errors: () => import("#adaptive-json/stories/errors"),
    "expand-level": () => import("#adaptive-json/stories/expand-level"),
    functions: () => import("#adaptive-json/stories/functions"),
    "map-and-set": () => import("#adaptive-json/stories/map-and-set"),
    regex: () => import("#adaptive-json/stories/regex"),
    "render-value": () => import("#adaptive-json/stories/render-value"),
    "root-provider": () => import("#adaptive-json/stories/root-provider"),
  },
}


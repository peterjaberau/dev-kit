import dynamic from "next/dynamic"

const namePrefix = "query-builder"

export const registerQueryBuilder = {
  prefix: "query-builder",
  loaders: {
    basic: () => import("#query-builder/headless/stories/basic"),
  },
}
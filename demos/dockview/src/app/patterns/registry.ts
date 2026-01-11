const namePrefix = "pattern-"

export const registerPatterns = {
  prefix: "patterns-",
  loaders: {
    "tree-primer": () => import("#app/patterns/tree-primer"),
    "tree-primer-chrome-ai": () => import("#app/patterns/tree-primer-chrome-ai"),
  },
}

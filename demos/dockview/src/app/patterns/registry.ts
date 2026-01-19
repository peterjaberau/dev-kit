const namePrefix = "pattern-"

export const registerPatterns = {
  prefix: "patterns-",
  loaders: {
    // "adaptive-json-tree": () => import("#app/patterns/adaptive-json-tree-tree"),
    // tree-with-dexiedb
    "kanban-tree-tree": () => import("#app/patterns/kanban-tree/components/Tree"),
    "kanban-tree-kanban": () => import("#app/patterns/kanban-tree/components/Kanban"),
    "tree-with-dexiedb": () => import("#app/patterns/tree-with-dexiedb"),
    "tree-primer": () => import("#app/patterns/tree-primer"),
    "tree-primer-origin": () => import("#app/patterns/tree-primer-origin"),

    "tree-dnd-kit": () => import("#app/patterns/tree-dnd-kit"),
    "tree-virtualized": () => import("#app/patterns/tree-virtualized"),
    "tree-atlaskit-cleaning": () => import("#app/patterns/tree-atlaskit-cleaning"),
    "json-tree-dnd": () => import("#app/patterns/json-tree-tree"),
    "json-tree-tree": () => import("#app/patterns/json-tree-dnd"),
    "tree-editor-columns": () => import("#app/patterns/tree-editor/demos/columns"),
    "tree-editor-controlled": () => import("#app/patterns/tree-editor/demos/sortable-tree-controlled"),
    "tree-editor-default": () => import("#app/patterns/tree-editor/demos/sortable-tree-default"),
    "tree-editor-disabledrag": () => import("#app/patterns/tree-editor/demos/sortable-tree-disabledrag"),
    "tree-editor-renderer": () => import("#app/patterns/tree-editor/demos/sortable-tree-renderer"),
    "tree-editor-rules": () => import("#app/patterns/tree-editor/demos/sortable-tree-rules"),
    "tree-editor-virtual": () => import("#app/patterns/tree-editor/demos/sortable-tree-virtual"),

    //tree-atlaskit-cleaning
  },
}

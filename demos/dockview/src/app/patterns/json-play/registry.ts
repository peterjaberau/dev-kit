const namePrefix = "json-play-"

export const registerJsonPlay = {
  prefix: "json-play-",
  loaders: {
    home: () => import("#app/patterns/json-play"),
    columns: () => import("#app/patterns/json-play/columns-view"),
    editor: () => import("#app/patterns/json-play/editor-view"),
    tree: () => import("#app/patterns/json-play/tree-view"),
  },
}




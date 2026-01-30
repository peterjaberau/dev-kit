export const configDefaults = {
  dynamicSplitter: {
    component: "splitter",
    part: "root",
    defaultSize: [20, 60, 20],
    css: {
      borderWidth: "1px",
    },
    children: [
      { id: "left", part: "panel" },
      { id: "left:body", part: "resize-trigger" },
      {
        id: "body",
        part: "panel",
        children: [
          {
            component: "splitter",
            part: "root",
            defaultSize: [10, 70, 20],
            orientation: "vertical",
            children: [
              { id: "body-top", part: "panel" },
              { id: "body-top:body-content", part: "resize-trigger" },
              { id: "body-content", part: "panel" },
              { id: "body-content:body-bottom", part: "resize-trigger" },
              { id: "body-bottom", part: "panel" },
            ],
          },
        ],
      },
      { id: "body:right", part: "resize-trigger" },
      { id: "right", part: "panel" },
    ],
  },
}

// used in dynamicPanelViewMachine. potientially the panels map can be move to higher actor
export const dockViewDynamicPanelConfig = {
  scope: {
    collection: {
      id: "ROOT",
      name: "",
      children: [
        {
          id: "panels",
          name: "Panels",
          children: [
            { id: "default", name: "Default", disabled: true },
            {
              id: "json-tree-folder",
              name: "Json Tree",
              children: [
                { id: "json-tree-tree", name: "Tree" },
                { id: "pdnd-tree", name: "Tree Pdnd" },
                { id: "drag-and-drop", name: "Drag and drop" },

                // drag-and-drop
                //   tree-with-actor
              ],
            },

            {
              id: "oas-folder",
              name: "OAS",
              children: [
                { id: "oas", name: "OAS" },
                { id: "oas-manager", name: "OAS Manager" },
                { id: "oas-doc", name: "OAS Doc" },
                { id: "oas-json-viewer", name: "OAS Json Viewer" },
              ],
            },
            {
              id: "misc-dockables-folder",
              name: "Misc Dockables",
              children: [
                { id: "ai-chat", name: "AI Chat" },
                { id: "code", name: "Code" },
                { id: "empty", name: "empty" },
                { id: "placeholder", name: "Placeholder" },
                { id: "canvas-illa", name: "Canvas Illa" },
                { id: "renderer", name: "Renderer" },
              ],
            },
          ],
        },
      ],
    },
    selectedValue: [],
  },
  scoped: {
    targetPanel: null,
  },
}

export const dockViewAdapterConfig = {
  nodes: [
    {
      id: "panel__1",
      view: {
        type: "DOCK_PANEL",
        component: "dynamic",
        title: "Panel - 1",
        renderer: "always",
      },
      model: {},
    },



    // {
    //   id: "panel__2",
    //   view: {
    //     type: "DOCK_PANEL",
    //     component: "default",
    //     title: "Panel - 2",
    //     renderer: "always",
    //     position: { referencePanel: "panel__1", direction: "right" },
    //   },
    //   model: {},
    // },

    /*


     {
      id: "panel__3",
      view: {
        type: "DOCK_PANEL",
        component: "default",
        title: "Panel - 3",
        renderer: "always",
        position: { referencePanel: "panel__2", direction: "right" },
      },
      model: {},
    },

     */
  ],
}

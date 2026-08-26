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
            // { id: "json-viewer", name: "Json Viewer", disabled: true },

            {
              id: "misc-dockables-folder",
              name: "Misc Dockables",
              children: [
                { id: "ai-chat", name: "AI Chat" },
                // { id: "json-viewer", name: "Json Viewer", disabled: true },
                { id: "code", name: "Code" },
                { id: "empty", name: "empty" },
                { id: "placeholder", name: "Placeholder" },
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


  ],
}


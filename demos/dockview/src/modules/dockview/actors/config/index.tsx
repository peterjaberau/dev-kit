export const dockViewAdapterConfig = {
  nodes: [
    {
      id: "panel_1",
      view: {
        type: 'DOCK_PANEL',
        component: "dynamic",
        title: "Panel 1",
        renderer: "always",
      },
      model: {}
    },
    {
      id: "panel_2",
      view: {
        type: 'DOCK_PANEL',
        component: "default",
        title: "Panel 2",
        renderer: "always",
        position: { referencePanel: "panel_1", direction: "right" },
      },
      model: {}
    },
    {
      id: "panel_3",
      view: {
        type: 'DOCK_PANEL',
        component: "default",
        title: "Panel 3",
        renderer: "always",
        position: { referencePanel: "panel_2", direction: "right" },
      },
      model: {}
    }
  ]
}

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
            { id: "ai-chat", name: "AI Chat" },
            { id: "code", name: "Code" },
            { id: "default", name: "Default", disabled: true },
            { id: "empty", name: "empty" },
            { id: "json-viewer", name: "Json Viewer" },
            { id: "placeholder", name: "Placeholder" },
            { id: "renderer", name: "Renderer" },
            { id: "json-viewer-custom", name: "Json Viewer Custom" },
            { id: "canvas-illa", name: "Canvas Illa" },
            {
              id: "src",
              name: "src",
              children: [
                { id: "src/app.tsx", name: "app.tsx" },
                { id: "src/index.ts", name: "index.ts" },
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

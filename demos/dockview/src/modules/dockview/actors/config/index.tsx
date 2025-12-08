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

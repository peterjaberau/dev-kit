import { ScopePickerPlugin, UiPreviewerPlugin } from "#components/plugins"

export const pluginsConfigDefaults = {
  scopePickerPlugin: {
    definitions: {
      scopeOptions: [
        {
          label: 'Chakra',
          value: 'chakra'
        },
        {
          label: 'Chakra Pro',
          value: 'chakra-pro'
        },
        {
          label: 'Custom components',
          value: 'custom-components'
        },
        {
          label: 'Json Schema UI',
          value: 'json-schema-ui'
        }
      ]
    },
    selections: {
      scope: null
    }
  },
  uiPreviewerPlugin: {
    definitions: {
      uiDemoOptions: []
    },
    selections: {
      demo: null
    }
  },
  codeBlockPlugin: {
    definitions: {
      codeBlockOptions: []
    },
    selections: {
      codeBlock: null
    }
  }
}

export const appConfigDefaults = {
  definitions: {
    scopeOptions: [
      {
        label: 'Chakra',
        value: 'chakra'
      },
      {
        label: 'Chakra Pro',
        value: 'chakra-pro'
      },
      {
        label: 'Custom components',
        value: 'custom-components'
      },
      {
        label: 'Json Schema UI',
        value: 'json-schema-ui'
      }
    ],
    uiDemoOptions: []
  },


  widgetOptions: {
    widgetTypes: [
      {
        label: 'Chakra',
        value: 'chakra'
      },
      {
        label: 'Chakra Pro',
        value: 'chakra-pro'
      },
      {
        label: 'Custom components',
        value: 'custom-components'
      },
      {
        label: 'Json Schema UI',
        value: 'json-schema-ui'
      }
    ]
  }
}

export const sessionConfigDefaults = {
  currentSelection: {
    widgetType: null
  }

}

export const currentAppConfig = {

  dockViewConfig: {
    panels: [
      {
        id: "dv_controller_panel_id",
        component: "dv_controller_panel",
        title: "Scope Picker",
        renderer: "always",
      },
      {
        // id: "monaco-editor-panel-source",
        // component: "MonacoEditorPanel",
        id: "ui_previewer_panel_id",
        component: "ui_previewer_panel",
        title: "Ui Previewer",
        renderer: "always",
        params: {
          scope: 'source',
        },
        position: { referencePanel: "dv_controller_panel_id", direction: "right" },
      },
      {
        id: "dv_debugger_panel_id",
        component: "dv_debugger_panel",
        title: "Code",
        renderer: "always",
        params: {
          scope: 'transformer',
        },
        position: { referencePanel: "ui_previewer_panel_id", direction: "right" },
      },

    ]
  },


  configDemo: {
    panels: [
      {
        id: "panel_1",
        component: "default",
        renderer: "always",
        title: "Panel 1",
      },
      {
        id: "panel_2",
        component: "default",
        title: "Panel 2",
        position: { referencePanel: "panel_1" },
      },
      {
        id: "panel_3",
        component: "default",
        title: "Panel 3",
        position: { referencePanel: "panel_1" },
      },
      {
        id: "panel_4",
        component: "default",
        title: "Panel 4",
        position: { referencePanel: "panel_1", direction: "right" },
      },
      {
        id: "panel_5",
        component: "default",
        title: "Panel 5",
        position: { referencePanel: "panel_4" },
      },
      {
        id: "panel_6",
        component: "default",
        title: "Panel 6",
        position: { referencePanel: "panel_5", direction: "below" },
      },
      {
        id: "panel_7",
        component: "default",
        title: "Panel 7",
        position: { referencePanel: "panel_6", direction: "left" },
      },
      {
        id: "panel8",
        component: "default",
        title: "Panel 8",
        position: { referencePanel: "panel_7", direction: "below" },
      },
    ]
  },
  domainDrivenDock: {
    panels: [
      {
        id: "panel_domain_selector",
        component: "PlaceholderPanel",
        renderer: "always",
        title: "Domain Selector",
      },
      {
        id: "panel_domain_structure",
        component: "PlaceholderPanel",
        title: "Domain Structure",
        renderer: "always",
        position: { referencePanel: "panel_domain_selector", direction: "below" },
      },

      {
        id: "panel_node_selected",
        component: "PlaceholderPanel",
        title: "Node Selected",
        renderer: "always",
        position: { referencePanel: "panel_domain_selector", direction: "right" },
      },
      {
        id: "panel_node_specifications",
        component: "PlaceholderPanel",
        title: "Node Specs",
        renderer: "always",
        position: { referencePanel: "panel_domain_selector", direction: "right" },
      },
      {
        id: "panel_node_simulator",
        component: "PlaceholderPanel",
        title: "Node Simulator",
        renderer: "always",
        position: { referencePanel: "panel_domain_structure", direction: "right" },
      },
      {
        id: "panel_node_script_editor",
        component: "PlaceholderPanel",
        title: "Script Editor",
        renderer: "always",
        position: { referencePanel: "panel_domain_structure", direction: "right" },
      },
      //   MonacoEditorPanel
    ],
  },
  domainStore: {
    domains: [
      "jsonata"
    ],
    domainConfig: {
      jsonata: {
        dock: {
          panels: [
            {
              id: "dv_controller_panel_id",
              component: "dv_controller_panel",
              title: "Scope Picker",
              renderer: "always",
            },
            {
              // id: "monaco-editor-panel-source",
              // component: "MonacoEditorPanel",
              id: "ui_previewer_panel_id",
              component: "ui_previewer_panel",
              title: "Ui Previewer",
              renderer: "always",
              params: {
                scope: 'source',
              },
              position: { referencePanel: "dv_controller_panel_id", direction: "right" },
            },
            {
              id: "dv_debugger_panel_id",
              component: "dv_debugger_panel",
              title: "Code",
              renderer: "always",
              params: {
                scope: 'transformer',
              },
              position: { referencePanel: "ui_previewer_panel_id", direction: "right" },
            },

          ]
        }
      }
    },
    domainsStructure: {
      jsonata: [
        {
          id: "demos",
          name: "Demos",
          children: [
            {
              id: "transformer",
              name: "Transformer",
            }
          ]
        },
        {
          id: "api-specs",
          name: "API Specs",
          children: [
            { id: "operators", name: "Operators"},
            { id: "functions", name: "Functions" }
          ]
        }
      ]
    },

    nodeScriptDemos: {
      jsonata: {
        source: {},
        transformer: {},
      }
    }
  },
}

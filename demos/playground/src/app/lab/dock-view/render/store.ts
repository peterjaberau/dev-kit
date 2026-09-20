export const predefinedLayouts = [
  {
    id: "default",
    title: "Default",
    data: {
      layout: {
        type: "group",
        direction: "horizontal",
        children: [
          {
            type: "panel",
            id: "sidebar",
            size: 24,
            tabs: [{ id: "files", data: { title: "Files", kind: "files" } }],
          },
          {
            type: "group",
            direction: "vertical",
            size: 76,
            children: [
              {
                type: "panel",
                id: "editor",
                size: 68,
                activeTabId: "main-ts",
                tabs: [
                  { id: "main-ts", data: { title: "main.ts", kind: "editor" } },
                  { id: "styles-css", data: { title: "styles.css", kind: "editor" } },
                ],
              },
              {
                type: "panel",
                id: "terminal",
                size: 32,
                tabs: [
                  {
                    id: "terminal-tab",
                    data: { title: "Terminal", kind: "terminal" },
                  },
                ],
              },
            ],
          },
        ],
      },
    },
  },
  {
    id: "full",
    title: "Full",
    data: {
      layout: {
        type: "root",
        main: {
          type: "group",
          direction: "horizontal",
          children: [
            {
              type: "panel",
              id: "editor-a",
              size: 58,
              tabs: [
                { id: "index-ts", data: { title: "index.ts" } },
                { id: "router-ts", data: { title: "router.ts" } },
              ],
            },
            {
              type: "panel",
              id: "editor-b",
              size: 42,
              tabs: [
                {
                  id: "field",
                  data: {
                    title: "Field",
                    inputs: {
                      componentId: "forms-field",
                    },
                  },
                },
              ],
            },
          ],
        },
        edges: {
          left: {
            type: "edgePanel",
            id: "left-tools",
            size: 22,
            minSize: 14,
            maxSize: 34,
            tabs: [
              {
                id: "registry",
                data: { title: "Registry" },
                closable: false,
              },
              {
                id: "button",
                data: {
                  title: "Button",
                  inputs: {
                    componentId: "components-button",
                  },
                },
              },
            ],
          },
          right: {
            type: "edgePanel",
            id: "right-tools",
            size: 18,
            minSize: 12,
            maxSize: 28,
            tabs: [
              {
                id: "popover",
                data: {
                  title: "Popover",
                  inputs: {
                    componentId: "components-popover",
                  },
                },
              },
            ],
          },
          bottom: {
            type: "edgePanel",
            id: "bottom-tools",
            size: 28,
            minSize: 18,
            maxSize: 42,
            tabs: [
              {
                id: "checkbox",
                data: {
                  title: "Checkbox",
                  inputs: {
                    componentId: "forms-checkbox",
                  },
                },
                closable: false,
              },
              {
                id: "slider",
                data: {
                  title: "Slider",
                  inputs: {
                    componentId: "forms-slider",
                  },
                },
              },
            ],
          },
        },
      },
    },
  },
  {
    id: "ide",
    title: "IDE + edges",
    data: {
      layout: {
        type: "root",
        edges: {
          left: {
            type: "edgePanel",
            id: "edge-explorer",
            size: 20,
            tabs: [{ id: "explorer", data: { title: "Explorer", kind: "files" } }],
          },
          bottom: {
            type: "edgePanel",
            id: "edge-output",
            size: 26,
            tabs: [
              { id: "output", data: { title: "Output", kind: "output" } },
              { id: "ide-terminal", data: { title: "Terminal", kind: "terminal" } },
            ],
          },
        },
        main: {
          type: "group",
          direction: "horizontal",
          children: [
            {
              type: "panel",
              id: "ide-editor",
              size: 64,
              activeTabId: "ide-main",
              tabs: [
                { id: "ide-main", data: { title: "index.tsx", kind: "editor" } },
                { id: "ide-readme", data: { title: "README.md", kind: "notes" } },
              ],
            },
            {
              type: "panel",
              id: "ide-preview",
              size: 36,
              tabs: [
                {
                  id: "ide-preview-tab",
                  data: { title: "Preview", kind: "preview" },
                },
              ],
            },
          ],
        },
      },
    },
  },
  {
    id: "dashboard",
    title: "Dashboard",
    data: {
      layout: {
        type: "group",
        direction: "vertical",
        children: [
          {
            type: "group",
            direction: "horizontal",
            size: 50,
            children: [
              {
                type: "panel",
                id: "metrics",
                size: 50,
                tabs: [{ id: "metrics-tab", data: { title: "Metrics", kind: "preview" } }],
              },
              {
                type: "panel",
                id: "traffic",
                size: 50,
                tabs: [{ id: "traffic-tab", data: { title: "Traffic", kind: "preview" } }],
              },
            ],
          },
          {
            type: "group",
            direction: "horizontal",
            size: 50,
            children: [
              {
                type: "panel",
                id: "logs",
                size: 60,
                tabs: [{ id: "logs-tab", data: { title: "Logs", kind: "output" } }],
              },
              {
                type: "panel",
                id: "activity",
                size: 40,
                tabs: [{ id: "activity-tab", data: { title: "Activity", kind: "notes" } }],
              },
            ],
          },
        ],
      },
    },
  },
  {
    id: "floating",
    title: "Floating",
    data: {
      layout: {
        type: "root",
        main: {
          type: "group",
          direction: "horizontal",
          children: [
            {
              type: "panel",
              id: "float-nav",
              size: 28,
              tabs: [{ id: "float-files", data: { title: "Files", kind: "files" } }],
            },
            {
              type: "panel",
              id: "float-editor",
              size: 72,
              tabs: [{ id: "float-main", data: { title: "app.ts", kind: "editor" } }],
            },
          ],
        },
        floating: [
          {
            type: "floatingPanel",
            id: "float-inspector",
            bounds: { x: 52, y: 14, width: 38, height: 48 },
            tabs: [
              {
                id: "float-inspect-tab",
                data: { title: "Inspector", kind: "notes" },
              },
            ],
          },
        ],
      },
    },
  },
]

export const predefinedThemes = [
  {
    id: "default",
    title: "Default",
    data: {
      style: {
        colorScheme: "dark",
        "--view-accent": "var(--site-workspace-accent)",
        "--view-drop-bg": "color-mix(in srgb, var(--site-workspace-accent), transparent 84%)",
        "--view-drop-border": "color-mix(in srgb, var(--site-workspace-accent), transparent 42%)",
        "--view-resize-handle-active-bg": "color-mix(in srgb, var(--site-workspace-accent), transparent 40%)",
      },
    },
  },
  {
    id: "light",
    title: "Light",
    data: {
      style: {
        colorScheme: "light",
        "--view-bg": "#f4f6fb",
        "--view-fg": "#1f2937",
        "--view-panel-bg": "#ffffff",
        "--view-panel-border": "#d8dee8",
        "--view-tabbar-bg": "#edf1f7",
        "--view-tab-fg": "#667085",
        "--view-tab-active-bg": "#ffffff",
        "--view-tab-active-fg": "#111827",
        "--view-tab-hover-bg": "#e2e8f2",
        "--view-menu-bg": "#ffffff",
        "--view-action-hover-bg": "#e5ebf4",
        "--view-accent": "var(--site-workspace-accent)",
        "--view-drop-bg": "color-mix(in srgb, var(--site-workspace-accent), transparent 84%)",
        "--view-drop-border": "color-mix(in srgb, var(--site-workspace-accent), transparent 42%)",
        "--view-resize-handle-active-bg": "color-mix(in srgb, var(--site-workspace-accent), transparent 40%)",
      },
    },
  },
  {
    id: "dracula",
    title: "Dracula",
    data: {
      style: {
        colorScheme: "dark",
        "--view-bg": "#191a21",
        "--view-fg": "#f8f8f2",
        "--view-panel-bg": "#282a36",
        "--view-panel-border": "#44475a",
        "--view-tabbar-bg": "#21222c",
        "--view-tab-fg": "#bdc0d6",
        "--view-tab-active-bg": "#343746",
        "--view-tab-active-fg": "#ffffff",
        "--view-tab-hover-bg": "#303241",
        "--view-menu-bg": "#282a36",
        "--view-action-hover-bg": "#3a3d4f",
        "--view-accent": "var(--site-workspace-accent)",
        "--view-drop-bg": "color-mix(in srgb, var(--site-workspace-accent), transparent 84%)",
        "--view-drop-border": "color-mix(in srgb, var(--site-workspace-accent), transparent 42%)",
        "--view-resize-handle-active-bg": "color-mix(in srgb, var(--site-workspace-accent), transparent 40%)",
      },
    },
  },
  {
    id: "replit",
    title: "Replit",
    data: {
      style: {
        colorScheme: "dark",
        "--view-bg": "#0e1525",
        "--view-fg": "#f5f9fc",
        "--view-panel-bg": "#1c2333",
        "--view-panel-border": "#30394f",
        "--view-tabbar-bg": "#131b2c",
        "--view-tab-fg": "#a5adba",
        "--view-tab-active-bg": "#20283a",
        "--view-tab-active-fg": "#ffffff",
        "--view-tab-hover-bg": "#26314a",
        "--view-menu-bg": "#1c2333",
        "--view-action-hover-bg": "#2a344a",
        "--view-accent": "var(--site-workspace-accent)",
        "--view-drop-bg": "color-mix(in srgb, var(--site-workspace-accent), transparent 84%)",
        "--view-drop-border": "color-mix(in srgb, var(--site-workspace-accent), transparent 42%)",
        "--view-resize-handle-active-bg": "color-mix(in srgb, var(--site-workspace-accent), transparent 40%)",
      },
    },
  },
  {
    id: "abyss",
    title: "Abyss",
    data: {
      style: {
        colorScheme: "dark",
        "--view-bg": "#000c18",
        "--view-fg": "#d7ecff",
        "--view-panel-bg": "#001b33",
        "--view-panel-border": "#123a58",
        "--view-tabbar-bg": "#001426",
        "--view-tab-fg": "#8db9d6",
        "--view-tab-active-bg": "#002440",
        "--view-tab-active-fg": "#f4fbff",
        "--view-tab-hover-bg": "#052b4a",
        "--view-menu-bg": "#02243f",
        "--view-action-hover-bg": "#0b3555",
        "--view-accent": "var(--site-workspace-accent)",
        "--view-drop-bg": "color-mix(in srgb, var(--site-workspace-accent), transparent 84%)",
        "--view-drop-border": "color-mix(in srgb, var(--site-workspace-accent), transparent 42%)",
        "--view-resize-handle-active-bg": "color-mix(in srgb, var(--site-workspace-accent), transparent 40%)",
      },
    },
  },
]

export const predefinedViewProps = [
  {
    id: "default",
    title: "Default",
    data: {
      props: {
        resizable: true,
        showActionsButton: true,
        showNewTabButton: true,
        resizeHandleHitSize: 24,
        minSize: 10,
      },
    },
  },
]

export const defaultVariables = {
  layoutId: "default",
  themeId: "light",
  viewPropsId: "default",
  id: 0,
  seq: 0,
  makeTabPrefix: {
    id: "tab",
    title: "Tab",
  },
}



export const playgroundContext = {
  library: {
    resources: [
      {
        id: "firebase",
        keywords: "gcp",
        label: "Firebase",
        groupType: "API",
      },
      {
        id: "github",
        keywords: "code git",
        label: "GitHub",
        groupType: "API",
      },
      {
        id: "gmail",
        keywords: "gmail email mail",
        label: "Gmail",
        groupType: "API",
      },
      {
        id: "googleMaps",
        keywords: "gcp",
        label: "Google Maps",
        groupType: "API",
      },
      {
        id: "googlesheets",
        keywords: "spreadsheet csv",
        label: "Google Sheets",
        groupType: "API",
      },
      {
        id: "graphql",
        keywords: "api",
        label: "GraphQL",
        groupType: "API",
      },
      {
        id: "lambda",
        keywords: "aws",
        label: "Lambda",
        groupType: "API",
      },
      {
        id: "mcp",
        keywords: "mcp model context protocol ai",
        label: "MCP Server",
        groupType: "API",
      },
      {
        id: "s3",
        keywords: "aws amazon upload storage",
        label: "Amazon S3",
        groupType: "API",
      },
      {
        id: "anthropic",
        keywords: "ai llm provider retoolAI retool AI anthropic",
        label: "Anthropic",
        groupType: "AI",
      },
      {
        id: "openAIProvider",
        keywords: "ai llm provider retoolAI retool AI openai",
        label: "OpenAI",
        groupType: "AI",
      },
      {
        id: "dynamodb",
        keywords: "aws nosql",
        label: "Amazon DynamoDB",
        groupType: "Databases",
      },
      {
        id: "csv",
        keywords: "spreadsheet database airtable sheets excel retooldb",
        label: "CSV",
        groupType: "Databases",
      },
      {
        id: "cosmosdb",
        keywords: "azure",
        label: "CosmosDB",
        groupType: "Databases",
      },
      {
        id: "databricks",
        keywords: "data warehouse",
        label: "Databricks SQL",
        groupType: "Databases",
      },
      {
        id: "elasticsearch",
        keywords: "nosql",
        label: "Elasticsearch",
        groupType: "Databases",
      },
      {
        id: "mongodb",
        keywords: "nosql document",
        label: "MongoDB",
        groupType: "Databases",
      },
      {
        id: "mysql",
        keywords: "mariadb",
        label: "MySQL",
        groupType: "Databases",
      },
      {
        id: "postgresql",
        keywords: "psql",
        label: "PostgreSQL",
        groupType: "Databases",
      },
      {
        id: "kafka",
        keywords: "stream streaming event message",
        label: "Kafka",
        groupType: "Message Queues",
      },
      {
        id: "sns",
        keywords: "stream streaming event message",
        label: "SNS",
        groupType: "Message Queues",
      },
      {
        id: "sqs",
        keywords: "stream streaming event message",
        label: "SQS",
        groupType: "Message Queues",
      },
    ],
  },
  org: {},
  user: {},
  resources: [
    {
      id: "layout_presets",
      type: "JSON",
      options: {
        data: [
          {
            id: "default",
            title: "Default",
            data: {
              layout: {
                type: "group",
                direction: "horizontal",
                children: [
                  {
                    type: "panel",
                    id: "sidebar",
                    size: 24,
                    tabs: [{ id: "files", data: { title: "Files", kind: "files" } }],
                  },
                  {
                    type: "group",
                    direction: "vertical",
                    size: 76,
                    children: [
                      {
                        type: "panel",
                        id: "editor",
                        size: 68,
                        activeTabId: "main-ts",
                        tabs: [
                          { id: "main-ts", data: { title: "main.ts", kind: "editor" } },
                          { id: "styles-css", data: { title: "styles.css", kind: "editor" } },
                        ],
                      },
                      {
                        type: "panel",
                        id: "terminal",
                        size: 32,
                        tabs: [
                          {
                            id: "terminal-tab",
                            data: { title: "Terminal", kind: "terminal" },
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            },
          },
          {
            id: "full",
            title: "Full",
            data: {
              layout: {
                type: "root",
                main: {
                  type: "group",
                  direction: "horizontal",
                  children: [
                    {
                      type: "panel",
                      id: "editor-a",
                      size: 58,
                      tabs: [
                        { id: "index-ts", data: { title: "index.ts" } },
                        { id: "router-ts", data: { title: "router.ts" } },
                      ],
                    },
                    {
                      type: "panel",
                      id: "editor-b",
                      size: 42,
                      tabs: [
                        {
                          id: "field",
                          data: {
                            title: "Field",
                            inputs: {
                              componentId: "forms-field",
                            },
                          },
                        },
                      ],
                    },
                  ],
                },
                edges: {
                  left: {
                    type: "edgePanel",
                    id: "left-tools",
                    size: 22,
                    minSize: 14,
                    maxSize: 34,
                    tabs: [
                      {
                        id: "registry",
                        data: { title: "Registry" },
                        closable: false,
                      },
                      {
                        id: "button",
                        data: {
                          title: "Button",
                          inputs: {
                            componentId: "components-button",
                          },
                        },
                      },
                    ],
                  },
                  right: {
                    type: "edgePanel",
                    id: "right-tools",
                    size: 18,
                    minSize: 12,
                    maxSize: 28,
                    tabs: [
                      {
                        id: "popover",
                        data: {
                          title: "Popover",
                          inputs: {
                            componentId: "components-popover",
                          },
                        },
                      },
                    ],
                  },
                  bottom: {
                    type: "edgePanel",
                    id: "bottom-tools",
                    size: 28,
                    minSize: 18,
                    maxSize: 42,
                    tabs: [
                      {
                        id: "checkbox",
                        data: {
                          title: "Checkbox",
                          inputs: {
                            componentId: "forms-checkbox",
                          },
                        },
                        closable: false,
                      },
                      {
                        id: "slider",
                        data: {
                          title: "Slider",
                          inputs: {
                            componentId: "forms-slider",
                          },
                        },
                      },
                    ],
                  },
                },
              },
            },
          },
          {
            id: "ide",
            title: "IDE + edges",
            data: {
              layout: {
                type: "root",
                edges: {
                  left: {
                    type: "edgePanel",
                    id: "edge-explorer",
                    size: 20,
                    tabs: [{ id: "explorer", data: { title: "Explorer", kind: "files" } }],
                  },
                  bottom: {
                    type: "edgePanel",
                    id: "edge-output",
                    size: 26,
                    tabs: [
                      { id: "output", data: { title: "Output", kind: "output" } },
                      { id: "ide-terminal", data: { title: "Terminal", kind: "terminal" } },
                    ],
                  },
                },
                main: {
                  type: "group",
                  direction: "horizontal",
                  children: [
                    {
                      type: "panel",
                      id: "ide-editor",
                      size: 64,
                      activeTabId: "ide-main",
                      tabs: [
                        { id: "ide-main", data: { title: "index.tsx", kind: "editor" } },
                        { id: "ide-readme", data: { title: "README.md", kind: "notes" } },
                      ],
                    },
                    {
                      type: "panel",
                      id: "ide-preview",
                      size: 36,
                      tabs: [
                        {
                          id: "ide-preview-tab",
                          data: { title: "Preview", kind: "preview" },
                        },
                      ],
                    },
                  ],
                },
              },
            },
          },
          {
            id: "dashboard",
            title: "Dashboard",
            data: {
              layout: {
                type: "group",
                direction: "vertical",
                children: [
                  {
                    type: "group",
                    direction: "horizontal",
                    size: 50,
                    children: [
                      {
                        type: "panel",
                        id: "metrics",
                        size: 50,
                        tabs: [{ id: "metrics-tab", data: { title: "Metrics", kind: "preview" } }],
                      },
                      {
                        type: "panel",
                        id: "traffic",
                        size: 50,
                        tabs: [{ id: "traffic-tab", data: { title: "Traffic", kind: "preview" } }],
                      },
                    ],
                  },
                  {
                    type: "group",
                    direction: "horizontal",
                    size: 50,
                    children: [
                      {
                        type: "panel",
                        id: "logs",
                        size: 60,
                        tabs: [{ id: "logs-tab", data: { title: "Logs", kind: "output" } }],
                      },
                      {
                        type: "panel",
                        id: "activity",
                        size: 40,
                        tabs: [{ id: "activity-tab", data: { title: "Activity", kind: "notes" } }],
                      },
                    ],
                  },
                ],
              },
            },
          },
          {
            id: "floating",
            title: "Floating",
            data: {
              layout: {
                type: "root",
                main: {
                  type: "group",
                  direction: "horizontal",
                  children: [
                    {
                      type: "panel",
                      id: "float-nav",
                      size: 28,
                      tabs: [{ id: "float-files", data: { title: "Files", kind: "files" } }],
                    },
                    {
                      type: "panel",
                      id: "float-editor",
                      size: 72,
                      tabs: [{ id: "float-main", data: { title: "app.ts", kind: "editor" } }],
                    },
                  ],
                },
                floating: [
                  {
                    type: "floatingPanel",
                    id: "float-inspector",
                    bounds: { x: 52, y: 14, width: 38, height: 48 },
                    tabs: [
                      {
                        id: "float-inspect-tab",
                        data: { title: "Inspector", kind: "notes" },
                      },
                    ],
                  },
                ],
              },
            },
          },
        ],
      },
    },
    {
      id: "theme_presets",
      type: "JSON",
      options: {
        data: [
          {
            id: "default",
            title: "Default",
            data: {
              style: {
                colorScheme: "dark",
                "--view-accent": "var(--site-workspace-accent)",
                "--view-drop-bg": "color-mix(in srgb, var(--site-workspace-accent), transparent 84%)",
                "--view-drop-border": "color-mix(in srgb, var(--site-workspace-accent), transparent 42%)",
                "--view-resize-handle-active-bg": "color-mix(in srgb, var(--site-workspace-accent), transparent 40%)",
              },
            },
          },
          {
            id: "light",
            title: "Light",
            data: {
              style: {
                colorScheme: "light",
                "--view-bg": "#f4f6fb",
                "--view-fg": "#1f2937",
                "--view-panel-bg": "#ffffff",
                "--view-panel-border": "#d8dee8",
                "--view-tabbar-bg": "#edf1f7",
                "--view-tab-fg": "#667085",
                "--view-tab-active-bg": "#ffffff",
                "--view-tab-active-fg": "#111827",
                "--view-tab-hover-bg": "#e2e8f2",
                "--view-menu-bg": "#ffffff",
                "--view-action-hover-bg": "#e5ebf4",
                "--view-accent": "var(--site-workspace-accent)",
                "--view-drop-bg": "color-mix(in srgb, var(--site-workspace-accent), transparent 84%)",
                "--view-drop-border": "color-mix(in srgb, var(--site-workspace-accent), transparent 42%)",
                "--view-resize-handle-active-bg": "color-mix(in srgb, var(--site-workspace-accent), transparent 40%)",
              },
            },
          },
          {
            id: "dracula",
            title: "Dracula",
            data: {
              style: {
                colorScheme: "dark",
                "--view-bg": "#191a21",
                "--view-fg": "#f8f8f2",
                "--view-panel-bg": "#282a36",
                "--view-panel-border": "#44475a",
                "--view-tabbar-bg": "#21222c",
                "--view-tab-fg": "#bdc0d6",
                "--view-tab-active-bg": "#343746",
                "--view-tab-active-fg": "#ffffff",
                "--view-tab-hover-bg": "#303241",
                "--view-menu-bg": "#282a36",
                "--view-action-hover-bg": "#3a3d4f",
                "--view-accent": "var(--site-workspace-accent)",
                "--view-drop-bg": "color-mix(in srgb, var(--site-workspace-accent), transparent 84%)",
                "--view-drop-border": "color-mix(in srgb, var(--site-workspace-accent), transparent 42%)",
                "--view-resize-handle-active-bg": "color-mix(in srgb, var(--site-workspace-accent), transparent 40%)",
              },
            },
          },
          {
            id: "replit",
            title: "Replit",
            data: {
              style: {
                colorScheme: "dark",
                "--view-bg": "#0e1525",
                "--view-fg": "#f5f9fc",
                "--view-panel-bg": "#1c2333",
                "--view-panel-border": "#30394f",
                "--view-tabbar-bg": "#131b2c",
                "--view-tab-fg": "#a5adba",
                "--view-tab-active-bg": "#20283a",
                "--view-tab-active-fg": "#ffffff",
                "--view-tab-hover-bg": "#26314a",
                "--view-menu-bg": "#1c2333",
                "--view-action-hover-bg": "#2a344a",
                "--view-accent": "var(--site-workspace-accent)",
                "--view-drop-bg": "color-mix(in srgb, var(--site-workspace-accent), transparent 84%)",
                "--view-drop-border": "color-mix(in srgb, var(--site-workspace-accent), transparent 42%)",
                "--view-resize-handle-active-bg": "color-mix(in srgb, var(--site-workspace-accent), transparent 40%)",
              },
            },
          },
          {
            id: "abyss",
            title: "Abyss",
            data: {
              style: {
                colorScheme: "dark",
                "--view-bg": "#000c18",
                "--view-fg": "#d7ecff",
                "--view-panel-bg": "#001b33",
                "--view-panel-border": "#123a58",
                "--view-tabbar-bg": "#001426",
                "--view-tab-fg": "#8db9d6",
                "--view-tab-active-bg": "#002440",
                "--view-tab-active-fg": "#f4fbff",
                "--view-tab-hover-bg": "#052b4a",
                "--view-menu-bg": "#02243f",
                "--view-action-hover-bg": "#0b3555",
                "--view-accent": "var(--site-workspace-accent)",
                "--view-drop-bg": "color-mix(in srgb, var(--site-workspace-accent), transparent 84%)",
                "--view-drop-border": "color-mix(in srgb, var(--site-workspace-accent), transparent 42%)",
                "--view-resize-handle-active-bg": "color-mix(in srgb, var(--site-workspace-accent), transparent 40%)",
              },
            },
          },
        ],
      },
    },
    {
      id: "view_prop_presets",
      type: "JSON",
      options: {
        data: [
          {
            id: "default",
            title: "Default",
            data: {
              props: {
                resizable: true,
                showActionsButton: true,
                showNewTabButton: true,
                resizeHandleHitSize: 24,
                minSize: 10,
              },
            },
          },
        ],
      },
    },
    {
      id: "products_api",
      type: "restapi",
      options: {
        baseURL: "https://dummyjson.com/",
        headers: [],
        urlparams: [],
        body: [],
      },
    },
  ],
  queries: [
    {
      id: "get_products_from_restapi",
      resourceId: "products_api",
      resourceType: "restapi",
      template: {
        body: "",
        data: null,
        type: "GET",
        error: null,
        query: "products/{{product_id}}",
        events: [],
        cookies: "",
        headers: "",
        rawData: null,
        finished: null,
        isFetching: false,
        transformer: null,
      },
    },
    {
      id: "getLayoutPresets",
      resourceId: "layout_presets",
      resourceType: "JSON",
      template: {
        data: null,
        error: null,
        events: [],
        rawData: null,
        finished: null,
        isFetching: false,
        transformer: null,
      },
    },
    {
      id: "getThemePresets",
      resourceId: "theme_presets",
      resourceType: "JSON",
      template: {
        data: null,
        error: null,
        events: [],
        rawData: null,
        finished: null,
        isFetching: false,
        transformer: null,
      },
    },
    {
      id: "getViewPropPresets",
      resourceId: "view_prop_presets",
      resourceType: "JSON",
      template: {
        data: null,
        error: null,
        events: [],
        rawData: null,
        finished: null,
        isFetching: false,
        transformer: null,
      },
    },
  ],
  database: [],
}

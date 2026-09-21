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
  internal: {
    database: {
      workflowsMetadata: [
        {
          id: "2db1876d-a87e-4abc-a535-b7cc37fd033d",
          name: "Workflow - 1",
          isEnabled: false,
          resourceNames: ["webhook", "JavascriptQuery"],
          startTriggerType: {
            type: "webhook",
          },
          type: "workflow",
        },
        {
          id: "eae9f2cf-d554-42ff-bc80-37d26b4614a7",
          name: "Workflow - Peter Jaber - Jun 27, 2023 1:17 AM",
          isEnabled: false,
          resourceNames: ["schedule", "JavascriptQuery"],
          startTriggerType: {
            type: "schedule",
            cronString: "0 0 * * *",
          },
          type: "workflow",
        },
        {
          id: "11757356-ed03-4732-a854-6a07df60fa1b",
          name: "Onboarding Demo - Peter Jaber",
          isEnabled: false,
          resourceNames: [
            "schedule",
            "REST-WithoutResource",
            "REST-WithoutResource",
            "JavascriptQuery",
            "JavascriptQuery",
            "REST-WithoutResource",
          ],
          startTriggerType: {
            type: "schedule",
            cronString: "",
          },
          type: "workflow",
        },
        {
          id: "26277201-fc03-4bfe-8bf2-146c2b6a0114",
          name: "Workflow - Peter Jaber - Sep 22, 2023 1:59 AM",
          isEnabled: false,
          resourceNames: ["webhook", "JavascriptQuery"],
          startTriggerType: {
            type: "webhook",
          },
          type: "workflow",
        },
      ],
      workflows: [],
    },
  },

  system: {
    componentTree: {
      isExpanded: true,
      selectedId: null,
    },
    configView: {
      currentView: "FORM",
      editingToolId: null,
      editingSubflowId: null,
      createdSubflowId: null,
    },
    dialogs: {},
    editor: {
      inFunctionEditor: false,
      functions: {},
      tabs: [],
      transientTabId: null,
      minimizeTabs: false,
      showCanvasTab: true,
      showOutput: false,
    },
    globals: {
      helpBubbleOpen: false,
      modals: {},
    },
    ide: {
      inspector: {
        visible: true,
        docked: true,
        pluginSelectIsOpen: false,
        pluginRenamingId: null,
      },
      canvas: {},
      versions: {
        activeTab: "History",
      },
    },
    layout: {},
    modules: {
      availableModules: {
        hasHandledInitialFetch: false,
        isFetching: false,
        module,
      },
      templates: {},
    },
    network: {
      error: false,
    },
    onboarding: {},
    pages: {
      isFetchingPage: false,
      currentPageId: null,
      pages: {},
      folders: {},
      isFetchingPagesForFirstTime: true,
      pageTags: [],
      currentPage: "Main",
      isWorkspaceRedirectInProgress: false,
      pageNames: [],
    },
    pagesLoadMetadata: {
      pagesLoadInFlight: false,
      lastLoadFailed: false,
    },
    systemApi: {
      queries: {},
      config: {
        online: true,
        focused: true,
      },
    },
    systemApiMethods: {
      config: {
        online: true,
        focused: true,
      },
    },
    schemas: {},
    session: {
      user: null,
      hostname: null,
      isFetching: false,
    },
    style: {
      requestedModeId: null,
      persistedUserModesByThemeName: {},
    },
    toasts: {
      editorToastStack: [],
      appToastStack: [],
    },
    user: {
      resources: {
        isFetching: false,
        resources: [],
        resourcesMetadata: [],
        errorMessage: "",
        mutationInvalidatorByName: {},
      },
      resourceFolders: {
        isFetching: false,
        resourceFolders: [],
        errorMessage: "",
      },
      resourceUsages: {},
      resourceUsageCounts: {
        isFetching: false,
        pageCounts: [],
        queryCounts: {},
        workflowCounts: [],
        aiSettingsCounts: {},
        vectorCounts: {},
      },
      resourceAuthStates: {},
      personalAccessTokens: {
        isFetching: false,
        personalAccessTokens: [],
        errorMessage: "",
      },
      environments: {
        isFetching: false,
        environments: [],
        errorMessage: "",
      },
      branches: {
        isFetching: false,
        branches: [],
      },
      orgInfo: {
        isFetching: false,
        licenseKey: null,
        organization: {},
        users: {},
        userGroups: {},
        groups: {},
        pages: {},
        roles: {},
        workflows: {},
        workflowFolders: {},
        agents: {},
        agentFolders: {},
      },
      user: {},
      spaces: {
        isFetching: false,
        spaces: [],
      },
    },
    editorDebugging: {
      console: {
        hasError: false,
        runtimeErrorCount: 0,
        runtimeInfoCount: 0,
        runtimeSuccessCount: 0,
        runtimeWarningCount: 0,
      },
      modalTab: "Console",
      state: {
        selectedPluginId: "",
      },
      timeline: {
        errorCount: 0,
        runningCount: 0,
        successCount: 0,
      },
      performance: {
        queryExecutionTimes: {},
        queryPayloadSizes: {},
      },
      linting: {
        accessibilityProblems: [],
      },
      consoleRecords: [],
      queryRunCount: 0,
    },
    sidebarConfig: {
      Add: {
        icon: "PlusCircle",
        position: "top",
        shortcutKeys: "⇧⌘A",
      },
      Pages: {
        icon: "Note",
        position: "top",
        displayName: "Pages",
      },
      Explorer: {
        icon: "BoundingBox",
        position: "top",
        shortcutKeys: "⇧⌘D",
        displayName: "Component tree",
      },
      Code: {
        icon: "Code",
        position: "top",
        shortcutKeys: "⇧⌘E",
      },
      AppStructure: {
        icon: "TreeView",
        position: "top",
        displayName: "App structure",
      },
      Functions: {
        icon: "Function",
        position: "top",
        displayName: "Functions",
      },
      Search: {
        icon: "MagnifyingGlass",
        position: "top",
        displayName: "Code search",
        shortcutKeys: "⇧⌘F",
      },
      StateTab: {
        icon: "CodeBlock",
        position: "top",
        displayName: "State",
      },
      History: {
        icon: "ClockCountdown",
        position: "top",
        displayName: "Releases and history",
      },
      Settings: {
        icon: "Gear",
        position: "top",
        displayName: "App settings",
        staticWidth: 670,
      },
      AICopilot: {
        icon: "FeatureAI",
        position: "bottom",
        displayName: "Assist (Beta)",
        shortcutKeys: "⌘I",
        minWidth: 500,
        maxWidth: 800,
        buttonDarkenedBackground: "var(--assist-blue-100)",
      },
    },
    systemUtilsMetadata: {
      confetti: {
        example: "utils.confetti()",
        label: "Confetti",
        description: "Fire confetti 🎉",
      },
      copyToClipboard: {
        label: "Copy to clipboard",
        description: "Sets the clipboard's content to the provided string value.",
        example: "`utils.copyToClipboard('value')`",
        params: [
          {
            type: "codeInput",
            name: "value",
            props: {
              label: "Value",
              validator: "string",
            },
          },
        ],
      },
      downloadPage: {
        label: "Download page",
        example:
          "`utils.downloadPage(fileName, { selectorsToExclude, componentsToExclude, selectorsToInclude, componentsToInclude, scale })`",
        description:
          "Downloads the current Retool page as a PDF with the provided fileName. \n    \nAn optional second parameter lets you provide an array of components (e.g. ['select1', 'textinput1']) and\/or an array of css selectors to determine which elements are included or excluded from the screenshot. \n\nYou can also pass a numerical \"scale\" parameter to configure the resolution (defaults to window.devicePixelRatio).",
        params: [
          {
            type: "codeInput",
            name: "fileName",
            props: {
              label: "File name",
              validator: "string",
            },
          },
        ],
      },
      serializePage: {
        label: "Serialize page",
        example:
          "`utils.serializePage({ selectorsToExclude, componentsToExclude, selectorsToInclude, componentsToInclude, scale })`",
        description:
          "Serializes the current Retool page as a base64 PDF string. \n\nAn optional parameter lets you provide an array of components (e.g. ['select1', 'textinput1']) and\/or an array of css selectors to determine which elements are included or excluded from the screenshot.\n\nYou can also pass a numerical \"scale\" parameter to configure the resolution (defaults to window.devicePixelRatio).",
      },
      downloadFile: {
        label: "Download file",
        example: "`utils.downloadFile(data, fileName, fileType)`",
        description: "Downloads data using fileName (string) and fileType (string) if possible.",
        returnType: "Promise<void>",
        params: [
          {
            type: "codeInput",
            name: "data",
            props: {
              label: "Data",
              validator: "string | object",
            },
          },
          {
            type: "codeInput",
            name: "fileName",
            props: {
              label: "File name",
              validator: "string",
            },
          },
          {
            type: "codeInput",
            name: "fileType",
            props: {
              label: "File type",
              validator: "string",
            },
          },
        ],
      },
      exportData: {
        label: "Export data",
        description: "Download a file with the referenced tabular data.",
        example: "`utils.exportData(table1.data, 'fileName', 'csv')`",
        params: [
          {
            type: "codeInput",
            name: "data",
            props: {
              label: "Data",
              docs: "The data to download. Accepts an array of entries or an object mapping column names to arrays of values.",
              placeholder: "{{ table1.data }}",
            },
          },
          {
            type: "codeInput",
            name: "fileName",
            props: {
              label: "File name",
              validator: "string | void",
              docs: "The downloaded file's name without an extension.",
              defaultValue: "export",
            },
          },
          {
            type: "select",
            name: "fileType",
            props: {
              label: "File type",
              placeholder: "Select a file type",
              defaultValue: "csv",
              options: [
                {
                  value: "csv",
                  label: "CSV",
                },
                {
                  value: "tsv",
                  label: "TSV",
                },
                {
                  value: "json",
                  label: "JSON",
                },
                {
                  value: "xlsx",
                  label: "Excel (.xlsx)",
                },
              ],
            },
          },
          {
            type: "objectInput",
            name: "options",
            props: {
              label: "Options",
              params: [
                {
                  type: "codeInput",
                  name: "sheetName",
                  props: {
                    label: "Sheet name",
                    validator: "string",
                    placeholder: "Sheet1",
                  },
                },
              ],
            },
          },
        ],
      },
      getCurrentPosition: {
        label: "Get current position",
        example: "`utils.getCurrentPosition({ onSuccess: (res) => void })`",
        description:
          "Returns a timestamp and an object containing the current lat\/long location of the user. The onSuccess object argument is optional.",
      },
      getDataByObjectURL: {
        label: "Convert to base64",
        example: "`utils.getDataByObjectURL(signature1.value)`",
        description: "Converts the contents of a Blob or File URL to a base64 string.",
      },
      getManagedAppConfig: {
        label: "[Mobile only] Retrieve the managed app config",
        example: "`utils.getManagedAppConfig()`",
        description: "[Mobile only] Returns the managed app config object",
      },
      openApp: {
        label: "Open Retool app",
        description: "Retool uses client-side routing by default when `newTab` is `false`.",
        example: "`utils.openApp(appUuid, { queryParams: { key: 'value' }, newTab: true })`",
        params: [
          {
            type: "appSelect",
            name: "uuid",
            props: {
              label: "App",
              labelPosition: "top",
              docs: "Note: if a user does not have access to the selected app this action will fail.",
            },
          },
          {
            type: "objectInput",
            name: "options",
            props: {
              label: "Options",
              params: [
                {
                  type: "screenSelect",
                  name: "pageName",
                  props: {
                    label: "Page",
                  },
                },
                {
                  type: "keyValueInputV2",
                  name: "queryParams",
                  props: {
                    label: "Query params",
                    emptyMessage: "No params",
                  },
                },
                {
                  type: "keyValueInputV2",
                  name: "hashParams",
                  props: {
                    label: "Hash params",
                    emptyMessage: "No params",
                  },
                },
                {
                  type: "checkbox",
                  name: "newTab",
                  props: {
                    label: "Open in a new tab",
                  },
                },
              ],
            },
          },
        ],
      },
      openPage: {
        label: "Open page",
        description: "Opens a page in the current Retool App",
        params: [
          {
            type: "screenSelect",
            name: "pageName",
            props: {
              label: "Page",
              validator: "string",
            },
          },
          {
            type: "objectInput",
            name: "options",
            props: {
              label: "Options",
              params: [
                {
                  type: "segmented",
                  name: "passDataWith",
                  props: {
                    label: "Pass data with",
                    defaultValue: "urlParams",
                    options: [
                      {
                        value: "urlParams",
                        label: "Parameters",
                      },
                      {
                        value: "globalVariable",
                        label: "Variable",
                      },
                    ],
                  },
                },
                {
                  type: "keyValueInputV2",
                  name: "queryParams",
                  props: {
                    label: "Query params",
                    emptyMessage: "No params",
                  },
                },
                {
                  type: "keyValueInputV2",
                  name: "hashParams",
                  props: {
                    label: "Hash params",
                    emptyMessage: "No params",
                  },
                },
                {
                  type: "pluginSelect",
                  name: "globalVariable",
                  props: {
                    label: "Global variable",
                  },
                },
                {
                  type: "select",
                  name: "setInOrSetValue",
                  props: {
                    label: "Method",
                    options: [
                      {
                        value: "Set in",
                      },
                      {
                        value: "Set value",
                      },
                    ],
                  },
                },
                {
                  type: "codeInput",
                  name: "keyPath",
                  props: {
                    label: "Key path",
                    docs: "(string | number)[]",
                  },
                },
                {
                  type: "codeInput",
                  name: "globalVariableValue",
                  props: {
                    label: "Value",
                  },
                },
                {
                  type: "checkbox",
                  name: "persistUrlParams",
                  props: {
                    label: "Persist params to next page",
                    docs: "Persist the current URL parameters (at page-switch time) over to the next page. These values will be overwritten by any explicitly set URL parameters.",
                  },
                },
                {
                  type: "checkbox",
                  name: "newTab",
                  props: {
                    label: "Open in a new tab",
                  },
                },
              ],
            },
          },
        ],
      },
      openUrl: {
        label: "Open URL",
        description:
          "Opens a URL (string) in a new tab by default. Pass in { newTab: false } to open url in current tab. Pass in { forceReload: true } to prevent client side routing and force a page reload. URL string must start with http:\/\/ or https:\/\/.",
        example: "`utils.openUrl(url, { newTab: boolean = true, forceReload: boolean = false })`",
        params: [
          {
            type: "codeInput",
            name: "url",
            props: {
              label: "URL",
              validator: "string",
            },
          },
          {
            type: "objectInput",
            name: "options",
            props: {
              label: "Options",
              params: [
                {
                  type: "checkbox",
                  name: "newTab",
                  props: {
                    label: "Open in a new tab",
                    defaultValue: true,
                  },
                },
                {
                  type: "checkbox",
                  name: "forceReload",
                  props: {
                    label: "Disable client-side routing",
                    docs: "Prevents client-side routing and forces a page reload.",
                  },
                },
              ],
            },
          },
        ],
      },
      showNotification: {
        label: "Show notification",
        example: "`utils.showNotification({ title, description, notificationType, duration })`",
        description:
          'Shows a notification message on the top right corner of the screen for `duration` seconds (default 4.5s). Use this to display messages like error messages after a query fails. Supported `notificationTypes` are : "info" | "success" | "warning" | "error"',
        params: [
          {
            type: "objectInput",
            name: "options",
            props: {
              label: "Options",
              params: [
                {
                  type: "codeInput",
                  name: "title",
                  props: {
                    label: "Title",
                  },
                },
                {
                  type: "codeInput",
                  name: "description",
                  props: {
                    label: "Description",
                  },
                },
                {
                  type: "select",
                  name: "notificationType",
                  props: {
                    allowDynamic: true,
                    label: "Type",
                    defaultValue: "info",
                    options: [
                      {
                        value: "info",
                        label: "Info",
                      },
                      {
                        value: "success",
                        label: "Success",
                      },
                      {
                        value: "warning",
                        label: "Warning",
                      },
                      {
                        value: "error",
                        label: "Error",
                      },
                    ],
                  },
                },
                {
                  type: "codeInput",
                  name: "duration",
                  props: {
                    label: "Duration (s)",
                  },
                },
              ],
            },
          },
        ],
      },
      clearLocationLog: {
        label: "[Android White-label Only] Clear location log for Android users",
        example: "`utils.clearLocationLog()`",
        description: "[Android White-label Only] Clears the log of the user's locations",
      },
      getLocationLog: {
        label: "[Android White-label Only] Retrieve location log for Android users",
        example: "`utils.getLocationLog()`",
        description: "[Android White-label Only] Gets a log of the user's locations",
      },
      changeLocale: {
        label: "Change locale",
        description: "Change locale for the current user's session - this will affect localization.",
        params: [
          {
            name: "lng",
            type: "codeInput",
            props: {
              label: "Key",
              labelPosition: "auto",
              validator: "string",
            },
          },
        ],
      },
      playSound: {
        label: "Play sound",
        example: "`utils.playSound(url)`",
        params: [
          {
            type: "codeInput",
            name: "url",
            props: {
              label: "URL",
              placeholder: "https:\/\/example.com\/sound.mp3",
              validator: "string",
            },
          },
        ],
        returnType: "Promise<void>",
        description:
          "Plays a sound. Note that this will fail in some browsers if the user has not interacted with the page.",
      },
      mobileLogout: {
        label: "[Mobile Only] logout from the mobile app",
        example: "`utils.mobileLogout()`",
        description: "[Mobile Only] Clears the session from mobile app and takes user to login screen",
      },
      setUrlParameters: {
        label: "Set URL parameters",
        description: "Sets URL parameters",
        example:
          '`utils.setUrlParameters( [{key: "searchKey", value: "searchValue"}], [{key: "hashKey", value: "hashValue"}])`',
        params: [
          {
            type: "keyValueInputV2",
            name: "queryParams",
            props: {
              label: "Query parameters",
              emptyMessage: "No params",
            },
          },
          {
            type: "keyValueInputV2",
            name: "hashParams",
            props: {
              label: "Hash parameters",
              emptyMessage: "No params",
            },
          },
        ],
      },
    },
    debugger: {
      search: "",
      filterRules: [],
      initialSize: "default",
      searchEnabled: false,
      noSearchResults: false,
      debuggerTabs: {
        options: [
          {
            value: "Console",
            label: "Console",
          },
          {
            value: "Timeline",
            label: "Timeline",
          },
          {
            value: "State",
            label: "State",
          },
          {
            value: "Linting",
            label: "Linting",
          },
          {
            value: "Performance",
            label: "Performance",
          },
          {
            value: "DebugInfo",
            label: "Debug Info",
          },
        ],
      },
      selectedPluginId: "tbl_workflow_templates",
      pluginList: [
        {
          type: "section",
          id: "section-$globalSection",
          sectionName: "$globalSection",
          isFirstSection: true,
        },
        {
          type: "group",
          id: "group-$globalSection-queries",
          groupName: "queries",
          isFirstGroup: true,
        },
        {
          type: "plugin",
          id: "QUERY_WORKFLOW_FROM_API",
          pluginGroup: "queries",
        },
        {
          type: "plugin",
          id: "QUERY_WORKFLOW_TEMPLATES",
          pluginGroup: "queries",
        },
        {
          type: "group",
          id: "group-$globalSection-variables",
          groupName: "variables",
          isFirstGroup: false,
        },
        {
          type: "plugin",
          id: "var_mainPage",
          pluginGroup: "variables",
        },
        {
          type: "group",
          id: "group-$globalSection-globals",
          groupName: "globals",
          isFirstGroup: false,
        },
        {
          type: "plugin",
          id: "current_user",
          pluginGroup: "globals",
        },
        {
          type: "plugin",
          id: "localStorage",
          pluginGroup: "globals",
        },
        {
          type: "plugin",
          id: "retoolContext",
          pluginGroup: "globals",
        },
        {
          type: "plugin",
          id: "theme",
          pluginGroup: "globals",
        },
        {
          type: "plugin",
          id: "url",
          pluginGroup: "globals",
        },
        {
          type: "plugin",
          id: "viewport",
          pluginGroup: "globals",
        },
        {
          type: "group",
          id: "group-$globalSection-pages",
          groupName: "pages",
          isFirstGroup: false,
        },
        {
          type: "plugin",
          id: "Main",
          pluginGroup: "pages",
        },
        {
          type: "section",
          id: "section-Main",
          sectionName: "Main",
          isFirstSection: false,
        },
        {
          type: "group",
          id: "group-Main-components",
          groupName: "components",
          isFirstGroup: true,
        },
        {
          type: "plugin",
          id: "btn_load_workflow_templates",
          pluginGroup: "components",
        },
        {
          type: "plugin",
          id: "btn_load_workflow_templates2",
          pluginGroup: "components",
        },
        {
          type: "plugin",
          id: "tbl_workflow_templates",
          pluginGroup: "components",
        },
      ],
      stateContainer: {
        selectedPluginId: "tbl_workflow_templates",
        selectedCanvasPlugins: [],
        selectedDatasource: "QUERY_WORKFLOW_FROM_API",
        modelInitialized: true,
        showHiddenPlugins: false,
        sidebarPanelOpen: false,
        pluginIcon: "A() {}",
        isMultipageApp: true,
        isMobileApp: false,
        currentPage: "Main",

        pluginList: [
          "Main",
          "$main",
          "QUERY_WORKFLOW_TEMPLATES",
          "tbl_workflow_templates",
          "btn_load_workflow_templates",
          "var_mainPage",
          "btn_load_workflow_templates2",
          "QUERY_WORKFLOW_FROM_API",
          "theme",
          "current_user",
          "localStorage",
          "retoolContext",
          "viewport",
          "url",
        ],
        groups: {
          queries: ["QUERY_WORKFLOW_TEMPLATES", "QUERY_WORKFLOW_FROM_API"],
          functions: [],
          transformers: [],
          variables: ["var_mainPage"],
          components: ["tbl_workflow_templates", "btn_load_workflow_templates", "btn_load_workflow_templates2"],
          globals: ["theme", "current_user", "localStorage", "retoolContext", "viewport", "url"],
          settings: [],
          frames: [],
          "widget property": [],
          "widget output": [],
          screens: [],
          pages: ["Main"],
          instrumentation: [],
          workflows: [],
          "sync functions": [],
        },
        groupsBySection: {
          $globalSection: {
            queries: ["QUERY_WORKFLOW_TEMPLATES", "QUERY_WORKFLOW_FROM_API"],
            functions: [],
            transformers: [],
            variables: ["var_mainPage"],
            components: [],
            globals: ["theme", "current_user", "localStorage", "retoolContext", "viewport", "url"],
            settings: [],
            frames: [],
            "widget property": [],
            "widget output": [],
            screens: [],
            pages: ["Main"],
            instrumentation: [],
            workflows: [],
            "sync functions": [],
          },
          Main: {
            queries: [],
            functions: [],
            transformers: [],
            variables: [],
            components: ["tbl_workflow_templates", "btn_load_workflow_templates", "btn_load_workflow_templates2"],
            globals: [],
            settings: [],
            frames: [],
            "widget property": [],
            "widget output": [],
            screens: [],
            pages: [],
            instrumentation: [],
            workflows: [],
            "sync functions": [],
          },
        },

        groupsBySectionFlat: [
          {
            type: "section",
            id: "section-$globalSection",
            sectionName: "$globalSection",
            isFirstSection: true,
          },
          {
            type: "group",
            id: "group-$globalSection-queries",
            groupName: "queries",
            isFirstGroup: true,
          },
          {
            type: "plugin",
            id: "QUERY_WORKFLOW_FROM_API",
            pluginGroup: "queries",
          },
          {
            type: "plugin",
            id: "QUERY_WORKFLOW_TEMPLATES",
            pluginGroup: "queries",
          },
          {
            type: "group",
            id: "group-$globalSection-variables",
            groupName: "variables",
            isFirstGroup: false,
          },
          {
            type: "plugin",
            id: "var_mainPage",
            pluginGroup: "variables",
          },
          {
            type: "group",
            id: "group-$globalSection-globals",
            groupName: "globals",
            isFirstGroup: false,
          },
          {
            type: "plugin",
            id: "current_user",
            pluginGroup: "globals",
          },
          {
            type: "plugin",
            id: "localStorage",
            pluginGroup: "globals",
          },
          {
            type: "plugin",
            id: "retoolContext",
            pluginGroup: "globals",
          },
          {
            type: "plugin",
            id: "theme",
            pluginGroup: "globals",
          },
          {
            type: "plugin",
            id: "url",
            pluginGroup: "globals",
          },
          {
            type: "plugin",
            id: "viewport",
            pluginGroup: "globals",
          },
          {
            type: "group",
            id: "group-$globalSection-pages",
            groupName: "pages",
            isFirstGroup: false,
          },
          {
            type: "plugin",
            id: "Main",
            pluginGroup: "pages",
          },
          {
            type: "section",
            id: "section-Main",
            sectionName: "Main",
            isFirstSection: false,
          },
          {
            type: "group",
            id: "group-Main-components",
            groupName: "components",
            isFirstGroup: true,
          },
          {
            type: "plugin",
            id: "btn_load_workflow_templates",
            pluginGroup: "components",
          },
          {
            type: "plugin",
            id: "btn_load_workflow_templates2",
            pluginGroup: "components",
          },
          {
            type: "plugin",
            id: "tbl_workflow_templates",
            pluginGroup: "components",
          },
        ],
      },
    },
    stateContainer: {
      selectedCanvasPlugins: [],
      selectedDatasource: "QUERY_WORKFLOW_FROM_API",
      modelInitialized: true,
      showHiddenPlugins: false,
      sidebarPanelOpen: false,
      currentPage: "Main",

      dependentPluginsToDependentProperties: {},
      dependentPropertyToPluginProperties: {},
      dependencyPluginsToDependencyProperties: {
        QUERY_WORKFLOW_TEMPLATES: {},
      },
      dependencyPropertyToPluginProperties: {
        "QUERY_WORKFLOW_TEMPLATES.data": ["tbl_workflow_templates.data"],
      },
      highlightedDependentPlugins: null,
      highlightedDependencyPlugins: null,
    },
    statePropertyBrowser: {
      selectedPluginId: "tbl_workflow_templates",
      selectedCanvasPlugins: [],
      selectedDatasource: "QUERY_WORKFLOW_FROM_API",
      showSidebarDropdownMenu: false,
      dropdownOpen: false,
      pluginType: "TableWidget",
      hoverLabel: true,
      labelRendererDocs: {
        name: "Table",
        section: "Data",
        guidePath: "data/table",
      },
      noRootKey: true,
      propertyDependencies: {
        dependents: "{}",
        dependencies: {
          data: ["QUERY_WORKFLOW_TEMPLATES.data"],
        },
      },
      collectionLimit: 1000,
      currentHover: "",
      controllingPlugins: ["QUERY_WORKFLOW_TEMPLATES", "tbl_workflow_templates"],
      controlledByPlugins: ["tbl_workflow_templates"],

      pluginModel: {
        selectedRowKey: null,
        data: [],
        searchTerm: "",
        searchMode: "disabled",
        sortArray: [],
        heightType: "fixed",
        autoColumnWidth: false,
        caseSensitiveFiltering: false,
        selectedSourceRow: null,
        groupByColumns: [],
        overflowActionsOverlayMinWidth: null,
        hidden: false,
        margin: "4px 8px",
        selectedDataIndex: null,
        showInEditor: false,
        overflowActionsOverlayMaxHeight: null,
        events: {
          "0": {
            method: "trigger",
            targetId: null,
            pluginId: "QUERY_WORKFLOW_TEMPLATES",
            waitType: "debounce",
            event: "selectRow",
            type: "datasource",
            id: "7143129e",
            waitMs: 0,
          },
          "1": {
            id: "be7ab122",
            type: "widget",
            waitMs: 0,
            waitType: "debounce",
            event: "clickToolbar",
            method: "exportData",
            pluginId: "tbl_workflow_templates",
            targetId: "3c",
          },
          "2": {
            id: "68f733d8",
            type: "widget",
            waitMs: 0,
            waitType: "debounce",
            event: "clickToolbar",
            method: "refresh",
            pluginId: "tbl_workflow_templates",
            targetId: "4d",
          },
        },
        newRows: [],
        emptyMessage: "No rows found",
        id: "tbl_workflow_templates",
        overflowType: "scroll",
        selectedRow: null,
        maintainSpaceWhenHidden: false,
      },
    },
  },

  appModel: {
    values: {
      Main: {
        id: "Main",
        type: "screen",
        subtype: "Screen",
        resourceName: null,
        template: {
          title: "Page 1",
          urlSlug: "",
        },
        style: {},
        screen: null,
      },
      $main: {
        id: "$main",
        type: "frame",
        subtype: "Frame",
        resourceName: null,
        template: {
          type: "main",
          padding: "8px 12px",
        },
        style: {},
        screen: "Main",
      },
      QUERY_WORKFLOW_TEMPLATES: {
        id: "QUERY_WORKFLOW_TEMPLATES",
        type: "datasource",
        subtype: "WorkflowRun",
        resourceName: "WorkflowRun",
        template: {
          isFunction: false,
          workflowParams: [{ key: "wait", value: "0" }],
          workflowRunExecutionType: "sync",
          workflowRunBodyType: "json",
          headers: [],
          query: "",
          error: null,
          data: null,
          finished: null,
          isFetching: false,
          rawData: null,
          events: [],
          workflowId: null,
        },
        style: null,
        screen: null,
      },
      tbl_workflow_templates: {
        id: "tbl_workflow_templates",
        type: "widget",
        subtype: "TableWidget",
        resourceName: null,
        template: {
          selectedRowKey: null,
          heightType: "fixed",
          autoColumnWidth: false,
          selectedSourceRow: null,
          _currentPage: 0,
          hidden: false,
          disabled: false,
          data: "{{  QUERY_WORKFLOW_TEMPLATES.data }}",
          searchMode: "fuzzy",
          selectedDataIndex: null,
          selectedSourceRows: [],
          selectedRowKeys: [],
          selectedRows: [],
          events: [],
          emptyMessage: "No rows found",
          selectedDataIndexes: [],
          selectedRow: null,
        },
        style: {},
        screen: "Main",
      },
      btn_load_workflow_templates: {
        id: "btn_load_workflow_templates",
        type: "widget",
        subtype: "ButtonWidget",
        resourceName: null,
        template: {
          hidden: false,
          disabled: false,
          text: "Load Workflow Templates",
          tooltipText: "",
          allowWrap: true,
          variant: "solid",
          events: [
            {
              method: "reset",
              params: {},
              targetId: null,
              pluginId: "QUERY_WORKFLOW_TEMPLATES",
              waitType: "debounce",
              event: "click",
              type: "datasource",
              id: "7183814b",
              waitMs: "0",
            },
            {
              method: "trigger",
              params: {},
              targetId: null,
              pluginId: "QUERY_WORKFLOW_TEMPLATES",
              waitType: "debounce",
              event: "click",
              type: "datasource",
              id: "83354339",
              waitMs: "0",
            },
          ],
          loading: "{{ QUERY_WORKFLOW_TEMPLATES.isFetching ? true : false }}",
        },
        style: {},
        screen: "Main",
      },
      btn_load_workflow_reset: {
        id: "btn_load_workflow_reset",
        type: "widget",
        subtype: "ButtonWidget",
        resourceName: null,
        template: {
          hidden: false,
          disabled: false,
          text: "Reset",
          tooltipText: "",
          allowWrap: true,
          variant: "solid",
          events: [
            {
              method: "trigger",
              params: {
                options: {
                  onSuccess: null,
                  onFailure: null,
                  additionalScope: null,
                },
              },
              targetId: null,
              pluginId: "QUERY_WORKFLOW_TEMPLATES",
              waitType: "debounce",
              event: "click",
              type: "datasource",
              id: "7183814b",
              waitMs: "0",
            },
          ],
          loading: false,
        },
        style: {},
        screen: "Main",
      },
      var_mainPage: {
        id: "var_mainPage",
        type: "state",
        subtype: "State",
        resourceName: null,
        template: {
          value: {
            isPageLoaded: false,
            isWorkflowTemplateLoaded: false,
          },
        },
        style: null,
        screen: null,
      },
      QUERY_WORKFLOW_FROM_API: {
        id: "QUERY_WORKFLOW_FROM_API",
        type: "datasource",
        subtype: "RESTQuery",
        resourceName: "REST-WithoutResource",
        template: {
          isFunction: false,
          body: null,
          workflowParams: [{ key: "wait", value: "0" }],
          workflowRunExecutionType: "sync",
          workflowRunBodyType: "raw",
          headers: [],
          query: "https://end-point-host-here/run-workflow",
          error: null,
          data: null,
          finished: null,
          isFetching: false,
          rawData: null,
          workflowId: null,
          bodyType: "none",
        },
        style: null,
        screen: null,
      },

      current_user: {
        id: null,
        name: null,
        fullName: null,
        email: null,
        externalIdentifier: null,
      },
      urlparams: {
        href: null,
      },
      url: {
        href: null,
      },
      theme: {
        primary: "#3170f9",
        success: "#059669",
        mode: null,
        danger: "#dc2626",
        surfaceSecondary: "#ffffff",
        mediumElevation: "0 0 5px 1px rgba(0, 0, 0, 0.06)",
        lowElevation: "0 0 2px 1px rgba(0, 0, 0, 0.05)",
        info: "#3170f9",
        tertiary: "#3170f9",
        highlight: "#fde68a",
        secondary: "#3170f9",
        surfacePrimary: "#ffffff",
        canvas: "#f6f6f6",
        highElevation: "0 4px 16px 0 rgba(0, 0, 0, 0.12), 0 16px 32px 0 rgba(55, 55, 55, 0.08)",
        warning: "#cd6f00",
        borderRadius: "4px",
      },
      localStorage: {},

      sessionContext: {
        currentPage: "Main",
        appId: null,
        appName: null,
      },
    },
    errors: {},
    dependencyGraph: {
      cycleCheckingDeferred: false,
      depGraph: {
        nodeData: {},
        adjacencyList: {},
        adjacencyListReversed: {},
      },
      dependenciesOfCache: {},
      cachedTopologicalOrder: [],
      cachedTopologicalIndex: {},
      metaData: {},
      deferredDependencyChecks: [],
    },
    globals: {
      email: null,
      id: 177737,
      fullName: null,
      externalIdentifier: null,
    },
    modelInitialized: true,
    loadedPluginTypes: [],
    loadedScreens: [],
  },
  appTemplate: {
    appStyles: null,
    appThemeId: null,
    isFetching: false,
    pageCodeFolders: {
      Main: [],
    },
    preloadedAppJavaScript: null,
    preloadedAppJSLinks: [],
    rootScreen: "Main",
  },
  plugins: {
    Main: {
      id: "Main",
      type: "screen",
      subtype: "Screen",
      resourceName: null,
      template: {
        title: "Page 1",
        urlSlug: "",
      },
      style: {},
      screen: null,
    },
    $main: {
      id: "$main",
      type: "frame",
      subtype: "Frame",
      resourceName: null,
      template: {
        type: "main",
        padding: "8px 12px",
      },
      style: {},
      screen: "Main",
    },
    QUERY_WORKFLOW_TEMPLATES: {
      id: "QUERY_WORKFLOW_TEMPLATES",
      type: "datasource",
      subtype: "WorkflowRun",
      resourceName: "WorkflowRun",
      template: {
        isFunction: false,
        workflowParams: [{ key: "wait", value: "0" }],
        workflowRunExecutionType: "sync",
        workflowRunBodyType: "json",
        headers: [],
        query: "",
        error: null,
        data: null,
        finished: null,
        isFetching: false,
        rawData: null,
        events: [],
        workflowId: null,
      },
      style: null,
      screen: null,
    },
    tbl_workflow_templates: {
      id: "tbl_workflow_templates",
      type: "widget",
      subtype: "TableWidget",
      resourceName: null,
      template: {
        selectedRowKey: null,
        heightType: "fixed",
        autoColumnWidth: false,
        selectedSourceRow: null,
        _currentPage: 0,
        hidden: false,
        disabled: false,
        data: "{{  QUERY_WORKFLOW_TEMPLATES.data }}",
        searchMode: "fuzzy",
        selectedDataIndex: null,
        selectedSourceRows: [],
        selectedRowKeys: [],
        selectedRows: [],
        events: [],
        emptyMessage: "No rows found",
        selectedDataIndexes: [],
        selectedRow: null,
      },
      style: {},
      screen: "Main",
    },
    btn_load_workflow_templates: {
      id: "btn_load_workflow_templates",
      type: "widget",
      subtype: "ButtonWidget",
      resourceName: null,
      template: {
        hidden: false,
        disabled: false,
        text: "Load Workflow Templates",
        tooltipText: "",
        allowWrap: true,
        variant: "solid",
        events: [
          {
            method: "reset",
            params: {},
            targetId: null,
            pluginId: "QUERY_WORKFLOW_TEMPLATES",
            waitType: "debounce",
            event: "click",
            type: "datasource",
            id: "7183814b",
            waitMs: "0",
          },
          {
            method: "trigger",
            params: {},
            targetId: null,
            pluginId: "QUERY_WORKFLOW_TEMPLATES",
            waitType: "debounce",
            event: "click",
            type: "datasource",
            id: "83354339",
            waitMs: "0",
          },
        ],
        loading: "{{ QUERY_WORKFLOW_TEMPLATES.isFetching ? true : false }}",
      },
      style: {},
      screen: "Main",
    },
    btn_load_workflow_reset: {
      id: "btn_load_workflow_reset",
      type: "widget",
      subtype: "ButtonWidget",
      resourceName: null,
      template: {
        hidden: false,
        disabled: false,
        text: "Reset",
        tooltipText: "",
        allowWrap: true,
        variant: "solid",
        events: [
          {
            method: "trigger",
            params: {
              options: {
                onSuccess: null,
                onFailure: null,
                additionalScope: null,
              },
            },
            targetId: null,
            pluginId: "QUERY_WORKFLOW_TEMPLATES",
            waitType: "debounce",
            event: "click",
            type: "datasource",
            id: "7183814b",
            waitMs: "0",
          },
        ],
        loading: false,
      },
      style: {},
      screen: "Main",
    },
    var_mainPage: {
      id: "var_mainPage",
      type: "state",
      subtype: "State",
      resourceName: null,
      template: {
        value: {
          isPageLoaded: false,
          isWorkflowTemplateLoaded: false,
        },
      },
      style: null,
      screen: null,
    },
    QUERY_WORKFLOW_FROM_API: {
      id: "QUERY_WORKFLOW_FROM_API",
      type: "datasource",
      subtype: "RESTQuery",
      resourceName: "REST-WithoutResource",
      template: {
        isFunction: false,
        body: null,
        workflowParams: [{ key: "wait", value: "0" }],
        workflowRunExecutionType: "sync",
        workflowRunBodyType: "raw",
        headers: [],
        query: "https://end-point-host-here/run-workflow",
        error: null,
        data: null,
        finished: null,
        isFetching: false,
        rawData: null,
        workflowId: null,
        bodyType: "none",
      },
      style: null,
      screen: null,
    },
  },
  currentParams: {
    pageAppUrl: null,
  },
  currentScreen: "Main",
  screens: {},
  selectedId: "QUERY_WORKFLOW_FROM_API",

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
  resources: [],

  workspace: {
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
    databases: [],
    workflows: [],
    apps: [],
    currentApp: {},
  },
}

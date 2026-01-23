export const config = {
  global: {
    key: "global",
    defaults: {
      views: {
        columns: 10,
      },
      requestView: {
        title: "Request",
        open: true,
        colSpan: 2,
      },
      processView: {
        title: "Process",
        open: true,
        colSpan: 5,
      },
      responseView: {
        title: "Response",
        open: true,
        colSpan: 3,
      },
    },
  },
  store: {
    key: "store",
    defaults: {
      localStorage: {
        appId: "__json_playground__",
      },
    },
  },
  jsonViews: {
    preferences: {
      key: "preferences",
      defaults: {
        indent: 2,
      },
    },
  },
  jsonDoc: {
    key: "jsonDoc",
    defaults: {
      doc: {
        id: null,
        type: "raw",
        title: null,
        readOnly: false,
      },
      path: null,
      minimal: false,
      includeSchema: false,
    },
  },
  jsonSearch: {
    key: "jsonSearch",
    defaults: {
      status: "idle",
      query: null,
      results: [],
    },
  },
  jsonColumnView: {
    key: "jsonColumnView",
    defaults: {
      columns: [],
      selectedNodeId: null,
      selectedNodeSourceId: null,
      selectedPath: [],
      highlightedNodeId: null,
      highlightedPath: [],
      selectedNodes: [],
      canGoBack: false,
      canGoForward: false,
    },
  },
  jsonTree: {
    key: "jsonTree",
    defaults: {
      id: null,
      nodes: [],
      estimateSize: 32,
      overscan: 0,
      initialRect: {
        width: 800,
        height: 600,
      },
      persistState: true,
    },
  },
}
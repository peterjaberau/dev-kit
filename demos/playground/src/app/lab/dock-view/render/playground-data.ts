export const initialConfig: any = {
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
  global: {
    resizable: true,
    showActionsButton: true,
    showNewTabButton: true,
    resizeHandleHitSize: 24,
    minSize: 10,
  },
  options: {
    themeId: "light",
    makeTabPrefix: {
      id: "tab",
      title: "Tab",
    },
  },
}

export const PG_TAB_KINDS: string[] = ["editor", "terminal", "output", "files", "preview", "search", "notes"]

export const PG_KIND_LABEL: any = {
  editor: "Editor",
  terminal: "Terminal",
  output: "Output",
  files: "Files",
  preview: "Preview",
  search: "Search",
  notes: "Notes",
} as any

// ---------------------------------------------------------------------------
// Layouts + presets
// ---------------------------------------------------------------------------

const defaultLayout: any = {
  type: 'group',
  direction: 'horizontal',
  children: [
    {
      type: 'panel',
      id: 'sidebar',
      size: 24,
      tabs: [{ id: 'files', data: { title: 'Files', kind: 'files' } }],
    },
    {
      type: 'group',
      direction: 'vertical',
      size: 76,
      children: [
        {
          type: 'panel',
          id: 'editor',
          size: 68,
          activeTabId: 'main-ts',
          tabs: [
            { id: 'main-ts', data: { title: 'main.ts', kind: 'editor' } },
            { id: 'styles-css', data: { title: 'styles.css', kind: 'editor' } },
          ],
        },
        {
          type: 'panel',
          id: 'terminal',
          size: 32,
          tabs: [
            {
              id: 'terminal-tab',
              data: { title: 'Terminal', kind: 'terminal' },
            },
          ],
        },
      ],
    },
  ],
};

const ideLayout: any = {
  type: 'root',
  edges: {
    left: {
      type: 'edgePanel',
      id: 'edge-explorer',
      size: 20,
      tabs: [{ id: 'explorer', data: { title: 'Explorer', kind: 'files' } }],
    },
    bottom: {
      type: 'edgePanel',
      id: 'edge-output',
      size: 26,
      tabs: [
        { id: 'output', data: { title: 'Output', kind: 'output' } },
        { id: 'ide-terminal', data: { title: 'Terminal', kind: 'terminal' } },
      ],
    },
  },
  main: {
    type: 'group',
    direction: 'horizontal',
    children: [
      {
        type: 'panel',
        id: 'ide-editor',
        size: 64,
        activeTabId: 'ide-main',
        tabs: [
          { id: 'ide-main', data: { title: 'index.tsx', kind: 'editor' } },
          { id: 'ide-readme', data: { title: 'README.md', kind: 'notes' } },
        ],
      },
      {
        type: 'panel',
        id: 'ide-preview',
        size: 36,
        tabs: [
          {
            id: 'ide-preview-tab',
            data: { title: 'Preview', kind: 'preview' },
          },
        ],
      },
    ],
  },
};

const dashboardLayout: any = {
  type: 'group',
  direction: 'vertical',
  children: [
    {
      type: 'group',
      direction: 'horizontal',
      size: 50,
      children: [
        {
          type: 'panel',
          id: 'metrics',
          size: 50,
          tabs: [
            { id: 'metrics-tab', data: { title: 'Metrics', kind: 'preview' } },
          ],
        },
        {
          type: 'panel',
          id: 'traffic',
          size: 50,
          tabs: [
            { id: 'traffic-tab', data: { title: 'Traffic', kind: 'preview' } },
          ],
        },
      ],
    },
    {
      type: 'group',
      direction: 'horizontal',
      size: 50,
      children: [
        {
          type: 'panel',
          id: 'logs',
          size: 60,
          tabs: [{ id: 'logs-tab', data: { title: 'Logs', kind: 'output' } }],
        },
        {
          type: 'panel',
          id: 'activity',
          size: 40,
          tabs: [
            { id: 'activity-tab', data: { title: 'Activity', kind: 'notes' } },
          ],
        },
      ],
    },
  ],
};

const floatingLayout: any = {
  type: 'root',
  main: {
    type: 'group',
    direction: 'horizontal',
    children: [
      {
        type: 'panel',
        id: 'float-nav',
        size: 28,
        tabs: [{ id: 'float-files', data: { title: 'Files', kind: 'files' } }],
      },
      {
        type: 'panel',
        id: 'float-editor',
        size: 72,
        tabs: [{ id: 'float-main', data: { title: 'app.ts', kind: 'editor' } }],
      },
    ],
  },
  floating: [
    {
      type: 'floatingPanel',
      id: 'float-inspector',
      bounds: { x: 52, y: 14, width: 38, height: 48 },
      tabs: [
        {
          id: 'float-inspect-tab',
          data: { title: 'Inspector', kind: 'notes' },
        },
      ],
    },
  ],
};


const edgeLayout: any = {
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
}


// export const PG_DEFAULT_LAYOUT = defaultLayout;

export const PG_DEFAULT_LAYOUT = edgeLayout;

export const PG_PRESETS: any[] = [
  { id: 'default', label: 'Default', layout: defaultLayout },
  { id: 'ide', label: 'IDE + edges', layout: ideLayout },
  { id: 'dashboard', label: 'Dashboard', layout: dashboardLayout },
  { id: 'floating', label: 'Floating', layout: floatingLayout },
];

// ---------------------------------------------------------------------------
// Theme presets (reused from the Themes example; proven --view-* sets)
// ---------------------------------------------------------------------------


const pageAccentVars: any = {
  '--view-accent': 'var(--site-workspace-accent)',
  '--view-drop-bg':
    'color-mix(in srgb, var(--site-workspace-accent), transparent 84%)',
  '--view-drop-border':
    'color-mix(in srgb, var(--site-workspace-accent), transparent 42%)',
  '--view-resize-handle-active-bg':
    'color-mix(in srgb, var(--site-workspace-accent), transparent 40%)',
};

export const PG_THEMES: any[] = [
  {
    id: 'default',
    label: 'Default',
    style: { colorScheme: 'dark', ...pageAccentVars },
  },
  {
    id: 'light',
    label: 'Light',
    style: {
      colorScheme: 'light',
      '--view-bg': '#f4f6fb',
      '--view-fg': '#1f2937',
      '--view-panel-bg': '#ffffff',
      '--view-panel-border': '#d8dee8',
      '--view-tabbar-bg': '#edf1f7',
      '--view-tab-fg': '#667085',
      '--view-tab-active-bg': '#ffffff',
      '--view-tab-active-fg': '#111827',
      '--view-tab-hover-bg': '#e2e8f2',
      '--view-menu-bg': '#ffffff',
      '--view-action-hover-bg': '#e5ebf4',
      ...pageAccentVars,
    },
  },
  {
    id: 'dracula',
    label: 'Dracula',
    style: {
      colorScheme: 'dark',
      '--view-bg': '#191a21',
      '--view-fg': '#f8f8f2',
      '--view-panel-bg': '#282a36',
      '--view-panel-border': '#44475a',
      '--view-tabbar-bg': '#21222c',
      '--view-tab-fg': '#bdc0d6',
      '--view-tab-active-bg': '#343746',
      '--view-tab-active-fg': '#ffffff',
      '--view-tab-hover-bg': '#303241',
      '--view-menu-bg': '#282a36',
      '--view-action-hover-bg': '#3a3d4f',
      ...pageAccentVars,
    },
  },
  {
    id: 'replit',
    label: 'Replit',
    style: {
      colorScheme: 'dark',
      '--view-bg': '#0e1525',
      '--view-fg': '#f5f9fc',
      '--view-panel-bg': '#1c2333',
      '--view-panel-border': '#30394f',
      '--view-tabbar-bg': '#131b2c',
      '--view-tab-fg': '#a5adba',
      '--view-tab-active-bg': '#20283a',
      '--view-tab-active-fg': '#ffffff',
      '--view-tab-hover-bg': '#26314a',
      '--view-menu-bg': '#1c2333',
      '--view-action-hover-bg': '#2a344a',
      ...pageAccentVars,
    },
  },
  {
    id: 'abyss',
    label: 'Abyss',
    style: {
      colorScheme: 'dark',
      '--view-bg': '#000c18',
      '--view-fg': '#d7ecff',
      '--view-panel-bg': '#001b33',
      '--view-panel-border': '#123a58',
      '--view-tabbar-bg': '#001426',
      '--view-tab-fg': '#8db9d6',
      '--view-tab-active-bg': '#002440',
      '--view-tab-active-fg': '#f4fbff',
      '--view-tab-hover-bg': '#052b4a',
      '--view-menu-bg': '#02243f',
      '--view-action-hover-bg': '#0b3555',
      ...pageAccentVars,
    },
  },
];

// ---------------------------------------------------------------------------
// Snapshot helpers
// ---------------------------------------------------------------------------


/** Flattened, inspector-friendly view of one panel from a snapshot. */

function isRoot(snapshot: any) {
  return (snapshot as { type?: string }).type === 'root';
}

function toEntry(node: any, container: any, kindLabel: string): any {
  return {
    id: node.id ?? "",
    container,
    kindLabel,
    resizable: node.resizable,
    draggable: node.draggable,
    droppable: node.droppable,
    fullScreen: node.fullScreen ?? false,
    poppedOut: container === "floating" && !!node.popout,
    minSize: node.minSize,
    maxSize: node.maxSize,
    tabs: node.tabs
      .filter((tab: any) => typeof tab.id === "string")
      .map((tab: any) => ({
        id: tab.id as string,
        title: tab.data.title,
        kind: tab.data.kind,
        closable: tab.closable,
        draggable: tab.draggable,
      })),
  }
}

function walkDocked(node: any, out: any[]): void {
  if (node.type === "panel") {
    out.push(toEntry(node, "tiled", "Tiled"))
  } else if (node.type === "group") {
    for (const child of node.children) walkDocked(child, out)
  }
}

/** All panels in a snapshot as flat entries: main tree, then edges, then floating. */
export function collectPanels(snapshot: any): any[] {
  const out: any[] = []
  if (isRoot(snapshot)) {
    walkDocked(snapshot.main, out)
    if (snapshot.edges) {
      for (const side of Object.keys(snapshot.edges) as any[]) {
        const panel = snapshot.edges[side]
        if (panel) out.push(toEntry(panel, "edge", `Edge · ${side}`))
      }
    }
    for (const panel of snapshot.floating) {
      out.push(toEntry(panel, "floating", "Floating"))
    }
  } else {
    walkDocked(snapshot, out)
  }
  return out.filter((entry) => entry.id !== "")
}

function findDocked(node: any, id: string): any | null {
  if (node.type === "panel") return node.id === id ? node : null
  if (node.type === "group") {
    for (const child of node.children) {
      const found = findDocked(child, id)
      if (found) return found
    }
  }
  return null
}

/** Locate a mutable panel node in a snapshot by id (or null). */
export function findPanelNode(snapshot: any, id: string): any | null {
  if (isRoot(snapshot)) {
    const main = findDocked(snapshot.main, id)
    if (main) return main
    if (snapshot.edges) {
      for (const side of Object.keys(snapshot.edges) as any[]) {
        const panel = snapshot.edges[side]
        if (panel?.id === id) return panel
      }
    }
    return snapshot.floating.find((panel: any) => panel.id === id) ?? null
  }
  return findDocked(snapshot, id)
}


/** Mutate a snapshot in place, patching one panel's behavior/size. Returns true if found. */
export function patchPanelInSnapshot(snapshot: any, id: string, patch: any): boolean {
  const node = findPanelNode(snapshot, id)
  if (!node) return false
  if (patch.resizable !== undefined) node.resizable = patch.resizable
  if (patch.draggable !== undefined) node.draggable = patch.draggable
  if (patch.droppable !== undefined) node.droppable = patch.droppable
  if (patch.minSize !== undefined) {
    if (patch.minSize === null) delete node.minSize
    else node.minSize = patch.minSize
  }
  if (patch.maxSize !== undefined) {
    if (patch.maxSize === null) delete node.maxSize
    else node.maxSize = patch.maxSize
  }
  return true
}

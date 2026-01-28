const constants = {
  THEME_STORAGE_KEY: "editorx-theme",
}

export const schema = {
  FileLanguage: {
    type: "string",
    enum: ["javascript", "typescript", "html", "css", "json", "markdown", "python", "rust", "go", "plaintext"],
  },

  FolderNode: {
    type: "object",
    required: ["id", "name", "path", "type", "parentId"],
    properties: {
      id: { type: "string" },
      name: { type: "string" },
      path: { type: "string" },
      type: { const: "folder" },
      parentId: { type: ["string", "null"] },
      isExpanded: { type: "boolean" },
    },
    additionalProperties: false,
  },

  FileSystemNode: {
    oneOf: [{ $ref: "#/FileNode" }, { $ref: "#/FolderNode" }],
  },

  Project: {
    type: "object",
    required: ["id", "name", "createdAt", "updatedAt", "rootFolderId", "nodes"],
    properties: {
      id: { type: "string" },
      name: { type: "string" },
      description: { type: "string" },
      createdAt: { type: "string", format: "date-time" },
      updatedAt: { type: "string", format: "date-time" },
      rootFolderId: { type: "string" },
      nodes: {
        type: "object",
        additionalProperties: {
          $ref: "#/FileSystemNode",
        },
      },
    },
    additionalProperties: false,
  },

  EditorTab: {
    type: "object",
    required: ["id", "fileId", "fileName", "filePath", "isDirty"],
    properties: {
      id: { type: "string" },
      fileId: { type: "string" },
      fileName: { type: "string" },
      filePath: { type: "string" },
      isDirty: { type: "boolean" },
      isPinned: { type: "boolean" },
    },
    additionalProperties: false,
  },

  LayoutMode: {
    type: "string",
    enum: ["single", "vertical-split", "horizontal-split", "grid"],
  },

  EditorPane: {
    type: "object",
    required: ["id", "activeTabId", "tabIds"],
    properties: {
      id: { type: "string" },
      activeTabId: { type: ["string", "null"] },
      tabIds: {
        type: "array",
        items: { type: "string" },
      },
    },
    additionalProperties: false,
  },

  EditorSettings: {
    type: "object",
    required: [
      "theme",
      "fontSize",
      "fontFamily",
      "tabSize",
      "lineNumbers",
      "wordWrap",
      "minimap",
      "bracketPairColorization",
      "autoSave",
      "autoSaveDelay",
    ],
    properties: {
      theme: {
        type: "string",
        enum: ["light", "dark", "system"],
      },
      fontSize: { type: "number" },
      fontFamily: { type: "string" },
      tabSize: { type: "number" },
      lineNumbers: { type: "boolean" },
      wordWrap: { type: "boolean" },
      minimap: { type: "boolean" },
      bracketPairColorization: { type: "boolean" },
      autoSave: { type: "boolean" },
      autoSaveDelay: { type: "number" },
    },
    additionalProperties: false,
  },

  PanelId: {
    type: "string",
    enum: ["files", "search", "git", "extensions", "ai-chat", "output", "terminal", "problems", "debug"],
  },

  Panel: {
    type: "object",
    required: ["id", "title", "icon", "isVisible", "position"],
    properties: {
      id: { $ref: "#/PanelId" },
      title: { type: "string" },
      icon: { type: "string" },
      isVisible: { type: "boolean" },
      position: {
        type: "string",
        enum: ["left", "right", "bottom"],
      },
    },
    additionalProperties: false,
  },

  TerminalSession: {
    type: "object",
    required: ["id", "name", "cwd", "isActive"],
    properties: {
      id: { type: "string" },
      name: { type: "string" },
      cwd: { type: "string" },
      isActive: { type: "boolean" },
    },
    additionalProperties: false,
  },

  TerminalOutput: {
    type: "object",
    required: ["id", "sessionId", "type", "content", "timestamp"],
    properties: {
      id: { type: "string" },
      sessionId: { type: "string" },
      type: {
        type: "string",
        enum: ["input", "output", "error"],
      },
      content: { type: "string" },
      timestamp: { type: "string", format: "date-time" },
    },
    additionalProperties: false,
  },

  MessageRole: {
    type: "string",
    enum: ["user", "assistant", "system"],
  },

  CodeBlock: {
    type: "object",
    required: ["id", "language", "code"],
    properties: {
      id: { type: "string" },
      language: { $ref: "#/FileLanguage" },
      code: { type: "string" },
      fileName: { type: "string" },
    },
    additionalProperties: false,
  },

  ChatMessage: {
    type: "object",
    required: ["id", "role", "content", "timestamp"],
    properties: {
      id: { type: "string" },
      role: { $ref: "#/MessageRole" },
      content: { type: "string" },
      timestamp: { type: "string", format: "date-time" },
      codeBlocks: {
        type: "array",
        items: { $ref: "#/CodeBlock" },
      },
      isStreaming: { type: "boolean" },
    },
    additionalProperties: false,
  },

  ChatSession: {
    type: "object",
    required: ["id", "title", "messages", "createdAt", "updatedAt"],
    properties: {
      id: { type: "string" },
      title: { type: "string" },
      messages: {
        type: "array",
        items: { $ref: "#/ChatMessage" },
      },
      createdAt: { type: "string", format: "date-time" },
      updatedAt: { type: "string", format: "date-time" },
    },
    additionalProperties: false,
  },

  FileTreeItem: {
    type: "object",
    required: ["id", "name", "path", "type", "parentId"],
    properties: {
      id: { type: "string" },
      name: { type: "string" },
      type: { type: "string", enum: ["file", "folder"] },
      language: { $ref: "#/FileLanguage" },
      children: {
        type: "array",
        items: { $ref: "#/FileTreeItem" },
      },
    },
  },

  Theme: {
    type: "string",
    enum: ["light", "dark", "system"],
  },

  TemplateIcon: {
    type: "string",
    enum: ["react", "javascript", "typescript", "html", "python", "nodejs", "file"],
  },

  TemplateFolder: {
    type: "object",
    required: ["name", "path"],
    properties: {
      name: { type: "string" },
      path: { type: "string" },
      parentPath: { type: "string" },
    },
    additionalProperties: false,
  },

  ProjectProviderProps: {
    type: "object",
    required: ["children"],
    properties: {
      children: {},
    },
    additionalProperties: false,
  },

  SettingsProviderProps: {
    type: "object",
    required: ["children"],
    properties: {
      children: {},
    },
    additionalProperties: false,
  },

  ThemeProviderProps: {
    type: "object",
    required: ["children"],
    properties: {
      children: {},
      defaultTheme: { $ref: "#/Theme" },
    },
    additionalProperties: false,
  },

  FileNode: {
    type: "object",
    properties: {
      id: { type: "string" },
      name: { type: "string" },
      path: { type: "string" },
      type: { const: "file" },
      language: { $ref: "#/FileLanguage" },
      content: { type: "string" },
      parentId: { type: ["string", "null"] },
    },
    additionalProperties: false,
  },
  AppState: {
    type: "object",
    required: [
      "projects",
      "currentProjectId",
      "tabs",
      "activeTabId",
      "layoutMode",
      "panes",
      "panels",
      "activeSidebarPanel",
      "activeBottomPanel",
      "isSidebarCollapsed",
      "isBottomPanelCollapsed",
      "isRightPanelCollapsed",
      "settings",
      "isCommandPaletteOpen",
      "theme",
    ],
    properties: {
      projects: {
        type: "array",
        items: { $ref: "#/Project" },
      },
      currentProjectId: { type: ["string", "null"] },
      tabs: {
        type: "array",
        items: { $ref: "#/EditorTab" },
      },
      activeTabId: { type: ["string", "null"] },
      layoutMode: { $ref: "#/LayoutMode" },
      panes: {
        type: "array",
        items: { $ref: "#/EditorPane" },
      },
      panels: {
        type: "array",
        items: { $ref: "#/Panel" },
      },
      activeSidebarPanel: {
        anyOf: [{ $ref: "#/PanelId" }, { type: "null" }],
      },
      activeBottomPanel: {
        anyOf: [{ $ref: "#/PanelId" }, { type: "null" }],
      },
      isSidebarCollapsed: { type: "boolean" },
      isBottomPanelCollapsed: { type: "boolean" },
      isRightPanelCollapsed: { type: "boolean" },
      settings: { $ref: "#/EditorSettings" },
      isCommandPaletteOpen: { type: "boolean" },
      theme: {
        type: "string",
        enum: ["light", "dark"],
      },
    },
    additionalProperties: false,
  },
  TemplateFile: {
    type: "object",
    required: ["name", "path", "language", "content"],
    properties: {
      name: { type: "string" },
      path: { type: "string" },
      language: { $ref: "#/FileLanguage" },
      content: { type: "string" },
      parentPath: { type: "string" },
    },
    additionalProperties: false,
  },
  ProjectTemplate: {
    type: "object",
    required: ["id", "name", "description", "icon", "category", "files", "folders"],
    properties: {
      id: { type: "string" },
      name: { type: "string" },
      description: { type: "string" },
      icon: { $ref: "#/TemplateIcon" },
      category: {
        type: "string",
        enum: ["frontend", "backend", "fullstack", "other"],
      },
      files: {
        type: "array",
        items: { $ref: "#/TemplateFile" },
      },
      folders: {
        type: "array",
        items: { $ref: "#/TemplateFolder" },
      },
    },
    additionalProperties: false,
  },
  ProjectContextValue: {
    type: "object",
    required: ["projects", "currentProject", "isLoading", "error"],
    properties: {
      projects: {
        type: "array",
        items: { $ref: "#/Project" },
      },
      currentProject: {
        anyOf: [{ $ref: "#/Project" }, { type: "null" }],
      },
      isLoading: { type: "boolean" },
      error: { type: ["string", "null"] },
    },
    additionalProperties: false,
  },
  SettingsContextValue: {
    type: "object",
    required: ["settings"],
    properties: {
      settings: { $ref: "#/EditorSettings" },
    },
    additionalProperties: false,
  },
  ThemeContextValue: {
    type: "object",
    required: ["theme", "resolvedTheme"],
    properties: {
      theme: { $ref: "#/Theme" },
      resolvedTheme: {
        type: "string",
        enum: ["light", "dark"],
      },
    },
    additionalProperties: false,
  },
}

export const configDefaults = {
  settings: {
    theme: "light",
    fontSize: 14,
    fontFamily: '"JetBrains Mono", "Fira Code", monospace',
    tabSize: 2,
    lineNumbers: true,
    wordWrap: false,
    minimap: false,
    bracketPairColorization: true,
    autoSave: true,
    autoSaveDelay: 1000,
  },
}

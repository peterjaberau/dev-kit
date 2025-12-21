export const dockViewAdapterConfig = {
  nodes: [
    {
      id: "panel__1",
      view: {
        type: 'DOCK_PANEL',
        component: "dynamic",
        title: "Panel - 1",
        renderer: "always",
      },
      model: {}
    },
    {
      id: "panel__2",
      view: {
        type: 'DOCK_PANEL',
        component: "default",
        title: "Panel - 2",
        renderer: "always",
        position: { referencePanel: "panel__1", direction: "right" },
      },
      model: {}
    },
    {
      id: "panel__3",
      view: {
        type: 'DOCK_PANEL',
        component: "default",
        title: "Panel - 3",
        renderer: "always",
        position: { referencePanel: "panel__2", direction: "right" },
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
            { id: "json-tree-renderer", name: "Json Tree Renderer" },
            { id: "tree-view-pro", name: "Tree View Pro" },
            { id: "json-tree-view-react", name: "Json Tree View React" },
            { id: "ai-chat", name: "AI Chat" },
            { id: "code", name: "Code" },
            { id: "default", name: "Default", disabled: true },
            { id: "empty", name: "empty" },
            { id: "json-viewer", name: "Json Viewer" },
            { id: "placeholder", name: "Placeholder" },
            { id: "renderer", name: "Renderer" },
            { id: "json-viewer-custom", name: "Json Viewer Custom" },
            { id: "canvas-illa", name: "Canvas Illa" },
            { id: "recursive", name: "Recursive" },
            { id: "oas-manager", name: "OAS Manager" },
            { id: "oas", name: "OAS" },
            { id: "oas-doc", name: "OAS Doc" },
            { id: "oas-json-viewer", name: "OAS Json Viewer" },
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




export const dockViewCanvasIllaConfig: any = {
  config: {
    openLeftPanel: true,
    mode: "edit",
    openBottomPanel: true,
    openRightPanel: true,
    openDebugger: false,
    selectedComponents: ["panel_1"],
    selectedAction: null,
    cachedAction: null,
    showDot: false,
    expandedKeys: [],
    isOnline: true,
    hoveredComponents: [],
    expandedWidgets: {},
    wsStatus: {
      DASHBOARD: "INIT",
      APP: "CONNECTED",
      APP_BINARY: "CONNECTED",
      AI_AGENT: "INIT",
    },
    draggingComponentIDs: [],
    resizingComponentIDs: [],
  },
  currentApp: {
    components: {
      root: {
        displayName: "root",
        parentNode: "",
        childrenNode: ["dock_view_1"],
        type: "DOT_PANEL",
        props: {},
      },

      dock_view_1: {
        displayName: "Dock View 1",
        parentNode: "root",
        childrenNode: ["panel_1", "panel_2", "panel_3"],
        type: "DOCK_VIEW_WIDGET",
        props: {},
      },
      panel_1: {
        displayName: "Panel 1",
        parentNode: "dock_view_1",
        childrenNode: ["button_1"],
        type: "DOCK_VIEW_PANEL_WIDGET",
        props: {
          title: "Panel 1",
          renderer: "always",
        },
      },
      panel_2: {
        displayName: "Panel 2",
        parentNode: "dock_view_1",
        childrenNode: ["button_2"],
        type: "DOCK_VIEW_PANEL_WIDGET",
        props: {
          title: 'Panel 2',
          renderer: "always",
          position: { referencePanel: "panel_1", direction: "right" },
        },
      },
      panel_3: {
        displayName: "Panel 3",
        parentNode: "dock_view_1",
        childrenNode: ["button_3"],
        type: "DOCK_VIEW_PANEL_WIDGET",
        props: {
          title: 'Panel 3',
          renderer: "always",
          position: { referencePanel: "panel_2", direction: "right" },
        },
      },

      button_1: {
        displayName: "Button 1",
        parentNode: "panel_1",
        childrenNode: [],
        type: "BUTTON_WIDGET",
        props: {
          $dynamicAttrPaths: ["text"],
          variant: "solid",
          size: "sm",
          text: "{{currentUserInfo.userID}}",
        },
      },
      button_2: {
        displayName: "Button 2",
        parentNode: "panel_2",
        childrenNode: [],
        type: "BUTTON_WIDGET",
        props: {
          $dynamicAttrPaths: ["text"],
          variant: "outline",
          size: "sm",
          text: "{{currentUserInfo.userID}}",
        },
      },
      button_3: {
        displayName: "Button 3",
        parentNode: "panel_3",
        childrenNode: [],
        type: "BUTTON_WIDGET",
        props: {
          $dynamicAttrPaths: ["text"],
          variant: "ghost",
          size: "sm",
          text: "{{currentUserInfo.userID}}",
        },
      },
    },
    action: [],
    appInfo: {
      appId: "app_dock_view_1",
      uid: "b64ff14c-3a60-4925-883a-76d85e99d619",
      teamID: "",
      appName: "app_dock_view",
      deployed: true,
      config: {
        public: false,
        waterMark: true,
        description: "",
        publishedToMarketplace: false,
        publishWithAIAgent: false,
        cover: "",
        appType: "pc",
        components: ["BUTTON_WIDGET", "DOCK_VIEW_WIDGET", "DOCK_VIEW_PANEL_WIDGET"],
        actions: [],
      },
      updatedBy: "",
      updatedAt: "",
      appActivity: {},
      editedBy: [],
    },
    collaborators: {},

    execution: {
      dependencies: {
        "button_1.text": ["currentUserInfo.userID"],
        "button_2.text": ["currentUserInfo.userID"],
        "button_3.text": ["currentUserInfo.userID"],
      },
      result: {
        root: {
          displayName: "root",
          $parentNode: "",
          $type: "WIDGET",
          $widgetType: "DOT_PANEL",
          $childrenNode: ["dock_view_1"],
        },
        dock_view_1: {
          displayName: "Dock View 1",
          $parentNode: "root",
          $type: "WIDGET",
          $widgetType: "PAGE_NODE",
          $childrenNode: ["panel_1", "panel_2", "panel_3"],
          $parentPageName: "dock_view_1",
        },
        panel_1: {
          displayName: "Panel 1",
          $parentNode: "dock_view_1",
          $type: "WIDGET",
          $widgetType: "SECTION_NODE",
          $childrenNode: [],
          $parentPageName: "page1",
        },
        panel_2: {
          displayName: "Panel 1",
          $parentNode: "dock_view_1",
          $type: "WIDGET",
          $widgetType: "SECTION_NODE",
          $childrenNode: [],
          $parentPageName: "page1",
        },
        panel_3: {
          displayName: "Panel 1",
          $parentNode: "dock_view_1",
          $type: "WIDGET",
          $widgetType: "SECTION_NODE",
          $childrenNode: [],
          $parentPageName: "page1",
        },
        button_1: {
          $dynamicAttrPaths: ["text"],
          hidden: false,
          text: "ILAfx4p1C7dZ",
          variant: "solid",
          size: "sm",
          displayName: "Button 1",
          $type: "WIDGET",
          $widgetType: "BUTTON_WIDGET",
          $parentNode: "panel_1",
          $childrenNode: [],
        },
        button_2: {
          $dynamicAttrPaths: ["text"],
          hidden: false,
          text: "ILAfx4p1C7dZ",
          variant: "solid",
          size: "sm",
          displayName: "Button 2",
          $type: "WIDGET",
          $widgetType: "BUTTON_WIDGET",
          $parentNode: "panel_2",
          $childrenNode: [],
        },
        button_3: {
          $dynamicAttrPaths: ["text"],
          hidden: false,
          text: "ILAfx4p1C7dZ",
          variant: "solid",
          size: "sm",
          displayName: "Button 3",
          $parentNode: "panel_3",
          $type: "WIDGET",
          $widgetType: "BUTTON_WIDGET",
          $childrenNode: [],
        },

        currentUserInfo: {
          userID: "ILAfx4p1C7dZ",
          nickname: "root",
          email: "root",
          language: "en-US",
          createdAt: "2025-08-20T00:20:06.088056Z",
          updatedAt: "2025-08-20T00:29:59.556997Z",
        },
        globalData: {
          $dynamicAttrPaths: [],
        },
        localStorage: {},
      },
      error: {},
      independencies: {},
    },
    cursor: {},
    dragShadow: {},
    layoutInfo: {
      widgetsLayoutInfo: {
        root: {
          displayName: "root",
          parentNode: "",
          widgetType: "DOT_PANEL",
          childrenNode: ["dock_view_1"],
          containerType: "EDITOR_DOT_PANEL",
        },

        dock_view_1: {
          displayName: "Dock View 1",
          parentNode: "root",
          childrenNode: ["panel_1", "panel_2", "panel_3"],
          widgetType: "DOCK_VIEW_WIDGET",
        },
        panel_1: {
          displayName: "Panel 1",
          parentNode: "dock_view_1",
          childrenNode: ["button_1"],
          widgetType: "DOCK_VIEW_PANEL_WIDGET",
        },
        panel_2: {
          displayName: "Panel 2",
          parentNode: "dock_view_1",
          childrenNode: ["button_2"],
          widgetType: "DOCK_VIEW_PANEL_WIDGET",
        },
        panel_3: {
          displayName: "Panel 3",
          parentNode: "dock_view_1",
          childrenNode: ["button_3"],
          widgetType: "DOCK_VIEW_PANEL_WIDGET",
        },

        button_1: {
          displayName: "Button 1",
          parentNode: "panel_1",
          childrenNode: [],
          widgetType: "BUTTON_WIDGET",
        },
        button_2: {
          displayName: "Button 2",
          parentNode: "panel_2",
          childrenNode: [],
          widgetType: "BUTTON_WIDGET",
        },
        button_3: {
          displayName: "Button 3",
          parentNode: "panel_3",
          childrenNode: [],
          widgetType: "BUTTON_WIDGET",
        },
      },
    },
  },
  currentAppHistory: {
    snapshotList: [],
    totalPages: 0,
    currentPage: 0,
    hasMore: false,
  },
  builderInfo: {
    version: "0.0.1",
    language: "English",
  },
  resource: [],
  guide: {
    currentStep: 0,
    isOpen: false,
  },
  currentUser: {
    userID: "user_id_1",
    uid: "158504d6-a47d-43a0-879e-79a57981cecc",
    nickname: "root_user",
    email: "root_user@domain.com",
    avatar: "",
    language: "en-US",
    isTutorialViewed: true,
  },
  team: {
    currentId: "current_team_id_1",
    items: [
      {
        id: "current_team_id_1",
        uid: "83cfb484-0a3f-4bfd-aab3-70432d021cab",
        name: "Team 1",
        identifier: "0",
        icon: "",
        myRole: 1,
        teamMemberID: "user_id_1",
        teamMemberPermission: {
          config: 0,
        },
        permission: {
          allowEditorInvite: true,
          allowViewerInvite: true,
          allowEditorManageTeamMember: true,
          allowViewerManageTeamMember: true,
          inviteLinkEnabled: true,
          blockRegister: false,
        },
      },
    ],
  },
  aiAgent: {
    list: [],
  },
}

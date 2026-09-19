import { setup, assign, enqueueActions, fromCallback, emit } from "xstate"

export const dockviewMachine = setup({
  actors: {
    observeDockview: fromCallback(({ input, sendBack }: any) => {
      const disposables = [
        input.onDidAddPanel((panel: any) => sendBack({ type: "onDidAddPanel", params: { panelId: panel.id } })),
        input.onDidRemovePanel((panel: any) => sendBack({ type: "onDidRemovePanel", params: { panelId: panel.id } })),
        input.onDidActivePanelChange((event: any) =>
          sendBack({ type: "onDidActivePanelChange", params: { panelId: event.panel?.id } }),
        ),
        input.onDidAddGroup((group: any) => sendBack({ type: "onDidAddGroup", params: { groupId: group.id } })),
        input.onDidRemoveGroup((group: any) => sendBack({ type: "onDidRemoveGroup", params: { groupId: group.id } })),
        input.onDidActiveGroupChange((group: any) =>
          sendBack({ type: "onDidActiveGroupChange", params: { groupId: group?.id } }),
        ),
        input.onDidMovePanel((event: any) => sendBack({ type: "onDidMovePanel", params: { panelId: event.panel.id } })),
        input.onDidMaximizedGroupChange((event: any) =>
          sendBack({
            type: "onDidMaximizedGroupChange",
            params: { groupId: event.group.id, isMaximized: event.isMaximized },
          }),
        ),
      ]
      return () => disposables.forEach((disposable) => disposable.dispose())
    }),
  },
  actions: {
    emitChanges: emit((_, params: any) => ({ type: "dockview.changed", params })),
    loadLayout: enqueueActions(({ context, event, enqueue }: any) => {
      const { data, fallback } = event.params
      const apply = (value: any) => {
        if (!value) throw new Error("No Dockview layout provided")
        const layout = JSON.parse(JSON.stringify(value))
        for (const panel of Object.values(layout.panels ?? {}) as any) {
          if (panel.contentComponent === "instance") panel.contentComponent = "view"
          if (panel.params?.instanceId && !panel.params.viewId) {
            panel.params.viewId = panel.params.instanceId
            delete panel.params.instanceId
          }
        }
        context.api!.fromJSON(layout)
      }
      let usedFallback = false
      try {
        apply(data)
      } catch (error) {
        if (data === fallback) throw error
        apply(fallback)
        usedFallback = true
      }
      enqueue.raise({ type: "onLayoutLoaded", params: { usedFallback } })
    }),
    initializeTabContextMenu: assign(({ context }) => ({
      menus: {
        ...context.menus,
        tab: [
          "separator",
          "close",
          "closeOthers",
          "closeAll",
          "closeLeft",
          "closeRight",
          "separator",
          "maximize",
          "separator",
          { kind: "overflow", mode: "dropdown" },
          { kind: "overflow", mode: "wrap" },
          "separator",
          { kind: "docking" },
          "separator",
          { kind: "membership", createLabel: "Add to new group", prompt: "Group name:" },
        ],
      },
    })),
    initializeTabGroupContextMenu: assign(({ context }) => ({
      menus: {
        ...context.menus,
        tabGroup: [
          "rename",
          "colorPicker",
          "collapse",
          "close",
          "separator",
          { kind: "command", label: "Float group", eventType: "onFloatGroup" },
          { kind: "command", label: "Popout group", eventType: "onPopoutGroup" },
          "separator",
          { kind: "command", label: "Dissolve group", eventType: "onDissolveTabGroup" },
        ],
      },
    })),

    setApi: assign(({ event }) => ({ api: event.params.api })),
    applyOptions: ({ context }) => context.api?.updateOptions(context.options),
    toggleDndCompass: assign(({ context }) => ({
      options: { ...context.options, dndCompass: !context.options.dndCompass },
    })),
    setOverflow: assign(({ context, event }) => ({
      options: {
        ...context.options,
        overflow: {
          ...context.options.overflow,
          ...event.params,
          mode: event.params?.mode === "wrap" ? "wrap" : "dropdown",
        },
      },
    })),
    addPanelToTabGroup: ({ context, event }) => {
      context.api?.addPanelToTabGroup(event.params)
    },
    removePanelFromTabGroup: ({ context, event }) => {
      context.api?.removePanelFromTabGroup(event.params)
    },
    createTabGroupForPanel: ({ context, event }) => {
      const api = context.api
      if (!api) return
      const { groupId, panelId, label } = event.params
      const colors = api.tabGroupColors
      const color = colors[Math.floor(Math.random() * colors.length)]?.id
      const group = api.createTabGroup({ groupId, label, color })
      api.addPanelToTabGroup({ groupId, panelId, tabGroupId: group.id })
    },
    dissolveTabGroup: ({ context, event }) => {
      context.api?.dissolveTabGroup(event.params)
    },
    toggleEdgeGroup: ({ context, event }) => {
      const api = context.api
      if (!api) return
      const { position } = event.params
      if (api.getEdgeGroup(position)) {
        api.removeEdgeGroup(position)
      } else {
        const group = api.addEdgeGroup(position, { id: `edge-${position}`, initialSize: 200, minimumSize: 100 })
        api.addPanel({
          id: `edge-panel-${position}-${Date.now()}`,
          component: "fixedPlaceholder",
          title: event.params.panelTitle,
          position: { referenceGroup: group.id },
          params: { label: position, position },
        })
      }
    },
    addPanel: ({ context, event }) => context.api?.addPanel(event.params.options),
    addGroup: ({ context }) => context.api?.addGroup(),
    clearDockview: ({ context }) => context.api?.clear(),
    setActivePanel: ({ context, event }) => context.api?.getPanel(event.params.panelId)?.api.setActive(),
    setActiveGroup: ({ context, event }) => context.api?.getGroup(event.params.groupId)?.api.setActive(),
    closePanel: ({ context, event }) => context.api?.getPanel(event.params.panelId)?.api.close(),
    closeGroup: ({ context, event }) => context.api?.getGroup(event.params.groupId)?.api.close(),
    floatPanel: ({ context, event }) => {
      const panel = context.api?.getPanel(event.params.panelId)
      if (panel) context.api.addFloatingGroup(panel)
    },
    popoutPanel: ({ context, event }) => {
      const panel = context.api?.getPanel(event.params.panelId)
      if (panel) void context.api.addPopoutGroup(panel)
    },
    floatGroup: ({ context, event }) => {
      const group = context.api?.getGroup(event.params.groupId)
      if (group) context.api.addFloatingGroup(group, event.params.options)
    },
    popoutGroup: ({ context, event }) => {
      const group = context.api?.getGroup(event.params.groupId)
      if (group) void context.api.addPopoutGroup(group)
    },
    toggleGroupMaximized: ({ context, event }) => {
      const api = context.api?.getGroup(event.params.groupId)?.api
      if (api?.isMaximized()) api.exitMaximized()
      else api?.maximize()
    },
    toggleGroupVisible: ({ context, event }) => {
      const api = context.api?.getGroup(event.params.groupId)?.api
      api?.setVisible(!api.isVisible)
    },
    setGroupHeaderPosition: ({ context, event }) => {
      context.api?.getGroup(event.params.groupId)?.api.setHeaderPosition(event.params.position)
    },
    toggleSmartGuides: ({ context }) => {
      const api = context.api
      api?.setSmartGuidesEnabled(!api.smartGuidesEnabled)
    },
  },
})
  .extend({
    actions: {},
  })
  .createMachine({
    id: "dockview",
    initial: "initiating",
    context: () => ({
      api: null,
      menus: { tab: [], tabGroup: [] },
      options: { dndCompass: false, overflow: { mode: "dropdown", mru: false, search: true } },
    }),
    states: {
      initiating: {
        entry: ["initializeTabContextMenu", "initializeTabGroupContextMenu"],
        always: "waiting",
      },
      waiting: {
        on: { onReady: { target: "ready", actions: ["setApi", "applyOptions"] } },
      },
      ready: {
        entry: { type: "emitChanges", params: { type: "onDockviewReady" } },
        invoke: { src: "observeDockview", input: ({ context }) => context.api! },
        on: {
          onReady: { target: "ready", reenter: true, actions: ["setApi", "applyOptions"] },
          onLoadLayout: { actions: "loadLayout" },
          onSerializeLayout: {
            actions: {
              type: "emitChanges",
              params: ({ context, event }: any) => ({
                type: "onDockviewLayoutSerialized",
                params: { ...event.params, data: context.api!.toJSON() },
              }),
            },
          },
          onLayoutLoaded: {
            actions: {
              type: "emitChanges",
              params: ({ event }: any) => ({
                type: "onDockviewLayoutLoaded",
                params: event.params,
              }),
            },
          },
          onToggleDndCompass: { actions: ["toggleDndCompass", "applyOptions"] },
          onUpdateOverflow: { actions: ["setOverflow", "applyOptions"] },
          onToggleSmartGuides: { actions: ["toggleSmartGuides"] },
          onAddPanelToTabGroup: { actions: ["addPanelToTabGroup"] },
          onRemovePanelFromTabGroup: { actions: ["removePanelFromTabGroup"] },
          onCreateTabGroupForPanel: { actions: ["createTabGroupForPanel"] },
          onDissolveTabGroup: { actions: ["dissolveTabGroup"] },
          onToggleEdgeGroup: { actions: ["toggleEdgeGroup"] },
          onAddPanel: { actions: ["addPanel"] },
          onAddGroup: { actions: ["addGroup"] },
          onClearDockview: { actions: ["clearDockview"] },
          onSetActivePanel: { actions: ["setActivePanel"] },
          onSetActiveGroup: { actions: ["setActiveGroup"] },
          onClosePanel: { actions: ["closePanel"] },
          onCloseGroup: { actions: ["closeGroup"] },
          onFloatPanel: { actions: ["floatPanel"] },
          onPopoutPanel: { actions: ["popoutPanel"] },
          onFloatGroup: { actions: ["floatGroup"] },
          onPopoutGroup: { actions: ["popoutGroup"] },
          onToggleGroupMaximized: { actions: ["toggleGroupMaximized"] },
          onToggleGroupVisible: { actions: ["toggleGroupVisible"] },
          onSetGroupHeaderPosition: { actions: ["setGroupHeaderPosition"] },

          onDidActivePanelChange: {
            actions: {
              type: "emitChanges",
              params: ({ event }: any) => ({
                type: "onDockviewActivity",
                params: { id: event.params.panelId ?? "none", message: "Panel Activated", panelAdded: false },
              }),
            },
          },
          onDidAddPanel: {
            actions: {
              type: "emitChanges",
              params: ({ event }: any) => ({
                type: "onDockviewActivity",
                params: { id: event.params.panelId, message: "Panel Added", panelAdded: true },
              }),
            },
          },
          onDidRemovePanel: {
            actions: {
              type: "emitChanges",
              params: ({ event }: any) => ({
                type: "onDockviewActivity",
                params: { id: event.params.panelId, message: "Panel Removed", panelAdded: false },
              }),
            },
          },
          onDidMovePanel: {
            actions: {
              type: "emitChanges",
              params: ({ event }: any) => ({
                type: "onDockviewActivity",
                params: { id: event.params.panelId, message: "Panel Moved", panelAdded: false },
              }),
            },
          },
          onDidAddGroup: {
            actions: {
              type: "emitChanges",
              params: ({ event }: any) => ({
                type: "onDockviewActivity",
                params: { id: event.params.groupId, message: "Group Added", panelAdded: false },
              }),
            },
          },
          onDidActiveGroupChange: {
            actions: {
              type: "emitChanges",
              params: ({ event }: any) => ({
                type: "onDockviewActivity",
                params: { id: event.params.groupId ?? "none", message: "Group Activated", panelAdded: false },
              }),
            },
          },
          onDidRemoveGroup: {
            actions: {
              type: "emitChanges",
              params: ({ event }: any) => ({
                type: "onDockviewActivity",
                params: { id: event.params.groupId, message: "Group Removed", panelAdded: false },
              }),
            },
          },
          onDidMaximizedGroupChange: {
            actions: {
              type: "emitChanges",
              params: ({ event }: any) => ({
                type: "onDockviewActivity",
                params: {
                  id: `${event.params.groupId} [${event.params.isMaximized}]`,
                  message: "Group Maximized Changed",
                  panelAdded: false,
                },
              }),
            },
          },
        },
      },
    },
  })

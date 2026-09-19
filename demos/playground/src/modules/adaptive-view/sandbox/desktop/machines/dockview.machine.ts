import { setup, assign, enqueueActions, sendTo } from "xstate"

export const dockviewMachine = setup({
  actions: {
    subscribePanels: assign(({ context, self }: any) => {
      const input = context.api!
      const panels = new Map<string, { dispose(): void }[]>()
      const attach = (panel: any) => {
        if (panels.has(panel.id)) return
        const update = () => self.send({ type: "onDidPanelStateChange", params: { panelId: panel.id } })
        panels.set(panel.id, [panel.api.onDidActiveChange(update), panel.api.onDidVisibilityChange(update)])
        update()
      }
      const reconcile = () => {
        const ids = new Set((input.panels ?? []).map((panel: any) => panel.id))
        for (const [id, subscriptions] of panels) {
          if (!ids.has(id)) {
            subscriptions.forEach((subscription) => subscription.dispose())
            panels.delete(id)
          }
        }
        for (const panel of input.panels ?? []) attach(panel)
      }
      const disposables = [
        input.onDidLayoutChange(reconcile),
        input.onDidLayoutFromJSON(reconcile),
        input.onDidAddPanel((panel: any) => {
          attach(panel)
          self.send({ type: "onDidAddPanel", params: { panelId: panel.id } })
        }),
        input.onDidRemovePanel((panel: any) => {
          panels.get(panel.id)?.forEach((subscription) => subscription.dispose())
          panels.delete(panel.id)
          self.send({ type: "onDidRemovePanel", params: { panelId: panel.id } })
        }),
        input.onDidActivePanelChange((event: any) =>
          self.send({ type: "onDidActivePanelChange", params: { panelId: event.panel?.id } }),
        ),
        input.onDidMovePanel((event: any) =>
          self.send({ type: "onDidMovePanel", params: { panelId: event.panel.id } }),
        ),
      ]
      reconcile()
      return {
        subscriptions: {
          ...context.subscriptions,
          panels: [
            ...disposables,
            { dispose: () => panels.forEach((items) => items.forEach((item) => item.dispose())) },
          ],
        },
      }
    }),
    subscribeGroups: assign(({ context, self }: any) => {
      const input = context.api!
      const groups = new Map<string, { dispose(): void }[]>()
      const attach = (group: any) => {
        if (groups.has(group.id)) return
        const update = () => self.send({ type: "onDidGroupStateChange", params: { groupId: group.id } })
        groups.set(group.id, [
          group.api.onDidActiveChange(update),
          group.api.onDidVisibilityChange(update),
          group.api.onDidLocationChange(update),
          group.api.onDidHeaderDirectionChange(update),
        ])
        update()
      }
      const reconcile = () => {
        const ids = new Set((input.groups ?? []).map((group: any) => group.id))
        for (const [id, subscriptions] of groups) {
          if (!ids.has(id)) {
            subscriptions.forEach((subscription) => subscription.dispose())
            groups.delete(id)
          }
        }
        for (const group of input.groups ?? []) attach(group)
      }
      const disposables = [
        input.onDidLayoutChange(reconcile),
        input.onDidLayoutFromJSON(reconcile),
        input.onDidAddGroup((group: any) => {
          attach(group)
          self.send({ type: "onDidAddGroup", params: { groupId: group.id } })
        }),
        input.onDidRemoveGroup((group: any) => {
          groups.get(group.id)?.forEach((subscription) => subscription.dispose())
          groups.delete(group.id)
          self.send({ type: "onDidRemoveGroup", params: { groupId: group.id } })
        }),
        input.onDidActiveGroupChange((group: any) =>
          self.send({ type: "onDidActiveGroupChange", params: { groupId: group?.id } }),
        ),
        input.onDidMaximizedGroupChange((event: any) => {
          self.send({
            type: "onDidMaximizedGroupChange",
            params: { groupId: event.group.id, isMaximized: event.isMaximized },
          })
        }),
      ]
      reconcile()
      return {
        subscriptions: {
          ...context.subscriptions,
          groups: [
            ...disposables,
            { dispose: () => groups.forEach((items) => items.forEach((item) => item.dispose())) },
          ],
        },
      }
    }),
    subscribeLayout: assign(({ context, self }: any) => {
      const input = context.api!
      const updateLayout = () => self.send({ type: "onDidLayoutStateChange" })
      const updateSmartGuides = () => self.send({ type: "onDidSmartGuidesEnabledChange" })
      const disposables = [
        input.onDidLayoutChange(updateLayout),
        input.onDidLayoutFromJSON(updateLayout),
        input.onDidSmartGuidesEnabledChange(updateSmartGuides),
      ]
      updateLayout()
      updateSmartGuides()
      return { subscriptions: { ...context.subscriptions, layout: disposables } }
    }),
    unsubscribeDockview: ({ context }) => {
      Object.values(context.subscriptions).forEach((items: any) => items?.forEach((item: any) => item.dispose()))
    },
    updateActivePanel: assign(({ context, event }) => ({
      current: { ...context.current, activePanel: context.api?.activePanel },
    })),
    updateActiveGroup: assign(({ context, event }) => ({
      current: { ...context.current, activeGroup: context.api?.activeGroup },
    })),
    updateSmartGuidesEnabled: assign(({ context }) => ({
      current: { ...context.current, smartGuidesEnabled: context.api?.smartGuidesEnabled ?? false },
    })),
    updateEdgeGroups: assign(({ context }) => ({
      current: {
        ...context.current,
        edgeGroups: (["left", "right", "top", "bottom"] as const)
          .filter((position) => context.api?.getEdgeGroup(position))
          .join(","),
      },
    })),
    updatePanel: assign(({ context, event }) => {
      const panel = context.api?.getPanel(event.params.panelId)
      if (!panel) return {}
      return {
        current: {
          ...context.current,
          panels: {
            ...context.current.panels,
            [panel.id]: { isActive: panel.api.isActive, isVisible: panel.api.isVisible },
          },
        },
      }
    }),
    removePanelState: assign(({ context, event }) => {
      const panels = { ...context.current.panels }
      delete panels[event.params.panelId]
      return { current: { ...context.current, panels } }
    }),
    updateGroup: assign(({ context, event }) => {
      const group = context.api?.getGroup(event.params.groupId)
      if (!group) return {}
      return {
        current: {
          ...context.current,
          groups: {
            ...context.current.groups,
            [group.id]: {
              isActive: group.api.isActive,
              isVisible: group.api.isVisible,
              isMaximized: group.api.isMaximized(),
              location: group.api.location,
              headerPosition: group.api.getHeaderPosition(),
            },
          },
        },
      }
    }),
    removeGroupState: assign(({ context, event }) => {
      const groups = { ...context.current.groups }
      delete groups[event.params.groupId]
      return { current: { ...context.current, groups } }
    }),
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
}).createMachine({
  id: "dockview",
  initial: "initiating",
  context: () => ({
    current: {
      activePanel: undefined,
      activeGroup: undefined,
      smartGuidesEnabled: false,
      edgeGroups: "",
      panels: {},
      groups: {},
    },
    subscriptions: { panels: [], groups: [], layout: [] },
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
      entry: [
        "subscribePanels",
        "subscribeGroups",
        "subscribeLayout",
        sendTo(({ self }) => self, { type: "dockview.ready" }),
      ],
      exit: "unsubscribeDockview",
      on: {
        onReady: { target: "ready", reenter: true, actions: ["setApi", "applyOptions"] },
        onDidPanelStateChange: { actions: "updatePanel" },
        onDidGroupStateChange: { actions: "updateGroup" },
        onDidLayoutStateChange: { actions: "updateEdgeGroups" },
        onDidSmartGuidesEnabledChange: { actions: "updateSmartGuidesEnabled" },
        onLoadLayout: { actions: "loadLayout" },
        onSerializeLayout: {
          actions: sendTo(
            ({ self }) => self,
            ({ context, event }: any) => ({
              type: "dockview.layout.serialized",
              params: { ...event.params, data: context.api!.toJSON() },
            }),
          ),
        },
        onLayoutLoaded: {
          actions: sendTo(
            ({ self }) => self,
            ({ event }: any) => ({ type: "dockview.layout.loaded", params: event.params }),
          ),
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
          actions: [
            "updateActivePanel",
            sendTo(
              ({ self }) => self,
              ({ event }: any) => ({
                type: "dockview.onDidActivePanelChange",
                params: { panelId: event.params.panelId },
              }),
            ),
          ],
        },
        onDidAddPanel: {
          actions: enqueueActions(({ event, enqueue }: any) => {
            enqueue("updatePanel")
            enqueue.sendTo(({ self }: any) => self, {
              type: "dockview.onDidAddPanel",
              params: { panelId: event.params.panelId },
            })
          }),
        },
        onDidRemovePanel: {
          actions: [
            "removePanelState",
            sendTo(
              ({ self }) => self,
              ({ event }: any) => ({
                type: "dockview.onDidRemovePanel",
                params: { panelId: event.params.panelId },
              }),
            ),
          ],
        },
        onDidMovePanel: {
          actions: sendTo(
            ({ self }) => self,
            ({ event }: any) => ({
              type: "dockview.onDidMovePanel",
              params: { panelId: event.params.panelId },
            }),
          ),
        },
        onDidAddGroup: {
          actions: enqueueActions(({ event, enqueue }: any) => {
            enqueue("updateGroup")
            enqueue.sendTo(({ self }: any) => self, {
              type: "dockview.onDidAddGroup",
              params: { groupId: event.params.groupId },
            })
          }),
        },
        onDidActiveGroupChange: {
          actions: [
            "updateActiveGroup",
            sendTo(
              ({ self }) => self,
              ({ event }: any) => ({
                type: "dockview.onDidActiveGroupChange",
                params: { groupId: event.params.groupId },
              }),
            ),
          ],
        },
        onDidRemoveGroup: {
          actions: [
            "removeGroupState",
            sendTo(
              ({ self }) => self,
              ({ event }: any) => ({
                type: "dockview.onDidRemoveGroup",
                params: { groupId: event.params.groupId },
              }),
            ),
          ],
        },
        onDidMaximizedGroupChange: {
          actions: enqueueActions(({ event, enqueue }: any) => {
            enqueue("updateGroup")
            enqueue.sendTo(({ self }: any) => self, {
              type: "dockview.onDidMaximizedGroupChange",
              params: {
                groupId: event.params.groupId,
                isMaximized: event.params.isMaximized,
              },
            })
          }),
        },
      },
    },
  },
})

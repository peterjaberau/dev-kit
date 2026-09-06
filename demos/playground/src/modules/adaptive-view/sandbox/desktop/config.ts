import { DockviewApi } from '#adaptive-view/react';
import type { SandboxLayoutProfile } from '../sandbox-manager/store';

export const layoutProfiles: readonly SandboxLayoutProfile[] = [
  {
    id: "emptyDemo",
    title: "Empty Demo",
    data: {
      grid: {
        root: {
          type: "branch",
          data: [],
          orientation: "HORIZONTAL",
        },
      },
      panels: {},
      edgeGroups: {
        left: {
          size: 220,
          visible: true,
          collapsed: true,
          group: { headerPosition: "left", views: [] },
          autoReveal: true,
        },
        right: {
          size: 220,
          visible: true,
          collapsed: true,
          group: { headerPosition: "right", views: [] },
          autoReveal: true,
        },
        bottom: {
          size: 200,
          visible: true,
          collapsed: true,
          group: {
            headerPosition: "bottom",
            views: [],
          },
          autoReveal: true,
        },
      },
    },
  },
  {
    id: "fullDemo",
    title: "Full Demo",
    data: {
      grid: {
        root: {
          type: "branch",
          data: [
            {
              type: "branch",
              data: [
                {
                  type: "leaf",
                  data: { views: ["correlation", "chart"], activeView: "correlation", id: "9" },
                  size: 482,
                },
                {
                  type: "leaf",
                  data: { views: ["orderbook", "watchlist", "pricealert"], activeView: "orderbook", id: "3" },
                  size: 482,
                },
              ],
              size: 461,
            },
            {
              type: "branch",
              data: [
                {
                  type: "leaf",
                  data: {
                    views: ["fxtiles", "iframe", "vesselfinder", "debuginfo", "eventlog", "layoutinspector"],
                    activeView: "fxtiles",
                    id: "6",
                  },
                  size: 321,
                },
                {
                  type: "leaf",
                  data: { views: ["orders", "positionsummary"], activeView: "orders", id: "8" },
                  size: 321,
                },
                { type: "leaf", data: { views: ["volsurface"], activeView: "volsurface", id: "10" }, size: 322 },
              ],
              size: 715,
            },
            {
              type: "branch",
              data: [
                { type: "leaf", data: { views: ["news", "nested"], activeView: "news", id: "7" }, size: 482 },
                { type: "leaf", data: { views: ["signals"], activeView: "signals", id: "1" }, size: 482 },
              ],
              size: 354,
            },
          ],
          size: 964,
        },
        width: 1530,
        height: 964,
        orientation: "HORIZONTAL",
      },
      panels: {
        "bottom-1": {
          id: "bottom-1",
          contentComponent: "fixedPlaceholder",
          tabComponent: "props.defaultTabComponent",
          params: { label: "Terminal", position: "bottom" },
          title: "Terminal",
        },
        "bottom-2": {
          id: "bottom-2",
          contentComponent: "fixedPlaceholder",
          tabComponent: "props.defaultTabComponent",
          params: { label: "Output", position: "bottom" },
          title: "Output",
        },
        "bottom-3": {
          id: "bottom-3",
          contentComponent: "fixedPlaceholder",
          tabComponent: "props.defaultTabComponent",
          params: { label: "Problems", position: "bottom" },
          title: "Problems",
        },
        "left-1": {
          id: "left-1",
          contentComponent: "fixedPlaceholder",
          tabComponent: "props.defaultTabComponent",
          params: { label: "Explorer", position: "left" },
          title: "Explorer",
        },
        "right-1": {
          id: "right-1",
          contentComponent: "fixedPlaceholder",
          tabComponent: "props.defaultTabComponent",
          params: { label: "Outline", position: "right" },
          title: "Outline",
        },
        signals: {
          id: "signals",
          contentComponent: "signals",
          tabComponent: "props.defaultTabComponent",
          title: "Tech View",
        },
        orderbook: {
          id: "orderbook",
          contentComponent: "orderbook",
          tabComponent: "props.defaultTabComponent",
          title: "Order Book",
          renderer: "always",
        },
        fxtiles: {
          id: "fxtiles",
          contentComponent: "fxtiles",
          tabComponent: "props.defaultTabComponent",
          title: "FX Rates",
          renderer: "always",
        },
        news: { id: "news", contentComponent: "news", tabComponent: "props.defaultTabComponent", title: "News" },
        orders: {
          id: "orders",
          contentComponent: "orders",
          tabComponent: "props.defaultTabComponent",
          title: "Orders",
          renderer: "always",
        },
        positionsummary: {
          id: "positionsummary",
          contentComponent: "positionsummary",
          tabComponent: "props.defaultTabComponent",
          title: "Positions",
          renderer: "always",
        },
        correlation: {
          id: "correlation",
          contentComponent: "correlation",
          tabComponent: "props.defaultTabComponent",
          title: "Correlation",
        },
        volsurface: {
          id: "volsurface",
          contentComponent: "volsurface",
          tabComponent: "props.defaultTabComponent",
          title: "Vol Surface",
        },
        nested: {
          id: "nested",
          contentComponent: "nested",
          tabComponent: "props.defaultTabComponent",
          title: "Nested",
        },
        eventlog: {
          id: "eventlog",
          contentComponent: "eventlog",
          tabComponent: "props.defaultTabComponent",
          title: "Event Log",
        },
        iframe: {
          id: "iframe",
          contentComponent: "iframe",
          tabComponent: "props.defaultTabComponent",
          title: "IFrame",
        },
        vesselfinder: {
          id: "vesselfinder",
          contentComponent: "vesselfinder",
          tabComponent: "props.defaultTabComponent",
          title: "Vessel Finder",
        },
        debuginfo: {
          id: "debuginfo",
          contentComponent: "debuginfo",
          tabComponent: "props.defaultTabComponent",
          title: "Debug Info",
        },
        watchlist: {
          id: "watchlist",
          contentComponent: "watchlist",
          tabComponent: "props.defaultTabComponent",
          title: "Watchlist",
        },
        pricealert: {
          id: "pricealert",
          contentComponent: "pricealert",
          tabComponent: "props.defaultTabComponent",
          title: "Price Alert",
        },
        chart: {
          id: "chart",
          contentComponent: "chart",
          tabComponent: "props.defaultTabComponent",
          title: "Chart",
        },
        layoutinspector: {
          id: "layoutinspector",
          contentComponent: "layoutinspector",
          tabComponent: "props.defaultTabComponent",
          title: "Layout Inspector",
        },
        shadowDom: {
          id: "shadowDom",
          contentComponent: "shadowDom",
          tabComponent: "props.defaultTabComponent",
          title: "Shadow DOM",
        },
      },
      activeGroup: "6",
      edgeGroups: {
        left: {
          size: 220,
          visible: true,
          collapsed: true,
          group: { views: ["left-1"], activeView: "left-1", id: "left", headerPosition: "left" },
          autoReveal: true,
        },
        right: {
          size: 220,
          visible: true,
          collapsed: true,
          group: { views: ["right-1"], activeView: "right-1", id: "right", headerPosition: "right" },
          autoReveal: true,
        },
        bottom: {
          size: 200,
          visible: true,
          collapsed: true,
          group: {
            views: ["bottom-1", "bottom-2", "bottom-3"],
            activeView: "bottom-1",
            id: "bottom",
            headerPosition: "bottom",
            tabGroups: [
              {
                id: "tg-bottom-0",
                collapsed: false,
                panelIds: ["bottom-1", "bottom-2"],
                label: "Logs",
                color: "purple",
              },
            ],
          },
          autoReveal: true,
        },
      },
    },
  },
];

export const EDGE_GROUP_PANELS: readonly {
    pos: 'bottom' | 'left' | 'right';
    id: string;
    title: string;
}[] = [
    { pos: 'left', id: 'left-1', title: 'Explorer' },
    { pos: 'right', id: 'right-1', title: 'Outline' },
    { pos: 'right', id: 'right-2', title: 'Properties' },
    { pos: 'bottom', id: 'bottom-1', title: 'Terminal' },
    { pos: 'bottom', id: 'bottom-2', title: 'Output' },
    { pos: 'bottom', id: 'bottom-3', title: 'Problems' },
];

export function populateEdgeGroups(api: DockviewApi): void {
    for (const { pos, id, title } of EDGE_GROUP_PANELS) {
        const groupApi = api.getEdgeGroup(pos);
        if (groupApi && !api.panels.some((panel) => panel.id === id)) {
            api.addPanel({
                id,
                component: 'fixedPlaceholder',
                title,
                position: { referenceGroup: groupApi.id },
                params: { label: title, position: pos },
            });
        }
    }

    const bottomEdge = api.getEdgeGroup('bottom');
    if (!bottomEdge) {
        return;
    }

    const logs = api.createTabGroup({
        groupId: bottomEdge.id,
        label: 'Logs',
        color: 'purple',
    });
    api.addPanelToTabGroup({
        groupId: bottomEdge.id,
        tabGroupId: logs.id,
        panelId: 'bottom-1',
    });
    api.addPanelToTabGroup({
        groupId: bottomEdge.id,
        tabGroupId: logs.id,
        panelId: 'bottom-2',
    });
}

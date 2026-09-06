import { DockviewApi, EdgeGroupPosition } from '#adaptive-view/react';

export const DEFAULT_LAYOUT_JSON: any = {
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
}

const EDGE_GROUP_DEFS: {
    pos: 'bottom' | 'left' | 'right';
    options: { id: string; initialSize: number; minimumSize: number };
}[] = [
    {
        pos: 'bottom',
        options: { id: 'bottom', initialSize: 200, minimumSize: 100 },
    },
    {
        pos: 'left',
        options: { id: 'left', initialSize: 220, minimumSize: 150 },
    },
    {
        pos: 'right',
        options: { id: 'right', initialSize: 220, minimumSize: 150 },
    },
];

export function setupEdgeGroups(api: DockviewApi) {
    for (const position of [
        'top',
        'bottom',
        'left',
        'right',
    ] as EdgeGroupPosition[]) {
        if (api.getEdgeGroup(position)) {
            api.removeEdgeGroup(position);
        }
    }

    for (const { pos, options } of EDGE_GROUP_DEFS) {
        // `autoReveal` pairs with the `dockToEdgeGroups` prop: an edge group that
        // loses its last panel tears down to zero footprint (rather than
        // collapsing to a strip), and dragging a panel back to that edge
        // reveals it again.
        api.addEdgeGroup(pos, {
            ...options,
            collapsed: true,
            autoReveal: true,
        });
    }
}

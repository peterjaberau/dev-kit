import { Tree } from "./types"


/**
 * In order for the nested drag and drop pattern to work flawlessly,
 * make sure your data has unique and stable `id` that you can use for
 * the `key` prop when mapping children.
 *
 * DO NOT use indices!
 */
 export const initialData: Tree = [
  { id: 'panel-1', title: 'Panel 1 (blocked)', isBlocked: true },
  {
    id: 'panel-2',
    title: 'Panel 2',
    children: [{ id: 'subpanel-2-1', title: 'Subpanel 2.1' }],
  },
  {
    id: 'panel-3',
    title: 'Panel 3',
    children: [
      {
        id: 'subpanel-3-1',
        title: 'Subpanel 3.1',
        children: [
          { id: 'subpanel-3-1-1', title: 'Subpanel 3.1.1' },
          {
            id: 'subpanel-3-1-2',
            title: 'Subpanel 3.1.2 (blocked)',
            isBlocked: true,
          },
        ],
      },
      { id: 'subpanel-3-2', title: 'Subpanel 3.2' },
    ],
  },
  { id: 'panel-4', title: 'Panel 4' },
];
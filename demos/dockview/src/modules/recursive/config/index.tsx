export const initialConfig = {
  nodes: [
    {
      id: 'node-1',
      children: [
        {
          id: 'node-1-1',
        },
        {
          id: 'node-1-2',
        },
      ],
    },
    {
      id: 'node-2',
      children: [
        {
          id: 'node-2-1',
          children: [
            {
              id: 'node-2-1-1',
            },
            {
              id: 'node-2-1-2',
            },
          ],
        },
        {
          id: 'node-2-2',
          children: [
            {
              id: 'node-2-2-1',
            },
          ],
        },
      ],
    },
    {
      id: 'node-3',
    },
  ]
};

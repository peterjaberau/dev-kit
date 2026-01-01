'use client';
import { SortableTree } from '..';

import { message } from 'antd';
import { initialData } from './data';

export const SortableTreeRule = () => (
  <div style={{ width: 340 }}>
    <SortableTree
      defaultTreeData={initialData}
      sortableRule={(data) => {
        const { activeNode, projected } = data;
        const sortable = activeNode?.depth === projected?.depth;

        if (!sortable) message.warning('Only sibling drag sorting is allowed');

        return sortable;
      }}
    />
  </div>
);

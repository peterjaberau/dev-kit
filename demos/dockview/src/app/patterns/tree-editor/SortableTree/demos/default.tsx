'use client';
import { SortableTree } from '../../SortableTree';

import { initialData } from './data';

export const SortableTreeDefault = () => (
  <div style={{ width: 340 }}>
    <SortableTree defaultTreeData={initialData} />
  </div>
);

'use client';
import { SortableTree } from '..';

import { initialData } from './data';

export const SortableTreeDisableDrag = () => (
  <div style={{ width: 340 }}>
    <SortableTree defaultTreeData={initialData} disableDrag />
  </div>
);

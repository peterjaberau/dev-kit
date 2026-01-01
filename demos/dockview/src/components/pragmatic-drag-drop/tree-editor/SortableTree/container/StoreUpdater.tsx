import type { RefObject } from 'react';
import { useImperativeHandle } from 'react';
import { createStoreUpdater } from 'zustand-utils';

import { SortableTreeInstance, useSortableTree } from '../hooks/useSortableTree';
import type { ControlledState, OnTreeDataChange } from '../store';
import { useStoreApi } from '../store';

import type { FlattenNode, Projected, RenderNodeProps, TreeData, VirtualConfig } from '../types';

export interface StoreUpdaterProps<T = any> extends ControlledState {
  treeData?: TreeData<T>;
  defaultTreeData?: TreeData<T>;
  onTreeDataChange?: OnTreeDataChange<T>;
  renderContent?: RenderNodeProps<T>;
  renderExtra?: RenderNodeProps<T>;
  ref?: RefObject<SortableTreeInstance<T>>;
  SHOW_STORE_IN_DEVTOOLS?: boolean;
  sortableRule?: (data: {
    activeNode: FlattenNode<T>;
    targetNode: FlattenNode<T>;
    projected: Projected;
  }) => boolean;
  virtual?: VirtualConfig;
}

const StoreUpdater = ({
  defaultTreeData,
  treeData,
  onTreeDataChange,
  onSelectedIdsChange,
  renderContent,
  renderExtra,
  ref,
  hideRemove,
  hideAdd,
  indentationWidth,
  disableDrag,
  sortableRule,
  virtual,
}: StoreUpdaterProps) => {
  const storeApi = useStoreApi();

  const useStoreUpdater = createStoreUpdater<StoreUpdaterProps>(storeApi);

  useStoreUpdater('treeData', defaultTreeData, []);
  useStoreUpdater('treeData', treeData);
  useStoreUpdater('renderContent', renderContent);
  useStoreUpdater('renderExtra', renderExtra);
  useStoreUpdater('onTreeDataChange', onTreeDataChange);

  useStoreUpdater('indentationWidth', indentationWidth);
  useStoreUpdater('hideAdd', hideAdd);
  useStoreUpdater('hideRemove', hideRemove);
  useStoreUpdater('virtual', virtual);
  useStoreUpdater('disableDrag', disableDrag);
  useStoreUpdater('sortableRule', sortableRule);

  useStoreUpdater('onSelectedIdsChange', onSelectedIdsChange);

  const instance = useSortableTree();
  useImperativeHandle(ref, () => instance);

  return null;
};

export default StoreUpdater;

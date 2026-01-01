import type { UniqueIdentifier } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { produce } from 'immer';
import { merge } from "lodash"
import type { Projected, TreeData } from '../types';
import { buildTree, flattenTree, removeNode, setProperty } from '../utils/treeNode';

import type { FlattenNode } from '../types';

interface AddNodeAction {
  type: 'addNode';
  node: Partial<FlattenNode>;
  index?: number;
}

interface MoveNodeAction {
  type: 'moveNode';
  activeId: UniqueIdentifier;
  targetId: UniqueIdentifier;
  projected: Projected;
}

interface RemoveNodeAction {
  type: 'removeNode';
  id: UniqueIdentifier;
}

interface UpdateNodeContentAction<T = any> {
  type: 'updateNodeContent';
  id: UniqueIdentifier;
  content: T;
}

interface ToggleCollapseAction {
  type: 'toggleCollapse';
  id: UniqueIdentifier;
}

interface ToggleExtraVisibleAction {
  type: 'toggleExtraVisible';
  id: UniqueIdentifier;
}

export type TreeNodeDispatchPayload = Omit<UpdateNodeContentAction, 'id'>;

export type TreeDataDispatchPayload =
  | ToggleCollapseAction
  | ToggleExtraVisibleAction
  | MoveNodeAction
  | AddNodeAction
  | RemoveNodeAction
  | UpdateNodeContentAction;

export const treeDataReducer = (treeData: TreeData, payload: TreeDataDispatchPayload): TreeData => {
  switch (payload.type) {
    case 'toggleCollapse':
      return setProperty(treeData, payload.id, 'collapsed', (value) => {
        return !value;
      });

    case 'toggleExtraVisible':
      return setProperty(treeData, payload.id, 'showExtra', (value) => {
        return !value;
      });

    case 'moveNode':
      return produce(treeData, (draft) => {
        const { activeId, projected, targetId } = payload;

        const clonedItems: FlattenNode[] | any = flattenTree(draft);
        const overIndex = clonedItems.findIndex(({ id }: any) => id === targetId);
        const activeIndex = clonedItems.findIndex(({ id }: any) => id === activeId);
        const activeTreeItem = clonedItems[activeIndex];

        clonedItems[activeIndex] = {
          ...activeTreeItem,
          depth: projected.depth,
          parentId: projected.parentId,
        };

        const sortedItems: any = arrayMove(clonedItems, activeIndex, overIndex);

        return buildTree(sortedItems);
      });

    case 'removeNode':
      return removeNode(treeData, payload.id);

    case 'addNode':
      return produce(treeData, (draft) => {
        if (!payload.index) {
          draft.push({ id: payload.node.id, children: [], ...payload.node } as any);
        }
      });

    case 'updateNodeContent':
      return setProperty(treeData, payload.id, 'content', (preValue) => {
        return merge(preValue, payload.content);
      });
  }
};

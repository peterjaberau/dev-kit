import type { UniqueIdentifier } from '@dnd-kit/core';
import type { RefObject } from 'react';

export type { UniqueIdentifier };

export interface TreeNode<T = any> {
  id: UniqueIdentifier;
  children: TreeNode<T>[];
  collapsed?: boolean;
  showExtra?: boolean;
  content?: T;
}

export type TreeData<T = any> = TreeNode<T>[];

export interface FlattenNode<T = any> extends TreeNode<T> {
  parentId: UniqueIdentifier | null;
  depth: number;
  index: number;
}

export type SensorContext = RefObject<{
  items: FlattenNode[];
  offset: number;
}>;

export interface Projected {
  depth: number;
  maxDepth: number;
  minDepth: number;
  parentId: UniqueIdentifier;
}

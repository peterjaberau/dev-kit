import { FC } from 'react';
import type { FlattenNode } from './data';

export type RenderNodeProps<T = any> = (node: FlattenNode<T>) => ReturnType<FC>;

export type VirtualConfig =
  | {
      height: number;
      width?: number;
      itemHeight?: (index: number) => number;
    }
  | false;

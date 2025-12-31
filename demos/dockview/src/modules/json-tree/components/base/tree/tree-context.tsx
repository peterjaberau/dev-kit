import { createContext } from 'react';

import {
  attachInstruction,
  extractInstruction,
} from '@atlaskit/pragmatic-drag-and-drop-hitbox/list-item';
import { DropIndicator } from '#components/pragmatic-drag-drop/drop-indicator/list-item';


export type TreeContextValue = {
  dispatch: (action: any) => void;
  uniqueContextId: symbol;
  getPathToItem: (itemId: string) => string[];
  getMoveTargets: ({ itemId }: { itemId: string }) => any[];
  getChildrenOfItem: (itemId: string) => any[];
  registerTreeItem?: (args: {
    itemId: string;
    element: HTMLElement;
    actionMenuTrigger: HTMLElement;
  }) => void;
};

export const TreeContext = createContext<TreeContextValue>({
  dispatch: () => {},
  uniqueContextId: Symbol('uniqueId'),
  getPathToItem: () => [],
  getMoveTargets: () => [],
  getChildrenOfItem: () => [],
  registerTreeItem: () => {},
});

export type DependencyContext = {
  DropIndicator: typeof DropIndicator;
  attachInstruction: typeof attachInstruction;
  extractInstruction: typeof extractInstruction;
};

export const DependencyContext = createContext<DependencyContext>({
  DropIndicator: DropIndicator,
  attachInstruction: attachInstruction,
  extractInstruction: extractInstruction,
});

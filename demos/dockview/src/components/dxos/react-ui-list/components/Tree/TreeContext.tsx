
import { createContext, useContext } from 'react';

export type TreeItemDataProps = {
  id: string;
  label: any;
  parentOf?: string[];
  className?: string;
  headingClassName?: string;
  css?: any
  headingCss?: string;
  icon?: string;
  iconHue?: string;
  disabled?: boolean;
  testId?: string;
};

export type TreeContextType<T = any, O = any> = {
  useItems: (parent?: T, options?: O) => T[];
  getProps: (item: T, parent: string[]) => TreeItemDataProps;
  isOpen: (path: string[], item: T) => boolean;
  isCurrent: (path: string[], item: T) => boolean;
};

const TreeContext = createContext<null | TreeContextType>(null);

export const TreeProvider = TreeContext.Provider;

export const useTree = () =>
  useContext(TreeContext) ??
  (() => {
    throw new Error('TreeContext not found');
  })();

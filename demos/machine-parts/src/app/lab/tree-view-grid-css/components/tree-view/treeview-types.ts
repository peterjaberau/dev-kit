import type { RecipeVariantProps } from "@chakra-ui/react";
import type React from "react";
import { treeViewRecipe } from "../recipe";

export type TreeViewRecipeVariantProps = RecipeVariantProps<
  typeof treeViewRecipe
>;

export type TreeViewDataNode = {
  id: string;
  label: string;
  meta?: string;
  kind?: string;
  children?: TreeViewDataNode[];
};

export type UseTreeViewProps<
  TNode extends TreeViewDataNode = TreeViewDataNode,
> = {
  nodes: TNode[];
  expandedIds?: Set<string>;
  selectedId?: string;
  defaultExpandedIds?: string[];
  defaultSelectedId?: string;
  expandOnNodeClick?: boolean;
  onExpandedIdsChange?: (expandedIds: Set<string>) => void;
  onSelectedIdChange?: (selectedId: string) => void;
};

export type TreeViewNodeStateProps = {
  level: number;
  branch?: boolean;
  expanded?: boolean;
  selected?: boolean;
};

export type TreeViewToggleStateProps = {
  expanded?: boolean;
};

export type TreeViewApi<TNode extends TreeViewDataNode = TreeViewDataNode> = {
  nodes: TNode[];
  expandedIds: Set<string>;
  selectedId?: string;
  expandOnNodeClick: boolean;
  isBranch: (node: TNode) => boolean;
  isExpanded: (node: TNode) => boolean;
  isSelected: (node: TNode) => boolean;
  isTopLevelNode: (node: TNode) => boolean;
  selectNode: (node: TNode) => void;
  toggleNode: (node: TNode) => void;
  getNodeProps: (details: {
    node: TNode;
    level: number;
  }) => TreeViewNodeStateProps & {
    onClick: React.MouseEventHandler<HTMLElement>;
    onKeyDown: React.KeyboardEventHandler<HTMLElement>;
  };
  getToggleProps: (details: {
    node: TNode;
  }) => TreeViewToggleStateProps & {
    "aria-label": string;
    disabled: boolean;
    onClick: React.MouseEventHandler<HTMLElement>;
  };
};

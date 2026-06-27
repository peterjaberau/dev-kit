"use client";

import React from "react";
import { TreeViewRootProvider } from "./treeview-root-provider";
import type { TreeViewRootProviderProps } from "./treeview-root-provider";
import type { TreeViewDataNode, UseTreeViewProps } from "./treeview-types";
import { useTreeView } from "./use-treeview";

export type TreeViewRootProps<
  TNode extends TreeViewDataNode = TreeViewDataNode,
> = Omit<TreeViewRootProviderProps<TNode>, "value"> & UseTreeViewProps<TNode>;

const TreeViewRootRender = <
  TNode extends TreeViewDataNode = TreeViewDataNode,
>(
  props: TreeViewRootProps<TNode>,
  ref: React.ForwardedRef<HTMLDivElement>,
) => {
  const {
    nodes,
    defaultExpandedIds,
    defaultSelectedId,
    expandOnNodeClick = false,
    children,
    ...rest
  } = props;
  const treeView = useTreeView({
    nodes,
    defaultExpandedIds,
    defaultSelectedId,
    expandOnNodeClick,
  });

  return (
    <TreeViewRootProvider
      ref={ref}
      value={treeView}
      expandOnNodeClick={expandOnNodeClick}
      {...rest}
    >
      {children}
    </TreeViewRootProvider>
  );
};

const TreeViewRootComponent = React.forwardRef(TreeViewRootRender);

TreeViewRootComponent.displayName = "TreeViewRoot";

export const TreeViewRoot = TreeViewRootComponent as <
  TNode extends TreeViewDataNode = TreeViewDataNode,
>(
  props: TreeViewRootProps<TNode> & React.RefAttributes<HTMLDivElement>,
) => React.ReactElement | null;

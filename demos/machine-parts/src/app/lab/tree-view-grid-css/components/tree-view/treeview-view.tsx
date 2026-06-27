"use client";

import React from "react";
import { TreeViewJsonTree } from "./treeview-json-tree";
import type { TreeViewJsonTreeProps } from "./treeview-json-tree";
import { TreeViewLabel } from "./parts";
import { TreeViewRoot } from "./treeview-root";
import type { TreeViewRootProps } from "./treeview-root";
import type { TreeViewDataNode } from "./treeview-types";

export type TreeViewViewProps<
  TNode extends TreeViewDataNode = TreeViewDataNode,
> = Omit<TreeViewRootProps<TNode>, "children"> & {
  label: React.ReactNode;
} & TreeViewJsonTreeProps<TNode>;

export const TreeViewView = <
  TNode extends TreeViewDataNode = TreeViewDataNode,
>(
  props: TreeViewViewProps<TNode>,
) => {
  const { label, renderContent, renderEnd, renderIcon, ...rootProps } = props;

  return (
    <TreeViewRoot {...rootProps}>
      <TreeViewLabel>{label}</TreeViewLabel>
      <TreeViewJsonTree
        renderContent={renderContent}
        renderEnd={renderEnd}
        renderIcon={renderIcon}
      />
    </TreeViewRoot>
  );
};

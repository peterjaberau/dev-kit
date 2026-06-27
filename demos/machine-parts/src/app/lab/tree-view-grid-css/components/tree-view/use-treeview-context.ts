"use client";

import React from "react";
import { TreeViewContext } from "./treeview-context";
import type { TreeViewContextValue } from "./treeview-context";
import type { TreeViewDataNode } from "./treeview-types";

export const useTreeViewContext = <
  TNode extends TreeViewDataNode = TreeViewDataNode,
>() => {
  const context = React.useContext(TreeViewContext);

  if (!context) {
    throw new Error("TreeView parts must be rendered inside TreeViewRoot");
  }

  return context as unknown as TreeViewContextValue<TNode>;
};

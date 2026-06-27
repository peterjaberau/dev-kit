"use client";

import { useSlotRecipe } from "@chakra-ui/react";
import React from "react";
import type { TreeViewApi, TreeViewDataNode } from "./treeview-types";

export type TreeViewContextValue<
  TNode extends TreeViewDataNode = TreeViewDataNode,
> = TreeViewApi<TNode> & {
  styles: ReturnType<ReturnType<typeof useSlotRecipe>>;
};

export const TreeViewContext =
  React.createContext<TreeViewContextValue<TreeViewDataNode> | null>(null);

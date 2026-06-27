"use client";

import { chakra } from "@chakra-ui/react";
import { useState } from "react";
import {
  TreeView,
  machinePartTree,
  useTreeView,
  useTreeViewContext,
} from "../components";
import { TreeViewCompositionTree } from "./composition-tree";
import { defaultExpandedIds, defaultSelectedId } from "./shared";
import type { TreeViewExampleProps } from "./shared";

export const TreeViewControlledProviderCompositionExample = (
  props: TreeViewExampleProps,
) => {
  const { expandOnNodeClick, fullRowHighlight } = props;
  const [expandedIds, setExpandedIds] = useState(
    () => new Set(defaultExpandedIds),
  );
  const [selectedId, setSelectedId] = useState(defaultSelectedId);
  const treeView = useTreeView({
    nodes: machinePartTree,
    expandedIds,
    selectedId,
    onExpandedIdsChange: setExpandedIds,
    onSelectedIdChange: setSelectedId,
    expandOnNodeClick,
  });

  return (
    <TreeView.RootProvider
      value={treeView}
      expandOnNodeClick={expandOnNodeClick}
      fullRowHighlight={fullRowHighlight}
    >
      <TreeView.Label>Controlled composition provider</TreeView.Label>
      <TreeViewControlledStateBar />
      <TreeViewCompositionTree />
    </TreeView.RootProvider>
  );
};

const TreeViewControlledStateBar = () => {
  const treeView = useTreeViewContext();

  return (
    <chakra.div color="fg.subtle" fontSize="xs">
      Controlled state: {treeView.selectedId ?? "none"} selected
    </chakra.div>
  );
};

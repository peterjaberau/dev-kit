"use client";

import { chakra } from "@chakra-ui/react";
import { useState } from "react";
import { TreeView, machinePartTree, useTreeView, useTreeViewContext } from "../components";
import { defaultExpandedIds, defaultSelectedId } from "./shared";
import type { TreeViewExampleProps } from "./shared";

export const TreeViewControlledProviderJsonExample = (
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
      <TreeView.Label>Controlled JSON provider</TreeView.Label>
      <TreeViewControlledStateBar />
      <TreeView.JsonTree />
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

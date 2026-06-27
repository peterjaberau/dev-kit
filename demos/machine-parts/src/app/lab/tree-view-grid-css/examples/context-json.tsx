"use client";

import { chakra } from "@chakra-ui/react";
import { TreeView, machinePartTree, useTreeViewContext } from "../components";
import { defaultExpandedIds, defaultSelectedId } from "./shared";
import type { TreeViewExampleProps } from "./shared";

export const TreeViewContextJsonExample = (props: TreeViewExampleProps) => {
  const { expandOnNodeClick, fullRowHighlight } = props;

  return (
    <TreeView.Root
      nodes={machinePartTree}
      defaultExpandedIds={defaultExpandedIds}
      defaultSelectedId={defaultSelectedId}
      fullRowHighlight={fullRowHighlight}
      expandOnNodeClick={expandOnNodeClick}
    >
      <TreeView.Label>JSON context reader</TreeView.Label>
      <TreeViewContextStateReader />
      <TreeView.JsonTree />
    </TreeView.Root>
  );
};

const TreeViewContextStateReader = () => {
  const treeView = useTreeViewContext();

  return (
    <chakra.div
      display="grid"
      gridTemplateColumns="repeat(2, minmax(0, 1fr))"
      gap="2"
      color="fg.subtle"
      fontSize="xs"
    >
      <chakra.span>{treeView.expandedIds.size} expanded</chakra.span>
      <chakra.span>{treeView.selectedId ?? "none"} selected</chakra.span>
    </chakra.div>
  );
};

"use client";

import { chakra } from "@chakra-ui/react";
import { TreeView, machinePartTree, useTreeViewContext } from "../components";
import { TreeViewCompositionTree } from "./composition-tree";
import { defaultExpandedIds, defaultSelectedId } from "./shared";
import type { TreeViewExampleProps } from "./shared";

export const TreeViewContextCustomCompositionExample = (
  props: TreeViewExampleProps,
) => {
  const { expandOnNodeClick, fullNodeHighlight, fullRowHighlight } = props;

  return (
    <TreeView.Root
      nodes={machinePartTree}
      defaultExpandedIds={defaultExpandedIds}
      defaultSelectedId={defaultSelectedId}
      fullRowHighlight={fullRowHighlight}
      fullNodeHighlight={fullNodeHighlight}
      expandOnNodeClick={expandOnNodeClick}
    >
      <TreeView.Label>Composition context reader</TreeView.Label>
      <TreeViewContextStateReader />
      <TreeViewCompositionTree />
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

"use client";

import { chakra } from "@chakra-ui/react";
import { useState } from "react";
import {
  TreeView,
  TreeViewJsonTree,
  TreeViewLabel,
  TreeViewRoot,
  TreeViewRootProvider,
  machinePartTree,
  useTreeView,
  useTreeViewContext,
} from "./components";

const defaultExpandedIds = ["line-a", "line-a/frame", "line-a/drive"];
const defaultSelectedId = "line-a/drive/encoder";

export type TreeViewExampleProps = {
  expandOnNodeClick: boolean;
  fullRowHighlight: boolean;
};

const TreeViewControlledExample = (props: TreeViewExampleProps) => {
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
    <TreeViewRootProvider
      value={treeView}
      expandOnNodeClick={expandOnNodeClick}
      fullRowHighlight={fullRowHighlight}
    >
      <TreeViewLabel>Provider controlled</TreeViewLabel>
      <TreeViewControlledStateBar />
      <TreeViewJsonTree />
    </TreeViewRootProvider>
  );
};

const TreeViewUncontrolledRootExample = (
  props: TreeViewExampleProps,
) => {
  const { expandOnNodeClick, fullRowHighlight } = props;

  return (
    <TreeView
      label="Uncontrolled JSON"
      nodes={machinePartTree}
      defaultExpandedIds={defaultExpandedIds}
      defaultSelectedId={defaultSelectedId}
      fullRowHighlight={fullRowHighlight}
      expandOnNodeClick={expandOnNodeClick}
    />
  );
};

const TreeViewContextStateExample = (props: TreeViewExampleProps) => {
  const { expandOnNodeClick, fullRowHighlight } = props;

  return (
    <TreeViewRoot
      nodes={machinePartTree}
      defaultExpandedIds={defaultExpandedIds}
      defaultSelectedId={defaultSelectedId}
      fullRowHighlight={fullRowHighlight}
      expandOnNodeClick={expandOnNodeClick}
    >
      <TreeViewLabel>useTreeViewContext</TreeViewLabel>
      <TreeViewContextStateReader />
      <TreeViewJsonTree />
    </TreeViewRoot>
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

const TreeViewControlledStateBar = () => {
  const treeView = useTreeViewContext();

  return (
    <chakra.div color="fg.subtle" fontSize="xs">
      {treeView.selectedId ?? "none"} selected
    </chakra.div>
  );
};

export {
  TreeViewContextStateExample,
  TreeViewControlledExample,
  TreeViewUncontrolledRootExample,
};

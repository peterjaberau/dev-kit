"use client";

import { useState } from "react";
import type { TreeViewApi, TreeViewDataNode, UseTreeViewProps } from "./treeview-types";

export const useTreeView = <TNode extends TreeViewDataNode>(
  props: UseTreeViewProps<TNode>,
): TreeViewApi<TNode> => {
  const {
    nodes,
    expandedIds: controlledExpandedIds,
    selectedId: controlledSelectedId,
    defaultExpandedIds = [],
    defaultSelectedId,
    expandOnNodeClick = false,
    onExpandedIdsChange,
    onSelectedIdChange,
  } = props;
  const [uncontrolledExpandedIds, setUncontrolledExpandedIds] = useState(
    () => new Set(defaultExpandedIds),
  );
  const [uncontrolledSelectedId, setUncontrolledSelectedId] =
    useState(defaultSelectedId);

  const expandedIds = controlledExpandedIds ?? uncontrolledExpandedIds;
  const selectedId = controlledSelectedId ?? uncontrolledSelectedId;

  const setExpandedIds = (next: Set<string>) => {
    if (controlledExpandedIds === undefined) {
      setUncontrolledExpandedIds(next);
    }
    onExpandedIdsChange?.(next);
  };

  const setSelectedId = (next: string) => {
    if (controlledSelectedId === undefined) {
      setUncontrolledSelectedId(next);
    }
    onSelectedIdChange?.(next);
  };

  const isBranch = (node: TNode) => Boolean(node.children?.length);
  const isExpanded = (node: TNode) => expandedIds.has(node.id);
  const isSelected = (node: TNode) => selectedId === node.id;
  const isTopLevelNode = (node: TNode) =>
    nodes.some((topLevelNode) => topLevelNode.id === node.id);

  const selectNode = (node: TNode) => setSelectedId(node.id);

  const toggleNode = (node: TNode) => {
    if (!isBranch(node)) return;

    const next = new Set(expandedIds);

    if (next.has(node.id)) {
      next.delete(node.id);
    } else {
      next.add(node.id);
    }

    setExpandedIds(next);
  };

  return {
    nodes,
    expandedIds,
    selectedId,
    expandOnNodeClick,
    isBranch,
    isExpanded,
    isSelected,
    isTopLevelNode,
    selectNode,
    toggleNode,
    getNodeProps: ({ node, level }) => ({
      level,
      branch: isBranch(node),
      expanded: isBranch(node) ? isExpanded(node) : undefined,
      selected: isSelected(node),
      onClick: (event) => {
        event.stopPropagation();
        selectNode(node);
        if (expandOnNodeClick) {
          toggleNode(node);
        }
      },
      onKeyDown: (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          event.stopPropagation();
          selectNode(node);
          toggleNode(node);
        }
      },
    }),
    getToggleProps: ({ node }) => ({
      expanded: isExpanded(node),
      disabled: !isBranch(node),
      "aria-label": isExpanded(node) ? "Collapse item" : "Expand item",
      onClick: (event) => {
        event.stopPropagation();
        toggleNode(node);
      },
    }),
  };
};

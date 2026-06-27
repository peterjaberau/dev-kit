"use client";

import { TreeView, machinePartTree } from "../components";
import { TreeViewCompositionTree } from "./composition-tree";
import { defaultExpandedIds, defaultSelectedId } from "./shared";
import type { TreeViewExampleProps } from "./shared";

export const TreeViewUncontrolledCompositionExample = (
  props: TreeViewExampleProps,
) => {
  const { expandOnNodeClick, fullRowHighlight } = props;

  return (
    <TreeView.Root
      nodes={machinePartTree}
      defaultExpandedIds={defaultExpandedIds}
      defaultSelectedId={defaultSelectedId}
      fullRowHighlight={fullRowHighlight}
      expandOnNodeClick={expandOnNodeClick}
    >
      <TreeView.Label>Uncontrolled composition root</TreeView.Label>
      <TreeViewCompositionTree />
    </TreeView.Root>
  );
};

"use client";

import { TreeView, machinePartTree } from "../components";
import { defaultExpandedIds, defaultSelectedId } from "./shared";
import type { TreeViewExampleProps } from "./shared";

export const TreeViewUncontrolledJsonExample = (props: TreeViewExampleProps) => {
  const { expandOnNodeClick, fullRowHighlight } = props;

  return (
    <TreeView.View
      label="Uncontrolled JSON view"
      nodes={machinePartTree}
      defaultExpandedIds={defaultExpandedIds}
      defaultSelectedId={defaultSelectedId}
      fullRowHighlight={fullRowHighlight}
      expandOnNodeClick={expandOnNodeClick}
    />
  );
};

"use client";

import { chakra } from "@chakra-ui/react";
import React from "react";
import { useTreeViewContext } from "../use-treeview-context";
import type { TreeViewNodeStateProps } from "../treeview-types";

export type TreeViewNodeProps = React.ComponentProps<typeof chakra.div> &
  TreeViewNodeStateProps;

export const TreeViewNode = React.forwardRef<HTMLDivElement, TreeViewNodeProps>(
  (props, ref) => {
    const { styles } = useTreeViewContext();
    const { level, branch, expanded, selected, css, style, ...nodeProps } =
      props;

    return (
      <chakra.div
        ref={ref}
        css={[styles.node, css]}
        data-slot="node"
        data-branch={branch || undefined}
        data-expanded={expanded || undefined}
        data-selected={selected || undefined}
        role="treeitem"
        aria-expanded={expanded}
        aria-selected={selected}
        style={
          {
            "--level": String(level),
            ...style,
          } as React.CSSProperties
        }
        tabIndex={0}
        {...nodeProps}
      />
    );
  },
);

TreeViewNode.displayName = "TreeViewNode";

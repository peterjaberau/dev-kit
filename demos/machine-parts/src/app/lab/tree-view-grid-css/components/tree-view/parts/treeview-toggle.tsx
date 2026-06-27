"use client";

import { chakra } from "@chakra-ui/react";
import React from "react";
import { useTreeViewContext } from "../use-treeview-context";
import type { TreeViewToggleStateProps } from "../treeview-types";

export type TreeViewToggleProps = React.ComponentProps<typeof chakra.button> &
  TreeViewToggleStateProps;

export const TreeViewToggle = React.forwardRef<
  HTMLButtonElement,
  TreeViewToggleProps
>((props, ref) => {
  const { styles } = useTreeViewContext();
  const { expanded, css, ...toggleProps } = props;

  return (
    <chakra.button
      ref={ref}
      css={[styles.toggle, css]}
      data-slot="toggle"
      data-expanded={expanded || undefined}
      type="button"
      {...toggleProps}
    />
  );
});

TreeViewToggle.displayName = "TreeViewToggle";

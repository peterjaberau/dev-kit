"use client";

import { chakra } from "@chakra-ui/react";
import React from "react";
import { useTreeViewContext } from "./use-treeview-context";

export const TreeViewItemContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof chakra.div>
>((props, ref) => {
  const { styles } = useTreeViewContext();
  const { css, ...rest } = props;

  return (
    <chakra.div
      ref={ref}
      css={[styles.itemContent, css]}
      data-node-row-cell="true"
      data-slot="item-content"
      {...rest}
    />
  );
});

TreeViewItemContent.displayName = "TreeViewItemContent";

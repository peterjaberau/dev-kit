"use client";

import { chakra } from "@chakra-ui/react";
import React from "react";
import { useTreeViewContext } from "../use-treeview-context";

export const TreeViewNodeChild = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof chakra.div>
>((props, ref) => {
  const { styles } = useTreeViewContext();
  const { css, ...rest } = props;

  return (
    <chakra.div
      ref={ref}
      css={[styles.nodeChild, css]}
      data-slot="node-child"
      role="group"
      {...rest}
    />
  );
});

TreeViewNodeChild.displayName = "TreeViewNodeChild";

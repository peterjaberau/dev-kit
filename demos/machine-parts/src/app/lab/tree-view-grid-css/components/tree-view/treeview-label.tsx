"use client";

import { chakra } from "@chakra-ui/react";
import React from "react";
import { useTreeViewContext } from "./use-treeview-context";

export const TreeViewLabel = React.forwardRef<
  HTMLHeadingElement,
  React.ComponentProps<typeof chakra.h2>
>((props, ref) => {
  const { styles } = useTreeViewContext();
  const { css, ...rest } = props;

  return (
    <chakra.h2
      ref={ref}
      css={[styles.label, css]}
      data-slot="label"
      {...rest}
    />
  );
});

TreeViewLabel.displayName = "TreeViewLabel";

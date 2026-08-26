"use client";

import { chakra } from "@chakra-ui/react";
import React from "react";
import { useTreeViewContext } from "./use-treeview-context";

export const TreeViewText = React.forwardRef<
  HTMLSpanElement,
  React.ComponentProps<typeof chakra.span>
>((props, ref) => {
  const { styles } = useTreeViewContext();
  const { css, ...rest } = props;

  return (
    <chakra.span
      ref={ref}
      css={[styles.text, css]}
      data-slot="text"
      {...rest}
    />
  );
});

TreeViewText.displayName = "TreeViewText";

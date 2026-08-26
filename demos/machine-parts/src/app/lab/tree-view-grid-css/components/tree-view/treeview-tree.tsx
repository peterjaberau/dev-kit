"use client";

import { chakra } from "@chakra-ui/react";
import React, { useRef, useState } from "react"
import { useTreeViewContext } from "./use-treeview-context";

export const TreeViewTree = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof chakra.div>
>((props, ref) => {
  const { styles } = useTreeViewContext();
  const { css, ...rest } = props;

  const refTree = useRef<HTMLDivElement | null>(null);
  const [state, setState] = useState<"idle" | "is-over">("idle")

  return (
    <chakra.div
      ref={ref}
      css={[styles.tree, css]}
      data-slot="tree"
      role="tree"
      {...rest}
    />
  );
});

TreeViewTree.displayName = "TreeViewTree";

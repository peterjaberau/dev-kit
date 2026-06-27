"use client";

import { chakra, useSlotRecipe } from "@chakra-ui/react";
import React, { useMemo } from "react";
import { treeViewRecipe } from "../recipe";
import { TreeViewContext } from "./treeview-context";
import type { TreeViewContextValue } from "./treeview-context";
import type {
  TreeViewApi,
  TreeViewDataNode,
  TreeViewRecipeVariantProps,
} from "./treeview-types";

export type TreeViewRootProviderProps<
  TNode extends TreeViewDataNode = TreeViewDataNode,
> = React.ComponentProps<typeof chakra.div> &
  TreeViewRecipeVariantProps & {
    value: TreeViewApi<TNode>;
    children: React.ReactNode;
  };

const TreeViewRootProviderRender = <
  TNode extends TreeViewDataNode = TreeViewDataNode,
>(
  props: TreeViewRootProviderProps<TNode>,
  ref: React.ForwardedRef<HTMLDivElement>,
) => {
  const recipe = useSlotRecipe({ recipe: treeViewRecipe });
  const [recipeProps, localProps] = recipe.splitVariantProps(props);
  const { value, children, css, ...rootProps } = localProps;
  const styles = recipe({
    expandOnNodeClick: value.expandOnNodeClick,
    ...recipeProps,
  });
  const context = useMemo(
    () =>
      ({ ...value, styles }) as unknown as TreeViewContextValue<TreeViewDataNode>,
    [styles, value],
  );

  return (
    <TreeViewContext.Provider value={context}>
      <chakra.div
        ref={ref}
        css={[styles.root, css]}
        data-slot="root"
        {...rootProps}
      >
        {children}
      </chakra.div>
    </TreeViewContext.Provider>
  );
};

const TreeViewRootProviderComponent = React.forwardRef(
  TreeViewRootProviderRender,
);

TreeViewRootProviderComponent.displayName = "TreeViewRootProvider";

export const TreeViewRootProvider = TreeViewRootProviderComponent as <
  TNode extends TreeViewDataNode = TreeViewDataNode,
>(
  props: TreeViewRootProviderProps<TNode> & React.RefAttributes<HTMLDivElement>,
) => React.ReactElement | null;

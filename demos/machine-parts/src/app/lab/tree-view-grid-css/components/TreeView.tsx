"use client";

import { chakra, useSlotRecipe } from "@chakra-ui/react";
import type { RecipeVariantProps } from "@chakra-ui/react";
import { ChevronRight } from "lucide-react";
import React, { useMemo, useState } from "react";
import { treeViewRecipe } from "./recipe";
import type { TreeViewDataNode } from "./data";

type TreeViewRecipeVariantProps = RecipeVariantProps<typeof treeViewRecipe>;

export type UseTreeViewProps<TNode extends TreeViewDataNode = TreeViewDataNode> =
  {
    nodes: TNode[];
    expandedIds?: Set<string>;
    selectedId?: string;
    defaultExpandedIds?: string[];
    defaultSelectedId?: string;
    expandOnNodeClick?: boolean;
    onExpandedIdsChange?: (expandedIds: Set<string>) => void;
    onSelectedIdChange?: (selectedId: string) => void;
  };

export type TreeViewApi<TNode extends TreeViewDataNode = TreeViewDataNode> = {
  nodes: TNode[];
  expandedIds: Set<string>;
  selectedId?: string;
  expandOnNodeClick: boolean;
  isBranch: (node: TNode) => boolean;
  isExpanded: (node: TNode) => boolean;
  isSelected: (node: TNode) => boolean;
  selectNode: (node: TNode) => void;
  toggleNode: (node: TNode) => void;
  getNodeProps: (details: {
    node: TNode;
    level: number;
  }) => Pick<
    TreeViewNodeProps,
    "branch" | "expanded" | "level" | "onClick" | "onKeyDown" | "selected"
  >;
  getToggleProps: (details: {
    node: TNode;
  }) => Pick<
    TreeViewToggleProps,
    "aria-label" | "disabled" | "expanded" | "onClick"
  >;
};

type TreeViewContextValue<TNode extends TreeViewDataNode = TreeViewDataNode> =
  TreeViewApi<TNode> & {
    styles: ReturnType<ReturnType<typeof useSlotRecipe>>;
  };

const TreeViewContext =
  React.createContext<TreeViewContextValue<TreeViewDataNode> | null>(null);

export const useTreeView = <TNode extends TreeViewDataNode>(
  props: UseTreeViewProps<TNode>,
): TreeViewApi<TNode> => {
  const {
    nodes,
    expandedIds: controlledExpandedIds,
    selectedId: controlledSelectedId,
    defaultExpandedIds = [],
    defaultSelectedId,
    expandOnNodeClick = false,
    onExpandedIdsChange,
    onSelectedIdChange,
  } = props;
  const [uncontrolledExpandedIds, setUncontrolledExpandedIds] = useState(
    () => new Set(defaultExpandedIds),
  );
  const [uncontrolledSelectedId, setUncontrolledSelectedId] =
    useState(defaultSelectedId);

  const expandedIds = controlledExpandedIds ?? uncontrolledExpandedIds;
  const selectedId = controlledSelectedId ?? uncontrolledSelectedId;

  const setExpandedIds = (next: Set<string>) => {
    if (controlledExpandedIds === undefined) {
      setUncontrolledExpandedIds(next);
    }
    onExpandedIdsChange?.(next);
  };

  const setSelectedId = (next: string) => {
    if (controlledSelectedId === undefined) {
      setUncontrolledSelectedId(next);
    }
    onSelectedIdChange?.(next);
  };

  const isBranch = (node: TNode) => Boolean(node.children?.length);
  const isExpanded = (node: TNode) => expandedIds.has(node.id);
  const isSelected = (node: TNode) => selectedId === node.id;

  const selectNode = (node: TNode) => setSelectedId(node.id);

  const toggleNode = (node: TNode) => {
    if (!isBranch(node)) return;

    const next = new Set(expandedIds);

    if (next.has(node.id)) {
      next.delete(node.id);
    } else {
      next.add(node.id);
    }

    setExpandedIds(next);
  };

  const api: TreeViewApi<TNode> = {
    nodes,
    expandedIds,
    selectedId,
    expandOnNodeClick,
    isBranch,
    isExpanded,
    isSelected,
    selectNode,
    toggleNode,
    getNodeProps: ({ node, level }) => ({
      level,
      branch: isBranch(node),
      expanded: isBranch(node) ? isExpanded(node) : undefined,
      selected: isSelected(node),
      onClick: (event) => {
        event.stopPropagation();
        selectNode(node);
        if (expandOnNodeClick) {
          toggleNode(node);
        }
      },
      onKeyDown: (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          event.stopPropagation();
          selectNode(node);
          toggleNode(node);
        }
      },
    }),
    getToggleProps: ({ node }) => ({
      expanded: isExpanded(node),
      disabled: !isBranch(node),
      "aria-label": isExpanded(node) ? "Collapse item" : "Expand item",
      onClick: (event) => {
        event.stopPropagation();
        toggleNode(node);
      },
    }),
  };

  return api;
};

export const useTreeViewContext = <
  TNode extends TreeViewDataNode = TreeViewDataNode,
>() => {
  const context = React.useContext(TreeViewContext);

  if (!context) {
    throw new Error("TreeView parts must be rendered inside TreeViewRoot");
  }

  return context as unknown as TreeViewContextValue<TNode>;
};

type TreeViewRootProviderProps<
  TNode extends TreeViewDataNode = TreeViewDataNode,
> = React.ComponentProps<typeof chakra.div> &
  TreeViewRecipeVariantProps & {
    value: TreeViewApi<TNode>;
    children: React.ReactNode;
  };

export const TreeViewRootProvider = <
  TNode extends TreeViewDataNode = TreeViewDataNode,
>(
  props: TreeViewRootProviderProps<TNode>,
) => {
  const {
    value,
    children,
    css,
    className,
    fullRowHighlight = true,
    expandOnNodeClick = value.expandOnNodeClick,
    ...rest
  } = props;
  const recipe = useSlotRecipe({ recipe: treeViewRecipe });
  const styles = recipe({ fullRowHighlight, expandOnNodeClick });
  const context = useMemo(
    () =>
      ({ ...value, styles }) as unknown as TreeViewContextValue<TreeViewDataNode>,
    [styles, value],
  );

  return (
    <TreeViewContext.Provider value={context}>
      <chakra.div
        css={{ ...styles.root, ...css }}
        className={className}
        data-slot="root"
        {...rest}
      >
        {children}
      </chakra.div>
    </TreeViewContext.Provider>
  );
};

type TreeViewRootProps<TNode extends TreeViewDataNode = TreeViewDataNode> =
  Omit<TreeViewRootProviderProps<TNode>, "value"> & UseTreeViewProps<TNode>;

export const TreeViewRoot = <
  TNode extends TreeViewDataNode = TreeViewDataNode,
>(
  props: TreeViewRootProps<TNode>,
) => {
  const {
    nodes,
    defaultExpandedIds,
    defaultSelectedId,
    expandOnNodeClick = false,
    children,
    ...rest
  } = props;
  const treeView = useTreeView({
    nodes,
    defaultExpandedIds,
    defaultSelectedId,
    expandOnNodeClick,
  });

  return (
    <TreeViewRootProvider
      value={treeView}
      expandOnNodeClick={expandOnNodeClick}
      {...rest}
    >
      {children}
    </TreeViewRootProvider>
  );
};

export const TreeViewLabel = (
  props: React.ComponentProps<typeof chakra.h2>,
) => {
  const { styles } = useTreeViewContext();
  const { css, className, ...rest } = props;

  return (
    <chakra.h2
      css={{ ...styles.label, ...css }}
      className={className}
      data-slot="label"
      {...rest}
    />
  );
};

export const TreeViewTree = (
  props: React.ComponentProps<typeof chakra.div>,
) => {
  const { styles } = useTreeViewContext();
  const { css, className, ...rest } = props;

  return (
    <chakra.div
      css={{ ...styles.tree, ...css }}
      className={className}
      data-slot="tree"
      role="tree"
      {...rest}
    />
  );
};

type TreeViewNodeProps = React.ComponentProps<typeof chakra.div> & {
  level: number;
  branch?: boolean;
  expanded?: boolean;
  selected?: boolean;
};

export const TreeViewNode = (props: TreeViewNodeProps) => {
  const { styles } = useTreeViewContext();
  const {
    level,
    branch,
    expanded,
    selected,
    css,
    className,
    style,
    ...rest
  } = props;

  return (
    <chakra.div
      css={{ ...styles.node, ...css }}
      className={className}
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
      {...rest}
    />
  );
};

export const TreeViewNodeIndent = (
  props: React.ComponentProps<typeof chakra.div>,
) => {
  const { styles } = useTreeViewContext();
  const { css, className, ...rest } = props;

  return (
    <chakra.div
      css={{ ...styles.nodeIndent, ...css }}
      className={className}
      data-node-row-cell="true"
      data-slot="node-indent"
      {...rest}
    />
  );
};

export const TreeViewNodeStart = (
  props: React.ComponentProps<typeof chakra.div>,
) => {
  const { styles } = useTreeViewContext();
  const { css, className, ...rest } = props;

  return (
    <chakra.div
      css={{ ...styles.nodeStart, ...css }}
      className={className}
      data-node-row-cell="true"
      data-slot="node-start"
      {...rest}
    />
  );
};

type TreeViewToggleProps = React.ComponentProps<typeof chakra.button> & {
  expanded?: boolean;
};

export const TreeViewToggle = (props: TreeViewToggleProps) => {
  const { styles } = useTreeViewContext();
  const { expanded, css, className, ...rest } = props;

  return (
    <chakra.button
      css={{ ...styles.toggle, ...css }}
      className={className}
      data-slot="toggle"
      data-expanded={expanded || undefined}
      type="button"
      {...rest}
    />
  );
};

export const TreeViewNodeContent = (
  props: React.ComponentProps<typeof chakra.div>,
) => {
  const { styles } = useTreeViewContext();
  const { css, className, ...rest } = props;

  return (
    <chakra.div
      css={{ ...styles.nodeContent, ...css }}
      className={className}
      data-node-row-cell="true"
      data-slot="node-content"
      {...rest}
    />
  );
};

export const TreeViewNodeEnd = (
  props: React.ComponentProps<typeof chakra.div>,
) => {
  const { styles } = useTreeViewContext();
  const { css, className, ...rest } = props;

  return (
    <chakra.div
      css={{ ...styles.nodeEnd, ...css }}
      className={className}
      data-node-row-cell="true"
      data-slot="node-end"
      {...rest}
    />
  );
};

export const TreeViewNodeChild = (
  props: React.ComponentProps<typeof chakra.div>,
) => {
  const { styles } = useTreeViewContext();
  const { css, className, ...rest } = props;

  return (
    <chakra.div
      css={{ ...styles.nodeChild, ...css }}
      className={className}
      data-slot="node-child"
      role="group"
      {...rest}
    />
  );
};

export const TreeViewIcon = (
  props: React.ComponentProps<typeof chakra.span>,
) => {
  const { styles } = useTreeViewContext();
  const { css, className, ...rest } = props;

  return (
    <chakra.span
      css={{ ...styles.icon, ...css }}
      className={className}
      data-slot="icon"
      aria-hidden="true"
      {...rest}
    />
  );
};

export const TreeViewText = (
  props: React.ComponentProps<typeof chakra.span>,
) => {
  const { styles } = useTreeViewContext();
  const { css, className, ...rest } = props;

  return (
    <chakra.span
      css={{ ...styles.text, ...css }}
      className={className}
      data-slot="text"
      {...rest}
    />
  );
};

export const TreeViewMeta = (
  props: React.ComponentProps<typeof chakra.span>,
) => {
  const { styles } = useTreeViewContext();
  const { css, className, ...rest } = props;

  return (
    <chakra.span
      css={{ ...styles.meta, ...css }}
      className={className}
      data-slot="meta"
      {...rest}
    />
  );
};

type TreeViewJsonTreeProps<TNode extends TreeViewDataNode = TreeViewDataNode> =
  {
    renderIcon?: (node: TNode) => React.ReactNode;
    renderContent?: (node: TNode) => React.ReactNode;
    renderEnd?: (node: TNode) => React.ReactNode;
  };

export const TreeViewJsonTree = <
  TNode extends TreeViewDataNode = TreeViewDataNode,
>(
  props: TreeViewJsonTreeProps<TNode>,
) => {
  const treeView = useTreeViewContext<TNode>();

  return (
    <TreeViewTree>
      {treeView.nodes.map((node) => (
        <TreeViewJsonNode key={node.id} level={1} node={node} {...props} />
      ))}
    </TreeViewTree>
  );
};

type TreeViewJsonNodeProps<TNode extends TreeViewDataNode = TreeViewDataNode> =
  TreeViewJsonTreeProps<TNode> & {
    node: TNode;
    level: number;
  };

const TreeViewJsonNode = <TNode extends TreeViewDataNode>(
  props: TreeViewJsonNodeProps<TNode>,
) => {
  const { node, level, renderContent, renderEnd, renderIcon } = props;
  const treeView = useTreeViewContext<TNode>();

  return (
    <TreeViewNode {...treeView.getNodeProps({ node, level })}>
      <TreeViewNodeIndent />
      <TreeViewNodeStart>
        <TreeViewToggle {...treeView.getToggleProps({ node })}>
          <ChevronRight aria-hidden="true" />
        </TreeViewToggle>
      </TreeViewNodeStart>
      <TreeViewNodeContent onClick={() => treeView.selectNode(node)}>
        {renderIcon ? <TreeViewIcon>{renderIcon(node)}</TreeViewIcon> : null}
        {renderContent ? (
          renderContent(node)
        ) : (
          <TreeViewText>{node.label}</TreeViewText>
        )}
      </TreeViewNodeContent>
      <TreeViewNodeEnd onClick={() => treeView.selectNode(node)}>
        {renderEnd
          ? renderEnd(node)
          : node.meta
            ? <TreeViewMeta>{node.meta}</TreeViewMeta>
            : null}
      </TreeViewNodeEnd>
      {treeView.isBranch(node) && treeView.isExpanded(node) ? (
        <TreeViewNodeChild>
          {node.children?.map((child) => (
            <TreeViewJsonNode
              key={child.id}
              level={level + 1}
              node={child as TNode}
              renderContent={renderContent}
              renderEnd={renderEnd}
              renderIcon={renderIcon}
            />
          ))}
        </TreeViewNodeChild>
      ) : null}
    </TreeViewNode>
  );
};

type TreeViewProps<TNode extends TreeViewDataNode = TreeViewDataNode> = Omit<
  TreeViewRootProps<TNode>,
  "children"
> & {
  label: React.ReactNode;
} & TreeViewJsonTreeProps<TNode>;

export const TreeView = <
  TNode extends TreeViewDataNode = TreeViewDataNode,
>(
  props: TreeViewProps<TNode>,
) => {
  const { label, renderContent, renderEnd, renderIcon, ...rootProps } = props;

  return (
    <TreeViewRoot {...rootProps}>
      <TreeViewLabel>{label}</TreeViewLabel>
      <TreeViewJsonTree
        renderContent={renderContent}
        renderEnd={renderEnd}
        renderIcon={renderIcon}
      />
    </TreeViewRoot>
  );
};

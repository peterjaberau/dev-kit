"use client";

import { ChevronRight } from "lucide-react";
import React from "react";
import { TreeViewIcon } from "../treeview-icon";
import { TreeViewMeta } from "../treeview-meta";
import { TreeViewNode } from "../treeview-node";
import { TreeViewNodeChild } from "../treeview-node-child";
import { TreeViewItemContent } from "../treeview-item-content";
import { TreeViewItemEnd } from "../treeview-item-end";
import { TreeViewItemIndent } from "../treeview-item-indent";
import { TreeViewItem } from "../treeview-item";
import { TreeViewItemStart } from "../treeview-item-start";
import { TreeViewText } from "../treeview-text";
import { TreeViewToggle } from "../treeview-toggle";
import { TreeViewTree } from "../treeview-tree";
import { useTreeViewContext } from "../use-treeview-context";
import type { TreeViewDataNode } from "../treeview-types";

export type TreeViewJsonTreeProps<
  TNode extends TreeViewDataNode = TreeViewDataNode,
> = {
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

type TreeViewJsonNodeProps<
  TNode extends TreeViewDataNode = TreeViewDataNode,
> = TreeViewJsonTreeProps<TNode> & {
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
      <TreeViewItem>
        <TreeViewItemIndent />
        <TreeViewItemStart>
          <TreeViewToggle {...treeView.getToggleProps({ node })}>
            <ChevronRight aria-hidden="true" />
          </TreeViewToggle>
        </TreeViewItemStart>
        <TreeViewItemContent onClick={() => treeView.selectNode(node)}>
          {renderIcon ? <TreeViewIcon>{renderIcon(node)}</TreeViewIcon> : null}
          {renderContent ? (
            renderContent(node)
          ) : (
            <TreeViewText>{node.label}</TreeViewText>
          )}
        </TreeViewItemContent>
        <TreeViewItemEnd onClick={() => treeView.selectNode(node)}>
          <TreeViewMeta>
            {treeView.isTopLevelNode(node) ? "Top" : "Nested"}
          </TreeViewMeta>
          {renderEnd
            ? renderEnd(node)
            : node.meta
              ? <TreeViewMeta>{node.meta}</TreeViewMeta>
              : null}
        </TreeViewItemEnd>
      </TreeViewItem>
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

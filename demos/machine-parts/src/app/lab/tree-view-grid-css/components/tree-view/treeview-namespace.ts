import { TreeViewJsonTree } from "./extensions/treeview-json-tree";
import { TreeViewView } from "./extensions/treeview-view";
import { TreeViewIcon } from "./treeview-icon";
import { TreeViewLabel } from "./treeview-label";
import { TreeViewMeta } from "./treeview-meta";
import { TreeViewNode } from "./treeview-node";
import { TreeViewNodeChild } from "./treeview-node-child";
import { TreeViewItemContent } from "./treeview-item-content";
import { TreeViewItemEnd } from "./treeview-item-end";
import { TreeViewItemIndent } from "./treeview-item-indent";
import { TreeViewItem } from "./treeview-item";
import { TreeViewItemStart } from "./treeview-item-start";
import { TreeViewRoot } from "./treeview-root";
import { TreeViewRootProvider } from "./treeview-root-provider";
import { TreeViewText } from "./treeview-text";
import { TreeViewToggle } from "./treeview-toggle";
import { TreeViewTree } from "./treeview-tree";

export const TreeView = {
  Root: TreeViewRoot,
  RootProvider: TreeViewRootProvider,
  Label: TreeViewLabel,
  Tree: TreeViewTree,
  Node: TreeViewNode,
  Item: TreeViewItem,
  ItemIndent: TreeViewItemIndent,
  ItemStart: TreeViewItemStart,
  ItemContent: TreeViewItemContent,
  ItemEnd: TreeViewItemEnd,
  NodeChild: TreeViewNodeChild,
  Toggle: TreeViewToggle,
  Icon: TreeViewIcon,
  Text: TreeViewText,
  Meta: TreeViewMeta,
  JsonTree: TreeViewJsonTree,
  View: TreeViewView,
} as const;

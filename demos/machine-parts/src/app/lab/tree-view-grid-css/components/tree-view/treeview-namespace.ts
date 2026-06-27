import { TreeViewJsonTree } from "./treeview-json-tree";
import { TreeViewRoot } from "./treeview-root";
import { TreeViewRootProvider } from "./treeview-root-provider";
import { TreeViewView } from "./treeview-view";
import {
  TreeViewIcon,
  TreeViewLabel,
  TreeViewMeta,
  TreeViewNode,
  TreeViewNodeChild,
  TreeViewNodeContent,
  TreeViewNodeEnd,
  TreeViewNodeIndent,
  TreeViewNodeStart,
  TreeViewText,
  TreeViewToggle,
  TreeViewTree,
} from "./parts";

export const TreeView = {
  Root: TreeViewRoot,
  RootProvider: TreeViewRootProvider,
  Label: TreeViewLabel,
  Tree: TreeViewTree,
  Node: TreeViewNode,
  NodeIndent: TreeViewNodeIndent,
  NodeStart: TreeViewNodeStart,
  NodeContent: TreeViewNodeContent,
  NodeEnd: TreeViewNodeEnd,
  NodeChild: TreeViewNodeChild,
  Toggle: TreeViewToggle,
  Icon: TreeViewIcon,
  Text: TreeViewText,
  Meta: TreeViewMeta,
  JsonTree: TreeViewJsonTree,
  View: TreeViewView,
} as const;

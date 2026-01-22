import { Instruction } from "@atlaskit/pragmatic-drag-and-drop-hitbox/list-item";

import { ProjectDragType } from "./constants";

export type WorkspaceMode = "LIVE" | "DESIGN"
export type StreamResourcesEvent = {
  id: string
  name: string
  path: any
  class: any
  kind: any
  protocol?: any
  order?: number
  expanded: boolean
}
export type StreamProjectsEvent = {
  id: string
  name: string
  order?: number
  expanded: boolean
  branch?: any
  iconPath?: string
  archived: boolean
}


export interface ProjectTreeRootNode extends StreamProjectsEvent {
  childNodes: ProjectTreeNode[];
}

export interface ProjectTreeNode extends StreamResourcesEvent {
  childNodes: ProjectTreeNode[];
}

export interface ProjectTreeRootNodeProps {
  node: ProjectTreeRootNode;
}

export interface DragNode {
  projectId: string;
  repository?: string;
  node: ProjectTreeNode;
  parentNode: ProjectTreeNode;
}

export interface DropNode {
  projectId: string;
  repository?: string;
  node: ProjectTreeNode;
  parentNode: ProjectTreeNode | ProjectTreeRootNode;
  instruction?: Instruction;
}

export interface DropRootNode {
  type: ProjectDragType.ROOT_NODE;
  projectId: string;
  repository?: string;
  node: ProjectTreeRootNode;
  instruction?: Instruction;
}

export interface ProjectTreeProps {
  tree: ProjectTreeRootNode;

  treePaddingLeft?: number;
  treePaddingRight?: number;
  nodeOffset?: number;
  searchInput?: string;
  displayMode?: WorkspaceMode;
  showOrders?: boolean;
}

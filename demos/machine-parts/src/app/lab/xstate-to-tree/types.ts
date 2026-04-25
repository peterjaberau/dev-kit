/**
 * Tree structure types for XState machine visualization
 */

export interface TreeNodeData {
  id: string;
  name: string;
  description?: string;
  tags: string[];
  entryActions: string[];
  exitActions: string[];
  invokes: Array<{ src: string; id: string }>;
  meta?: Record<string, unknown>;
  isInitial?: boolean;
  hasChildren: boolean;
  depth: number;
}

export interface TreeNode {
  data: TreeNodeData;
  children: TreeNode[];
  edges: TreeEdge[];
}

export interface TreeEdge {
  sourceId: string;
  targetId: string;
  eventType: string;
  guard?: { type: string } | null;
  actions?: readonly { type: string }[];
}

export interface TreeVisualizerOptions {
  title?: string;
  maxDescriptionLength?: number;
  includeGuards?: boolean;
  includeActions?: boolean;
  includeEntryActions?: boolean;
  includeExitActions?: boolean;
  includeInvokes?: boolean;
  includeTags?: boolean;
  includeMeta?: boolean;
  expandedByDefault?: boolean;
}
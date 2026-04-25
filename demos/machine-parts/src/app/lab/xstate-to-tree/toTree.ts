/**
 * Convert XState v5 machines to tree structure for custom visualization
 */

import {
  toDirectedGraph,
  type DirectedGraphNode,
} from "@xstate/graph";
import { type AnyStateMachine } from "xstate";
import { type TreeNode, type TreeNodeData, type TreeEdge, type TreeVisualizerOptions } from "./types";
import {
  getStateName,
  getDescription,
  getEntryActions,
  getExitActions,
  getInvokes,
  getTags,
  getMeta,
} from "./toMermaid";

/**
 * Build tree structure from XState machine
 * Recursively processes nodes and maintains hierarchical relationships
 */
export function toTree(
  machine: AnyStateMachine,
  options: TreeVisualizerOptions = {}
): TreeNode {
  const digraph = toDirectedGraph(machine);
  const processedNodes = new Map<string, TreeNode>();
  const allEdges: TreeEdge[] = [];

  const includeEntry = options.includeEntryActions ?? true;
  const includeExit = options.includeExitActions ?? true;
  const includeInvoke = options.includeInvokes ?? true;
  const includeTagsOpt = options.includeTags ?? true;
  const includeMetaOpt = options.includeMeta ?? true;

  /**
   * Recursively collect all edges from a node and its descendants
   */
  function collectEdges(node: DirectedGraphNode): void {
    for (const edge of node.edges) {
      allEdges.push({
        sourceId: edge.source.id,
        targetId: edge.target.id,
        eventType: edge.transition.eventType || "",
        guard: (edge.transition as any).guard,
        actions: (edge.transition as any).actions,
      });
    }
    for (const child of node.children) {
      collectEdges(child);
    }
  }

  /**
   * Process a single node and its children
   */
  function processNode(
    node: DirectedGraphNode,
    depth: number = 0
  ): TreeNode {
    const id = node.id;

    // Return cached node if already processed
    if (processedNodes.has(id)) {
      return processedNodes.get(id)!;
    }

    const name = getStateName(id);
    const desc = getDescription(node);
    const entry = includeEntry ? getEntryActions(node) : [];
    const exit = includeExit ? getExitActions(node) : [];
    const invokes = includeInvoke ? getInvokes(node) : [];
    const tags = includeTagsOpt ? getTags(node) : [];
    const meta = includeMetaOpt ? getMeta(node) : undefined;
    const hasChildren = node.children && node.children.length > 0;

    const data: TreeNodeData = {
      id,
      name,
      description: desc,
      tags,
      entryActions: entry,
      exitActions: exit,
      invokes,
      meta,
      hasChildren,
      depth,
    };

    const treeNode: TreeNode = {
      data,
      children: [],
      edges: [],
    };

    processedNodes.set(id, treeNode);

    // Process children
    if (hasChildren) {
      for (const child of node.children) {
        treeNode.children.push(processNode(child, depth + 1));
      }
    }

    return treeNode;
  }

  // Create root node
  const initial = machine.config.initial;
  const rootData: TreeNodeData = {
    id: "machine",
    name: options.title || "State Machine",
    tags: [],
    entryActions: [],
    exitActions: [],
    invokes: [],
    hasChildren: digraph.children.length > 0,
    depth: 0,
    isInitial: true,
  };

  const root: TreeNode = {
    data: rootData,
    children: [],
    edges: [],
  };

  // Process all children
  for (const child of digraph.children) {
    root.children.push(processNode(child, 1));
  }

  // Collect all edges
  for (const child of digraph.children) {
    collectEdges(child);
  }
  for (const edge of digraph.edges) {
    allEdges.push({
      sourceId: edge.source.id,
      targetId: edge.target.id,
      eventType: edge.transition.eventType || "",
      guard: (edge.transition as any).guard,
      actions: (edge.transition as any).actions,
    });
  }

  // Attach edges to appropriate nodes
  for (const edge of allEdges) {
    const sourceNode = findNodeById(root, edge.sourceId);
    if (sourceNode) {
      sourceNode.edges.push(edge);
    }
  }

  // Mark initial state
  if (initial && typeof initial === "string") {
    const initialNode = findNodeById(root, `machine.${initial}`);
    if (initialNode) {
      initialNode.data.isInitial = true;
    }
  }

  return root;
}

/**
 * Find a node by its ID in the tree
 */
export function findNodeById(root: TreeNode, id: string): TreeNode | null {
  if (root.data.id === id) {
    return root;
  }

  for (const child of root.children) {
    const found = findNodeById(child, id);
    if (found) {
      return found;
    }
  }

  return null;
}

/**
 * Get all nodes in the tree as a flat array
 */
export function getAllNodes(root: TreeNode): TreeNode[] {
  const nodes: TreeNode[] = [root];

  function traverse(node: TreeNode): void {
    for (const child of node.children) {
      nodes.push(child);
      traverse(child);
    }
  }

  traverse(root);
  return nodes;
}

/**
 * Get edges for a specific state, filtering by options
 */
export function getStateEdges(
  node: TreeNode,
  options: { includeGuards?: boolean; includeActions?: boolean } = {}
): TreeEdge[] {
  const { includeGuards = true, includeActions = true } = options;

  return node.edges.filter(edge => {
    // Always include the edge if no filtering is needed
    if (includeGuards && includeActions) {
      return true;
    }

    // Check if edge should be included based on content
    const hasGuard = edge.guard?.type;
    const hasActions = edge.actions && edge.actions.length > 0;

    if (!includeGuards && hasGuard) {
      return false;
    }
    if (!includeActions && hasActions) {
      return false;
    }

    return true;
  });
}
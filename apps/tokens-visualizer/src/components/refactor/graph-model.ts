import { StringMatchDictionaryItem } from "../workers/string-match";

// This file is now simplified to only contain type definitions,
// as the state management logic is handled by the XState machine.

export type GraphNodeId = string;

export const ValuePathSplitter = ":^;";
export const ValuesListSplitter = ":*;";

export interface GraphNode {
  type: "token" | "component" | "orphan-category";
  id: GraphNodeId;
  x: number;
  y: number;
  value?: string;
  adjacencyLabels?: { [targetId: string]: string };
}

export interface GraphState {
  width: number;
  height: number;
  topologyKey: string;
  nodes: { [uniquenessKey: string]: GraphNode };
  adjacencyList: { [GraphNodeId: string]: GraphNodeId[] };
}

export interface AppState {
  panX: number;
  panY: number;
  zoom: number;
  setFilters: string[];
  selectedComponents: string[];
  selectedTokens: string[];
}

// These types would also likely live in their own model files
// but are included here for completeness based on the original controller.
export type { StringMatchDictionaryItem };

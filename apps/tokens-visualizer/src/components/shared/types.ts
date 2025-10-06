/** Modules */

import React from "react"

/** App model */
export type SpectrumColorThemeValue = "" | "light" | "dark";

export interface AppState {
  panX: number;
  panY: number;
  zoom: number;
  spectrumColorTheme?: any;
  isDragging: boolean;
  fullscreenMode?: any;
  hoverNodeId?: string;
  setFilters?: string[];
  listOfComponents: string[]; // what are the spectrum component names?
  selectedTokens: string[]; // which tokens in the graph are 'selected'?
  selectionAncestorNodes: string[]; // what nodes are ancestors of 'selected' nodes?
  selectionDescendentNodes: string[]; // what nodes are descendents of 'selected' nodes?
  selectionDescendentIntersectNodes: string[]; // what nodes are descendents of 'selected' nodes?
  componentDescendentNodes: string[]; // what nodes are descendents of the the selected 'component' nodes?
  selectedComponents: string[]; // what are the selected component nodes?
  hoverUpstreamNodes: string[]; // what selectionDescendentNodes OR selectionAncestorNodes nodes are in the hovered nodes upstream tree?

  [key: string]: any
}

/** Graph model */

export type GraphNodeId = string

export interface GraphNode {
  type: "token" | "component" | "orphan-category"
  id: GraphNodeId
  x: number
  y: number
  value?: string
  adjacencyLabels?: { [targetId: string]: string }
  [key: string]: any
}

export interface MutableGraphNodeProperties {
  x?: number
  y?: number
  value?: string
  adjacencyLabels?: { [targetId: string]: string }
}

export interface GraphState {
  width?: number
  height?: number
  topologyKey?: string
  nodes: { [key: string]: any }
  adjacencyList: { [key: string]: any[] }
}


/** Graph Controller */
export type AdjacencyTuple = [GraphNodeId, GraphNodeId]
export type AdjacencyTuplesList = [GraphNodeId, GraphNodeId][]

export type NewAppStateCallbackFn = (state: AppState) => void

export type NewGraphStateCallbackFn = (state: GraphState, listOfComponents: string[]) => void

export type NewDictionaryCallbackFn = (dictionary: string[] | any[]) => void




/** Graph Datasources */

interface RawJsonSets {
  [setEnumVal: string]: RawJsonItem
}

type FoundSetsTraversalItem = {
  path: string[]
  sets: RawJsonSets
}

type FoundValuesItem = {
  path: string[]
  value: string
}

interface RawJsonItem {
  component?: string
  value?: string
  sets?: RawJsonSets
}

interface RawSpectrumTokenJson {
  [tokenIdentifier: string]: RawJsonItem
}


/** Graph Layout Worker */
export type GraphTraversalNodeTuple = [id: GraphNodeId, distance: number];

/** String Match Worker */
export interface StringMatchDictionaryItem {
  value: string;
  type: string;
  metadata: string;
}

export interface StringMatchSearchResult {
  value: string;
  type: string;
  matchMarkup: string;
}


// ** TolemGraphNodeProps */
export interface TokenGraphNodeProps {
  id: string
  value?: string
  type?: "token" | "component" | "orphan-category"
  isFaded?: boolean
  isIntersect?: boolean
  selected?: boolean
  selectionAncestor?: boolean
  selectionDescendent?: boolean
  hasDownstream?: boolean
  hoverUpstream?: boolean
  style: React.CSSProperties // For the position transform from the parent
  // Define callbacks to communicate with the parent component
  onNodeClick: (e: { id: string; shiftKey?: boolean; metaKey?: boolean } | any) => void
  onNodeDoubleClick: (e: { id: string }) => void
  onNodePointerDown: (e: { id: string }) => void
  onNodePointerOver: (e: { id: string }) => void
  onNodePointerOut: (e: { id: string }) => void
  onNodeDrag: (e: { id: string; delta: [number, number] }) => void
  onNodeDragStart: (e: { id: string }) => void
  onNodeDragEnd: (e: { id: string }) => void
  onCopyToClipboard: (e: { id: string }) => void
  [key: string]: any
}


/** Common */
export type ValueTuple = [value: string, path: string]

export type KeyValueObject = { [key: string]: any }

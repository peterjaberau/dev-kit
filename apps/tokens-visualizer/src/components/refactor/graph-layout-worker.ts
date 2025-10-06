// This file remains largely the same as it contains the pure logic for layout calculation.
// I've updated the imports to reflect the new model structure.

import {
  GraphState,
  GraphNodeId,
  ValuesListSplitter,
} from "../models/graph-model";

// Assuming a helper or model file for this now
class GraphModelForWorker {
  _state: GraphState;
  constructor(state: GraphState) {
    this._state = state;
  }
  get state() { return this._state; }
  setSize(w: number, h: number) {
    this._state.width = w;
    this._state.height = h;
  }
  orphanNodes(): string[] {
    let result = Object.keys(this._state.nodes);
    const adjacencies = Object.values(this._state.adjacencyList);
    adjacencies.forEach(
      (adjacencyList) =>
        (result = result.filter((x) => !adjacencyList.includes(x))),
    );
    return result;
  }
}


// These constants would ideally be imported from a shared config file.
const GRAPH_ROW_MARGIN = 20;
const GRAPH_COLUMN_WIDTH = 300;
const GRAPH_NODE_VALUE_HEIGHT = 18;
const GRAPH_NODE_VALUE_MARGIN = 4;
const GRAPH_NODE_VALUES_PADDING = 8;


type GraphTraversalNodeTuple = [id: GraphNodeId, distance: number];

function graphLayout(graphState: GraphState) {
  const graphModel = new GraphModelForWorker(JSON.parse(JSON.stringify(graphState)));

  const orphanNodes = graphModel.orphanNodes().sort((a, b) => {
    const nodeA = graphState.nodes[a];
    const nodeB = graphState.nodes[b];
    if (nodeA.type === nodeB.type) {
      return a > b ? 1 : -1;
    }
    return nodeA.type === "component" ? -1 : 1;
  });

  const nodesToLayout = orphanNodes.map(
    (orphanId) => [orphanId, 0] as GraphTraversalNodeTuple
  );

  nodesToLayout.sort((a, b) => (a[1] > b[1] ? 1 : -1));

  const columnNodeAssignments: string[][] = [];
  const columnInsertionPoints: number[] = [];
  const mapOfValidInsertionPoints: { [nodeId: string]: number[] } = {};

  let maxWidth = 0;
  let maxHeight = 0;

  while (nodesToLayout.length > 0) {
    const [id, depth] = nodesToLayout.shift() as GraphTraversalNodeTuple;
    const node = graphModel._state.nodes[id];
    if(!node) continue;

    const nodeValue = node.value || "";
    const nodeRowCount = nodeValue.split(ValuesListSplitter).length;
    const adjacencies = graphModel._state.adjacencyList[id] || [];
    adjacencies.sort();
    const nextDepth = depth + 1;
    const adjacencyTuples: GraphTraversalNodeTuple[] = adjacencies.map(
      (nextId) => [nextId, nextDepth]
    );

    nodesToLayout.push(...adjacencyTuples);

    if (typeof columnInsertionPoints[depth] !== "number") {
      columnInsertionPoints[depth] = 0;
      columnNodeAssignments[depth] = [];
    }

    node.x = depth * GRAPH_COLUMN_WIDTH;
    node.y = columnInsertionPoints[depth];

    columnInsertionPoints[depth] +=
      GRAPH_ROW_MARGIN +
      nodeRowCount * GRAPH_NODE_VALUE_HEIGHT +
      (GRAPH_NODE_VALUE_MARGIN * (nodeRowCount -1)) +
      GRAPH_NODE_VALUES_PADDING * 2;


    if (columnNodeAssignments[depth].indexOf(id) === -1) {
      columnNodeAssignments[depth].push(id);
      for (let index = 0; index < depth; index++) {
        const earlierColumn = columnNodeAssignments[index] || [];
        const placedIndex = earlierColumn.indexOf(id);
        if (placedIndex >= 0) {
          earlierColumn.splice(placedIndex, 1);
        }
      }
      mapOfValidInsertionPoints[id] = [];
    }

    mapOfValidInsertionPoints[id] = mapOfValidInsertionPoints[id] || [];
    mapOfValidInsertionPoints[id].push(node.y);

    maxWidth = Math.max(maxWidth, node.x);
    maxHeight = Math.max(maxHeight, node.y);
  }

  for (const [nodeId, points] of Object.entries(mapOfValidInsertionPoints)) {
    if (points.length > 2) {
      const middleIndex = Math.floor(points.length / 2);
      graphModel._state.nodes[nodeId].y = points[middleIndex];
    }
  }

  let priorColumnAncestorYValues = [0];
  columnNodeAssignments.forEach((assignments, colIndex) => {
    const averageAncestorY = priorColumnAncestorYValues.reduce((a, b) => a + b, 0) / priorColumnAncestorYValues.length;
    priorColumnAncestorYValues = [];
    const columnHeight = columnInsertionPoints[colIndex];
    const offset = colIndex === 0 ? 0 : averageAncestorY - columnHeight / 2;

    assignments.forEach((nodeId) => {
      const { y } = graphModel._state.nodes[nodeId];
      const newY = y + offset;
      graphModel._state.nodes[nodeId].y = newY;
      maxHeight = Math.max(maxHeight, newY);
      if (graphModel._state.adjacencyList[nodeId]) {
        priorColumnAncestorYValues.push(newY);
      }
    });
  });

  graphModel.setSize(maxWidth, maxHeight);
  self.postMessage(graphModel.state);
}

self.addEventListener("message", (event) => graphLayout(event.data));

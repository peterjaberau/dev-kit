"use client";

import type React from "react";
import { Flex, chakra } from '@chakra-ui/react'
import { isLeaf, type SplitNode, type NodeModel, type Orientation } from "#store/layoutSlice";
import LeafView from "./LeafView";

export default function SplitView(props: {
  split: SplitNode;
  selectedLeafId: string | null;
  onSelectLeaf: (id: string) => void;
  onGutterMouseDown: (e: React.MouseEvent<HTMLDivElement>, split: SplitNode) => void;
  splitRefs: React.RefObject<Map<string, HTMLDivElement | null>>;
  onLeafDragStart: (leafId: string) => void;
  onLeafDrop: (leafId: string) => void;
  onLeafDropEdge: (leafId: string, edge: "top" | "right" | "bottom" | "left") => void;
  onResetSplit: (splitId: string) => void;
  onRenameLeaf: (leafId: string, newLabel: string) => void;
  onDeleteLeaf: (leafId: string) => void;
  onSplitLeaf: (leafId: string, orientation: Orientation) => void;
}) {
  const { split } = props;
  const isRow = split.orientation === "row";
  // const dirClass = isRow ? "flex-row" : "flex-col";
  const gutterSize = 3; // px wider handle for easier grabbing
  const axisCursor = isRow ? "col-resize" : "row-resize";
  const half = gutterSize / 2;

  return (
    <chakra.div
      ref={(el: any) => {
        props.splitRefs.current.set(split.id, el);
      }}
      flexDirection={isRow ? 'row': 'column'}
      css={{
        width: 'full',
        height: 'full',
        display: 'flex'
      }}
      // className={`w-full h-full flex ${dirClass}`}
    >
      {/* Child 1 */}
      <chakra.div
        // className="relative flex-shrink-0"
        css={{
          position: 'relative',
          flexShrink: 0,
          flexBasis: isRow
            ? `calc(${split.sizes[0] * 100}% - ${half}px)`
            : `calc(${split.sizes[0] * 100}% - ${half}px)`,
        }}
      >
        <RenderNode {...props} node={split.children[0]} />
      </chakra.div>

      {/* Gutter */}
      <chakra.div

        // className="flex-shrink-0 select-none group"
        css={{
          flexShrink: 0,
          userSelect: 'none',
          width: isRow ? gutterSize : "100%",
          height: isRow ? "100%" : gutterSize,
          cursor: axisCursor,
          touchAction: "none",
          background: isRow
            ? "linear-gradient(to right, rgba(255,255,255,0.05), rgba(255,255,255,0.25), rgba(255,255,255,0.05))"
            : "linear-gradient(to bottom, rgba(255,255,255,0.05), rgba(255,255,255,0.25), rgba(255,255,255,0.05))",
        }}
        onMouseDown={(e) => {
          e.stopPropagation();
          props.onGutterMouseDown(e, split);
        }}
        onDoubleClick={(e) => {
          e.stopPropagation();
          // Reset to 50/50 on double click
          props.onResetSplit(split.id);
        }}
      />

      {/* Child 2 */}
      <chakra.div
        // className="relative flex-shrink-0"
        css={{
          position: 'relative',
          flexShrink: 0,
          flexBasis: isRow
            ? `calc(${split.sizes[1] * 100}% - ${half}px)`
            : `calc(${split.sizes[1] * 100}% - ${half}px)`,
        }}
      >
        <RenderNode {...props} node={split.children[1]} />
      </chakra.div>
    </chakra.div>
  );
}

function RenderNode(props: {
  node: NodeModel;
  selectedLeafId: string | null;
  onSelectLeaf: (id: string) => void;
  onGutterMouseDown: (e: React.MouseEvent<HTMLDivElement>, split: SplitNode) => void;
  splitRefs: React.RefObject<Map<string, HTMLDivElement | null>>;
  onLeafDragStart: (leafId: string) => void;
  onLeafDrop: (leafId: string) => void;
  onLeafDropEdge: (leafId: string, edge: "top" | "right" | "bottom" | "left") => void;
  onResetSplit: (splitId: string) => void;
  onRenameLeaf: (leafId: string, newLabel: string) => void;
  onDeleteLeaf: (leafId: string) => void;
  onSplitLeaf: (leafId: string, orientation: Orientation) => void;
}) {
  const { node } = props;
  if (isLeaf(node)) {
    return (
      <LeafView
        leaf={node}
        selected={props.selectedLeafId === node.id}
        onSelect={() => props.onSelectLeaf(node.id)}
        onDragStart={() => props.onLeafDragStart(node.id)}
        onDrop={() => props.onLeafDrop(node.id)}
        onDropEdge={(edge) => props.onLeafDropEdge(node.id, edge)}
        onRename={(newLabel) => props.onRenameLeaf(node.id, newLabel)}
        onDelete={() => props.onDeleteLeaf(node.id)}
        onSplit={(orientation) => props.onSplitLeaf(node.id, orientation)}
      />
    );
  }
  return <SplitView {...props} split={node} />;
}

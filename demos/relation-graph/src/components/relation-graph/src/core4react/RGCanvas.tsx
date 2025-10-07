'use client'

import React, { useContext, useEffect, useRef } from 'react';
import { devLog } from '#models-core/utils/RGCommon';
import { RelationGraphStoreContext } from "#components";
import type {
  RGLineSlotProps,
  RGNodeSlotProps,
  RelationGraphInstance
} from '#models-core/types';
import type { RefObject } from 'react';
import RGSingleGraph from './RGGraph';
import { RGNodeExpandHolderProps } from "#components/types";
import RGEasyView from "./RGEasyView";

export interface RGCanvasProps {
  nodeSlot?: React.FC<RGNodeSlotProps> | React.ReactNode
  lineSlot?: React.FC<RGLineSlotProps> | React.ReactNode
  svgDefs?: React.FC | React.ReactNode
  canvasPlugSlot?: React.FC<{relationGraph: RelationGraphInstance}> | React.ReactNode
  canvasPlugAboveSlot?: React.ReactNode
  expandHolderSlot?: React.FC<RGNodeExpandHolderProps> | React.ReactNode
}

const RGCanvas: React.FC<RGCanvasProps> = (canvasProps) => {
  const relationGraph = useContext(RelationGraphStoreContext);
  const seeksRGCanvas$ = useRef<HTMLDivElement | null>(null);
  const rgMap$ = useRef<HTMLDivElement | null>(null);

  const createCurrentStyles = () => ({
    width: `${relationGraph.options.canvasSize.width}px`,
    height: `${relationGraph.options.canvasSize.height}px`,
    marginLeft: `${relationGraph.options.canvasOffset.x}px`,
    marginTop: `${relationGraph.options.canvasOffset.y}px`,
    backgroundColor: 'transparent',
    transform: `scale(${relationGraph.options.canvasZoom! / 100}, ${relationGraph.options.canvasZoom! / 100})`,
  });

  const canvasSizeAndPosition = createCurrentStyles();

  // -----------------------------
  // Event handlers
  // -----------------------------
  const onDragStart = (e: React.MouseEvent | React.TouchEvent | any) => {
    if ((e as React.MouseEvent).type === "mousedown" && (e as React.MouseEvent).button !== 0) return;
    relationGraph.onCanvasDragStart(e);
  };

  const onContextMenu = (e: React.MouseEvent | React.TouchEvent | any) => {
    e.preventDefault();
    relationGraph.onContextmenu(e);
  };

  // -----------------------------
  // Wheel listener (passive)
  // -----------------------------
  useEffect(() => {
    devLog('[RGCanvas mounted]');
    relationGraph.setCanvasDom(seeksRGCanvas$.current!);

    if (!rgMap$.current) return;

    const handleWheel = (e: WheelEvent) => relationGraph.onMouseWheel(e);

    rgMap$.current.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      rgMap$.current?.removeEventListener('wheel', handleWheel);
    };
  }, [relationGraph]);

  // -----------------------------
  // Render
  // -----------------------------
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundImage: relationGraph.options.backgroundImage ? `url(${relationGraph.options.backgroundImage})` : undefined,
        backgroundColor: relationGraph.options.backgroundColor,
      }}
      ref={rgMap$}
      className={[
        'rel-map',
        relationGraph.options.canvasOpacity === 1 ? 'rel-map-ready' : undefined,
        relationGraph.options.layoutClassName,
        relationGraph.options.backgroundImageNoRepeat ? 'rel-map-background-norepeat' : '',
      ].filter(Boolean).join(' ')}
      onContextMenu={onContextMenu}
      onMouseDown={onDragStart}
      onTouchStart={onDragStart}
    >
      <RGEasyView />
      <div
        ref={seeksRGCanvas$}
        style={canvasSizeAndPosition}
        className="rel-map-canvas"
      >
        <div className="rel-canvas-slot rel-canvas-slot-behind">
          {canvasProps.canvasPlugSlot && (typeof canvasProps.canvasPlugSlot === 'function'
            ? <canvasProps.canvasPlugSlot relationGraph={relationGraph} />
            : canvasProps.canvasPlugSlot)}
        </div>

        <RGSingleGraph
          svgDefs={canvasProps.svgDefs}
          nodeSlot={canvasProps.nodeSlot}
          lineSlot={canvasProps.lineSlot}
          expandHolderSlot={canvasProps.expandHolderSlot}
        />

        <div className="rel-canvas-slot rel-canvas-slot-above">
          {canvasProps.canvasPlugAboveSlot}
        </div>
      </div>
    </div>
  );
};

export default RGCanvas;

'use client'

import React, {RefObject, useContext, useEffect, useRef} from 'react';
import {RelationGraphStoreContext} from "#components";
import {RGCanvasProps} from './RGCanvas';
import { devLog } from '#models-core/utils/RGCommon';

const RGCanvas: React.FC<RGCanvasProps> = (canvasProps) => {
  const relationGraph = useContext(RelationGraphStoreContext);
  const options = relationGraph.options;
  const rgEasyCanvas$ = useRef(null as any) as RefObject<HTMLCanvasElement>;

  useEffect(() => {
    devLog('[RGEasyView mounted]');
    relationGraph.setEasyViewCanvas(rgEasyCanvas$.current!);
  }, []);

  return (
    <div className={`rel-easy-view ${options.showEasyView ? 'rel-easy-view-active' : ''}`}>
      <canvas ref={rgEasyCanvas$} />
    </div>
  );
};

export default RGCanvas;

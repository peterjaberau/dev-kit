'use client'

import React, { useContext, useId } from 'react';
import SeeksRGLinePath from './RGLinePath';
import { RelationGraphStoreContext } from "#components";

const RGSingleGraph: React.FC<{forElementLines?: boolean, svgDefs?: React.FC | React.ReactNode}> = ({forElementLines, svgDefs}: any) => {
  const relationGraph = useContext(RelationGraphStoreContext);
  const options = relationGraph.options;

  const stableId = useId()

  const allLineColors = relationGraph.allLineColors;
  const links = forElementLines ? relationGraph.graphData.elementLines : relationGraph.graphData.links;



  return (
    <defs>
      <linearGradient
        id={`${stableId  }-lineStyle`}
        x1="1"
        y1="0"
        x2="0"
        y2="0"
      >
        <stop offset="0%" stopColor="#e52c5c" />
        <stop offset="100%" stopColor="#FD8B37" />
      </linearGradient>
      <marker
        id={`${stableId  }-arrow-default`}
        markerWidth={options.defaultLineMarker!.markerWidth}
        markerHeight={options.defaultLineMarker!.markerHeight}
        refX={options.defaultLineMarker!.refX}
        refY={options.defaultLineMarker!.refY}
        markerUnits="userSpaceOnUse"
        orient="auto"
        viewBox="0 0 12 12"
      >
        <path
          style={{ fill: options.defaultLineColor }}
          d={options.defaultLineMarker!.data}
        />
      </marker>
      <marker
        id={`${stableId  }-start-arrow-default`}
        markerWidth={options.defaultLineMarker!.markerWidth}
        markerHeight={options.defaultLineMarker!.markerHeight}
        refX={options.defaultLineMarker!.refX}
        refY={options.defaultLineMarker!.refY}
        markerUnits="userSpaceOnUse"
        orient="auto-start-reverse"
        viewBox="0 0 12 12"
      >
        <path
          style={{ fill: options.defaultLineColor }}
          d={options.defaultLineMarker!.data}
        />
      </marker>
      <marker
        id={`${stableId  }-arrow-checked`}
        markerUnits="strokeWidth"
        markerWidth="12"
        markerHeight="12"
        viewBox="0 0 12 12"
        refX="6"
        refY="6"
        orient="auto"
      >
        <path
          style={{ fill: options.checkedLineColor }}
          d="M2,2 L10,6 L2,10 L6,6 L2,2"
        />
      </marker>
      <marker
        id={`${stableId  }-start-arrow-checked`}
        markerUnits="userSpaceOnUse"
        markerWidth="12"
        markerHeight="12"
        viewBox="0 0 12 12"
        refX="6"
        refY="6"
        orient="auto-start-reverse"
      >
        <path
          style={{ fill: options.checkedLineColor }}
          d="M2,2 L10,6 L2,10 L6,6 L2,2"
        />
      </marker>
      {allLineColors.map(thisColor=>
        <marker
          id={`${stableId  }-arrow-${  thisColor.id}`}
          key={thisColor.id}
          markerWidth={options.defaultLineMarker!.markerWidth}
          markerHeight={options.defaultLineMarker!.markerHeight}
          refX={options.defaultLineMarker!.refX}
          refY={options.defaultLineMarker!.refY}
          markerUnits="userSpaceOnUse"
          orient="auto"
          viewBox="0 0 12 12"
        >
          <path
            fill={options.defaultLineMarker!.color ||
              thisColor.color}
            d={options.defaultLineMarker!.data}
          />
        </marker>)}
      {allLineColors.map(thisColor=>
        <marker
          id={`${stableId
          }-start-arrow-${
            thisColor.id}`}
          key={`start-${  thisColor.id}`}
          markerWidth={options.defaultLineMarker!.markerWidth}
          markerHeight={options.defaultLineMarker!.markerHeight}
          refX={options.defaultLineMarker!.refX}
          refY={options.defaultLineMarker!.refY}
          markerUnits="userSpaceOnUse"
          orient="auto-start-reverse"
          viewBox="0 0 12 12"
        >
          <path
            fill={options.defaultLineMarker!.color ||
              thisColor.color}
            d={options.defaultLineMarker!.data}
          />
        </marker>
      )}
      {links.map(thisLink=>
        (!options.showEasyView && !thisLink.invisiable) && <React.Fragment key={thisLink.seeks_id}>
          {thisLink.relations.filter(thisRelation => (options.lineUseTextPath || thisRelation.useTextPath)).map((thisRelation, ri) =>
            <SeeksRGLinePath
              key = { thisRelation.id }
              link = { thisLink }
              relation = { thisRelation }
              relationIndex = { ri }
            />
          )}
        </React.Fragment>
      )}
      {svgDefs}
    </defs>
  );
};

export default RGSingleGraph;

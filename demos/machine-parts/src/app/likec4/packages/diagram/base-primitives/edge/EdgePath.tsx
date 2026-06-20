import type { DiagramEdge } from '#likec4/core/types'
import { edgePath } from '#likec4/style-preset/recipes'
import { chakra, useSlotRecipe } from '@chakra-ui/react'
import { type PointerEventHandler, forwardRef } from 'react'
import type { UndefinedOnPartialDeep } from 'type-fest'
import type { BaseEdgePropsWithData } from '../../base/types'
import { classNames } from '../../utils/classNames'
import { arrowTypeToMarker, EdgeMarkers } from './EdgeMarkers'

type Data = UndefinedOnPartialDeep<
  Pick<
    DiagramEdge,
    | 'line'
    | 'dir'
    | 'tail'
    | 'head'
  >
>

type EdgePathProps = {
  edgeProps: BaseEdgePropsWithData<Data>
  svgPath: string
  /**
   * If true, the edge is being dragged (used to disable animations)
   */
  isDragging?: boolean
  strokeWidth?: number
  onEdgePointerDown?: PointerEventHandler<SVGGElement> | undefined
}

export const EdgePath = forwardRef<SVGPathElement, EdgePathProps>(({
  edgeProps: {
    id,
    data: {
      line,
      dir,
      tail,
      head,
    },
    selectable = true,
    style,
    interactionWidth,
  },
  isDragging = false, // omit
  onEdgePointerDown,
  strokeWidth,
  svgPath,
}, svgPathRef) => {
  let markerStartName = arrowTypeToMarker(tail)
  let markerEndName = arrowTypeToMarker(head ?? 'normal')
  if (dir === 'back') {
    ;[markerStartName, markerEndName] = [markerEndName, markerStartName]
  }

  const MarkerStart = markerStartName ? EdgeMarkers[markerStartName] : null
  const MarkerEnd = markerEndName ? EdgeMarkers[markerEndName] : null

  const isDotted = line === 'dotted'
  const isDashed = isDotted || line === 'dashed'

  let strokeDasharray: string | undefined
  if (isDotted) {
    strokeDasharray = '1,8'
  } else if (isDashed) {
    strokeDasharray = '8,10'
  }

  const edgePathRecipe = useSlotRecipe({ recipe: edgePath })
  const styles = edgePathRecipe()

  return (
    <>
      {selectable && (
        <chakra.path
          className={classNames(
            'react-flow__edge-interaction',
          )}
          css={{ fill: 'none' }}
          onPointerDown={onEdgePointerDown}
          d={svgPath}
          style={{
            strokeWidth: interactionWidth ?? 10,
            stroke: 'currentcolor',
            strokeOpacity: 0,
            ...isDragging ? { display: 'none' } : {},
          }}
        />
      )}
      <chakra.circle
        className={classNames(
          // This class is queried by RelationshipPopover to position in the middle of the edge
          'likec4-edge-middle-point',
        )}
        css={styles.middlePoint}
        data-edge-id={id}
        style={{
          offsetPath: `path("${svgPath}")`,
        }}
      />

      <chakra.g css={styles.markersCtx} onPointerDown={onEdgePointerDown}>
        <defs>
          {MarkerStart && <MarkerStart id={'start' + id} />}
          {MarkerEnd && <MarkerEnd id={'end' + id} />}
        </defs>
        <chakra.path
          className={classNames(
            'react-flow__edge-path',
            'hide-on-reduced-graphics',
          )}
          css={[styles.pathBg, isDragging ? { display: 'none' } : undefined]}
          d={svgPath}
          style={style}
          strokeLinecap={'round'}
        />
        <chakra.path
          ref={svgPathRef}
          className={classNames(
            'react-flow__edge-path',
            selectable && 'react-flow__edge-interaction',
          )}
          css={styles.path}
          d={svgPath}
          style={style}
          strokeWidth={strokeWidth}
          strokeLinecap={'round'}
          strokeDasharray={strokeDasharray}
          markerStart={MarkerStart ? `url(#start${id})` : undefined}
          markerEnd={MarkerEnd ? `url(#end${id})` : undefined}
        />
      </chakra.g>
    </>
  )
})
EdgePath.displayName = 'EdgePath'

import { extractStep, isStepEdgeId } from '#likec4/core'
import type { DiagramEdge } from '#likec4/core/types'
import { classNames } from '../../utils/classNames'
import { Box, chakra, useSlotRecipe } from '@chakra-ui/react'
import { edgeLabel } from '#likec4/style-preset/recipes'
import type { HTMLMotionProps } from 'motion/react'
import * as m from 'motion/react-m'
import { type ReactNode, forwardRef } from 'react'
import { isTruthy } from 'remeda'
import type { UndefinedOnPartialDeep } from 'type-fest'
import type { BaseEdgePropsWithData } from '../../base/types'

const MotionDiv = chakra(m.div) as any

type Data = UndefinedOnPartialDeep<
  Pick<
    DiagramEdge,
    | 'label'
    | 'technology'
  >
>

type EdgeLabelProps =
  & HTMLMotionProps<'div'>
  & {
    children?: ReactNode
    edgeProps: BaseEdgePropsWithData<Data>
    pointerEvents?: 'all' | 'none'
  }

export const EdgeLabel = forwardRef<HTMLDivElement, EdgeLabelProps>((
  {
    edgeProps: {
      id,
      data: {
        label,
        technology,
        hovered: isHovered = false,
      },
      selected = false,
      selectable = false,
    },
    pointerEvents = 'all',
    className,
    children,
    ...rest
  },
  ref,
) => {
  const stepNum = isStepEdgeId(id) ? extractStep(id) : null
  const isStepEdge = stepNum !== null
  const hasLabel = isTruthy(label) || isTruthy(technology)
  const edgeLabelRecipe = useSlotRecipe({ recipe: edgeLabel })
  const edgeLabelStyles = edgeLabelRecipe({
    pointerEvents,
    isStepEdge,
    cursor: selectable || isStepEdge ? 'pointer' : 'default',
  })

  return (
    <MotionDiv
      ref={ref}
      className={classNames(
        // This class is queried by RelationshipPopover to position near the edge label
        'likec4-edge-label',
        className,
      )}
      css={edgeLabelStyles.root}
      data-edge-id={id}
      animate={{
        scale: isHovered && !selected ? 1.06 : 1,
      }}
      {...rest}
    >
      {stepNum !== null && (
        <Box className={'likec4-edge-label__step-number'} css={edgeLabelStyles.stepNumber}>
          {stepNum}
        </Box>
      )}
      {hasLabel && (
        <Box className={'likec4-edge-label__contents'} css={edgeLabelStyles.contents}>
          {isTruthy(label) && (
            <Box
              lineClamp={5}
              css={edgeLabelStyles.label}
              className={'likec4-edge-label__text'}>
              {label}
            </Box>
          )}
          {isTruthy(technology) && (
            <Box className={'likec4-edge-label__technology'} css={edgeLabelStyles.technology}>
              {'[ ' + technology + ' ]'}
            </Box>
          )}
          {children}
        </Box>
      )}
    </MotionDiv>
  )
})
EdgeLabel.displayName = 'EdgeLabel'

import { classNames } from '../../utils/classNames'
import { Box, chakra, useSlotRecipe } from '@chakra-ui/react'
import { actionBtn } from '#likec4/style-preset/recipes'
import { ActionIcon } from '@mantine/core'
import { IconId } from '@tabler/icons-react'
import * as m from 'motion/react-m'
import type { MouseEvent as ReactMouseEvent, ReactNode } from 'react'
import type { BaseNodeData } from '../../base/types'
import { stopPropagation } from '../../utils/xyflow'

const ChakraActionIcon = chakra(ActionIcon) as any

type ElementDetailsButtonProps = {
  selected?: boolean
  data: BaseNodeData
  icon?: ReactNode
  onClick: (e: ReactMouseEvent) => void
}

const variants = {
  normal: {
    originX: 0.4,
    originY: 0.6,
    scale: 1,
    opacity: 0.5,
  },
  hovered: {
    originX: 0.4,
    originY: 0.6,
    scale: 1.25,
    opacity: 0.9,
  },
  selected: {
    originX: 0.4,
    originY: 0.6,
    scale: 1.25,
    opacity: 0.9,
  },
  whileHover: {
    scale: 1.4,
    opacity: 1,
  },
  whileTap: {
    scale: 1.15,
  },
}

const container = {
  position: 'absolute',
  top: '0.5',
  right: '0.5',
  _shapeBrowser: {
    right: '[5px]',
  },
  _shapeCylinder: {
    top: '[14px]',
  },
  _shapeStorage: {
    top: '[14px]',
  },
  _shapeQueue: {
    top: '[1px]',
    right: '3', // 12px
  },
  _smallZoom: {
    display: 'none',
  },
  _print: {
    display: 'none',
  },
}

export function ElementDetailsButton({
  selected = false,
  data: {
    hovered: isHovered = false,
  },
  icon,
  onClick,
}: ElementDetailsButtonProps) {
  let variant: keyof typeof variants
  switch (true) {
    case isHovered:
      variant = 'hovered'
      break
    case selected:
      variant = 'selected'
      break
    default:
      variant = 'normal'
  }
  const actionBtnRecipe = useSlotRecipe({ recipe: actionBtn })
  const actionBtnStyles = actionBtnRecipe({ variant: 'transparent' })
  return (
    <Box css={container} className={classNames('details-button')}>
      <ChakraActionIcon
        className={classNames('nodrag nopan')}
        css={actionBtnStyles.root}
        component={m.button}
        initial={false}
        variants={variants}
        animate={variant}
        whileHover="whileHover"
        whileTap="whileTap"
        onClick={onClick}
        onDoubleClick={stopPropagation}
        tabIndex={-1}
      >
        {icon ?? <IconId stroke={1.8} style={{ width: '75%' }} />}
      </ChakraActionIcon>
    </Box>
  )
}

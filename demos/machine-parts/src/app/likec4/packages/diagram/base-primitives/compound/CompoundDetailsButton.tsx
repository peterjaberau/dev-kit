import { actionBtn } from '#likec4/style-preset/recipes'
import { chakra, useSlotRecipe } from '@chakra-ui/react'
import { ActionIcon } from '@mantine/core'
import { useDebouncedValue } from '@mantine/hooks'
import { IconId } from '@tabler/icons-react'
import * as m from 'motion/react-m'
import type { MouseEvent as ReactMouseEvent, ReactNode } from 'react'
import type { Simplify } from 'type-fest'
import type { BaseNodeProps } from '../../base/types'
import { classNames } from '../../utils/classNames'
import { stopPropagation } from '../../utils/xyflow'

type CompoundDetailsButtonProps = Simplify<
  BaseNodeProps & {
    icon?: ReactNode
    onClick: (e: ReactMouseEvent) => void
  }
>

const variants = {
  normal: {
    scale: 1,
    // opacity: 0.6,
  },
  hovered: {
    scale: 1.2,
    // opacity: 1,
  },
  whileHover: {
    scale: 1.4,
  },
  whileTap: {
    scale: 1,
  },
}

const ChakraActionIcon = chakra(ActionIcon) as any

export function CompoundDetailsButton({
  data: {
    hovered: isHovered = false,
  },
  icon,
  onClick,
}: CompoundDetailsButtonProps) {
  // Debounce first "isHovered"
  const debounced = useDebouncedValue(isHovered, isHovered ? 130 : 0)
  const isHoverDebounced = debounced[0] && isHovered

  const variant: keyof typeof variants = isHoverDebounced ? 'hovered' : 'normal'
  const actionBtnRecipe = useSlotRecipe({ recipe: actionBtn })
  const actionBtnStyles = actionBtnRecipe({ variant: 'transparent' })

  return (
    <m.div
      initial={false}
      variants={variants}
      animate={variant}
      whileHover="whileHover"
      whileTap="whileTap"
      className="likec4-compound-details details-button"
      tabIndex={-1}
    >
      <ChakraActionIcon
        className={classNames('nodrag nopan')}
        css={[
          {
            transitionDuration: 'normal',
            transitionDelay: isHovered && !isHoverDebounced ? '0.2s' : undefined,
            _hover: {
              transitionDelay: '0s',
            },
          },
          actionBtnStyles.root,
        ]}
        tabIndex={-1}
        onClick={onClick}
        onDoubleClick={stopPropagation}>
        {icon ?? <IconId stroke={1.8} style={{ width: '75%' }} />}
      </ChakraActionIcon>
    </m.div>
  )
}

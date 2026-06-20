import { classNames } from '../../utils/classNames'
import { actionBtn, actionButtons } from '#likec4/style-preset/recipes'
import { chakra, useSlotRecipe } from '@chakra-ui/react'
import { ActionIcon } from '@mantine/core'
import { useId } from '@mantine/hooks'
import { IconBolt } from '@tabler/icons-react'
import * as m from 'motion/react-m'
import type { MouseEvent as ReactMouseEvent, ReactNode } from 'react'
import { stopPropagation } from '../../utils/xyflow'

const Root = chakra('div')
const ChakraActionIcon = chakra(ActionIcon) as any

type ElementActionButtonsProps = {
  selected?: boolean
  data: {
    hovered?: boolean
  }
  buttons: ElementActionButtons.Item[]
}

const variants = {
  normal: {
    originY: 0,
    opacity: 0.75,
    scale: 0.8,
    y: 0,
  },
  selected: {
    originY: 0,
    opacity: 1,
    scale: 0.9,
    y: 7,
  },
  hovered: {
    originY: 0,
    opacity: 1,
    scale: 1.12,
    y: 7,
  },
}

/**
 * Center-Bottom bar with action buttons. Intended to be used inside "leaf" nodes.
 *
 * @param selected - Whether the node is selected
 * @param data - Node data
 * @param buttons - Action buttons
 *
 * @example
 * ```tsx
 * <ElementActionButtons
 *   {...nodeProps}
 *   Buttons={[
 *     {
 *       key: 'action1',
 *       icon: <IconZoomScan />,
 *       onClick: (e) => {
 *         e.stopPropagation()
 *         console.log('action1 clicked')
 *       },
 *     },
 *     //...
 *   ]}
 * />
 * ```
 */
export function ElementActionButtons({
  selected = false,
  data: {
    hovered: isHovered = false,
  },
  buttons,
}: ElementActionButtonsProps) {
  const id = useId()
  if (!buttons.length) {
    return null
  }

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
  const actionButtonsRecipe = useSlotRecipe({ recipe: actionButtons })
  const actionButtonsStyles = actionButtonsRecipe()
  const actionBtnRecipe = useSlotRecipe({ recipe: actionBtn })
  const actionBtnStyles = actionBtnRecipe({})

  return (
    <Root css={actionButtonsStyles.root}>
      <m.div
        layoutRoot
        initial={false}
        variants={variants}
        animate={variant}
        layoutDependency={`${isHovered}-${selected}`}
        data-likec4-hovered={isHovered}
        className={classNames('nodrag nopan')}
        onClick={stopPropagation}
      >
        {buttons.map((button, index) => (
          <ChakraActionIcon
            component={m.button}
            // layout
            css={actionBtnStyles.root}
            key={`${id}-${button.key ?? index}`}
            initial={false}
            whileTap={{ scale: 1 }}
            whileHover={{
              scale: 1.3,
            }}
            tabIndex={-1}
            onClick={button.onClick}
            // Otherwise node receives click event and is selected
            onDoubleClick={stopPropagation}
          >
            {button.icon || <IconBolt />}
          </ChakraActionIcon>
        ))}
      </m.div>
    </Root>
  )
}

export namespace ElementActionButtons {
  export type Item = {
    key?: string
    icon?: ReactNode
    onClick: (e: ReactMouseEvent) => void
  }
}

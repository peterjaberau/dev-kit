import { classNames } from '../../utils/classNames'
import { edgeActionBtn } from '#likec4/style-preset/recipes'
import { chakra, useSlotRecipe } from '@chakra-ui/react'
import { ActionIcon } from '@mantine/core'
import { IconZoomScan } from '@tabler/icons-react'
import type { MouseEvent as ReactMouseEvent, ReactNode } from 'react'
import { stopPropagation } from '../../utils/xyflow'

const ChakraActionIcon = chakra(ActionIcon) as any

type EdgeActionBtnProps = {
  icon?: ReactNode
  onClick: (e: ReactMouseEvent) => void
}

export function EdgeActionButton({ icon, onClick }: EdgeActionBtnProps) {
  const edgeActionBtnRecipe = useSlotRecipe({ recipe: edgeActionBtn })
  const edgeActionBtnStyles = edgeActionBtnRecipe()
  return (
    <ChakraActionIcon
      className={classNames('nodrag nopan')}
      css={edgeActionBtnStyles.root}
      onPointerDownCapture={stopPropagation}
      onClick={onClick}
      role="button"
      onDoubleClick={stopPropagation}
    >
      {icon ?? <IconZoomScan />}
    </ChakraActionIcon>
  )
}

import { classNames } from '../../utils/classNames'
import { Box, chakra } from '@chakra-ui/react'
import {
  UnstyledButton,
} from '@mantine/core'
import {
  IconSearch,
} from '@tabler/icons-react'
import { isMacOs } from '@xyflow/system'
import * as m from 'motion/react-m'
import type { MouseEvent } from 'react'
import { useDiagram } from '../../hooks/useDiagram'

const MotionUnstyledButton = chakra(UnstyledButton) as any

export function SearchControl() {
  const diagram = useDiagram()
  const isMac = isMacOs()

  return (
    <MotionUnstyledButton
      component={m.button}
      layout="position"
      onClick={(e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        diagram.openSearch()
      }}
      whileTap={{
        scale: 0.95,
        translateY: 1,
      }}
      className={classNames('group')}
      css={{
        display: {
          base: 'none',
          '@/md': 'flex',
        },
        flexDirection: 'row',
        alignItems: 'center',
        gap: 'xxs',
        paddingInline: 'sm',
        paddingBlock: 'xxs',
        userSelect: 'none',
        layerStyle: 'likec4.panel.action.filled',
      }}>
      <IconSearch size={14} stroke={2.5} />
      <Box
        css={{
          fontSize: '11px',
          fontWeight: 'bold',
          lineHeight: 1,
          opacity: 0.8,
          whiteSpace: 'nowrap',
        }}>
        {isMac ? '⌘ + K' : 'Ctrl + K'}
      </Box>
    </MotionUnstyledButton>
  )
}

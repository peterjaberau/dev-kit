import { classNames } from '../../utils/classNames'
import { chakra } from '@chakra-ui/react'
import { UnstyledButton } from '@mantine/core'
import * as m from 'motion/react-m'
import type { MouseEvent } from 'react'
import { Logo, LogoIcon } from '../../components/Logo'
import { useDiagramEventHandlers } from '../../context/DiagramEventHandlers'
import { useNavigationActor } from '../hooks'

const ChakraUnstyledButton = chakra(UnstyledButton) as any
const ChakraLogo = chakra(Logo) as any
const ChakraLogoIcon = chakra(LogoIcon) as any

export const LogoButton = () => {
  const actor = useNavigationActor()
  const { onLogoClick } = useDiagramEventHandlers()
  return (
    <m.div layout="position">
      <ChakraUnstyledButton
        onMouseEnter={() => {
          actor.send({ type: 'breadcrumbs.mouseEnter.root' })
        }}
        onMouseLeave={() => {
          actor.send({ type: 'breadcrumbs.mouseLeave.root' })
        }}
        onClick={(e: MouseEvent<HTMLButtonElement>) => {
          e.stopPropagation()
          if (onLogoClick && actor.isOpened()) {
            setTimeout(() => {
              onLogoClick()
            }, 100)
          }
          actor.send({ type: 'breadcrumbs.click.root' })
        }}
        className={classNames(
          'mantine-active',
        )}
        css={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          padding: '0.5',
          width: {
            base: '[20px]',
            '@/md': '[64px]',
          },
        }}
      >
        <ChakraLogo
          css={{
            display: {
              base: 'none',
              '@/md': 'block',
            },
          }}
        />
        <ChakraLogoIcon
          css={{
            display: {
              base: 'block',
              '@/md': 'none',
            },
          }}
        />
      </ChakraUnstyledButton>
    </m.div>
  )
}

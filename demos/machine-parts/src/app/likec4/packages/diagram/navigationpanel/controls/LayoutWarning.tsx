import { classNames } from '../../utils/classNames'
import { navigationPanelActionIcon } from '#likec4/style-preset/recipes'
import { chakra, useSlotRecipe } from '@chakra-ui/react'
import {
  Button,
  HoverCard,
  HoverCardDropdown,
  HoverCardTarget,
  Notification,
  Text,
  UnstyledButton,
} from '@mantine/core'
import {
  IconAlertTriangle,
} from '@tabler/icons-react'
import { AnimatePresence } from 'motion/react'
import * as m from 'motion/react-m'
import { type MouseEvent, Fragment, memo } from 'react'
import { useDiagramCompareLayout } from '../../hooks/useDiagramCompareLayout'
import { useMantinePortalProps } from '../../hooks/useMantinePortalProps'

const ChakraUnstyledButton = chakra(UnstyledButton) as any

export const LayoutWarning = memo(() => {
  const [ctx, { toggleCompare }] = useDiagramCompareLayout()
  const portalProps = useMantinePortalProps()

  const { drifts, isActive, isEnabled } = ctx
  const actionIconRecipe = useSlotRecipe({ recipe: navigationPanelActionIcon })
  const actionIconStyles = actionIconRecipe({
    variant: 'filled',
    type: 'warning',
  })

  return (
    <AnimatePresence propagate>
      {isEnabled && !isActive && (
        <HoverCard
          position="bottom-start"
          openDelay={600}
          closeDelay={200}
          floatingStrategy="absolute"
          offset={{
            mainAxis: 4,
            crossAxis: -22,
          }}
          {...portalProps}>
          <HoverCardTarget>
            <ChakraUnstyledButton
              component={m.button}
              layout="position"
              onClick={(e: MouseEvent<HTMLButtonElement>) => {
                e.stopPropagation()
                toggleCompare()
              }}
              whileTap={{
                scale: 0.95,
                translateY: 1,
              }}
              className={classNames(
                'group',
              )}
              css={[
                actionIconStyles.root,
                {
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 'xxs',
                  padding: '1.5',
                  rounded: 'sm',
                  userSelect: 'none',
                  cursor: 'pointer',
                  fontSize: 'xs',
                  fontWeight: 'bold',
                },
              ]}>
              {isActive ? <>Stop Compare</> : <IconAlertTriangle size={18} />}
            </ChakraUnstyledButton>
          </HoverCardTarget>
          <HoverCardDropdown p={'0'}>
            <Notification
              color="orange"
              withBorder={false}
              withCloseButton={false}
              title="View is out of sync">
              <Text mt={2} size="sm" lh="xs">
                Model has changed since this view was last updated.
              </Text>
              <Text mt={4} size="sm" lh="xs">
                Detected changes:
                {drifts.map((drift) => (
                  <Fragment key={drift}>
                    <br />
                    <span>- {drift}</span>
                  </Fragment>
                ))}
              </Text>

              <Button
                mt={'xs'}
                size="compact-sm"
                variant="default"
                onClick={(e) => {
                  e.stopPropagation()
                  toggleCompare()
                }}
              >
                Compare with current state
              </Button>
            </Notification>
          </HoverCardDropdown>
        </HoverCard>
      )}
    </AnimatePresence>
  )
})
LayoutWarning.displayName = 'ManualLayoutWarning'

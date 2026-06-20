import { extractViewTitleFromPath } from '#likec4/core/model'
import { RichText } from '#likec4/core/types'
import { classNames } from '../../utils/classNames'
import { chakra } from "@chakra-ui/react"
import { Box, HStack } from "@chakra-ui/react"
import {
  type PopoverProps,
  Badge,
  Popover,
  Text,
  UnstyledButton,
} from '@mantine/core'
import { IconId, IconLink } from '@tabler/icons-react'
import { deepEqual } from 'fast-equals'
import * as m from 'motion/react-m'
import { useState, type MouseEvent } from 'react'
import { ElementTag, Markdown } from '../../base-primitives'
import { Link } from '../../components/Link'
import { useDiagram, useOnDiagramEvent } from '../../hooks/useDiagram'
import { useMantinePortalProps } from '../../hooks/useMantinePortalProps'
import type { NavigationPanelActorSnapshot } from '../actor'
import { useNavigationActorSnapshot } from '../hooks'

const selector = ({ context }: NavigationPanelActorSnapshot) => {
  const view = context.view
  return {
    id: view.id,
    title: context.viewModel?.title ?? (view.title && extractViewTitleFromPath(view.title)) ?? 'Untitled View',
    description: context.viewModel?.description ?? RichText.from(view.description),
    tags: view.tags ?? [],
    links: view.links ?? [],
  }
}

const ChakraBadge = chakra(Badge) as any
const ChakraPopoverDropdown = chakra(Popover.Dropdown) as any
const ChakraUnstyledButton = chakra(UnstyledButton) as any

type ViewDetailsCardData = ReturnType<typeof selector>

export const DetailsControls = (props: PopoverProps) => {
  const [opened, setOpened] = useState(false)
  const data = useNavigationActorSnapshot(selector, deepEqual)
  const portalProps = useMantinePortalProps()

  return (
    <Popover
      position="bottom-end"
      shadow="xl"
      clickOutsideEvents={['pointerdown', 'mousedown', 'click']}
      offset={{
        mainAxis: 4,
      }}
      opened={opened}
      onChange={setOpened}
      {...portalProps}
      {...props}
    >
      <ViewDetailsCardTrigger linksCount={data.links.length} onOpen={() => setOpened(true)} />
      {opened && <ViewDetailsCardDropdown data={data} onClose={() => setOpened(false)} />}
    </Popover>
  )
}

const ViewDetailsCardTrigger = ({ linksCount, onOpen }: { linksCount: number; onOpen: () => void }) => (
  <Popover.Target>
    <ChakraUnstyledButton
      component={m.button}
      layout="position"
      whileTap={{
        scale: 0.95,
        translateY: 1,
      }}
      onClick={(e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        onOpen()
      }}
      className={classNames('group')}
      css={{
        display: {
          base: 'none',
          '@/xs': 'flex',
        },
        flexDirection: 'row',
        alignItems: 'center',
        gap: '2',
        paddingInline: '2',
        paddingBlock: '1',
        rounded: 'sm',
        userSelect: 'none',
        cursor: 'pointer',
        color: {
          base: 'likec4.panel.action',
          _hover: 'likec4.panel.action.hover',
        },
        backgroundColor: {
          _hover: 'likec4.panel.action.bg.hover',
        },
      }}>
      <IconId size={16} stroke={1.8} />
      {linksCount > 0 && (
        <HStack gap={'[1px]'}>
          <IconLink size={14} stroke={2} />
          <Box
            css={{
              fontSize: '11px',
              fontWeight: 'bold',
              lineHeight: 1,
              opacity: 0.8,
            }}>
            {linksCount}
          </Box>
        </HStack>
      )}
    </ChakraUnstyledButton>
  </Popover.Target>
)

const SectionHeader = chakra('div', {
  base: {
    fontSize: 'xs',
    color: 'text.dimmed',
    fontWeight: 'medium',
    userSelect: 'none',
    mb: 'xxs',
  },
})

const ViewDetailsCardDropdown = ({
  data: {
    id,
    title,
    description,
    tags,
    links,
  },
  onClose,
}: { data: ViewDetailsCardData; onClose: () => void }) => {
  const diagram = useDiagram()

  useOnDiagramEvent('paneClick', onClose)
  useOnDiagramEvent('nodeClick', onClose)

  return (
    <ChakraPopoverDropdown
      className={classNames('nowheel nopan nodrag')}
      css={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        margin: 'xs',
        layerStyle: 'likec4.dropdown',
        gap: 'md',
        padding: 'md',
        paddingBottom: 'lg',
        pointerEvents: 'all',
        maxWidth: 'calc(100cqw - 52px)',
        minWidth: '200px',
        maxHeight: 'calc(100cqh - 100px)',
        width: 'max-content',
        cursor: 'default',
        overflow: 'auto',
        overscrollBehavior: 'contain',
        '@/sm': {
          minWidth: 400,
          maxWidth: 550,
        },
        '@/lg': {
          maxWidth: 700,
        },
      }}>
      <section>
        <Text component="div" fw={500} size="xl" lh={'sm'}>{title}</Text>
        <HStack alignItems={'flex-start'} mt="1">
          <ViewBadge label="id" value={id} />
          <HStack gap="xs" flexWrap="wrap">
            {tags.map((tag) => (
              <ElementTag
                key={tag}
                tag={tag}
                cursor="pointer"
                onClick={e => {
                  e.stopPropagation()
                  diagram.openSearch(`#${tag}`)
                }} />
            ))}
          </HStack>
        </HStack>
      </section>
      {links.length > 0 && (
        <chakra.section display="flex" flexDirection="row" alignItems="baseline">
          <SectionHeader>Links</SectionHeader>
          <HStack gap="xs" flexWrap="wrap">
            {links.map((link, i) => <Link key={`${i}-${link.url}`} value={link} />)}
          </HStack>
        </chakra.section>
      )}
      {description.isEmpty && (
        <Text component="div" fw={500} size="xs" c="dimmed" style={{ userSelect: 'none' }}>No description</Text>
      )}
      {description.nonEmpty && (
        <section>
          <SectionHeader>Description</SectionHeader>
          <Markdown
            value={description}
            fontSize="sm"
            emptyText="No description"
            css={{
              userSelect: 'all',
            }}
          />
        </section>
      )}
    </ChakraPopoverDropdown>
  )
}

const ViewBadge = ({
  label,
  value,
}: {
  label: string
  value: string
}) => {
  return (
    <HStack gap="0.5">
      <ViewBadgeLabel>{label}</ViewBadgeLabel>
      <ChakraBadge
        size="sm"
        radius="sm"
        variant="light"
        color="gray"
        tt="none"
        fw={500}
        css={{
          width: 'max-content',
          overflow: 'visible',
          px: '1',
          color: {
            _dark: 'mantine.colors.gray[4]',
            _light: 'mantine.colors.gray[8]',
          },
          '& .mantine-Badge-label': {
            overflow: 'visible',
          },
        }}
        styles={{
          section: {
            opacity: 0.5,
            userSelect: 'none',
            marginInlineEnd: 'var(--spacing-0\\.5)',
          },
        }}>
        {value}
      </ChakraBadge>
    </HStack>
  )
}

const ViewBadgeLabel = chakra('div', {
  base: {
    color: 'text.dimmed',
    fontWeight: 'medium',
    fontSize: 'xxs',
    userSelect: 'none',
  },
})

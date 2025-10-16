import { Center, Icon, IconButton, Menu, Portal } from '@chakra-ui/react'
import { LuMenu } from 'react-icons/lu'
import type { NavItem } from './data'

interface Props {
  items: NavItem[]
  onSelect: (value: string) => void
}

export const NavigationMenu = (props: Props) => {
  const { onSelect, items } = props

  return (
    <Menu.Root onSelect={(e) => onSelect(e.value)}>
      <Menu.Trigger asChild>
        <IconButton aria-label="Open Menu" variant="ghost" colorPalette="gray" rounded="full">
          <LuMenu />
        </IconButton>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content
            minW="48"
            css={{
              '--color-start': 'colors.purple.solid',
              '--color-end': 'colors.pink.solid',
            }}
          >
            {items.map(({ value, icon: ItemIcon, label }, index) => (
              <Menu.Item key={value} value={value} fontWeight="medium" textStyle="sm" gap="2">
                <Center
                  boxSize="7"
                  borderRadius="l2"
                  bg={getGradientMix(index, items.length)}
                  color="colorPalette.contrast"
                >
                  <Icon size="sm">
                    <ItemIcon />
                  </Icon>
                </Center>
                {label}
              </Menu.Item>
            ))}
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  )
}

const getGradientMix = (index: number, total: number) => {
  const startPercent = 90 - index * (80 / (total - 1))
  const endPercent = 10 + index * (80 / (total - 1))
  return `color-mix(in srgb, var(--color-start) ${startPercent}%, var(--color-end) ${endPercent}%)`
}

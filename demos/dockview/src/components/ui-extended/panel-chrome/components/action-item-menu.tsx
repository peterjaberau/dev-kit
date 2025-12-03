'use client'
import { IconButton, Menu, Portal } from "@chakra-ui/react"
import { LuEllipsisVertical as ActionsMenuIcon } from "react-icons/lu"

interface PanelActionMenuItem {
  icon?: any
  label?: string | any
  value?: string
  onClick?: () => void
}

interface PanelActionMenuItems {
  items: PanelActionMenuItem[]
}

export const ActionItemMenu = ({ items }: PanelActionMenuItems) => {
  return (
    <Menu.Root >
      <Menu.Trigger asChild>
        <IconButton size="sm" variant="outline">
          <ActionsMenuIcon />
        </IconButton>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            {items.map((item: any) => (
              <Menu.Item key={item.value} value={item.value} onClick={item.onClick}>
                {item.label || item.value}
              </Menu.Item>
            ))}
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  )
}

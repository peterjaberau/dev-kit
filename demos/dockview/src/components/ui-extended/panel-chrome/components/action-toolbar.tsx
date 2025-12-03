'use client'
import { HStack, Menu } from "@chakra-ui/react"
import { ActionItemButton } from './action-item-button'
import { ActionItemLink } from './action-item-link'
import { ActionItemToggle } from './action-item-toggle'
import { ActionItemToggleGroup } from './action-item-toggle-group'


interface ActionItem {
  type: 'button' | 'link' | 'toggle' | 'toggleGroup'
  label?: string | any
  value?: string
  onClick?: () => void
  icon?: any
  props?: any
}

interface ActionItems {
  items: ActionItem[]
}

export const ActionItemsMap = {
  button: ActionItemButton,
  link: ActionItemLink,
  toggle: ActionItemToggle,
  toggleGroup: ActionItemToggleGroup
}


export const ActionToobar = ({ items }: ActionItems) => {
  return (
    items && (
      <HStack>
        {items.map((item, i) => {
          const Component: any = ActionItemsMap[item.type]

          if (!Component) return null
          return <Component key={i} {...item.props} {...item} />
        })}
      </HStack>
    )
  )
}

"use client"
import { VStack, Button, chakra } from "@chakra-ui/react"
import { LuSettings as SettingsIcon, LuAtSign as AtSignIcon, LuStar as StarIcon } from "react-icons/lu"
import { Item } from "./components/develop"
import { ReactNode } from "react"

interface TreeItemProps {
  level: number
  children: ReactNode
  isExpanded?: boolean
}

const INDENT_UNIT = 16 // px per level
function TreeItem({ level, children, isExpanded }: TreeItemProps) {
  return <Item icon={<chakra.div width={`${level * INDENT_UNIT}px`} height="1px" />}>{children}</Item>
}


export default function IndexDevelop() {
  return (
    <VStack gap={4} alignItems="stretch">
      {/* Basic item */}
      <Item>Default Item</Item>

      {/* Item with leading icon */}
      <Item icon={<AtSignIcon />}>Item with icon</Item>

      {/* Item with trailing icon */}
      <Item rightIcon={<SettingsIcon />}>Item with right icon</Item>

      {/* Item with both icons */}
      <Item icon={<AtSignIcon />} rightIcon={<SettingsIcon />}>
        Item with both icons
      </Item>

      {/* Item with prefix */}
      <Item prefix="$">Item with prefix</Item>

      {/* Item with suffix */}
      <Item suffix=".00">Item with suffix</Item>

      {/* Fully configured item */}
      <Item
        icon={<StarIcon />}
        rightIcon={<SettingsIcon />}
        prefix="$"
        suffix=".00"
        description="This is a full configuration example"
        descriptionPlacement="block"
      >
        Complete Item
      </Item>

      {/* Item with inline actions */}
      <Item
        icon={<AtSignIcon />}
        actions={
          <>
            <Button size="xs" variant="ghost">
              Edit
            </Button>
            <Button size="xs" variant="ghost" colorScheme="red">
              Delete
            </Button>
          </>
        }
      >
        Item with actions
      </Item>

      {/* Item with actions revealed on hover */}
      <Item
        icon={<AtSignIcon />}
        showActionsOnHover
        // preserveActionsSpace
        actions={
          <Button size="xs" variant="outline">
            Configure
          </Button>
        }
      >
        Hover to reveal actions
      </Item>

      {/* Card-style item with block description */}
      <Item
        type="card"
        shape="card"
        description="Card-style item with more detailed content"
        descriptionPlacement="block"
        icon={<StarIcon />}
      >
        Card Item
      </Item>

      {/* Disabled item */}
      <Item icon={<AtSignIcon />} isDisabled>
        Disabled Item
      </Item>

      {/* Selected item */}
      <Item icon={<AtSignIcon />} isSelected>
        Selected Item
      </Item>

      <TreeItem level={0}>src</TreeItem>

      <TreeItem level={1}>components</TreeItem>

      <TreeItem level={2}>Item.tsx</TreeItem>

      <TreeItem level={2}>Button.tsx</TreeItem>

      <TreeItem level={1}>utils</TreeItem>
    </VStack>
  )
}

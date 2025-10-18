import {  HStack, Icon, Menu, Portal, Text } from '@chakra-ui/react'
import type React from 'react'
import { LuCheck, LuChevronsUpDown } from 'react-icons/lu'
import { useCurrentApp } from "../../actors-model/selectors"

const Trigger = (props: Menu.TriggerProps) => {
  return (
    <Menu.Trigger
      display="flex"
      alignItems="center"
      gap="1"
      focusVisibleRing="outside"
      _focusVisible={{ bg: 'bg.muted' }}
      rounded="l2"
      p="1"
      height="8"
      {...props}
    />
  )
}
const Content = (props: React.PropsWithChildren<{ label: string; action?: React.ReactNode }>) => {
  const { label, children, action } = props
  return (
    <Portal>
      <Menu.Positioner>
        <Menu.Content minW="64" maxH={'50vh'}>
          <Menu.ItemGroup>
            <Menu.ItemGroupLabel>{label}</Menu.ItemGroupLabel>
            {children}
          </Menu.ItemGroup>
          {action && <Menu.Separator />}
          {action}
        </Menu.Content>
      </Menu.Positioner>
    </Portal>
  )
}

export const MenuCategories = () => {

  const { topNavigation, selectedCategory, selectCategory } = useCurrentApp()

  return (
    <Menu.Root positioning={{ placement: 'bottom-start' }}>
      <Trigger>
        <Text fontWeight="medium" ms="1">
          {selectedCategory.name}
        </Text>
        <Icon color="fg.muted">
          <LuChevronsUpDown />
        </Icon>
      </Trigger>
      <Content
        label="Demo Categories"
      >
        {topNavigation.map((item: any) => (
          <Menu.Item key={item.id} value={item.id} onSelect={() => selectCategory(item.id)} rounded="l2">
            <HStack gap="2" flex="1">

              <HStack>
                <Text fontWeight="medium" textStyle="sm">
                  {item.name}
                </Text>
              </HStack>
            </HStack>
            {selectedCategory.id === item.id && <LuCheck />}
          </Menu.Item>
        ))}
      </Content>
    </Menu.Root>
  )
}

export const MenuSelectedCategoryItems = () => {
  const { selectedCategory, selectedCategoryItem, selectCategoryItem } = useCurrentApp()



  return (
    <Menu.Root positioning={{ placement: 'bottom-start' }} >
      <Trigger gap="2">
        <Text fontWeight="medium" ms="1">
          {selectedCategoryItem.name}
        </Text>
        <Icon color="fg.muted">
          <LuChevronsUpDown />
        </Icon>
      </Trigger>
      <Content
        label="Demos"

      >
        {selectedCategory.items.map((item: any) => (
          <Menu.Item key={item.id} value={item.id} onSelect={() => selectCategoryItem(item.id)}>
            <Text fontWeight="medium" textStyle="sm" flex="1">
              {item.name}
            </Text>
            {selectedCategoryItem.id === item.id && <LuCheck />}
          </Menu.Item>
        ))}
      </Content>
    </Menu.Root>
  )
}

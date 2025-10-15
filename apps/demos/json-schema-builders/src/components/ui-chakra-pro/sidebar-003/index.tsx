'use client'

import { Accordion, Box, Button, HStack, Icon, Menu, Span, Stack } from '@chakra-ui/react'
import { useState } from 'react'
import { LuChevronsUpDown } from 'react-icons/lu'
import { navigationDropdownOptions, navigationGroups } from './data'
import { SidebarMobileDrawer } from './mobile-drawer'
import { SearchBarTrigger, SearchDialog } from './search'
import { SideNavItem } from './sidenav-link'

const Index = () => {
  return (
    <>
      <Box
        bg="bg"
        top="0"
        left="0"
        bottom="0"
        zIndex="20"
        width="18rem"
        hideBelow="lg"
        position="fixed"
        borderRightWidth="1px"
      >
        <SidebarContent />
      </Box>
      <SidebarMobileDrawer>
        <SidebarContent />
      </SidebarMobileDrawer>
    </>
  )
}

const SidebarContent = () => {
  const [openSearchDialog, setOpenSearchDialog] = useState(false)
  const expandedGroup: any = navigationGroups[0]

  return (
    <Box h="full" overflowY="auto" pt="4" pb="10">
      <Stack gap="0" align="flex-start">
        <Box w="full">
          <NavigationDropdown />
        </Box>
        <Box w="full" hideBelow="lg">
          <SearchBarTrigger
            hideKbd
            px="4"
            rounded="none"
            borderLeft="0"
            borderRight="0"
            onClick={() => setOpenSearchDialog(true)}
          />
          <SearchDialog
            open={openSearchDialog}
            onOpenChange={(details) => setOpenSearchDialog(details.open)}
          />
        </Box>
        <Accordion.Root size="sm" collapsible defaultValue={[expandedGroup.id]}>
          {navigationGroups.map((group) => (
            <Accordion.Item key={group.id} value={group.id}>
              <Accordion.ItemTrigger px="4">
                {group.icon && <Icon as={group.icon} boxSize="4" color="fg.muted" />}
                <Span flex="1">{group.title}</Span>
                <Accordion.ItemIndicator />
              </Accordion.ItemTrigger>
              <Accordion.ItemContent pb="2">
                {group.items.map((item) => (
                  <SideNavItem rounded="none" variant="filled" key={item.id} item={item} />
                ))}
              </Accordion.ItemContent>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </Stack>
    </Box>
  )
}

const NavigationDropdown = () => {
  const activeOption: any = navigationDropdownOptions[0]

  return (
    <Menu.Root positioning={{ sameWidth: true }}>
      <Menu.Trigger asChild>
        <Button
          w="full"
          size="xl"
          h="auto"
          py="3"
          variant="plain"
          px="4"
          colorPalette="gray"
          justifyContent="space-between"
        >
          <HStack flex="1">
            <Box p="1.5" borderRadius="md" borderWidth="1px">
              <Box as={activeOption.icon} boxSize="4" color="colorPalette.solid" />
            </Box>
            <Stack align="flex-start" gap="0">
              <Span textStyle="sm" fontWeight="medium">
                {activeOption.title}
              </Span>
              <Span textStyle="xs" fontWeight="normal" color="fg.muted">
                {activeOption.description}
              </Span>
            </Stack>
          </HStack>
          <Box as={LuChevronsUpDown} boxSize="4" color="fg.subtle" />
        </Button>
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content>
          {navigationDropdownOptions.map((option) => (
            <Menu.Item key={option.value} value={option.value}>
              <HStack flex="1">
                <Box p="1.5" borderRadius="md" borderWidth="1px">
                  <Box as={option.icon} boxSize="4" color="colorPalette.solid" />
                </Box>
                <Stack align="flex-start" gap="0">
                  <Span textStyle="xs" fontWeight="medium">
                    {option.title}
                  </Span>
                  <Span textStyle="xs" fontWeight="normal" color="fg.muted">
                    {option.description}
                  </Span>
                </Stack>
              </HStack>
            </Menu.Item>
          ))}
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  )
}

export default Index

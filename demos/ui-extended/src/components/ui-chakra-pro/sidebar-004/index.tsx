'use client'

import { Box, Collapsible, Flex, Heading, HStack, Stack } from '@chakra-ui/react'
import { useState } from 'react'
import { LuChevronDown, LuChevronUp } from 'react-icons/lu'
import { Logo } from './logo'
import { ColorModeButton } from '@dev-kit/components'
import { navigationGroups, type SideNavItemProps } from './data'
import { SidebarMobileDrawer } from './mobile-drawer'
import { SearchBarTrigger, SearchDialog } from './search'
import { SideNavItem } from './sidenav-link'

 const Index = () => {
  return (
    <>
      <Box
        bg="bg"
        top="0"
        insetStart="0"
        bottom="0"
        zIndex="20"
        width="18rem"
        hideBelow="lg"
        position="fixed"
        borderEndWidth="1px"
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

  const [firstGroup, secondGroup, thirdGroup]: any = navigationGroups

  return (
    <Box h="full" overflowY="auto" pt="4" pb="10">
      <Stack gap="6" align="flex-start">
        <Flex px="4" align="center" justify="space-between" w="full">
          <Logo />
          <ColorModeButton size="xs" />
        </Flex>
        <Box px="4" w="full" hideBelow="lg">
          <SearchBarTrigger onClick={() => setOpenSearchDialog(true)} />
          <SearchDialog
            open={openSearchDialog}
            onOpenChange={(details) => setOpenSearchDialog(details.open)}
          />
        </Box>
        <Stack w="full" gap="3" px="1">
          <NavGroup title={firstGroup.title} items={firstGroup.items} />
          <CollapsibleNavGroup title={secondGroup.title} items={secondGroup.items} />
          <NavGroup title={thirdGroup.title} items={thirdGroup.items} />
        </Stack>
      </Stack>
    </Box>
  )
}

const CollapsibleNavGroup = (props: { title: string; items: SideNavItemProps[] }) => {
  const { title, items } = props
  return (
    <Collapsible.Root gap="0" display="flex" flexDirection="column">
      <Collapsible.Trigger py="2" w="full" px="4">
        <HStack w="full" align="center" justify="space-between">
          <Heading as="h5" textStyle="sm">
            {title}
          </Heading>
          <Collapsible.Context>
            {(api) => (api.open ? <LuChevronUp /> : <LuChevronDown />)}
          </Collapsible.Context>
        </HStack>
      </Collapsible.Trigger>
      <Collapsible.Content>
        <Stack gap="1">
          {items.map((item) => (
            <SideNavItem variant="filled" key={item.id} item={item} />
          ))}
        </Stack>
      </Collapsible.Content>
    </Collapsible.Root>
  )
}

const NavGroup = (props: { title: string; items: SideNavItemProps[] }) => {
  const { title, items } = props
  return (
    <Stack gap="3">
      <Heading as="h5" textStyle="sm" px="4">
        {title}
      </Heading>
      <Stack gap="1">
        {items.map((item) => (
          <SideNavItem variant="filled" key={item.id} item={item} hideIcon />
        ))}
      </Stack>
    </Stack>
  )
}
export default Index

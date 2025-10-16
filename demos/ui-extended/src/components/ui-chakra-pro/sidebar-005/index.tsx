'use client'

import {
  Box,
  Button,
  Collapsible,
  Heading,
  HStack,
  Menu,
  Separator,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useState } from 'react'
import { LuChevronDown, LuChevronsUpDown, LuChevronUp } from 'react-icons/lu'
import { collapsibleNavigationGroups, navigationGroups, type SideNavItemProps } from './data'
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

  const firstSection = navigationGroups.filter((group) => group.id !== 'components')

  return (
    <Box h="full" overflowY="auto" pt="4" pb="10">
      <Stack gap="4" align="flex-start">
        <Box px="2" w="full" hideBelow="lg">
          <SearchBarTrigger onClick={() => setOpenSearchDialog(true)} />
          <SearchDialog
            open={openSearchDialog}
            onOpenChange={(details) => setOpenSearchDialog(details.open)}
          />
        </Box>
        <Box px="2" w="full">
          <FrameworkDropdown />
        </Box>
        <Stack w="full" gap="3">
          {firstSection.map((group) => (
            <Stack key={group.title} gap="3">
              <HStack px="4">
                <Heading flexShrink="0" as="h5" textStyle="xs">
                  {group.title}
                </Heading>
                <Separator flex="1" />
              </HStack>
              <Stack gap="1">
                {group.items.map((item: any) => (
                  <SideNavItem key={item.id} item={item} />
                ))}
              </Stack>
            </Stack>
          ))}
        </Stack>
        <Stack w="full" gap="3">
          {collapsibleNavigationGroups.map((group) => (
            <Stack key={group.title} gap="3">
              <HStack px="4">
                <Heading flexShrink="0" as="h5" textStyle="xs">
                  {group.title}
                </Heading>
                <Separator flex="1" />
              </HStack>
              {group.sections.map((section) => (
                <Stack key={section.title} gap="1">
                  <CollapsibleSection section={section} />
                </Stack>
              ))}
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Box>
  )
}

const frameworkDropdownOptions = [
  { value: 'deno', title: 'Deno' },
  { value: 'javascript', title: 'JavaScript' },
  { value: 'next', title: 'Next.js' },
  { value: 'react', title: 'React' },
]

const FrameworkDropdown = () => {
  const activeOption: any = frameworkDropdownOptions[0]

  return (
    <Stack py="1.5" px="1">
      <Text px="1" textStyle="xs" fontWeight="semibold">
        Select a framework
      </Text>
      <Menu.Root positioning={{ sameWidth: true }}>
        <Menu.Trigger asChild>
          <Button
            w="full"
            size="sm"
            colorPalette="gray"
            px="2"
            variant="outline"
            justifyContent="space-between"
          >
            <Stack flex="1" align="flex-start" gap="0">
              <Text textStyle="xs" fontWeight="medium">
                {activeOption.title}
              </Text>
            </Stack>
            <Box as={LuChevronsUpDown} boxSize="4" />
          </Button>
        </Menu.Trigger>
        <Menu.Positioner>
          <Menu.Content>
            {frameworkDropdownOptions.map((option) => (
              <Menu.Item key={option.value} value={option.value}>
                <Text textStyle="xs" fontWeight="medium">
                  {option.title}
                </Text>
              </Menu.Item>
            ))}
          </Menu.Content>
        </Menu.Positioner>
      </Menu.Root>
    </Stack>
  )
}

interface CollapsibleSectionProps {
  section: { title: string; children: SideNavItemProps[] }
}

const CollapsibleSection = (props: CollapsibleSectionProps) => {
  const { section } = props
  const [openCollapsible, setOpenCollapsible] = useState(true)

  return (
    <Collapsible.Root
      gap="3"
      display="flex"
      flexDirection="column"
      open={openCollapsible}
      onOpenChange={(details) => setOpenCollapsible(details.open)}
    >
      <Collapsible.Trigger py="0" w="full" px="4">
        <HStack w="full" align="center" justify="space-between">
          <Heading as="h6" textStyle="xs" fontWeight="medium">
            {section.title}
          </Heading>
          {openCollapsible ? <LuChevronUp /> : <LuChevronDown />}
        </HStack>
      </Collapsible.Trigger>
      <Collapsible.Content px="4">
        <Stack gap="0">
          {section.children.map((item) => (
            <SideNavItem variant="line" key={item.id} item={item} />
          ))}
        </Stack>
      </Collapsible.Content>
    </Collapsible.Root>
  )
}
export default Index

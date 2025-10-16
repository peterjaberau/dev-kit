'use client'

import { Box, HStack, Square, Stack } from '@chakra-ui/react'
import { type ExternalLinkProps, externalLinks, navigationGroups } from './data'
import { SidebarMobileDrawer } from './mobile-drawer'
import { SideNavItem, SideNavLink } from './sidenav-link'

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
  return (
    <Box h="full" overflowY="auto" px="2" pt="4" pb="10">
      <Stack gap="6">
        <PrimaryNavLinkGroup />
        <SideNavLinkGroup />
      </Stack>
    </Box>
  )
}

const PrimaryNavLink = (props: ExternalLinkProps) => {
  const { icon, href, label } = props
  return (
    <SideNavLink href={href} target="_blank" rel="noreferrer" className="group">
      <Square
        size="6"
        borderWidth="1px"
        borderRadius="l2"
        color="fg.muted"
        _groupHover={{
          layerStyle: 'fill.solid',
          borderColor: 'colorPalette.solid',
        }}
      >
        <Box as={icon} boxSize="4" />
      </Square>
      <span>{label}</span>
    </SideNavLink>
  )
}

const PrimaryNavLinkGroup = () => {
  return (
    <Stack gap="0">
      {externalLinks.map((link, index) => (
        <PrimaryNavLink key={index} {...link} />
      ))}
    </Stack>
  )
}

const SideNavLinkGroup = () => {
  return (
    <Stack gap={{ base: '6', md: '8' }}>
      {navigationGroups.map((group, index) => (
        <Stack key={index} gap="3">
          <HStack px="4" textStyle="sm" fontWeight="semibold">
            {group.title}
          </HStack>
          <Stack gap="1">
            {group.items.map((item, itemIndex) => (
              <SideNavItem variant="filled" key={itemIndex} item={item} />
            ))}
          </Stack>
        </Stack>
      ))}
    </Stack>
  )
}
export default Index

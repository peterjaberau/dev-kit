'use client'
import { Container, Flex, Grid, HStack } from '@chakra-ui/react'
import { useState } from 'react'
import { Text as Logo } from './logo'
import { NotificationPopover } from './notification-popover'
import { SearchPopover } from './search-popover'
import { UserMenu } from './user-menu'
import { items } from './data'
import { NavigationMenu } from './navigation-menu'
import { SecondaryNavigation } from './secondary-navigation'

 const Index = () => {
  // This is just for demo purposes. Use the router to get the current route and manage state
  const [selected, setSelected] = useState<string>('dashboard')
  const secondaryNav = items.find((item) => item.value === selected)?.secondary

  return (
    <Container py={{ base: '4', md: '6', lg: '8' }}>
      <Grid templateColumns="auto 1fr auto" gap="3" alignItems="center">
        <HStack>
          <NavigationMenu items={items} onSelect={setSelected} />
          <Logo />
        </HStack>
        <Flex justify="center">
          <SecondaryNavigation items={secondaryNav} hideBelow="sm" />
        </Flex>
        <HStack gap={{ base: '2', md: '3' }} justify="flex-end">
          <HStack gap="0">
            <SearchPopover />
            <NotificationPopover />
          </HStack>
          <UserMenu />
        </HStack>
      </Grid>
    </Container>
  )
}
export default Index

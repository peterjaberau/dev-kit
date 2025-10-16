import { Box, Container, HStack } from '@chakra-ui/react'
import { Logo } from './logo'
import { NotificationPopover } from './notification-popover'
import { SearchField } from './search-field'
import { SearchPopover } from './search-popover'
import { UserMenu } from './user-menu'

 const Index = () => {
  return (
    <Box borderBottomWidth="1px" bg="bg.panel">
      <Container py={{ base: '3.5', md: '4' }}>
        <HStack justify="space-between">
          <Logo />
          <SearchField hideBelow="md" />
          <HStack gap={{ base: '2', md: '3' }}>
            <SearchPopover hideFrom="md" />
            <NotificationPopover />
            <UserMenu />
          </HStack>
        </HStack>
      </Container>
    </Box>
  )
}
export default Index

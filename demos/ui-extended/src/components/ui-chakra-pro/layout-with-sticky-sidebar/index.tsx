import { Container, Flex, Stack } from '@chakra-ui/react'
import { Content } from './content'
import { Footer } from './footer'
import { Navbar } from './navbar'
import { Sidebar } from './sidebar'

export const Index = () => {
  return (
    <Flex flexDir="column" flex="1">
      <Navbar position="sticky" top="0" zIndex="docked" />
      <Container flex="1" display="flex" py="12">
        <Stack direction={{ base: 'column-reverse', lg: 'row' }} gap="8" flex="1">
          <Content />
          <Sidebar
            alignSelf="flex-start"
            width={{ base: 'full', lg: 'xs' }}
            position={{ base: 'unset', lg: 'sticky' }}
            top="28"
          />
        </Stack>
      </Container>
      <Footer />
    </Flex>
  )
}
export default Index

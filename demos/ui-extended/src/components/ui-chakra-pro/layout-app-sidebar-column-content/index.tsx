import { Container, Flex, Stack } from '@chakra-ui/react'
import { Column } from './column'
import { Content } from './content'
import { Header } from './header'
import { Navbar } from './navbar'
import { Sidebar } from './sidebar'

export const Index = () => {
  return (
    <>
      <Navbar hideFrom="md" />
      <Flex flex="1">
        <Sidebar maxW="xs" position="sticky" top="0" height="100vh" hideBelow="md" />
        <Stack gap="12" pb="12" flex="1" alignItems="stretch">
          <Header />
          <Container display="flex" flex="1">
            <Stack gap="8" direction={{ base: 'column', lg: 'row' }} flex="1">
              <Column />
              <Content />
            </Stack>
          </Container>
        </Stack>
      </Flex>
    </>
  )
}
export default Index

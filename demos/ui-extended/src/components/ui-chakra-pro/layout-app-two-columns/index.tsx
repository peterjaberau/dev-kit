import { Container, Flex, Stack } from '@chakra-ui/react'
import { Column } from './column'
import { Content } from './content'
import { Header } from './header'
import { Navbar } from './navbar'

 const Index = () => {
  return (
    <>
      <Navbar hideFrom="md" />
      <Flex flex="1">
        <Column maxW="xs" position="sticky" top="0" height="100vh" hideBelow="md" />
        <Column maxW="sm" position="sticky" top="0" height="100vh" hideBelow="lg" />
        <Stack gap="12" pb="12" flex="1" alignItems="stretch">
          <Header />
          <Container maxW="7xl">
            <Content />
          </Container>
        </Stack>
      </Flex>
    </>
  )
}
export default Index

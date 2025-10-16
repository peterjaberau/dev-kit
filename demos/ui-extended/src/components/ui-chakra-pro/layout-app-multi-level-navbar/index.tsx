import { Container, Stack } from '@chakra-ui/react'
import { Content } from './content'
import { Navbar } from './navbar'
import { Sidebar } from './sidebar'

 const Index = () => {
  return (
    <Stack flex="1" gap="8" py={{ base: '4', md: '6', lg: '8' }}>
      <Navbar position="sticky" top="0" zIndex="docked" />
      <Container display="flex" flex="1">
        <Stack gap="8" direction={{ base: 'column-reverse', md: 'row' }} flex="1" justify="start">
          <Content />
          <Sidebar />
        </Stack>
      </Container>
    </Stack>
  )
}
export default Index

import { Stack } from '@chakra-ui/react'
import { Content } from './content'
import { Footer } from './footer'
import { Navbar } from './navbar'

export const Index = () => {
  return (
    <Stack flex="1" gap="12">
      <Navbar position="sticky" top="0" zIndex="docked" />
      <Content flex="1" />
      <Footer />
    </Stack>
  )
}
export default Index

import { SideNavbar } from '../sidebar-with-side-navbar/side-navbar'
import { Bleed, HStack, Flex, type FlexProps, Heading, Stack } from '@chakra-ui/react'



const Index = () => {


  return (
    <>
      <Flex h="full" w={'full'} justifyContent={'space-between'}>
        <SideNavbar/>
        <SideNavbar/>
      </Flex>
    </>
  )

}

export default Index

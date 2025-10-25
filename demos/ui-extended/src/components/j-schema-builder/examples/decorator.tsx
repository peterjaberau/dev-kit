'use client'
import { Container, Center } from '@chakra-ui/react'
// import './styles.css'


export const Decorator = ({ children }: any) => {

  return (
    <Container fluid p={8} borderRadius={'md'} boxShadow={'sm'} bg={'bg.panel'}>
      <Center w={'full'} >
        {children}
      </Center>
    </Container>
  )

}

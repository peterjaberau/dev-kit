"use client"

import { Container, ScrollArea as ChakraScrollArea } from "@chakra-ui/react"

export interface ScrollAreaWrapperProps {
  [key: string]: any
}

export const ScrollArea = ({ children, css, ...rest }: ScrollAreaWrapperProps) => {
  return (
    <Container minW={'full'} p={0} w={"full"}  {...rest} asChild>
      <ChakraScrollArea.Root variant={"hover"} size={"xs"}>
        <ChakraScrollArea.Viewport >
          <ChakraScrollArea.Content css={{justifyContent: "center" }}  h={"full"} px={0} py={0}>
            {children}
          </ChakraScrollArea.Content>
        </ChakraScrollArea.Viewport>
        <ChakraScrollArea.Scrollbar />
      </ChakraScrollArea.Root>
    </Container>
  )
}

"use client"

import { Container, ScrollArea as ChakraScrollArea } from "@chakra-ui/react"

export interface ScrollAreaWrapperProps {
  [key: string]: any
}

export const ScrollArea = ({ children, ...rest }: ScrollAreaWrapperProps) => {
  return (
    <Container p={0} {...rest} asChild>
      <ChakraScrollArea.Root variant={"hover"} size={"xs"}>
        <ChakraScrollArea.Viewport>
          <ChakraScrollArea.Content h={"full"} px={4} py={3}>
            {children}
          </ChakraScrollArea.Content>
        </ChakraScrollArea.Viewport>
        <ChakraScrollArea.Scrollbar />
      </ChakraScrollArea.Root>
    </Container>
  )
}

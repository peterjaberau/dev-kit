"use client"

import { Container, ScrollArea } from "@chakra-ui/react"

export interface ScrollAreaWrapperProps {
  [key: string]: any
}

export const ScrollAreaWrapper = ({ children, ...rest }: ScrollAreaWrapperProps) => {
  return (
    <Container p={0} {...rest} asChild>
      <ScrollArea.Root variant={'hover'} size={'xs'}>
        <ScrollArea.Viewport>
          <ScrollArea.Content >
            {children}
          </ScrollArea.Content>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar />
      </ScrollArea.Root>
    </Container>
  )
}

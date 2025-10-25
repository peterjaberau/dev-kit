"use client"

import { Card, ScrollArea } from "@chakra-ui/react"

export interface PaneContentProps {
  [key: string]: any
}

export const PaneContent = ({ children, ...rest }: PaneContentProps) => {
  return (
    <Card.Body {...rest} asChild>
      <ScrollArea.Root variant={'hover'} size={'xs'}>
        <ScrollArea.Viewport>
          <ScrollArea.Content >
            {children}
          </ScrollArea.Content>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar />
      </ScrollArea.Root>
    </Card.Body>
  )
}

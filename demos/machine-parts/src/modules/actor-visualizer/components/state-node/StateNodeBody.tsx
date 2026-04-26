import type { ReactNode } from 'react';
import { chakra, Card } from "@chakra-ui/react"
interface StateNodeBodyProps {
  children: ReactNode
  isHighlighted: boolean
}

export function StateNodeBody({ children, isHighlighted }: StateNodeBodyProps) {
  return (
    <Card.Body
      css={{
        bg: "bg.muted",
        p: 0,
        borderWidth: 8,
        borderColor: "bg.panel",
        ...(isHighlighted && {
          bg: "bg.info",
          borderColor: "transparent",
        }),
      }}
      data-testid="state-node-body"
    >
      {children}
    </Card.Body>
  )
}

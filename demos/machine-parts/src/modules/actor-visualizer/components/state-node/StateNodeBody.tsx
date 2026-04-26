import type { ReactNode } from 'react';
import { chakra, Card } from "@chakra-ui/react"
interface StateNodeBodyProps {
  children: ReactNode
}

export function StateNodeBody({ children }: StateNodeBodyProps) {
  return <Card.Body  data-testid="state-node-body" >{children}</Card.Body>
}

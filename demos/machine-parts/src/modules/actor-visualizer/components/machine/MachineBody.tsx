import type { ReactNode } from 'react';
import { chakra, Card } from "@chakra-ui/react"
interface MachineBodyProps {
  children: ReactNode;
}

export function MachineBody({ children }: MachineBodyProps) {
  return <Card.Body data-testid="machine-body">{children}</Card.Body>
}

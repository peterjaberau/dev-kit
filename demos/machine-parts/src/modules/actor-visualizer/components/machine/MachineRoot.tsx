import type { ReactNode } from 'react';
import { chakra, Card } from "@chakra-ui/react"
interface MachineRootProps {
  children: ReactNode;
}

export function MachineRoot({ children }: MachineRootProps) {
  return (
    <Card.Root
      data-testid="machine-root"
      css={{
        mx: "auto",
        maxW: "6xl",
      }}
    >
      {children}
    </Card.Root>
  )
}

import type { ReactNode } from 'react';
import { chakra, Card } from "@chakra-ui/react"
interface MachineRootProps {
  children: ReactNode;
}

export function MachineRoot({ children }: MachineRootProps) {
  return (
    <Card.Root
      size={"sm"}
      data-testid="machine-root"
      css={{

        mx: "auto",
        minW: "xl",
        w: "xl",
        maxW: "2xl",
      }}
    >
      {children}
    </Card.Root>
  )
}

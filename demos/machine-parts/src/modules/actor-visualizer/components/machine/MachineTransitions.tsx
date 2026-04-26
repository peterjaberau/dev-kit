import type { ReactNode } from 'react';
import { chakra } from "@chakra-ui/react"
interface MachineTransitionsProps {
  children: ReactNode;
}

export function MachineTransitions({ children }: MachineTransitionsProps) {
  return (
    <chakra.div
      data-testid="root-transitions"
      // css={{
      //   mt: 3,
      //   display: "flex",
      //   flexDirection: "column",
      // }}
    >
      {children}
    </chakra.div>
  )
}

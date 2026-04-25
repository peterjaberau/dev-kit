import type { ReactNode } from 'react';
import { chakra } from "@chakra-ui/react"
interface MachineRootProps {
  children: ReactNode;
}

export function MachineRoot({ children }: MachineRootProps) {
  return (
    <chakra.div data-testid="machine-root"
                css={{
                  mx: "auto",
                  maxW: "6xl"
                }}
             >
      {children}
    </chakra.div>
  );
}

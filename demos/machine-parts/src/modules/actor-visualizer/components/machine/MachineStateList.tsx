import type { ReactNode } from 'react';
import { chakra } from "@chakra-ui/react"
interface MachineStateListProps {
  children: ReactNode;
}

export function MachineStateList({ children }: MachineStateListProps) {
  return <chakra.div
    css={{
      mt: 4,
      display: "flex",
      flexWrap: "wrap",
      alignItems: "flex-start",
      gap: 2
    }}

    >{children}</chakra.div>;
}

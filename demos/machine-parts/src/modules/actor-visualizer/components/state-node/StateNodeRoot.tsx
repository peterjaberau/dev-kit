import type { ReactNode } from 'react';

import { chakra } from "@chakra-ui/react"
interface StateNodeRootProps {
  id: string;
  children: ReactNode;
}

export function StateNodeRoot({ id, children }: StateNodeRootProps) {
  return (
    <chakra.div
      id={id}
      data-state-id={id}
      css={{
        display: "flex",
        minW: 0,
        flexDirection: "column",
        fontSize: "md"
      }}
    >
      {children}
    </chakra.div>
  );
}

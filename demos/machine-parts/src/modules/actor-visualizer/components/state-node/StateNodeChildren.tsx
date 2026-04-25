import type { ReactNode } from 'react';
import { chakra } from "@chakra-ui/react"


interface StateNodeChildrenProps {
  isParallel: boolean;
  children: ReactNode;
}

export function StateNodeChildren({ isParallel, children }: StateNodeChildrenProps) {
  return (
    <chakra.div
      css={{
        padding: 2,
        gap: 2,
        display: "flex",
        flexWrap: "wrap",
        alignItems: "flex-start",
        ...(!isParallel && {
          borderTopWidth: "thin",
          borderStyle: "solid",
          borderColor: "border",
        }),
        '& > div > [data-testid="state-card"]': {
          boxShadow: "md",
        },
      }}
    >
      {children}
    </chakra.div>
  )
}

import type { ReactNode } from 'react';
import { chakra, Flex } from "@chakra-ui/react"


interface StateNodeChildrenProps {
  isParallel: boolean;
  children: ReactNode;
}

export function StateNodeChildren({ isParallel, children }: StateNodeChildrenProps) {
  return (
    <Flex
      css={{
        // bg: 'bg.muted',
        padding: 6,
        gap: 4,
        flexDirection: 'column',
        // display: "flex",
        // flexWrap: "wrap",
        alignItems: "flex-start",
        ...(!isParallel && {
          borderTopWidth: "thin",
          borderStyle: "solid",
          borderColor: "border",
        }),
        // '& > div > [data-testid="state-card"]': {
        //   boxShadow: "md",
        // },
      }}
    >
      {children}
    </Flex>
  )
}

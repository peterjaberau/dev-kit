import type { ReactNode } from "react"

import { chakra, Flex } from "@chakra-ui/react"
interface StateNodeRootProps {
  id: string
  children: ReactNode
}

export function StateNodeRoot({ id, children }: StateNodeRootProps) {
  return (
    <Flex
      id={id}
      data-state-id={id}
      css={{
        flexDirection: "column",
      }}
    >
      {children}
    </Flex>
  )
}

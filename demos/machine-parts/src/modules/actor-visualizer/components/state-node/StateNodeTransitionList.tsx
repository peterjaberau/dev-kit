import type { ReactNode } from "react"
import { chakra, Wrap } from "@chakra-ui/react"
interface StateNodeTransitionListProps {
  children: ReactNode
}

export function StateNodeTransitionList({ children }: StateNodeTransitionListProps) {
  return (
    <Wrap
      css={{
        padding: 2,
        gap: 2,
      }}
    >
      {children}
    </Wrap>
  )
}

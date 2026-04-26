import type { ReactNode } from "react"
import { chakra } from "@chakra-ui/react"
interface StateNodeTransitionListProps {
  children: ReactNode
}

export function StateNodeTransitionList({ children }: StateNodeTransitionListProps) {
  return <chakra.div>{children}</chakra.div>
}

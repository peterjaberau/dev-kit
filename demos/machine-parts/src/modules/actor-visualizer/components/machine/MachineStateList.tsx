import type { ReactNode } from "react"
import { chakra, Flex } from "@chakra-ui/react"
interface MachineStateListProps {
  children: ReactNode
}

export function MachineStateList({ children }: MachineStateListProps) {
  return <Flex css={{ flexDirection: "column", gap: 4 }}>{children}</Flex>
}

import { HStack } from "@chakra-ui/react"
import { Collapsible, Stack } from "@chakra-ui/react"
import { LuChevronDown, LuChevronRight } from "react-icons/lu"
import * as React from "react"

export const TreeViewBranch = ({ children }: any) => {
  return (
    <Collapsible.Root>{children}</Collapsible.Root>
  )
}

import { HStack } from "@chakra-ui/react"
import * as React from "react"
import { Collapsible, } from "@chakra-ui/react"

export const TreeViewBranchControl = ({ children }: any) => {
  return (
    <Collapsible.Trigger >
        {children}
    </Collapsible.Trigger>
  )
}

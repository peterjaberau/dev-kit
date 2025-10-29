import { HStack, Collapsible } from "@chakra-ui/react"
import * as React from "react"

export const TreeViewBranchContent = ({ children }: any) => {
  return <Collapsible.Content> {children} </Collapsible.Content>
}

import { Icon } from "@chakra-ui/react"
import * as React from "react"
import { LuChevronDown, LuChevronRight } from "react-icons/lu"

export const TreeViewBranchTrigger = ({ isOpen }: any) => {
  return (
    <Icon>
      { isOpen ? <LuChevronDown /> : <LuChevronRight /> }
    </Icon>
  )
}

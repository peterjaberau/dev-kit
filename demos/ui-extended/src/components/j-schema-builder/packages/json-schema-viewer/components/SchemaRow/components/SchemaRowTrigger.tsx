import { Icon } from "@chakra-ui/react"
import * as React from "react"
import { LuChevronDown, LuChevronRight } from "react-icons/lu"

export const SchemaRowTrigger = ({ isCollapsible, isOpen }: any) => {
  return (
    isCollapsible && (
      <Icon>
        { isOpen ? <LuChevronDown /> : <LuChevronRight /> }
      </Icon>
    )
  )
}

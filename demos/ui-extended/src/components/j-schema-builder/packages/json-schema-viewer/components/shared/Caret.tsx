import { Flex, Icon } from "@chakra-ui/react"
import { LuChevronRight, LuChevronDown } from "react-icons/lu"
import * as React from "react"

export const Caret = ({ isExpanded }: any) => (
  <Icon size={"xs"}>{isExpanded ? <LuChevronDown /> : <LuChevronRight />}</Icon>
)

'use client'
import { Icon } from "@chakra-ui/react"
import { FaCaretDown as CaretDownIcon, FaCaretRight as CaretRightIcon } from "react-icons/fa6"
import { useState } from "react"

export const IndicatorCollapsible = ({ collapsed }: any) => {
  return (
    <Icon size="sm">
      {collapsed ? <CaretRightIcon /> : <CaretDownIcon />}
    </Icon>
  )
}

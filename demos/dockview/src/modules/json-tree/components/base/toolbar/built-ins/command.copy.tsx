import React, { forwardRef } from "react"
import { Button, chakra } from "@chakra-ui/react"
import { LuCopy as CopyIcon } from "react-icons/lu"

export const ToolbarCommandCopy = forwardRef<HTMLDivElement, any>((props: any, ref: any) => {
  const { children, ...rest } = props
  return (
    <chakra.div
      data-scope="json-tree"
      data-part="toolbar-command-copy"
      {...rest}
      ref={ref}
      onClick={(e) => {
        e.stopPropagation()
        e.preventDefault()
        console.log("Copy command clicked", e)
      }}
    >
      <CopyIcon />
      {children}
    </chakra.div>
  )
})

import React, { forwardRef } from "react"
import { Button, chakra } from "@chakra-ui/react"
import { LuBookmark as BookmarkIcon } from "react-icons/lu"

export const ToolbarCommandBookmark = forwardRef<HTMLDivElement, any>((props: any, ref: any) => {
  const { children, ...rest } = props
  return (
    <chakra.div
      data-scope="json-tree"
      data-part="toolbar-command-bookmark"
      {...rest}
      ref={ref}
      onClick={(e) => {
        e.stopPropagation()
        e.preventDefault()
        console.log("Bookmark command clicked", e)
      }}
    >
      <BookmarkIcon />
      {children}
    </chakra.div>
  )
})

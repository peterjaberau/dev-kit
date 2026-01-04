import React, { forwardRef } from "react"
import { chakra } from "@chakra-ui/react"

export const NodeDrop = forwardRef<HTMLDivElement, any>((props: any, ref: any) => {
  const {
    id,
    index = 0,
    lineGap = 2,
    currentLevel = 0,
    indentPerLevel = 0,
    getData,
    canDrop,
    onDragEnter,
    onDragLeave,
    onDrag,
    ...rest
  } = props

  return <chakra.div data-scope="node" data-part="drop" {...props} ref={ref} />
})

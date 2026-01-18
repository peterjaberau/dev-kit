import React, { forwardRef } from "react"
import { chakra, Badge } from "@chakra-ui/react"

export const NodeTag = forwardRef<HTMLDivElement, any>((props: any, ref: any) => {
  return (
    <chakra.div
      style={{
        margin: "0px",
        padding: "0px",
        gridArea: "elem-after",
        gap: "4px",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        opacity: 0,
        width: "0",
        paddingInlineEnd: 0,
      }}
    >
      <Badge data-scope="node" data-part="tag" variant={"outline"} {...props} ref={ref}>
        {props.children}
      </Badge>
    </chakra.div>
  )
})

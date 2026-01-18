import React, { forwardRef } from "react"
import { Text, chakra } from "@chakra-ui/react"
import { expandableMenuItemIndentation } from "#adaptive-menu/constants"

export const NodeText = forwardRef<HTMLDivElement, any>((props: any, ref: any) => {
  const {level=0, children} = props
  return (
    <chakra.div
      // data-scope="node"
      // data-part="text"
      // fontWeight={"medium"}
      // textAlign={"start"}
      // fontSize={"15px"}
      css={{
        gridArea: "interactive",
        display: "flex",
        flexDirection: "column",
        alignContent: "center",

        // overflow: "hidden",
        // textAlign: "left",
        // verticalAlign: "middle",
        // textOverflow: "ellipsis",
        // whiteSpace: "nowrap",
      }}
      {...props}
      ref={ref}
    >
      <chakra.div
        css={{
          insetInlineStart: `calc(-1 * ${level} * ${expandableMenuItemIndentation})`,
          position: "absolute",
          inset: 0,
          margin: "0px",
          padding: "0px",
          gap: "2px",
          overflow: "hidden",
          display: "flex",
          paddingInlineEnd: "4px",
          paddingInlineStart: "4px",
          flexDirection: "column",
          minWidth: "1ch",
        }}
      >
        <chakra.span
          css={{
            overflow: "hidden",
            margin: "0px",
            WebkitLineClamp: "1",
            overflowWrap: "anywhere",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            wordBreak: "break-all",
            fontWeight: "500",
          }}
        >
          {children}
        </chakra.span>
      </chakra.div>
    </chakra.div>
  )
})

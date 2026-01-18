import React, { forwardRef } from "react"
import { Collapsible, IconButton, Icon } from "@chakra-ui/react"
import { LuChevronRight } from "react-icons/lu"
import { TiDocument } from "react-icons/ti"
import { useMenuItem } from "#adaptive-menu/use-menu-item"

export const ControlTriggerIndicator = forwardRef<HTMLDivElement, any>((props: any, ref: any) => {
  const { itemRef, css, ...rest } = props
  const { isOpen, isBranchNotEmptyData, isBranchData, isBranchEmptyData, isLeafData } = useMenuItem({
    actorRef: itemRef,
  })

  return (
    <Collapsible.Indicator
      data-scope="control"
      data-part="indicator"
      css={{
        display: "inline-block",
        width: "24px",
        ...(isBranchNotEmptyData && {
          transition: "transform 0.2s",
          _open: {
            transform: "rotate(90deg)",
          },
        }),
      }}
      {...props}
      ref={ref}
    >
      {isLeafData || isBranchEmptyData ? (
        <IconButton variant="plain" size="2xs">
          <TiDocument />
        </IconButton>
      ) : (
        <IconButton variant="ghost" size="2xs">
          <LuChevronRight />
        </IconButton>
      )}
    </Collapsible.Indicator>
  )
})

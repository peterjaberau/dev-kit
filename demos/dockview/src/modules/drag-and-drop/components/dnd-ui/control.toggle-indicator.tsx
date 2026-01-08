import React, { forwardRef } from "react"
import { chakra, Icon } from "@chakra-ui/react"
import { Collapsible } from "@chakra-ui/react"
import { LuChevronRight } from "react-icons/lu"

// additionalGap for toggleSize
export const ControlToggleIndicator = forwardRef<HTMLDivElement, any>((props: any, ref: any) => {
  const { css, ...rest } = props
  return (
    <Collapsible.Indicator
      data-scope="control"
      data-part="toggle"
      data-branch="false"
      // gridArea="toggle"
      transition="transform 0.2s"
      _open={{ transform: "rotate(90deg)" }}
      css={{
        ...css,
        display: "none",
        justifyContent: "flex-start",
        alignItems: "center",
        height: "full",

        /* visible only when data-children exists AND is not "0" */
        '[data-children]:not([data-children="0"]) &': {
          display: "flex",
        },
      }}
      {...props}
      ref={ref}
    >
      <Icon>
        <LuChevronRight />
      </Icon>
    </Collapsible.Indicator>
  )
})
